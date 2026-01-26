
import React, { useState } from 'react';
import { View, GameMode, UserStats } from './types';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import GameView from './components/GameView';
import Sidebar from './components/Sidebar';
import AuthView from './components/AuthView';
import DailyBonusModal from './components/DailyBonusModal';
import Leaderboard from './components/Leaderboard';
import Shop from './components/Shop';
import Profile from './components/Profile';
import Achievements from './components/Achievements';
import Settings from './components/Settings';
import Puzzles from './components/Puzzles';
import Learn from './components/Learn';
import Social from './components/Social';
import Premium from './components/Premium';
import Support from './components/Support';
import Notifications from './components/Notifications';
import ThemeView from './components/ThemeView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDailyBonus, setShowDailyBonus] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode | null>(null);
  const [stats, setStats] = useState<UserStats>({
    elo: 1200,
    wins: 12,
    losses: 8,
    draws: 2,
    streak: 1,
    coins: 250
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView(View.DASHBOARD);
    setShowDailyBonus(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView(View.LANDING);
    setSelectedGameMode(null);
  };

  const startGame = (mode: GameMode) => {
    setSelectedGameMode(mode);
    setCurrentView(View.GAME);
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {isLoggedIn && currentView !== View.LANDING && currentView !== View.GAME && currentView !== View.AUTH && (
        <Sidebar 
          currentView={currentView} 
          onNavigate={navigateTo} 
          onLogout={handleLogout}
          stats={stats} 
        />
      )}
      
      <main className="flex-1 overflow-y-auto">
        {currentView === View.LANDING && (
          <Landing 
            onNavigate={navigateTo}
          />
        )}

        {currentView === View.AUTH && (
          <AuthView 
            onBack={() => navigateTo(View.LANDING)} 
            onSuccess={handleLogin} 
          />
        )}
        
        {currentView === View.DASHBOARD && (
          <Dashboard 
            stats={stats} 
            onStartGame={startGame} 
            onNavigate={navigateTo}
          />
        )}
        
        {currentView === View.GAME && selectedGameMode && (
          <GameView 
            mode={selectedGameMode} 
            onBack={() => navigateTo(View.DASHBOARD)} 
            onUpdateStats={(s) => setStats(prev => ({ ...prev, ...s }))}
          />
        )}

        {currentView === View.PUZZLES && <Puzzles />}
        {currentView === View.LEARN && <Learn />}
        {currentView === View.TOURNAMENTS && <Leaderboard onJoinArena={() => startGame(GameMode.BLITZ)} />}
        {currentView === View.SOCIAL && <Social onChallenge={() => startGame(GameMode.FRIEND)} />}
        {currentView === View.PROFILE && <Profile stats={stats} />}
        {currentView === View.SHOP && <Shop stats={stats} onUpdateStats={(s) => setStats(prev => ({ ...prev, ...s }))} />}
        {currentView === View.ACHIEVEMENTS && <Achievements />}
        {currentView === View.SETTINGS && <Settings />}
        {currentView === View.PREMIUM && <Premium />}
        {currentView === View.SUPPORT && <Support />}
        {currentView === View.NOTIFICATIONS && <Notifications />}
        {currentView === View.THEME && <ThemeView />}
      </main>

      {showDailyBonus && (
        <DailyBonusModal 
          onClose={() => setShowDailyBonus(false)} 
          onClaim={(amount) => setStats(prev => ({ ...prev, coins: prev.coins + amount }))}
        />
      )}
    </div>
  );
};

export default App;
