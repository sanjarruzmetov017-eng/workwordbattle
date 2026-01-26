
import React, { useState, useEffect, useRef } from 'react';
import { GameMode, WordEntry } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface GameViewProps {
  mode: GameMode;
  onBack: () => void;
  onUpdateStats: (s: any) => void;
}

interface ExtendedWordEntry extends WordEntry {
  level?: string;
}

const GameView: React.FC<GameViewProps> = ({ mode, onBack, onUpdateStats }) => {
  const [words, setWords] = useState<ExtendedWordEntry[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [opponentTime, setOpponentTime] = useState(60);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const [isFetchingHint, setIsFetchingHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showResignConfirm, setShowResignConfirm] = useState(false);
  
  const timerRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const MODEL_NAME = 'gemini-3-flash-preview';

  // Taymer mantiqi
  useEffect(() => {
    if (!gameOver && !showResignConfirm) {
      timerRef.current = setInterval(() => {
        if (isMyTurn) {
          setTimeLeft(t => t > 0 ? t - 1 : (handleGameOver('Bot (Level 1)'), 0));
        } else {
          setOpponentTime(t => t > 0 ? t - 1 : (handleGameOver('You'), 0));
        }
      }, 1000);
    }
    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isMyTurn, gameOver, showResignConfirm]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [words]);

  const handleGameOver = (winPlayer: string) => {
    setGameOver(true);
    setWinner(winPlayer);
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (winPlayer === 'You') {
      onUpdateStats({ wins: 1, elo: 15, coins: 50 });
    } else {
      onUpdateStats({ losses: 1, elo: -10 });
    }
  };

  const getAIResponse = async (lastWord: string) => {
    const lastChar = lastWord[lastWord.length - 1];
    const usedWords = words.map(w => w.word).join(', ');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `Word Chain Game: Previous word was "${lastWord}". Give me ONE valid English word starting with "${lastChar.toUpperCase()}". Do not use these words: ${usedWords}. Return JSON: {"word": string, "level": "A1-C2"}.`,
        config: { responseMimeType: "application/json" }
      });
      
      const cleanJson = response.text.replace(/```json|```/gi, '').trim();
      const data = JSON.parse(cleanJson);
      
      if (data.word) {
        setWords(prev => [...prev, {
          word: data.word.toLowerCase(),
          player: 'Bot (Level 1)',
          points: data.word.length * 10,
          timestamp: Date.now(),
          level: data.level || 'A2'
        }]);
        setIsMyTurn(true);
      }
    } catch (e) {
      console.error("AI Error:", e);
      const fallback: Record<string, string> = { a: 'apple', b: 'bear', c: 'cat', d: 'dog', e: 'egg', f: 'fish', g: 'goat', h: 'hat', i: 'ice', j: 'jump', k: 'key', l: 'look', m: 'make', n: 'near', o: 'open', p: 'play', r: 'run', s: 'stay', t: 'talk', u: 'under', v: 'view', w: 'work', y: 'yes', z: 'zero' };
      const word = fallback[lastChar] || lastChar + "ing";
      setWords(prev => [...prev, {
        word: word,
        player: 'Bot (Level 1)',
        points: 5,
        timestamp: Date.now(),
        level: 'A1'
      }]);
      setIsMyTurn(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMyTurn || !currentInput.trim() || gameOver || isValidating) return;

    const input = currentInput.trim().toLowerCase();
    
    if (words.length > 0) {
      const lastWord = words[words.length - 1].word;
      if (input[0] !== lastWord[lastWord.length - 1]) {
        setErrorMsg(`"${lastWord[lastWord.length - 1].toUpperCase()}" BILAN BOSHLANG!`);
        setTimeout(() => setErrorMsg(null), 2000);
        return;
      }
      if (words.some(w => w.word === input)) {
        setErrorMsg("BU SO'Z ISHLATILGAN!");
        setTimeout(() => setErrorMsg(null), 2000);
        return;
      }
    }

    setIsValidating(true);
    
    setWords(prev => [...prev, {
      word: input,
      player: 'You',
      points: input.length * 10,
      timestamp: Date.now(),
      level: input.length > 7 ? 'B2' : input.length > 5 ? 'B1' : 'A2'
    }]);
    
    setCurrentInput('');
    setIsMyTurn(false);
    setIsValidating(false);

    setTimeout(() => {
      if (!gameOver) getAIResponse(input);
    }, 1200);
  };

  const confirmResign = () => {
    setShowResignConfirm(false);
    handleGameOver('Bot (Level 1)');
  };

  const handleHint = async () => {
    if (!isMyTurn || gameOver || isFetchingHint) return;
    
    setIsFetchingHint(true);
    const lastWord = words.length > 0 ? words[words.length - 1].word : null;
    const startChar = lastWord ? lastWord[lastWord.length - 1] : 'a';
    const usedWords = words.map(w => w.word).join(', ');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `Give me a hint for word chain game starting with letter "${startChar.toUpperCase()}". Do not use these words: ${usedWords}. Return just the word.`,
      });
      
      const hint = response.text.trim().toLowerCase().split(' ')[0].replace(/[^a-z]/g, '');
      if (hint) setCurrentInput(hint);
    } catch (e) {
      console.error("Hint Error:", e);
    } finally {
      setIsFetchingHint(false);
    }
  };

  const handlePass = () => {
    if (!isMyTurn || words.length === 0 || gameOver) return;
    
    const confirmPass = window.confirm("Navbatingizni o'tkazib yuborasizmi? Bot navbatni oladi.");
    if (confirmPass) {
      setIsMyTurn(false);
      const lastWord = words[words.length - 1].word;
      getAIResponse(lastWord);
    }
  };

  return (
    <div className="h-screen bg-[#121212] text-white flex overflow-hidden font-sans">
      {/* Chap tomondagi asosiy o'yin maydoni */}
      <div className="flex-1 flex flex-col relative border-r border-white/5">
        
        {/* Opponent Header */}
        <div className="p-4 bg-[#1a1a1a] flex justify-between items-center border-b border-white/5 shadow-md z-30">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center text-2xl shadow-lg border border-white/5">🤖</div>
            <div>
              <div className="font-black text-sm flex items-center uppercase tracking-tighter">
                Bot (Level 1) <span className="ml-2 text-[10px] text-gray-500 font-bold">(1200)</span>
              </div>
              <div className="text-[10px] text-green-500 font-bold animate-pulse flex items-center">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span> ONLINE
              </div>
            </div>
          </div>
          <div className="text-3xl font-mono font-black text-gray-500 bg-black/20 px-4 py-1 rounded-lg">
            {Math.floor(opponentTime / 60)}:{String(opponentTime % 60).padStart(2, '0')}
          </div>
        </div>

        {/* Word History */}
        <div className="flex-1 relative overflow-hidden bg-[#161616]">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <div className="text-center">
               <div className="text-[180px] mb-4">📖</div>
               <div className="text-4xl font-black uppercase tracking-[1em]">Word Battle</div>
            </div>
          </div>
          
          <div className="p-4 text-center relative z-10">
             <span className="text-[10px] font-black text-gray-600 bg-white/5 px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/5">
               || Word Chain Mode - BULLET
             </span>
          </div>

          <div ref={scrollRef} className="h-full overflow-y-auto p-8 space-y-6 no-scrollbar pb-44 flex flex-col">
            {words.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-30 my-auto">
                <div className="text-7xl animate-bounce">✍️</div>
                <div className="text-white font-black uppercase tracking-[0.4em] text-xs">O'yinni boshlash uchun so'z yozing</div>
              </div>
            )}
            {words.map((w, i) => (
              <div key={i} className={`flex flex-col w-full ${w.player === 'You' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                <div className={`px-6 py-4 rounded-2xl text-2xl font-black shadow-xl flex items-center space-x-3 transition-all transform hover:scale-[1.02] ${
                  w.player === 'You' 
                    ? 'bg-[#8cc63f] text-black rounded-tr-none' 
                    : 'bg-[#2a2a2a] text-white border border-white/10 rounded-tl-none'
                }`}>
                  <span className="tracking-tight">{w.word}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-black ${w.player === 'You' ? 'bg-black/10' : 'bg-white/10 text-[#8cc63f]'}`}>
                    {w.level || 'A1'}
                  </span>
                </div>
                <div className="text-[10px] text-gray-600 font-black mt-2 uppercase tracking-widest px-2">
                  {w.points} pts • {w.player === 'You' ? 'Siz' : 'Bot'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input & Action Bar */}
        <div className="p-8 bg-[#1a1a1a] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20">
          {errorMsg && (
            <div className="absolute bottom-44 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-8 py-3 rounded-full z-50 shadow-2xl animate-in slide-in-from-bottom-2">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex space-x-4 mb-6 relative">
            <div className="relative flex-1">
              <input 
                autoFocus
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                placeholder={isMyTurn ? (words.length === 0 ? "O'yinni boshlang..." : "Navbatdagi so'zni yozing...") : "Bot o'ylamoqda..."}
                className={`w-full bg-black/40 border-2 rounded-xl px-8 py-5 text-2xl font-black outline-none transition-all ${
                  isMyTurn ? 'focus:border-[#8cc63f] border-[#8cc63f]/30 text-white' : 'border-transparent opacity-20 cursor-not-allowed text-gray-500'
                }`}
                disabled={!isMyTurn || isValidating || gameOver}
              />
              {isValidating && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                   <div className="w-6 h-6 border-4 border-[#8cc63f] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <button 
              type="submit"
              disabled={!isMyTurn || isValidating || currentInput.length < 2 || gameOver}
              className="px-12 bg-[#333] hover:bg-[#444] text-white font-black rounded-xl transition-all uppercase text-sm tracking-widest disabled:opacity-20 border border-white/5 active:scale-95 shadow-lg"
            >
              Enter
            </button>
          </form>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#2a2a2a] rounded-xl flex items-center justify-center text-2xl border border-white/5 shadow-inner">👤</div>
              <div>
                <div className="font-black text-xs text-gray-400 uppercase tracking-widest">Siz <span className="text-gray-600">(1230)</span></div>
                <div className={`text-2xl font-mono font-black ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-[#8cc63f]'}`}>
                   {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowResignConfirm(true)}
                disabled={gameOver}
                className="px-6 py-3 bg-[#251b1b] text-red-500 border border-red-500/20 rounded-xl font-black text-[10px] uppercase hover:bg-red-500 hover:text-white transition-all active:scale-95 disabled:opacity-20"
              >
                Resign
              </button>
              <button 
                onClick={handleHint}
                disabled={!isMyTurn || isFetchingHint || gameOver}
                className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase transition-all flex items-center space-x-2 active:scale-95 ${
                  isMyTurn ? 'bg-[#1b251b] text-[#8cc63f] border border-[#8cc63f]/20 hover:bg-[#8cc63f] hover:text-black' : 'bg-gray-800/50 text-gray-600 border border-transparent opacity-50 cursor-not-allowed'
                }`}
              >
                {isFetchingHint ? <div className="w-3 h-3 border-2 border-[#8cc63f] border-t-transparent rounded-full animate-spin"></div> : "Hint"}
              </button>
              <button 
                onClick={handlePass}
                disabled={!isMyTurn || words.length === 0 || gameOver}
                className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase transition-all active:scale-95 ${
                  (isMyTurn && words.length > 0) ? 'bg-[#2a2a2a] text-gray-400 border border-white/5 hover:text-white hover:bg-[#333]' : 'bg-gray-800/50 text-gray-700 opacity-50 cursor-not-allowed'
                }`}
              >
                Pass
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resign Confirmation Overlay */}
      {showResignConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-[#1e1e1e] p-10 rounded-[2.5rem] text-center border border-white/10 shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-200">
            <div className="text-6xl mb-6">🏳️</div>
            <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-tight">Taslim bo'lasizmi?</h3>
            <p className="text-gray-500 font-bold mb-8 uppercase tracking-widest text-xs">Bu o'yin sizning mag'lubiyatingiz bilan tugaydi.</p>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={confirmResign}
                className="w-full py-4 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all active:scale-95"
              >
                HA, TASLIM BO'LAMAN
              </button>
              <button 
                onClick={() => setShowResignConfirm(false)}
                className="w-full py-4 bg-[#333] text-gray-400 font-black rounded-xl hover:bg-[#444] transition-all active:scale-95"
              >
                YO'Q, DAVOM ETAMAN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center animate-in fade-in duration-500 p-6">
          <div className="bg-[#1e1e1e] p-16 rounded-[4rem] text-center border border-white/10 shadow-[0_0_100px_rgba(140,198,63,0.1)] max-w-sm w-full relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1.5 ${winner === 'You' ? 'bg-[#8cc63f]' : 'bg-red-600'}`}></div>
            <div className="text-[120px] mb-8 animate-bounce leading-none">{winner === 'You' ? '🏆' : '💀'}</div>
            <h2 className={`text-5xl font-black mb-3 tracking-tighter ${winner === 'You' ? 'text-[#8cc63f]' : 'text-red-500'}`}>
              {winner === 'You' ? 'G\'ALABA!' : 'MAG\'LUB'}
            </h2>
            <p className="text-gray-500 font-bold mb-12 uppercase tracking-[0.2em] text-sm">{words.length} ta so'z o'ynaldi</p>
            <div className="space-y-4">
              <button 
                onClick={onBack} 
                className="w-full py-5 bg-[#8cc63f] text-black font-black rounded-2xl hover:scale-105 transition-all shadow-2xl text-xl active:scale-95"
              >
                MENUGA QAYTISH
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Side Chat Panel */}
      <div className="w-80 bg-[#1a1a1a] flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-white/5 flex space-x-8">
           <button className="font-black text-xs uppercase tracking-[0.2em] border-b-2 border-[#8cc63f] pb-2">Chat</button>
           <button className="font-black text-xs uppercase tracking-[0.2em] text-gray-600 hover:text-white transition pb-2">Report</button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-4 no-scrollbar">
           <div className="text-[10px] font-black text-gray-700 text-center uppercase tracking-[0.3em] mb-8">Match Logs</div>
           <div className="text-[11px] text-gray-500 bg-white/5 p-4 rounded-xl border border-white/5 leading-relaxed">
              Match started! {words.length === 0 ? "O'yinni istalgan so'z bilan boshlang." : "Navbatdagi so'zni oxirgi harf bilan davom ettiring."}
           </div>
           {words.slice(-5).map((w, i) => (
             <div key={i} className="text-[10px] font-bold text-gray-600 border-l border-white/5 pl-3 py-1 animate-in fade-in">
                {w.player === 'You' ? 'Siz' : 'Bot'} o'ynadi <span className="text-gray-400">"{w.word}"</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default GameView;
