import React, { useState } from "react"
import { useRouter } from "next/navigation"

interface ProfileInfoProps {
  user: any
  updateProfile: (fields: Partial<any>) => Promise<any>
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, updateProfile }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [nameInput, setNameInput] = useState(user?.name || "")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [avatarError, setAvatarError] = useState("")
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter()

  React.useEffect(() => {
    setNameInput(user?.name || "")
  }, [user, modalOpen])

  const handleEditName = () => {
    setModalOpen(true)
    setError("")
  }
  const handleCancelEdit = () => {
    setModalOpen(false)
    setNameInput(user?.name || "")
    setError("")
  }
  const handleSaveName = async () => {
    setSaving(true)
    setError("")
    try {
      await updateProfile({ name: nameInput })
      setModalOpen(false)
    } catch (e: any) {
      setError(e.message || "Failed to update name")
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarButtonClick = () => {
    if (!avatarUploading && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarUploading(true)
    setAvatarError("")
    try {
      const formData = new FormData()
      formData.append("avatar", file)
      await updateProfile(formData)
    } catch (e: any) {
      setAvatarError(e.message || "Failed to upload avatar")
    } finally {
      setAvatarUploading(false)
      e.target.value = "" // reset input
    }
  }

  return (
    <div className="flex flex-col gap-1">
      {/* Change Avatar Button (placeholder) */}
      <div className="container h-[69px] flex justify-between items-center">
        <p className="text-[13px]">Change your avatar</p>
        <>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            disabled={avatarUploading}
          />
          <button
            className="button cursor-pointer"
            type="button"
            onClick={handleAvatarButtonClick}
            disabled={avatarUploading}
          >
            {avatarUploading ? "Uploading..." : "Browse"}
          </button>
        </>
      </div>

      <div className="container flex flex-col items-center relative">
        {/* Edit button absolutely positioned in parent */}
        <button
          type="button"
          onClick={handleEditName}
          className="absolute top-5 right-5 button cursor-pointer rounded-[5px]"
          title="Edit Name"
        >
          Edit
        </button>
        {/* ProfileInfo list */}
        <div className="w-full grid grid-cols-[114px_1fr] gap-y-1 text-[13px]">
          <div className="font-semibold text-[#444] flex items-center gap-2">
            Name
          </div>
          <div className="subtext">{user.name}</div>
          <div className="font-semibold text-[#444]">Email</div>
          <div className="subtext">{user.email}</div>
          <div className="font-semibold text-[#444]">Premium Status</div>
          <div className={`subtext ${user.is_premium ? "text-black" : ""}`}>
            {user.is_premium ? "Active" : "Inactive"}
          </div>
          {user.created_at && (
            <>
              <div className="font-semibold text-[#444]">Member Since</div>
              <div className="subtext">
                {new Date(user.created_at).toLocaleDateString()}
              </div>
            </>
          )}
        </div>
        {/* Modal for editing name */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="bg-white rounded-[5px] shadow-lg p-6 w-full max-w-xs flex flex-col gap-3">
              <h2 className="text-lg font-semibold mb-2">Edit Name</h2>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="input input-bordered input-sm focus:text-black rounded-[5px]"
                disabled={saving}
              />
              {error && (
                <div className="text-xs text-red-500 mt-1">{error}</div>
              )}
              <div className="flex gap-2 justify-end mt-2">
                <button
                  onClick={handleCancelEdit}
                  className="button px-2 py-1 text-xs cursor-pointer rounded-[5px]"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveName}
                  className="button-brown px-2 py-1 text-xs cursor-pointer rounded-[5px]"
                  disabled={
                    saving ||
                    !nameInput.trim() ||
                    nameInput.trim() === user.name
                  }
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
