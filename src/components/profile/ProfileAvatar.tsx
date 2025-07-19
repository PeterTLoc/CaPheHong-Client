import Image from "next/image"
import React from "react"
import { User } from "lucide-react"

interface ProfileAvatarProps {
  user: {
    name: string
    avatar: string | null
    is_premium: boolean
  }
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ user }) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        {/* ProfileAvatar */}
        <div className="w-[125px] h-[125px] rounded-full overflow-hidden border border-[#E5E5E5] bg-white flex items-center justify-center">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt="ProfileAvatar"
              width={96}
              height={96}
              className="object-cover w-full h-full"
              unoptimized
            />
          ) : (
            <User size={64} strokeWidth={1} className="text-[#B0B0B0]" />
          )}
        </div>
        {/* Name and badge */}
        <div className="flex flex-col">
          <span className="text-[18px] uppercase">{user.name}</span>
          <span className="text-[13px] -mt-[2px] subtext">User account</span>
          {user.is_premium && (
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full text-white mt-1"
              style={{
                background:
                  "linear-gradient(90deg, #ff5f6d, #ffc371, #47cf73, #1fa2ff, #a259c4, #ff5f6d)",
                backgroundSize: "400% 400%",
                animation: "rainbow-move 3s linear infinite",
              }}
            >
              Personal Plan
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileAvatar
