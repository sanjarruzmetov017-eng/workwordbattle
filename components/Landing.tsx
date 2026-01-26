
import React from 'react';
import { View } from '../types';

interface LandingProps {
  onNavigate: (view: View) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111]">
      <div className="relative overflow-hidden pt-20 pb-40 px-6">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-900/10 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold mb-6 tracking-wider">
              NEW: SEASON 5 IS LIVE!
            </div>
            <h1 className="text-6xl font-black mb-6 leading-tight">
              Battle with <br />
              <span className="text-green-500">Words</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-lg mb-10 leading-relaxed">
              The ultimate real-time word strategy game. Challenge friends, climb the global leaderboards, and improve your vocabulary.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => onNavigate(View.AUTH)}
                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl transition-all transform hover:scale-105"
              >
                Play Now - It's Free
              </button>
              <button 
                onClick={() => onNavigate(View.AUTH)}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all"
              >
                Log In
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-green-500/20 rounded-3xl blur-2xl transition group-hover:bg-green-500/30"></div>
            <div className="relative bg-[#1e1e1e] rounded-2xl border border-gray-800 p-8 shadow-2xl">
              <div className="flex justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                  <div>
                    <div className="text-sm font-bold">You</div>
                    <div className="text-[10px] text-gray-500">ELO 1200</div>
                  </div>
                </div>
                <div className="text-2xl font-mono text-green-400">2:45</div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-bold">GrandMaster</div>
                    <div className="text-[10px] text-gray-500">ELO 2800</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-500"></div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex">
                  <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm font-medium border border-green-500/30">Dream</div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium">Word</div>
                </div>
                <div className="flex">
                  <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm font-medium border border-green-500/30">Cloud</div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium">Music</div>
                </div>
              </div>

              <div className="h-1 bg-gray-800 rounded-full w-full overflow-hidden">
                <div className="h-full bg-green-500 w-[60%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0c0c0c] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">Why Play Word Battle?</h2>
            <p className="text-gray-500">More than just a game. It's a mental workout.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="⚡" 
              title="Real-time PvP" 
              desc="Play against real people in 1v1 battles. No turn-based waiting." 
            />
            <FeatureCard 
              icon="🏆" 
              title="Tournaments" 
              desc="Join daily and weekly tournaments to win exclusive badges and prizes." 
            />
            <FeatureCard 
              icon="📈" 
              title="Advanced Stats" 
              desc="Track your progress, analyze your games, and improve your ELO." 
            />
            <FeatureCard 
              icon="🤖" 
              title="Smart Bots" 
              desc="Train against AI with adaptive difficulty levels." 
            />
            <FeatureCard 
              icon="🌍" 
              title="Global Community" 
              desc="Chat, make friends, and compete with players worldwide." 
            />
            <FeatureCard 
              icon="📱" 
              title="Cross-Platform" 
              desc="Play on your phone, tablet, or desktop. Your data syncs everywhere." 
            />
          </div>

          <div className="mt-24 text-center">
            <h3 className="text-3xl font-black mb-8">Ready to join the battle?</h3>
            <button 
              onClick={() => onNavigate(View.AUTH)}
              className="px-12 py-4 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-all"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </div>

      <footer className="py-12 px-6 border-t border-gray-900 text-center">
        <p className="text-gray-600 text-sm mb-4">&copy; 2024 Word Battle. All rights reserved.</p>
        <div className="flex justify-center space-x-6 text-gray-500 text-xs">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="p-8 bg-[#1e1e1e] rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all group">
    <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
