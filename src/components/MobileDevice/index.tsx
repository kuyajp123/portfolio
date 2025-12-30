import getTime from '@/utils/getDateAndTime';
import { Battery100Icon, WifiIcon } from '@heroicons/react/24/solid';
import { SignalMedium } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MobileDeviceProps {
  children?: React.ReactNode;
  className?: string;
}

const MobileDevice = ({ children, className }: MobileDeviceProps) => {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTime();
      setTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[350px] aspect-[9/19]">
      {/* Volume Buttons (Left) */}
      <div className="absolute top-28 -left-[4px] w-[5px] h-12 bg-gray-400 border border-gray-600 rounded-l-md shadow-sm"></div>
      <div className="absolute top-43 -left-[4px] w-[5px] h-12 bg-gray-400 border border-gray-600 rounded-l-md shadow-sm"></div>

      {/* Power Button (Right) */}
      <div className="absolute top-32 -right-[4px] w-[5px] h-12 bg-gray-400 border border-gray-600 rounded-r-md shadow-sm"></div>

      {/* Phone Body (Silver Frame) */}
      <div className="w-full h-full bg-gray-400 rounded-[3rem] p-[6px] shadow-2xl border border-gray-600 relative z-10">
        <div className="w-full h-full border-[6px] border-gray-900 rounded-[2.7rem] overflow-hidden bg-white relative">
          {/* dynamic island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full flex items-center justify-end px-3 z-50">
            <div className="w-3 h-3 rounded-full bg-[#1a1a1a] relative">
              <div className="absolute top-[2px] right-[2px] w-1 h-1 bg-white/20 rounded-full"></div>
            </div>
          </div>

          {/* status bar */}
          <div className="h-full w-full bg-gray-100">
            <div className="flex flex-row items-center justify-between p-2">
              <p className="ml-4 text-sm font-bold">{time}</p>
              <div className="flex flex-row items-center mr-2">
                <SignalMedium className="pb-1 size-7" />
                <WifiIcon className="size-4 mr-2" />
                <Battery100Icon className="size-6" />
              </div>
            </div>

            {/* phone content goes here */}
            <div className={`h-full w-full ${className}`}>{children}</div>

            {/* gesture bar */}
            <div className="w-30 absolute h-1 rounded-full bg-gray-500 border border-gray-700 bottom-2 left-1/2 -translate-x-1/2 z-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDevice;
