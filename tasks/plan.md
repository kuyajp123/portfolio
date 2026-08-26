# Implementation Plan: Smart Hybrid Spotify Playback Engine

## Overview
Enable real-time Spotify "Now Playing" detection that works both when Discord is running (via Lanyard) AND when Discord is closed (via Last.fm), with mathematical stale-scrobble expiration so paused/stopped tracks do not linger as phantom playback.

## Root Cause
- When Discord is closed, Lanyard reports offline.
- Last.fm scrobbler receives start webhooks from Spotify but not pause webhooks, leaving `@attr.nowplaying: true` on the last played song indefinitely.
- Solution: Calculate `elapsed = Date.now() - previousTrack.endedAt` and compare against the track's duration. If `elapsed <= duration + 30s`, the song is genuinely playing right now; otherwise, it is expired/resting.

## Task List

### Phase 1: Engine Implementation
- [ ] Task 1: Update `SpotifyNowPlaying.tsx` with smart Last.fm timestamp freshness verification and duration calculation.
- [ ] Task 2: Ensure seamless transition between Lanyard (when Discord is active) and Last.fm (when Discord is closed).

### Checkpoint: Verification
- [ ] ESLint passes with 0 errors.
- [ ] Production build passes.
- [ ] Stale tracks show Resting state; newly played tracks show Live Now Playing state with progress bar.