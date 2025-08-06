import React from "react";

function Logo({ width = "auto", className = "" }) {
  return (
    <div
      className={`text-indigo-400 font-bold text-xl tracking-tight ${className}`}
      style={{ width }}
    >
      DevWaves
    </div>
  );
}

export default Logo;
