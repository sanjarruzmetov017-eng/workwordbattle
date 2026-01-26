
import React from 'react';
import { GameMode, View, UserStats } from '../types';

interface DashboardProps {
  stats: UserStats;
  onStartGame: (mode: GameMode) => void;
  onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onStartGame, onNavigate }) => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex gap-4">
        <div className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 flex justify-between items-center relative overflow-hidden group">
          <div className="relative z-10">
            <div className="text-3xl font-black mb-1">1 Days</div>
            <div className="text-sm opacity-80">Keep the streak alive!</div>
          </div>
          <div className="text-6xl opacity-20 absolute -right-2 top-0 transform -rotate-12 transition group-hover:rotate-0">🔥</div>
        </div>
        
        <div className="flex-[2] bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl p-6 flex justify-between items-center group relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-2xl font-black mb-1">Go Premium</div>
            <div className="text-sm opacity-80">No ads, unlimited analysis, and more.</div>
          </div>
          <button className="relative z-10 px-6 py-2 bg-white text-purple-700 font-bold rounded-lg hover:shadow-xl transition-all active:scale-95">Upgrade</button>
          <div className="text-8xl opacity-10 absolute -right-4 top-0 transform rotate-12">💎</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Game Selector */}
          <div className="bg-[#242424] rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-black mb-2">Play Word Battle</h2>
            <p className="text-gray-400 mb-10">Test your vocabulary against players from around the world.</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <ModeButton 
                title="Bullet" 
                time="1 min" 
                icon="⚡" 
                onClick={() => onStartGame(GameMode.BULLET)} 
              />
              <ModeButton 
                title="Blitz" 
                time="3 min" 
                icon="🔥" 
                popular 
                onClick={() => onStartGame(GameMode.BLITZ)} 
              />
              <ModeButton 
                title="Rapid" 
                time="10 min" 
                icon="⏱️" 
                onClick={() => onStartGame(GameMode.RAPID)} 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onStartGame(GameMode.COMPUTER)}
                className="flex items-center justify-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition"
              >
                <span>🤖</span>
                <span className="font-bold">Vs Computer</span>
              </button>
              <button 
                onClick={() => onStartGame(GameMode.FRIEND)}
                className="flex items-center justify-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition"
              >
                <span>🤝</span>
                <span className="font-bold">Play a Friend</span>
              </button>
            </div>
          </div>

          {/* Learn & Improve Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Learn & Improve</h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="col-span-2 bg-[#2a2a2a] p-6 rounded-2xl border-l-4 border-green-500 group cursor-pointer hover:bg-[#323232] transition">
                 <div className="text-xs text-green-500 font-bold mb-2">WORD OF THE DAY</div>
                 <div className="text-3xl font-black mb-1">Ephemeral</div>
                 <div className="text-gray-400 italic mb-4">"Lasting for a very short time."</div>
                 <div className="text-xs text-gray-500">Example: Fashions are ephemeral, changing with every season.</div>
               </div>
               <div className="bg-[#2a2a2a] p-6 rounded-2xl hover:bg-[#323232] transition cursor-pointer">
                 <div className="text-2xl mb-2">🧩</div>
                 <div className="font-bold">Daily Puzzle</div>
                 <div className="text-sm text-gray-500">Solve today's word chain challenge.</div>
               </div>
               <div className="bg-[#2a2a2a] p-6 rounded-2xl hover:bg-[#323232] transition cursor-pointer">
                 <div className="text-2xl mb-2">🤖</div>
                 <div className="font-bold">Practice with Bot</div>
                 <div className="text-sm text-gray-500">Unrated practice match with bot level 1-10.</div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-[#242424] rounded-2xl p-6">
             <div className="flex items-center justify-between mb-6">
               <div className="flex items-center space-x-3">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xl">👤</div>
                 <div>
                   <div className="font-black text-lg">Player_One</div>
                   <div className="text-xs text-green-500 font-bold">● ONLINE</div>
                 </div>
               </div>
               <button onClick={() => onNavigate(View.SETTINGS)} className="text-gray-500 hover:text-white">⚙️</button>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="bg-[#1e1e1e] p-4 rounded-xl text-center">
                 <div className="text-xs text-gray-500 mb-1">BLITZ ELO</div>
                 <div className="text-xl font-black text-green-500">{stats.elo}</div>
               </div>
               <div className="bg-[#1e1e1e] p-4 rounded-xl text-center">
                 <div className="text-xs text-gray-500 mb-1">RANKING</div>
                 <div className="text-xl font-black">#1,245</div>
               </div>
             </div>

             <div className="flex justify-between items-center text-sm mb-4">
               <div className="text-gray-500">Record</div>
               <div className="flex space-x-2 font-mono">
                 <span className="text-green-500">{stats.wins}W</span>
                 <span className="text-red-500">{stats.losses}L</span>
                 <span className="text-gray-400">{stats.draws}D</span>
               </div>
             </div>

             <div className="h-2 bg-gray-800 rounded-full w-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${(stats.wins / (stats.wins + stats.losses + stats.draws)) * 100}%` }}></div>
             </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-600/30 rounded-2xl p-6">
            <h4 className="font-bold mb-2">Daily Puzzle</h4>
            <p className="text-sm text-gray-400 mb-4">Find 5 words starting with "-TION"</p>
            <button className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-black rounded-xl transition">Solve Now</button>
          </div>

          <div className="bg-[#242424] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold">Latest News</h4>
              <span className="text-xs text-gray-500">Today</span>
            </div>
            <div className="flex space-x-3 items-start group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500 shrink-0">⚔️</div>
              <div>
                <div className="text-sm font-bold group-hover:text-green-500 transition">Season 5 Starts Now!</div>
                <div className="text-xs text-gray-500">New badges, reset leaderboards and cash prizes.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModeButton: React.FC<{ title: string, time: string, icon: string, popular?: boolean, onClick: () => void }> = ({ title, time, icon, popular, onClick }) => (
  <button 
    onClick={onClick}
    className="relative bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl transition group flex flex-col items-center border-2 border-transparent hover:border-green-500/50"
  >
    {popular && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-[10px] font-black px-2 py-1 rounded text-white shadow-lg">POPULAR</div>
    )}
    <div className="text-3xl mb-3 transform group-hover:scale-110 transition">{icon}</div>
    <div className="font-black text-lg">{title}</div>
    <div className="text-xs text-gray-500">{time}</div>
  </button>
);

export default Dashboard;
