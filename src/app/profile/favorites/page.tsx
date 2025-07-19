import Breadcrumb from '@/components/ui/BreadCrumb'
import React from 'react'

const page = () => {
  return (
    <div>
      <Breadcrumb items={[{ label: "Favorites" }]} />
      <div>Coming soon</div>
    </div>
  )
}

export default page