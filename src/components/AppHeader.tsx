import React from 'react'

export interface AppHeaderProps {
  showBack?: boolean
  rightContent?: React.ReactNode
}

const AppHeader = ({ showBack, rightContent }: AppHeaderProps) => (
  <header className="h-16 bg-[#1A1A1A] border-b border-[#2A2A2A]">
    <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-full">
      <div className="w-[80px] sm:w-[120px] flex items-center">
        {showBack && (
          <button
            onClick={() => window.history.back()}
            className="text-sm text-gray-300 hover:text-white"
          >
            ← Back
          </button>
        )}
      </div>
      <div className="flex-1 text-center">
        <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          PostCrafter
        </span>
      </div>
      <div className="flex justify-end w-[80px] sm:w-[120px]">{rightContent}</div>
    </div>
  </header>
)

export default AppHeader
