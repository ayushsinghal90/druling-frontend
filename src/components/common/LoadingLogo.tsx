import React from "react";

interface LoadingLogoProps {
  className?: string;
}

const LoadingLogo = ({ className = "h-14 w-14" }: LoadingLogoProps) => {
  return (
    <svg
      viewBox="50 70 80 80"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[
        // Circle configurations: [cx, cy, r, animationDelay]
        // Center dots
        [81, 76, 1.5, 0],
        [99, 76, 1.5, 100],

        // Top row
        [64, 84, 3, 200],
        [80, 84, 3, 300],
        [100, 84, 3, 400],
        [116, 84, 3, 500],

        // Middle row with larger dots
        [56, 102, 1.5, 600],
        [64, 100, 3, 700],
        [80, 100, 8, 800],
        [100, 100, 8, 900],
        [116, 100, 3, 1000],
        [124, 101, 1.5, 1100],

        // Second middle row
        [56, 119, 1.5, 1200],
        [64, 120, 3, 1300],
        [80, 120, 8, 1400],
        [100, 120, 8, 1500],
        [116, 120, 3, 1600],
        [124, 119, 1.5, 1700],

        // Bottom row
        [64, 136, 3, 1800],
        [80, 136, 3, 1900],
        [100, 136, 3, 2000],
        [116, 136, 3, 2100],

        // Center bottom dots
        [81, 144, 1.5, 2200],
        [99, 144, 1.5, 2300],
      ].map(([cx, cy, r, delay], index) => (
        <circle key={index} cx={cx} cy={cy} r={r}>
          {/* Animation for radius */}
          <animate
            attributeName="r"
            values={`${r}; ${r + 1}; ${r}`}
            dur="1s"
            begin={`${delay}ms`}
            repeatCount="indefinite"
          />
          {/* Animation for opacity */}
          <animate
            attributeName="opacity"
            values="1; 0.35; 1"
            dur="1s"
            begin={`${delay}ms`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
};

export default LoadingLogo;
