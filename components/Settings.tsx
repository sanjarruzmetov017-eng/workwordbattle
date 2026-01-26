import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [username, setUsername] = useState('Player_One');
  const [bio, setBio] = useState('Ready to battle!');
  const [avatar, setAvatar] = useState('👽');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const tabs = [
    { id: 'Profile', label: 'Profile', icon: '👤' },
    { id: 'Account', label: 'Account & Security', icon: '🔒' },
    { id: 'Privacy', label: 'Privacy', icon: '👁️' },
    { id: 'Preferences', label: 'Preferences', icon: '⚙️' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API save
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const changeAvatar = () => {
    const emojis = ['👽', '🤖', '👾', '👻', '🤡', '🦊', '🦁', '🦉', '🥷'];
    const currentIdx = emojis.indexOf(avatar);
    const nextIdx = (currentIdx + 1) % emojis.length;
    setAvatar(emojis[nextIdx]);
  };

  return (
    <div className="p-10 max-w-5xl mx-auto min-h-screen">
      <h2 className="text-4xl font-black mb-12 text-white">Settings</h2>

      <div className="grid md:grid-cols-[280px_1fr] gap-10">
        {/* Sidebar Navigation */}
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-5 py-4 rounded-xl font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#8cc63f] text-black shadow-lg shadow-green-900/10'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-sm tracking-wide">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Main Content Area */}
        <div className="bg-[#242424] rounded-3xl p-10 border border-white/5 shadow-2xl relative overflow-hidden">
          {activeTab === 'Profile' ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-black text-white mb-8">Edit Profile</h3>
              
              <div className="space-y-10">
                {/* Avatar Section */}
                <div className="flex items-center space-x-8">
                  <div className="relative group">
                    <div className="w-24 h-24 bg-[#1a1a1a] rounded-full flex items-center justify-center text-4xl border-2 border-[#8cc63f] shadow-lg shadow-green-500/10">
                      {avatar}
                    </div>
                  </div>
                  <button 
                    onClick={changeAvatar}
                    className="px-5 py-2.5 bg-[#333] hover:bg-[#444] text-gray-200 rounded-xl text-sm font-bold transition-colors border border-white/5"
                  >
                    Change Avatar
                  </button>
                </div>

                {/* Input Fields */}
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] block mb-3 px-1">Username</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-6 py-4 text-white font-bold outline-none focus:border-[#8cc63f]/50 transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] block mb-3 px-1">Bio</label>
                    <textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-6 py-4 text-white font-bold outline-none focus:border-[#8cc63f]/50 transition-all resize-none shadow-inner"
                    ></textarea>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-between pt-4">
                  <div className={`transition-opacity duration-300 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-[#8cc63f] font-bold text-sm flex items-center">
                      <span className="mr-2">✓</span> Changes saved successfully!
                    </span>
                  </div>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-10 py-4 bg-[#8cc63f] hover:bg-[#7db338] text-black font-black rounded-xl transition-all transform active:scale-95 shadow-xl shadow-green-900/20 disabled:opacity-50 min-w-[180px] flex items-center justify-center"
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40 animate-in fade-in duration-500">
               <div className="text-6xl mb-6">🛠️</div>
               <h3 className="text-2xl font-black text-white">{activeTab} coming soon</h3>
               <p className="text-gray-500 max-w-xs mt-2">This section is currently being updated for the new season.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;