import { Home, Wallet, Send, PieChart, User } from 'lucide-react'

const Navigation = () => {
  return (
    <nav className="fixed bottom-6 left-4 right-4 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-4 z-50 rounded-[30px] shadow-2xl mx-auto max-w-xl">
      <div className="flex items-center justify-between relative">
        {/* Home */}
        <button className="flex flex-col items-center gap-1">
          <Home size={24} className="text-black dark:text-white/70" />
          <span className="text-xs text-black dark:text-white/70">Home</span>
        </button>

        {/* Accounts */}
        <button className="flex flex-col items-center gap-1">
          <Wallet size={24} className="text-black dark:text-white/70" />
          <span className="text-xs text-black dark:text-white/70">Accounts</span>
        </button>

        {/* Spacer for center button */}
        <div className="w-20"></div>

        {/* Center Send Button */}
        <button className="absolute left-1/2 -translate-x-1/2 -top-8 w-20 h-20 rounded-full bg-white flex items-center justify-center">
          <Send size={28} className="text-black" fill="white" color='black' />
        </button>

        {/* Statistics */}
        <button className="flex flex-col items-center gap-1">
          <PieChart size={24} className="text-black dark:text-white/70" />
          <span className="text-xs text-black dark:text-white/70">Statistics</span>
        </button>

        {/* Profile */}
        <button className="flex flex-col items-center gap-1">
          <User size={24} className="text-black dark:text-white/70" />
          <span className="text-xs text-black dark:text-white/70">Profile</span>
        </button>
      </div>
    </nav>
  )
}

export default Navigation
