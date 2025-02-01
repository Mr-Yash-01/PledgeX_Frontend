import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

interface CDisplayProps {
    text: string;
    component: React.ReactNode;
    list: string[];
}

const CDisplay: React.FC<CDisplayProps> = ({ text, component, list }) => {

    const [isSearchEnabled, setIsSearchEnabled] = useState(false);
    const [searchText, setSearchText] = useState("");

    return (
        <div className='transition-all duration-500 ease-in-out'>
            {
                isSearchEnabled ? (
                    <div className="flex flex-row border border-[#cccccc] items-center shadow-lg shadow-zinc-900 rounded-2xl px-4 py-2 gap-2">
                        <IoSearchSharp />
                        <input
                            id='freelancerSearch'
                            type='text'
                            className={`w-full  focus:outline-none placeholder:font-body placeholder:text-gray-500`}
                            placeholder='name'
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onBlur={(e) => {
                                const parent = e.currentTarget.parentElement;
                                parent?.classList.remove("shadow-gray-700");
                                parent?.classList.add("shadow-zinc-900");
                            }}
                            onFocus={(e) => {
                                const parent = e.currentTarget.parentElement;
                                parent?.classList.remove("shadow-zinc-900");
                                parent?.classList.add("shadow-gray-700");
                            }}
                            style={{
                                backgroundColor: "var(--background)",
                                color: "var(--foreground)",
                            }}
                        />
                        <button title='close' type='button' onClick={() => {setIsSearchEnabled(!isSearchEnabled); setSearchText('')}}>
                            <IoMdClose/>
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 justify-between px-1">
                        <h1 className="text-xl md:text-2xl lg:text-3xl">{text}</h1>
                        <hr className="w-full opacity-40" />
                        <div onClick={() => setIsSearchEnabled(!isSearchEnabled)} className='flex items-center gap-2 p-2 rounded-xl border border-[#cccccc]'>
                            <IoSearchSharp />
                            <h3>Search</h3>
                        </div>
                    </div>
                )
            }
            {component}
        </div>
    );
};

export default CDisplay;
