import React from 'react';
import { Car, AlertCircle } from 'lucide-react';

const ErrorState = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-12 space-y-8 animate-in fade-in zoom-in duration-500 rounded-3xl bg-[#050505] border border-[#111111] mx-6">
      <div className="relative">
        <Car className="w-24 h-24 text-[#222222]" strokeWidth={1} />
        <div className="absolute -bottom-1 -right-1 bg-black border border-[#222222] rounded-full p-1">
          <AlertCircle className="w-8 h-8 text-[#FF3B30]" />
        </div>
      </div>
      
      <div className="space-y-4 max-w-md">
        <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">
          CAR NOT FOUND
        </h2>
        <p className="text-[10px] text-[#888888] font-bold tracking-[0.2em] leading-relaxed uppercase">
          SORRY, WE CANNOT FIND THAT CAR. PLEASE TRY AGAIN.
        </p>
      </div>

      <button
        onClick={onRetry}
        className="px-12 py-4 bg-transparent border border-[#222222] text-[11px] font-bold tracking-[0.2em] text-[#888888] hover:text-white hover:border-white/20 transition-all uppercase rounded-2xl"
      >
        TRY AGAIN
      </button>
    </div>
  );
};

export default ErrorState;
