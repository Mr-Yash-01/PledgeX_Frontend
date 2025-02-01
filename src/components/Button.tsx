'use client';

import React, { forwardRef } from 'react';

interface ButtonProps {
    onClick: () => void;
    name?: string;
    title: string;
    className?: string;
    icon?: React.ComponentType;
    id?: string;
    disabled?: boolean;
}

/**
 * Button component renders a customizable button element.
 *
 * @param {Object} props - The properties object.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} [props.name] - The name attribute for the button.
 * @param {string} props.title - The title attribute for the button.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the button.
 * @param {React.ComponentType} props.icon - An optional icon component to render inside the button.
 * @param {string} props.id - The id attribute for the button.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 *
 * @returns {JSX.Element} The rendered button component.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, name, title, className = '', icon: Icon, id, disabled = false }, ref) => {
    return (
        <button 
            type="button"
            id={id}
            className={`${className} my-2 text-lg gap-4 font-medium bg-bg font-body text-text px-4 py-2 rounded shadow-md shadow-zinc-800 hover:shadow-gray-700 flex items-center focus:outline-none focus-within:shadow-gray-700 lg:max-w-[] cursor-pointer `} 
            onClick={onClick}
            name={name}
            title={title}
            disabled={disabled}
            ref={ref}
        >
            {Icon && <Icon />}
            {name && <span>{name}</span>}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
