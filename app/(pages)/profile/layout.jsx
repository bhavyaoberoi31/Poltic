import ProfileSidebar from '@/app/component/ProfileSidebar'
import UserProfile from '@/app/component/USerProfile'
import React from 'react'

function Page({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-2 sm:px-4 py-4 sm:py-8">
        {/* Profile Header */}
        <div className=" p-4 sm:p-6 lg:p-8 mb-4 sm:mb-8">
          <UserProfile />
        </div>

        {/* Sidebar (as top horizontal menu on mobile, sticky sidebar on desktop) */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          
          {/* Sidebar for desktop, horizontal bar for mobile */}
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-80 order-1">
            <div className="lg:sticky lg:top-8">
              <ProfileSidebar />
            </div>
          </div>
          

          {/* Content Area */}
          <div className="flex-1 order-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 min-h-[400px] sm:min-h-[600px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
