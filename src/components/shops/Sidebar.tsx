import { Check } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface SidebarProps {
  tags: string[]
  activeTags: string[]
  onTagToggle: (tag: string) => void
  onClearAll?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  tags,
  activeTags,
  onTagToggle,
  onClearAll,
}) => {
  return (
    <div className="p-5 relative">
      <div className="flex justify-between items-center">
        <h2 className="subtitle-top">Tags</h2>
        {activeTags.length > 0 && onClearAll && (
          <button
            onClick={onClearAll}
            className="text-[13px] text-[#8B8B8B] underline hover:cursor-pointer hover:text-black"
          >
            Clear All
          </button>
        )}
      </div>

      <div
        className="w-[280px] relative"
        style={{ minHeight: tags.length * 46 - 6 }}
      >
        {tags.map((tag, index) => {
          const isActive = activeTags.includes(tag)

          return (
            <div
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`sidebar-link flex gap-[14px] items-center cursor-pointer
                ${isActive ? "bg-[#EAEAEA]" : "hover:bg-[#f5f5f5]"}
                ${index !== tags.length - 1 ? "mb-1" : ""}
                h-[40px]  transition`}
            >
              <div
                className={`w-5 h-5 rounded-[5px] border border-[#E5E5E5] flex items-center justify-center
                    ${isActive ? "bg-[#8B5E3C] border-[#8B5E3C]" : "bg-white"}
                  `}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      style={{ display: "flex" }}
                    >
                      <Check size={12} color="#fff" strokeWidth={3} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="capitalize sidebar-link-text">{tag}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
