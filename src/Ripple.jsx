import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { cn } from "./utils/cn";

const Ripple = React.memo(function Ripple({
  mainCircleSize = 400,
  mainCircleOpacity = 0.25,
  numCircles = 8,
  className,
}) {
  return (
    <div
      className={cn(
        "pointer-events-none select-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className
      )}
      role="presentation"
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-full bg-foreground/25 bg-stone-700 shadow-xl border`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle,
              borderWidth: "1px",
              borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)",
              "--i": i,
            }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
});

// Define prop types
Ripple.propTypes = {
  mainCircleSize: PropTypes.number,
  mainCircleOpacity: PropTypes.number,
  numCircles: PropTypes.number,
  className: PropTypes.string,
};

Ripple.displayName = "Ripple";

export default Ripple;
