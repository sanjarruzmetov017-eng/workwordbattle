
import React, { useState } from 'react';

interface AuthViewProps {
  onBack: () => void;
  onSuccess: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onBack, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Avtorizatsiyani simulyatsiya qilish
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="auth-container">
      {/* Chiqish tugmasi (Back to Landing) */}
      <button 
        onClick={onBack}
        className="absolute top-10 left-10 text-white/50 hover:text-white transition-all font-bold text-[10px] uppercase tracking-[0.4em] flex items-center gap-4 z-50 group"
      >
        <span className="text-xl group-hover:-translate-x-2 transition-transform">←</span> 
        <span>Exit Terminal</span>
      </button>

      {/* Aylanuvchi "Square" konteyneri */}
      <div className="square">
        {/* Uchta rangli qatlamlar: Qizil, Yashil, Sariq */}
        <i></i>
        <i></i>
        <i></i>

        {/* Forma qismi */}
        <div className="login-inner animate-in fade-in zoom-in duration-500">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Connecting...</p>
            </div>
          ) : (
            <>
              <h2 className="mb-2">{isLogin ? 'Login' : 'Register'}</h2>
              
              <form onSubmit={handleSubmit} className="w-full space-y-3">
                <div className="inputBx">
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </div>

                {!isLogin && (
                  <div className="inputBx animate-in fade-in slide-in-from-top-2 duration-300">
                    <input 
                      type="email" 
                      placeholder="Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                )}

                <div className="inputBx">
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>

                <div className="inputBx">
                  <input 
                    type="submit" 
                    value={isLogin ? 'Sign in' : 'Register'} 
                  />
                </div>
              </form>

              <div className="links">
                <a href="#" onClick={(e) => e.preventDefault()}>Forget Password</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
                  {isLogin ? "Register" : "Login"}
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Versiya ma'lumoti */}
      <div className="absolute bottom-10 w-full text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20">
          Secure Core Protocol // v5.0.3
        </p>
      </div>
    </div>
  );
};

export default AuthView;
