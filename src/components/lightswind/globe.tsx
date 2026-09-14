"use client";

import React, { useEffect, useRef } from "react";
import createGlobe, { type Marker as COBEMarker, type Globe as COBEGlobe } from "cobe";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Utility function to convert a hex color string to a normalized RGB array [0-1, 0-1, 0-1]
const hexToRgbNormalized = (hex: string): [number, number, number] => {
  let r = 0,
    g = 0,
    b = 0;

  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    return [0.4, 0.65, 1];
  }

  return [r / 255, g / 255, b / 255];
};

export interface GlobeMarker {
  location: [number, number];
  size: number;
}

export interface GlobeProps {
  className?: string;
  theta?: number;
  phi?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number] | string;
  markerColor?: [number, number, number] | string;
  glowColor?: [number, number, number] | string;
  markers?: GlobeMarker[];

  /** Enable mouse drag / touch rotation */
  interactive?: boolean;
  /** Enable mouse wheel and pinch zoom */
  enableZoom?: boolean;
  /** Minimum zoom scale */
  minScale?: number;
  /** Maximum zoom scale */
  maxScale?: number;
  /** Zoom sensitivity multiplier */
  zoomSensitivity?: number;
  /** Enable auto rotation */
  autoRotate?: boolean;
  /** Auto rotation speed */
  autoRotateSpeed?: number;
}

// Reset and disable all vertex attributes on the WebGL context
// Prevents INVALID_OPERATION: drawArrays: no buffer is bound to enabled attribute
// when React StrictMode, Fast Refresh, or remounting occurs on the same canvas element
const resetWebGLAttributes = (canvas: HTMLCanvasElement) => {
  try {
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return;
    const rawMax: unknown = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    const maxAttribs = typeof rawMax === "number" ? rawMax : 16;
    const ext = gl.getExtension("ANGLE_instanced_arrays") as {
      vertexAttribDivisorANGLE: (index: number, divisor: number) => void;
    } | null;
    for (let i = 0; i < maxAttribs; i++) {
      gl.disableVertexAttribArray(i);
      if ("vertexAttribDivisor" in gl && typeof gl.vertexAttribDivisor === "function") {
        gl.vertexAttribDivisor(i, 0);
      } else if (ext) {
        ext.vertexAttribDivisorANGLE(i, 0);
      }
    }
  } catch {
    // Ignore WebGL query errors if context is lost or unavailable
  }
};

export const Globe: React.FC<GlobeProps> = ({
  className,
  theta = 0.25,
  phi = 0,
  dark,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 24000,
  mapBrightness = 10,
  baseColor,
  markerColor,
  glowColor,
  markers = [],
  interactive = false,
  enableZoom = false,
  minScale = 0.4,
  maxScale = 3.5,
  zoomSensitivity = 0.002,
  autoRotate = true,
  autoRotateSpeed = 0.003,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<COBEGlobe | null>(null);
  const { resolvedTheme } = useTheme();

  // Interaction refs
  const phiRef = useRef(phi);
  const thetaRef = useRef(theta);
  const targetScaleRef = useRef(scale);
  const currentScaleRef = useRef(scale);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);

  const autoRotateRef = useRef(autoRotate);
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  const autoRotateSpeedRef = useRef(autoRotateSpeed);
  useEffect(() => {
    autoRotateSpeedRef.current = autoRotateSpeed;
  }, [autoRotateSpeed]);

  // Synchronize initial prop scale
  useEffect(() => {
    targetScaleRef.current = scale;
  }, [scale]);

  const isDarkMode = dark !== undefined ? dark === 1 : resolvedTheme === "dark";
  const resolvedDark = isDarkMode ? 1 : 0;

  const getThemeColors = React.useCallback(() => {
    // Default theme-adaptive palette: pure monochrome black & white in dark mode
    const defaultBaseColor: [number, number, number] = isDarkMode
      ? [0.85, 0.85, 0.85]
      : [0.95, 0.96, 0.98];

    const defaultGlowColor: [number, number, number] = isDarkMode
      ? [0.8, 0.8, 0.8]
      : [0.85, 0.92, 1];

    const defaultMarkerColor: [number, number, number] = isDarkMode
      ? [1, 1, 1]
      : [0.01, 0.52, 0.78];

    const resolvedBaseColor: [number, number, number] = baseColor
      ? typeof baseColor === "string"
        ? hexToRgbNormalized(baseColor)
        : baseColor
      : defaultBaseColor;

    const resolvedMarkerColor: [number, number, number] = markerColor
      ? typeof markerColor === "string"
        ? hexToRgbNormalized(markerColor)
        : markerColor
      : defaultMarkerColor;

    const resolvedGlowColor: [number, number, number] = glowColor
      ? typeof glowColor === "string"
        ? hexToRgbNormalized(glowColor)
        : glowColor
      : defaultGlowColor;

    return {
      dark: resolvedDark,
      baseColor: resolvedBaseColor,
      glowColor: resolvedGlowColor,
      markerColor: resolvedMarkerColor,
    };
  }, [isDarkMode, resolvedDark, baseColor, glowColor, markerColor]);

  const themeColorsRef = useRef(getThemeColors());

  // Dynamic Theme Uniform Update (NO WebGL tear-down, NO re-creation, NO freezing)
  useEffect(() => {
    const updatedColors = getThemeColors();
    themeColorsRef.current = updatedColors;

    // Immediately push new shader uniforms to the active WebGL globe
    globeRef.current?.update({
      dark: updatedColors.dark,
      baseColor: updatedColors.baseColor,
      glowColor: updatedColors.glowColor,
      markerColor: updatedColors.markerColor,
    });
  }, [getThemeColors]);

  // Dynamic Markers Update
  useEffect(() => {
    if (!globeRef.current) return;
    const cobeMarkers: COBEMarker[] = markers.map((m) => ({
      location: m.location,
      size: m.size,
    }));
    globeRef.current.update({ markers: cobeMarkers });
  }, [markers]);

  // Main WebGL Mount Effect: Runs strictly ONCE on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Move canvas back to container if previously wrapped by cobe in StrictMode or fast refresh
    if (
      containerRef.current &&
      canvas.parentElement &&
      canvas.parentElement !== containerRef.current
    ) {
      const cobeParent = canvas.parentElement;
      containerRef.current.appendChild(canvas);
      cobeParent.remove();
    }

    // Explicitly reset all vertex attributes on the WebGL context
    // Prevents "INVALID_OPERATION: drawArrays: no buffer is bound to enabled attribute"
    // when re-mounting on the same canvas element
    resetWebGLAttributes(canvas);

    const initialColors = themeColorsRef.current;
    const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 768;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(100, Math.round(rect.width || 500));
    const height = Math.max(100, Math.round(rect.height || 500));

    // On small screens, cap DPR to 1 and internal dimension to 600px to maintain 60fps
    const dpr = isSmallScreen
      ? 1
      : Math.min(window.devicePixelRatio || 1, width >= 1200 ? 1.25 : 1.5);
    const maxDimension = isSmallScreen ? 600 : 2048;
    const internalWidth = Math.min(Math.round(width * dpr), maxDimension);
    const internalHeight = Math.min(Math.round(height * dpr), maxDimension);

    canvas.width = internalWidth;
    canvas.height = internalHeight;

    const cobeMarkers: COBEMarker[] = markers.map((m) => ({
      location: m.location,
      size: m.size,
    }));

    // Adaptive sample density: 8,000 points on small screens, full density on desktop
    const resolvedMapSamples = isSmallScreen
      ? Math.min(mapSamples, 8000)
      : mapSamples;

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: internalWidth,
      height: internalHeight,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: initialColors.dark,
      scale: currentScaleRef.current,
      diffuse: diffuse,
      mapSamples: resolvedMapSamples,
      mapBrightness: mapBrightness,
      baseColor: initialColors.baseColor,
      markerColor: initialColors.markerColor,
      glowColor: initialColors.glowColor,
      opacity: 1,
      offset: [0, 0],
      markers: cobeMarkers,
    });

    let isVisible = false;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    let animationFrameId: number | null = null;

    const renderLoop = () => {
      if (!isVisible || (isSmallScreen && isScrolling)) {
        animationFrameId = null;
        return;
      }

      if (!isDragging.current && autoRotateRef.current) {
        phiRef.current += autoRotateSpeedRef.current;
      }

      currentScaleRef.current +=
        (targetScaleRef.current - currentScaleRef.current) * 0.12;

      globeRef.current?.update({
        phi: phiRef.current,
        theta: thetaRef.current,
        scale: currentScaleRef.current,
        dark: themeColorsRef.current.dark,
        baseColor: themeColorsRef.current.baseColor,
        glowColor: themeColorsRef.current.glowColor,
        markerColor: themeColorsRef.current.markerColor,
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const startLoop = () => {
      if (!animationFrameId && isVisible && !document.hidden && !(isSmallScreen && isScrolling)) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const stopLoop = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    // Pause WebGL rendering entirely when actively scrolling on small screens to yield GPU to the compositor
    const handleScroll = () => {
      if (!isSmallScreen) return;
      isScrolling = true;
      stopLoop();
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        if (isVisible && !document.hidden) {
          startLoop();
        }
      }, 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle debounced resize
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!globeRef.current) return;
        const currentSmall = window.innerWidth < 768;
        const currentRect = canvas.getBoundingClientRect();
        const currentWidth = Math.max(100, Math.round(currentRect.width || 500));
        const currentHeight = Math.max(100, Math.round(currentRect.height || 500));
        const currentDpr = currentSmall
          ? 1
          : Math.min(window.devicePixelRatio || 1, currentWidth >= 1200 ? 1.25 : 1.5);
        const currentMaxDim = currentSmall ? 600 : 2048;
        const newW = Math.min(Math.round(currentWidth * currentDpr), currentMaxDim);
        const newH = Math.min(Math.round(currentHeight * currentDpr), currentMaxDim);
        globeRef.current.update({ width: newW, height: newH });
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    // Pause WebGL rendering entirely when off-screen to eliminate background frame drops
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "250px" }
    );

    observer.observe(canvas);

    // Pause rendering when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isVisible && !isScrolling) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // --- Optional Mouse Drag & Zoom Handlers ---
    let onMouseDown: ((e: MouseEvent) => void) | null = null;
    let onMouseMove: ((e: MouseEvent) => void) | null = null;
    let onMouseUp: (() => void) | null = null;
    let onMouseLeave: (() => void) | null = null;
    let onWheel: ((e: WheelEvent) => void) | null = null;

    if (interactive) {
      onMouseDown = (e: MouseEvent) => {
        isDragging.current = true;
        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;
        canvas.style.cursor = "grabbing";
      };

      onMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
          const deltaX = e.clientX - lastMouseX.current;
          const deltaY = e.clientY - lastMouseY.current;
          const rotationSpeed = 0.005;

          phiRef.current += deltaX * rotationSpeed;
          thetaRef.current = Math.max(
            -Math.PI / 2,
            Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
          );

          lastMouseX.current = e.clientX;
          lastMouseY.current = e.clientY;
        }
      };

      onMouseUp = () => {
        isDragging.current = false;
        canvas.style.cursor = "grab";
      };

      onMouseLeave = () => {
        if (isDragging.current) {
          isDragging.current = false;
          canvas.style.cursor = "grab";
        }
      };

      onWheel = (e: WheelEvent) => {
        if (!enableZoom) return;
        if (!e.ctrlKey && !e.metaKey && !isDragging.current) return;
        e.preventDefault();
        const zoomDelta = -e.deltaY * zoomSensitivity;
        const nextScale = targetScaleRef.current + zoomDelta;
        targetScaleRef.current = Math.max(minScale, Math.min(maxScale, nextScale));
      };

      canvas.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      canvas.addEventListener("mouseleave", onMouseLeave);
      canvas.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopLoop();
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
      resetWebGLAttributes(canvas);
      if (
        containerRef.current &&
        canvas.parentElement &&
        canvas.parentElement !== containerRef.current
      ) {
        const cobeParent = canvas.parentElement;
        containerRef.current.appendChild(canvas);
        cobeParent.remove();
      }
      if (interactive) {
        if (onMouseDown) canvas.removeEventListener("mousedown", onMouseDown);
        if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
        if (onMouseUp) window.removeEventListener("mouseup", onMouseUp);
        if (onMouseLeave) canvas.removeEventListener("mouseleave", onMouseLeave);
        if (onWheel) canvas.removeEventListener("wheel", onWheel);
      }
    };
  }, [
    diffuse,
    mapSamples,
    mapBrightness,
    interactive,
    enableZoom,
    minScale,
    maxScale,
    zoomSensitivity,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center justify-center relative w-full h-full",
        className
      )}
      style={{
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          cursor: interactive ? "grab" : "default",
          pointerEvents: interactive ? "auto" : "none",
        }}
      />
    </div>
  );
};

export default Globe;
