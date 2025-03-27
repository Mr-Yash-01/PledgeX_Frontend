"use client";

import React, { useRef, useState } from "react";
import { IoMdMail } from "react-icons/io";
import { IconType } from "react-icons";

/**
 * Props for the InputField component.
 */
interface InputFieldProps {
  title: string;
  type?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  icon?: IconType;
  id?: string;
  containerId?: string;
  ref?: React.Ref<HTMLInputElement>;
  max?: number;
  min?: number;
  pattern?: string;
}

export default function InputField({
  title = "Title",
  type = "text",
  max,
  min,
  className = "",
  placeholder = "placeholder",
  value,
  onChange,
  onKeyDown,
  icon: Icon = IoMdMail,
  id,
  containerId,
  ref,
  pattern,
}: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueRef = useRef(value || ""); // Store previous value
  const [isUserSelecting, setIsUserSelecting] = useState(false); // Track autocomplete selection

  return (
    <div className="flex flex-col my-4">
      <h4 className="font-body text-lg font-medium md:text-xl">{title}</h4>
      <div
        id={containerId || undefined}
        className={`flex flex-row items-center shadow-md rounded px-4 ${
          prevValueRef.current === value ? "shadow-zinc-800" : "shadow-gray-700"
        }`}
      >
        <Icon />
        <input
          ref={ref || inputRef}
          id={id}
          type={type}
          className={`w-full p-2 ${className} focus:outline-none placeholder:font-body placeholder:text-gray-500`}
          placeholder={placeholder}
          value={value}
          maxLength={max}
          minLength={min}
          onKeyDown={onKeyDown}
          pattern={pattern}
          autoComplete="off"
          onChange={(e) => {
            setIsUserSelecting(false); // Reset flag when typing manually
            prevValueRef.current = value || ""; // Store last value before update
            onChange?.(e);
          }}
          onInput={() => {
            setIsUserSelecting(true); // Detect autocomplete selection
          }}
          onBlur={() => {
            if (!isUserSelecting && prevValueRef.current !== value) {
              inputRef.current?.parentElement?.classList.remove("shadow-gray-700");
              inputRef.current?.parentElement?.classList.add("shadow-zinc-800");
            }
          }}
          onFocus={() => {
            inputRef.current?.parentElement?.classList.remove("shadow-zinc-800");
            inputRef.current?.parentElement?.classList.add("shadow-gray-700");
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
