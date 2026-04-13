import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-[#111111] border border-[#222222] p-4 space-y-4 animate-pulse rounded-2xl">
      <div className="w-full aspect-[4/3] bg-[#222222] rounded-xl" />
      <div className="space-y-2">
        <div className="h-6 bg-[#222222] w-3/4 rounded-md" />
        <div className="h-4 bg-[#222222] w-1/2 rounded-md" />
      </div>
      <div className="h-10 bg-[#222222] w-full rounded-xl" />
    </div>
  );
};

export default SkeletonCard;
