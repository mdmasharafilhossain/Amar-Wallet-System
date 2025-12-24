import React from "react";
import type { SkeletonProps } from "../types";



const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-[#2b455a] ${className}`}
    />
  );
};

export default Skeleton;
