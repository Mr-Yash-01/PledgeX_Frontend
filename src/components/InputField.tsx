"use client";

import React from "react";
import { IoMdMail } from "react-icons/io";
import { IconType } from "react-icons";


/**
 * Props for the InputField component.
 * 
 * @interface InputFieldProps
 * @property {string} title - The title or label for the input field.
 * @property {string} [type] - The type of the input field (e.g., "text", "password"). Defaults to "text".
 * @property {string} [className] - Additional CSS classes to apply to the input field.
 * @property {string} [placeholder] - Placeholder text for the input field.
 * @property {string} [value] - The current value of the input field.
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - Callback function to handle changes to the input field.
 * @property {IconType} [icon] - Optional icon to display within the input field.
 * @property {string} [id] - The id attribute for the input field.
 * @property {string} [containerId] - The id attribute for the container of the input field.
 * @property {React.Ref<HTMLInputElement>} [ref] - Ref object to access the input field element.
 */
interface InputFieldProps {
  title: string;
  type?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: IconType;
  id?: string;
  containerId?: string;
  ref? : React.Ref<HTMLInputElement>
}

/**
 * InputField component renders a styled input field with an optional icon and title.
 *
 * @param {string} title - The title displayed above the input field. Defaults to 'Title'.
 * @param {string} type - The type of the input field. Defaults to 'text'.
 * @param {string} className - Additional CSS classes for the input field. Defaults to an empty string.
 * @param {string} placeholder - The placeholder text for the input field. Defaults to 'placeholder'.
 * @param {string | number | readonly string[] | undefined} value - The value of the input field.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} onChange - The function to call when the input value changes.
 * @param {React.ComponentType} icon - The icon component to display inside the input field. Defaults to IoMdMail.
 * @param {string} id - The id of the input field.
 * @param {string} containerId - The id of the container div.
 *
 * @returns {JSX.Element} The rendered InputField component.
 */
export default function InputField({
  title = "Title",
  type = "text",
  className = "",
  placeholder = "placeholder",
  value,
  onChange,
  icon: Icon = IoMdMail,
  id,
  containerId,
  ref
}: InputFieldProps) {
  return (
    <div className="flex flex-col my-4">
      <h4 className="font-body text-lg font-medium md:text-xl">{title}</h4>
      <div
        id={containerId || undefined}
        className="flex flex-row items-center shadow-lg shadow-zinc-900 rounded px-4"
      >
        <Icon />
        <input
          ref={ref}
          id={id}
          type={type}
          className={`w-full p-2 ${className} focus:outline-none placeholder:font-body placeholder:text-gray-500`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
      </div>

      
    </div>
  );
}
