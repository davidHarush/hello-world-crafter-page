import React from 'react'

export interface AppHeaderProps {
  showBack?: boolean
  rightContent?: React.ReactNode
}

const AppHeader = ({ showBack, rightContent }: AppHeaderProps) => (
  <header className="h-16 bg-[#1A1A1A] border-b border-[#2A2A2A] px-6 flex items-center justify-between">
    <div>
      {showBack && (
        <button
          onClick={() => window.history.back()}
          className="text-sm text-gray-300 hover:text-white"
        >
          ← Back
        </button>
      )}
    </div>
    <div className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
      PostCrafter
    </div>
    <div>{rightContent}</div>
  </header>
)

export default AppHeader
