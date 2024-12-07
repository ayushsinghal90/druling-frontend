import React from "react";
import { User } from "lucide-react";

interface UserAvatarProps {
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const UserAvatar = ({
  imageUrl,
  size = "md",
  className = "",
}: UserAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-20 w-20",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center ${className}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
          <User className={`${iconSizes[size]} text-gray-500`} />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
