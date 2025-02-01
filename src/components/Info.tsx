'use client';

interface InfoProps {
    info: string;
    className?: string;
    link?: string;
}

/**
 * Info component displays a piece of information within a styled div.
 *
 * @param {InfoProps} props - The properties object.
 * @param {string} props.info - The information to display.
 * @param {string} [props.className] - Optional additional class names to apply to the div.
 * @param {string} [props.link] - Optional link to wrap the information.
 *
 * @returns {JSX.Element} The rendered Info component.
 */
export default function Info({ info, className = '', link }: InfoProps) {
    return (
        <div className={`font-body ${className}`}>
            {link ? (
                <a href={link} className="text-sm underline md:text-lg">
                    {info}
                </a>
            ) : (
                <p className="text-sm md:text-lg">
                    {info}
                </p>
            )}
        </div>
    );
}