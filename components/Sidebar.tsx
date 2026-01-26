
import React from 'react';
import { View, UserStats } from '../types';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  stats: UserStats;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onLogout, stats }) => {
  const primaryItems = [
    { id: View.DASHBOARD, label: 'Play', icon: '🎮' },
    { id: View.PUZZLES, label: 'Puzzles', icon: '🧩' },
    { id: View.LEARN, label: 'Learn', icon: '🎓' },
    { id: View.TOURNAMENTS, label: 'Tournaments', icon: '🏆' },
    { id: View.SOCIAL, label: 'Social', icon: '👥' },
    { id: View.PROFILE, label: 'Profile', icon: '👤' },
    { id: View.SHOP, label: 'Store', icon: '🛒' },
    { id: View.ACHIEVEMENTS, label: 'Awards', icon: '🏅' },
    { id: View.SETTINGS, label: 'Settings', icon: '⚙️' },
    { id: View.PREMIUM, label: 'Premium', icon: '💎' },
  ];

  const secondaryItems = [
    { id: View.SUPPORT, label: 'Support', icon: '💬' },
    { id: View.NOTIFICATIONS, label: 'Notifications', icon: '🔔', badge: 1 },
    { id: View.THEME, label: 'Theme', icon: '☀️' },
  ];

  const handleLogout = () => {
    onLogout();
  };

  const NavButton = ({ item }: { item: any }) => {
    const isActive = currentView === item.id || (item.id === View.DASHBOARD && currentView === View.GAME);
    
    return (
      <button
        key={item.id}
        onClick={() => onNavigate(item.id)}
        className={`w-full flex items-center group relative px-4 py-2.5 transition-all duration-200 ${
          isActive 
            ? 'bg-[#313131] border-l-4 border-[#8cc63f]' 
            : 'text-gray-400 hover:bg-[#252525] border-l-4 border-transparent'
        }`}
      >
        <span className={`text-xl mr-3 ${isActive ? '' : 'opacity-70 group-hover:opacity-100'}`}>
          {item.icon}
        </span>
        <span className={`font-bold text-sm tracking-wide ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
          {item.label}
        </span>
        {item.badge && (
          <span className="ml-auto bg-red-500 text-white text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="w-60 bg-[#1a1a1a] flex flex-col h-screen sticky top-0 border-r border-black/20">
      {/* Logo Area */}
      <div className="p-5 flex items-center space-x-3 mb-2">
        <span className="text-3xl">⚔️</span>
        <div className="flex flex-col">
          <span className="font-black text-white text-lg leading-tight uppercase tracking-tight">Word</span>
          <span className="font-black text-white text-lg leading-tight uppercase tracking-tight">Battle</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto no-scrollbar">
        <div className="space-y-0.5">
          {primaryItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </div>

        {/* Spacer */}
        <div className="h-20"></div>

        {/* Bottom Navigation */}
        <div className="space-y-0.5 mb-6">
          {secondaryItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center group px-4 py-2.5 text-gray-400 hover:bg-[#252525] border-l-4 border-transparent transition-all"
          >
            <span className="text-xl mr-3 opacity-70 group-hover:opacity-100">🚪</span>
            <span className="font-bold text-sm tracking-wide group-hover:text-gray-200">Log Out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
