'use client';

interface TitleProps {
    title: string;
    className?: string;
}

/**
 * A functional component that renders a title inside a styled `div` element.
 *
 * @param {TitleProps} props - The props object containing the title to be displayed.
 * @param {string} props.title - The title text to be displayed.
 * @param {string} [props.className] - Optional additional class names to be applied to the `div` element.
 * @returns {JSX.Element} The JSX element representing the title.
 */
export default function Title({ title, className }: TitleProps) {
    return (
        <div className={className}>
            <h1 className='text-3xl font-body my-2 md:text-4xl'>{title}</h1>
        </div>
    );
}