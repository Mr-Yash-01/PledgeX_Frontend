'use client';

import { useState, useRef, useEffect } from "react";


export default function Dashboard({children}: {children: React.ReactNode}) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const imageRef = useRef<HTMLImageElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        }
    }, [dropdownVisible]);

    return (
        <div className="flex flex-col h-min bg-bg text-text ">
            {/* Navigation bar */}
            <div className="p-4 flex justify-between items-center w-full sticky top-0 bg-bg text-text shadow-2xl shadow-zinc-800 md:px-20 lg:px-72">
                <img src="/LogoWhite.svg" alt="logo" className="w-1/3 md:w-1/4 lg:w-1/12" />
                
                {/* Account Button */}
                <img src="/file.svg" ref={imageRef} onClick={toggleDropdown} title="Account" alt="avatar" className="w-8 h-8 rounded-full cursor-pointer outline outline-1 lg:w-12 lg:h-12" />

                {/* Dropdown Menu */}
                {dropdownVisible && (
                    <div 
                        ref={dropdownRef}
                        className="absolute z-50 w-48 bg-zinc-900  outline outline-1 rounded-lg"
                        style={{ top: position.top, left: position.left }}
                    >
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Main content */}
            <main className="h-screen"> {children} </main>

        </div>
    );
}
