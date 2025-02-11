"use client";

import React, { useRef, useState } from "react";
import Image from 'next/image';

interface UserData {
  picture: string;
  name: string;
  email: string;
  role: string;
}


export default function Dashboard({ children }: { children: React.ReactNode }) {

  const imageRef = useRef<HTMLImageElement>(null);

  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <div className="flex flex-col h-min bg-bg text-text">
      {/* Navigation bar */}
      <div className="p-4 flex justify-between items-center w-full sticky top-0 bg-bg text-text shadow-2xl shadow-zinc-800 md:px-20 lg:px-72">
        <Image
          src="/LogoWhite.svg"
          alt="logo"
          width={100}
          height={100}
          className="w-1/3 md:w-1/4 lg:w-1/12"
        />
        <Image
          src={userData?.picture || '/logoWhite.png'}
          ref={imageRef}
          alt="avatar"
          width={48}
          height={48}
          onClick={() => {
            window.location.href = '/profile';
          }}
          className="w-12 h-12 shadow-all-directions shadow-slate-100 object-scale-down rounded-full cursor-pointer outline outline-1 lg:w-12 lg:h-12"
        />
      </div>

      {/* Main content */}
      <main className="h-screen">{children}</main>
    </div>
  );
}
