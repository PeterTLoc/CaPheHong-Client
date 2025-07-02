"use client"

import { createContext, useContext, useState } from "react"

const DashboardTitleContext = createContext<{
  title: string
  setTitle: (title: string) => void
}>({
  title: "",
  setTitle: () => {},
})

export const DashboardTitleProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [title, setTitle] = useState("")

  return (
    <DashboardTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </DashboardTitleContext.Provider>
  )
}

export const useDashboardTitle = () => useContext(DashboardTitleContext)
