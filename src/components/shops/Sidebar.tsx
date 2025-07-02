interface SidebarProps {
  tags: string[]
  activeTag: string | null
  onTagSelect: (tag: string | null) => void
}

const Sidebar: React.FC<SidebarProps> = ({ tags, activeTag, onTagSelect }) => {
  return (
    <div className="p-5">
      <div className="w-[280px] space-y-1 relative">
        {tags.map((tag) => (
          <div
            key={tag}
            onClick={() => onTagSelect(activeTag === tag ? null : tag)}
            className={`sidebar-link relative flex items-center gap-[10px] cursor-pointer
              ${activeTag === tag ? "bg-[#EAEAEA]" : ""}
            `}
          >
            {activeTag === tag && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-[3px] bg-[#8B5E3C]" />
            )}
            <div className="pl-[6px] flex items-center gap-[10px]">
              <span className="pt-[3px] capitalize">{tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
