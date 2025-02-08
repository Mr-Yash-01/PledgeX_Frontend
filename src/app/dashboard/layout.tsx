"use client";

import { useState, useRef, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";

interface userData {
  email: string;
  name: string;
  picture: string;
  role: string;
}

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<userData>();

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    if (dropdownVisible && imageRef.current && dropdownRef.current) {
      const buttonRect = imageRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      let leftPosition = buttonRect.left;
      if (buttonRect.right + dropdownRect.width > viewportWidth) {
        leftPosition = viewportWidth - dropdownRect.width - 15; // Shift left if out of bounds
      }

      setPosition({
        top: buttonRect.bottom + window.scrollY + 15,
        left: Math.max(10, leftPosition),
      });

      const userData = localStorage.getItem("userData");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }
  }, [dropdownVisible]);

  const handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    // Optionally, you can redirect the user to the login page or home page
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col h-min bg-bg text-text ">
      {/* Navigation bar */}
      <div className="p-4 flex justify-between items-center w-full sticky top-0 bg-bg text-text shadow-2xl shadow-zinc-800 md:px-20 lg:px-72">
        <img
          src="/LogoWhite.svg"
          alt="logo"
          className="w-1/3 md:w-1/4 lg:w-1/12"
        />

        <div className="flex gap-2 items-center">
          {/* Account Button */}
          <img
            src={userData?.picture || '/logoWhite.png'}
            ref={imageRef}
            onClick={toggleDropdown}
            title="Account"
            alt="avatar"
            className="w-8 h-8 object-scale-down rounded-full cursor-pointer outline outline-1 lg:w-12 lg:h-12"
          />

          <button title="Sign Out" className="flex items-center gap-2" onClick={handleLogOut}>
            <span className="">
              <IoIosLogOut className="w-8 h-8" />
            </span>
          </button>
        </div>

        {/* Dropdown Menu */}
        {dropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-48 p-4 bg-zinc-950  outline outline-1 rounded-lg"
            style={{ top: position.top, left: position.left }}
          >
            <h6 className="opacity-60">User Name:</h6>
            <h1 className="text-3xl truncate max-w-max">{userData?.name}</h1>
            <h6 className="opacity-60">Email:</h6>
            <h5 className="text-lg truncate max-w-max">{userData?.email}</h5>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="h-screen"> {children} </main>
    </div>
  );
}
