
import React, { useState } from 'react';

interface AuthViewProps {
  onBack: () => void;
  onSuccess: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onBack, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  const handleSocialLogin = (provider: string) => {
    setSocialLoading(provider);
    // Simulyatsiya: 1.5 soniyadan so'ng dashboardga o'tish
    setTimeout(() => {
      setSocialLoading(null);
      onSuccess();
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen cube-grid flex flex-col relative">
      {/* Back Button */}
      <button 
        onClick={onBack}
        disabled={!!socialLoading}
        className="absolute top-8 left-8 flex items-center space-x-2 text-gray-400 hover:text-white transition font-bold text-sm z-10 disabled:opacity-30"
      >
        <span>←</span>
        <span>Back</span>
      </button>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-[#1e1e1e]/95 backdrop-blur-md w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl border border-gray-800 relative overflow-hidden">
          
          {/* Social Login Loading Overlay */}
          {socialLoading && (
            <div className="absolute inset-0 bg-[#1e1e1e]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in duration-200">
               <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="text-white font-black text-sm uppercase tracking-widest animate-pulse">
                 Connecting to {socialLoading}...
               </p>
            </div>
          )}

          <div className="text-center mb-8">
            <div className="inline-block mb-2">
               <span className="text-5xl">⚔️</span>
            </div>
            <h2 className="text-4xl font-black mb-1 text-white">Word Battle</h2>
            <p className="text-gray-500 text-sm">Master the words. Conquer the world.</p>
          </div>

          {/* Social Logins */}
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => handleSocialLogin('Google')}
              className="flex-1 py-3 bg-white hover:bg-gray-100 rounded-xl transition flex items-center justify-center shadow-md active:scale-95 group"
            >
               <span className="text-xl text-sky-500 font-bold group-hover:scale-110 transition">G</span>
            </button>
            <button 
              onClick={() => handleSocialLogin('Facebook')}
              className="flex-1 py-3 bg-[#1877F2] hover:bg-[#166fe5] rounded-xl transition flex items-center justify-center shadow-md text-white font-bold text-xl active:scale-95 group"
            >
               <span className="group-hover:scale-110 transition">f</span>
            </button>
            <button 
              onClick={() => handleSocialLogin('X')}
              className="flex-1 py-3 bg-black hover:bg-gray-900 rounded-xl transition border border-gray-800 flex items-center justify-center shadow-md active:scale-95 group"
            >
               <span className="text-xl text-white font-mono group-hover:scale-110 transition">𝕏</span>
            </button>
          </div>

          <div className="relative mb-8 text-center">
             <hr className="border-gray-800" />
             <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e1e1e] px-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">Or continue with email</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2 px-1">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full bg-[#161616] border border-gray-800 rounded-xl px-4 py-4 text-sm text-white outline-none focus:border-green-500/50 transition shadow-inner"
                  required
                />
              </div>
            )}
            
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2 px-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#161616] border border-gray-800 rounded-xl px-4 py-4 text-sm text-white outline-none focus:border-green-500/50 transition shadow-inner"
                required
              />
            </div>
            
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2 px-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#161616] border border-gray-800 rounded-xl px-4 py-4 pr-12 text-sm text-white outline-none focus:border-green-500/50 transition shadow-inner"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.6} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.6} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-[#8cc63f] hover:bg-[#7db338] text-white font-black rounded-2xl transition transform active:scale-95 shadow-lg shadow-green-900/20 mt-4 text-lg">
              {isLogin ? 'Log In' : 'Join Now'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-white font-bold hover:underline"
              >
                {isLogin ? 'Join Now' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
