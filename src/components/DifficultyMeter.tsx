import React from "react";

interface DifficultyMeterProps {
    beginner: number;
    intermediate: number;
    advanced: number;
}

const DifficultyMeter: React.FC<DifficultyMeterProps> = ({ beginner, intermediate, advanced }) => {
    const total = beginner + intermediate + advanced;
    const radius = 40;
  const halfCircumference = Math.PI * radius; // Half-circle length

  // Calculate arc lengths based on difficulty counts
  const beginnerArc = (beginner / total) * halfCircumference;
  const intermediateArc = (intermediate / total) * halfCircumference;
  const advancedArc = (advanced / total) * halfCircumference;

  return (
    <svg width="200" height="150" viewBox="0 0 100 55">
  {/* Background Arc */}
  <path
    d="M 10 50 A 40 40 0 0 1 90 50"
    fill="none"
    stroke="#ddd"
    strokeWidth="10"
  />

  {/* Beginner Arc (Green) */}
  {beginner > 0 && (
    <path
      d="M 10 50 A 40 40 0 0 1 90 50"
      fill="none"
      stroke="green"
      strokeWidth="10"
      strokeDasharray={`${beginnerArc} ${halfCircumference}`}
      strokeDashoffset="0"
    />
  )}

  {/* Intermediate Arc (Yellow) */}
  {intermediate > 0 && (
    <path
      d="M 10 50 A 40 40 0 0 1 90 50"
      fill="none"
      stroke="yellow"
      strokeWidth="10"
      strokeDasharray={`${intermediateArc} ${halfCircumference}`}
      strokeDashoffset={`-${beginnerArc}`}
    />
  )}

  {/* Advanced Arc (Red) */}
  {advanced > 0 && (
    <path
      d="M 10 50 A 40 40 0 0 1 90 50"
      fill="none"
      stroke="red"
      strokeWidth="10"
      strokeDasharray={`${advancedArc} ${halfCircumference}`}
      strokeDashoffset={`-${beginnerArc + intermediateArc}`}
    />
  )}

  {/* Text Inside the SVG */}
  <g transform="translate(10, 60)">
    <text x="20" y="-16" fontSize="8" fill="#cccccc">
      <tspan fill="#4CAF50">{beginner}</tspan> / <tspan fill="yellow">{intermediate}</tspan> / <tspan fill="red">{advanced}</tspan>
    </text>
  </g>

</svg>



  );
};

export default DifficultyMeter;
