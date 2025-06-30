import { Shop, ShopUpdatePayload } from "@/types/shop"
import React, { useEffect, useRef, useState } from "react"
import { MoreHorizontal } from "lucide-react"
import ShopEditModal from "./ShopEditModal"

interface Props {
  shop: Shop
  isEditing: boolean
  onEdit: (shop: Shop) => void
  onCancel: () => void
  onSave: (payload: ShopUpdatePayload) => void // ✅ FIXED HERE
  onDelete: () => void
}

const ShopItem: React.FC<Props> = ({
  shop,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownOpen])

  const handleEditClick = () => {
    setShowModal(true)
    setDropdownOpen(false)
  }

  return (
    <div className="container-no-padding flex items-center h-[69px]">
      {/* Image */}
      <img
        src={shop.banner}
        alt={shop.title}
        className="h-[69px] w-[120px] object-cover rounded-l-[5px]"
      />

      <div className="flex items-center flex-1 justify-between p-5">
        {/* Info */}
        <div className="text-[13px]">
          <p>{shop.title}</p>
          <div className="flex items-center text-[11px] subtext gap-[10px]">
            <p>{shop.owner}</p>
            <div className="w-[1px] h-3 bg-[#5F5F5F]"></div>
            <p>{new Date(shop.date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Dropdown */}
        <div className="relative z-20" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="p-2 rounded hover:bg-[#F2F2F2] transition-colors duration-300"
          >
            <MoreHorizontal size={18} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 p-1 w-[130px] bg-[#F9F9F9] border border-[#ECECEC] rounded-[5px] shadow-md z-30 text-[13px]">
              <button
                onClick={handleEditClick}
                className="w-full text-left pt-[5px] pb-[3px] px-3 hover:bg-[#F0F0F0] rounded-[5px] mb-1"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete()
                  setDropdownOpen(false)
                }}
                className="w-full text-left pt-[5px] pb-[3px] px-3 hover:bg-[#F0F0F0] text-red-500 rounded-[5px]"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <ShopEditModal
          open={showModal}
          shop={shop}
          onCancel={() => setShowModal(false)}
          onSave={(updated) => {
            onSave(updated)
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}

export default ShopItem
