import { MapPin } from "lucide-react"

interface ShopCardProps {
  id: number
  title: string
  body: string
  banner: string
  onClick: (id: number) => void
}

export const ShopCard = ({
  id,
  title,
  body,
  banner,
  onClick,
}: ShopCardProps) => {
  return (
    <div
      className="group bg-[#FBFBFB] border border-[#E5E5E5] rounded-[5px] transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:cursor-pointer overflow-hidden relative"
      onClick={() => onClick(id)}
    >
      <div className="relative">
        <img
          src={banner}
          // src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt={title}
          className="aspect-video w-full object-cover"
        />

        {/* Overlay: gradient from transparent to dark at bottom */}
        <div
          className="
          absolute inset-0
          bg-gradient-to-t from-black/60 via-black/20 to-transparent
          group-hover:bg-gradient-to-t group-hover:from-black/40 group-hover:via-black/10 group-hover:to-transparent
          group-hover:backdrop-blur-sm
          transition-all duration-300
        "
        ></div>

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <div
            className="
            transition-all duration-300
            group-hover:-translate-y-2
          "
          >
            <h2 className="text-base font-semibold text-white truncate">
              {title}
            </h2>
            <p
              className="
              text-white text-sm
              max-h-0 overflow-hidden
              group-hover:max-h-32 group-hover:overflow-visible
              group-hover:line-clamp-none
              transition-all duration-300
            "
            >
              {body}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
