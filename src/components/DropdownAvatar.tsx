'use client';

import { useState, useRef, useEffect } from "react";

interface DropdownAvatarProps {
    username: string;
    email: string;
    avatarSrc: string;
}

export default function DropdownAvatar({ username, email, avatarSrc }: DropdownAvatarProps) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    useEffect(() => {
        if (dropdownVisible && buttonRef.current && dropdownRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            let leftPosition = buttonRect.left;
            if (buttonRect.right + dropdownRect.width > viewportWidth) {
                leftPosition = viewportWidth -5 * dropdownRect.width - 100; // Adjust left if overflowing
            }

            setPosition({
                top: buttonRect.bottom + window.scrollY + 5,
                left: Math.max(10, leftPosition),
            });
        }
    }, [dropdownVisible]);

    return (
        <div className="relative">
            {/* Avatar Button */}
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
                <img className="w-8 h-8 rounded-full" src={avatarSrc} alt="User Avatar" />
            </button>

            {/* Dropdown Menu */}
            {dropdownVisible && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-48 bg-white text-black shadow-md rounded-lg dark:bg-gray-700 dark:text-white"
                    style={{ top: position.top, left: position.left }}
                >
                    <div className="px-4 py-3 text-sm">
                        <div>{username}</div>
                        <div className="font-medium truncate">{email}</div>
                    </div>
                    <ul className="py-2 text-sm">
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Dashboard</li>
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Settings</li>
                        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Earnings</li>
                    </ul>
                    <div className="py-2">
                        <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
