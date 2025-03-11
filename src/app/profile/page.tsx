"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdEdit, MdLogout, MdOutlineDone } from "react-icons/md";

interface UserData {
  picture: string;
  name: string;
  email: string;
  role: string;
}

const ProfilePage: React.FC = () => {
  const [editName, setEditName] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSignOut = async () => {
    
    try {

      const res = await axios.post("http://localhost:5000/auth/signout");
      
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      window.location.href = "/signin";

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <div className="flex flex-col  bg-bg text-text">
      {/* Navigation bar */}
      <div className="p-4 flex justify-between items-center w-full sticky top-0 bg-bg text-text shadow-2xl shadow-zinc-800 md:px-20 lg:px-72">
        <Image
          src="/LogoWhite.svg"
          alt="logo"
          width={100}
          height={100}
          className="w-1/3 md:w-1/4 lg:w-1/12"
        />

        <MdLogout onClick={handleSignOut} className="w-8 h-8" />
      </div>

      {/* Main content */}
      <main className="h-screen p-4 xl:px-[576px]">
        {/* profile picture */}
        <div className="flex justify-center items-center">
          <div className="w-48 h-48 flex justify-center items-center rounded-full shadow-all-directions shadow-slate-100">
            {userData && (
              <Image
                src={userData.picture || "/logoWhite.png"}
                alt="User Profile Picture"
                width={150}
                height={150}
                className="rounded-full w-full h-full object-contain"
                priority={userData.picture ? false : true}
              />
            )}
          </div>
        </div>

        {/* User data */}

        <div className="flex flex-col px-8 pt-8 ">
          {/* User Name */}
          <div className="opacity-50 px-2">User Name</div>
          {editName ? (
            <div className="flex justify-between items-center gap-4">
              <input
                type="text"
                value={userData?.name}
                ref={(input) => input?.focus()}
                placeholder="Enter your name"
                className="bg-[#181818] w-full text-2xl p-2 rounded-2xl focus:outline-none focus:shadow-md focus:shadow-slate-700 placeholder:font-body placeholder:text-gray-500"
                onChange={(e) => {
                  setUserData({
                    ...userData!,
                    name: e.target.value,
                  });
                }}
              />
              <button
                type="button"
                title="Save"
                onClick={() => {
                  localStorage.setItem("userData", JSON.stringify(userData));
                  setEditName(false);
                }}
              >
                <MdOutlineDone className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center p-2">
              <h1 className="text-2xl w-full">{userData?.name}</h1>
              <button title="edit" onClick={() => setEditName(true)}>
                <MdEdit className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* User Email */}
        <div className="flex flex-col px-8 mt-2">
          <div className="opacity-50 px-2">Email</div>
          <div className="flex justify-between items-center p-2">
            <h1 className="text-2xl w-full">{userData?.email}</h1>
          </div>
        </div>

        {/* User Role */}
        <div className="flex flex-col px-8 mt-2">
          <div className="opacity-50 px-2">Role</div>
          <div className="flex justify-between items-center p-2">
            <h1 className="text-2xl w-full">{userData?.role}</h1>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
