import React from 'react';

const Skeleton: React.FC = () => {
     return (
          <div className="p-4">
      <div className="animate-pulse  space-y-4">
        <div className="h-5 bg-[#777777] rounded w-2/4"></div>
        <div className="h-3 rounded bg-[#777777]"></div>
        <div className="h-2 rounded bg-[#777777]"></div>
        <div className="h-16 rounded bg-[#777777]"></div>
        <div className="h-5 bg-[#777777] rounded w-2/4"></div>
        <div className='grid grid-cols-2 items-center gap-4'>
          <div className="h-5 bg-[#777777] rounded "></div>
          <div className="h-5 bg-[#777777] rounded "></div>
          <div className="h-5 bg-[#777777] rounded "></div>
          <div className="h-5 bg-[#777777] rounded "></div>
        </div>
      </div>
    </div>
     );
};

export default Skeleton;