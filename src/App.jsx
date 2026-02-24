import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GAMES } from './constants';
import { SnakeGame } from './components/SnakeGame';
import { BreakoutGame } from './components/BreakoutGame';
import { Trophy, Gamepad2, X, Play, Info, ArrowRight } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameState, setGameState] = useState('idle');
  const [lastScore, setLastScore] = useState(0);

  const handlePlay = (game) => {
    setSelectedGame(game);
    setGameState('playing');
  };

  const handleGameOver = (score) => {
    setLastScore(score);
    setGameState('gameover');
  };

  const closeGame = () => {
    setSelectedGame(null);
    setGameState('idle');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Marquee Header */}
      <div className="bg-black text-white py-2 overflow-hidden border-b-2 border-black">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 font-display text-xl tracking-widest">
              ARCADE NOVA // UNBLOCKED GAMES // NO LIMITS // PLAY NOW // 
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center border-b-2 border-black bg-white sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-black p-2 rounded-sm">
            <Gamepad2 className="text-white w-8 h-8" />
          </div>
          <h1 className="font-display text-4xl tracking-tighter">ARCADE NOVA</h1>
        </div>
        <div className="hidden md:flex gap-8 font-mono text-sm font-bold uppercase">
          <a href="#" className="hover:underline decoration-4 underline-offset-4">Games</a>
          <a href="#" className="hover:underline decoration-4 underline-offset-4">High Scores</a>
          <a href="#" className="hover:underline decoration-4 underline-offset-4">About</a>
        </div>
        <button className="brutal-btn bg-yellow-300">
          LOGIN
        </button>
      </nav>

      <main className="flex-1 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-7xl md:text-9xl leading-none mb-6 uppercase">
              PLAY <span className="text-yellow-400 stroke-black stroke-2">FAST</span><br />
              DIE <span className="italic">HARD</span>
            </h2>
            <p className="font-mono text-lg mb-8 max-w-md">
              The ultimate destination for unblocked web games. No trackers, no ads, just pure arcade action.
            </p>
            <div className="flex gap-4">
              <button className="brutal-btn bg-black text-white px-8 py-4 text-xl">
                START PLAYING
              </button>
              <button className="brutal-btn px-8 py-4 text-xl">
                BROWSE ALL
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="brutal-card bg-emerald-400 rotate-3 absolute inset-0 -z-10"></div>
            <div className="brutal-card p-0 overflow-hidden aspect-video">
              <img 
                src="https://picsum.photos/seed/arcade/800/450" 
                alt="Featured Game" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white brutal-border p-4 flex justify-between items-center">
                <div>
                  <div className="text-xs font-mono font-bold uppercase opacity-50">Featured Game</div>
                  <div className="font-display text-2xl">CYBER DRIFT 2049</div>
                </div>
                <Play className="fill-black w-8 h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Game Grid */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h3 className="font-display text-5xl uppercase">Library</h3>
            <div className="font-mono text-sm font-bold uppercase flex gap-4">
              <span className="cursor-pointer hover:underline">All</span>
              <span className="opacity-30 cursor-pointer hover:underline">Action</span>
              <span className="opacity-30 cursor-pointer hover:underline">Puzzle</span>
              <span className="opacity-30 cursor-pointer hover:underline">Retro</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GAMES.map((game) => (
              <motion.div 
                key={game.id}
                whileHover={{ y: -8 }}
                className="brutal-card group cursor-pointer flex flex-col"
                onClick={() => handlePlay(game)}
              >
                <div className="aspect-square mb-4 brutal-border overflow-hidden relative">
                  <img 
                    src={game.thumbnail} 
                    alt={game.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-white brutal-border px-2 py-1 text-[10px] font-mono font-bold uppercase">
                    {game.category}
                  </div>
                </div>
                <h4 className="font-display text-2xl mb-2">{game.title}</h4>
                <p className="font-mono text-xs mb-4 flex-1 opacity-70">{game.description}</p>
                <button className="brutal-btn w-full flex items-center justify-center gap-2 group-hover:bg-black group-hover:text-white">
                  PLAY <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-white p-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Gamepad2 className="w-6 h-6" />
              <span className="font-display text-2xl">ARCADE NOVA</span>
            </div>
            <p className="font-mono text-sm max-w-sm opacity-60">
              Built for speed, designed for fun. Arcade Nova is a community-driven project dedicated to preserving web-based arcade games.
            </p>
          </div>
          <div>
            <h5 className="font-bold font-mono text-sm uppercase mb-4">Links</h5>
            <ul className="font-mono text-sm space-y-2 opacity-60">
              <li><a href="#" className="hover:underline">Submit Game</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold font-mono text-sm uppercase mb-4">Social</h5>
            <ul className="font-mono text-sm space-y-2 opacity-60">
              <li><a href="#" className="hover:underline">Discord</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-12 pt-12 border-t border-black/10 font-mono text-[10px] uppercase opacity-40 text-center">
          © 2026 ARCADE NOVA // NO RIGHTS RESERVED // OPEN SOURCE
        </div>
      </footer>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#f0f0f0] brutal-border w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="border-b-2 border-black p-4 flex justify-between items-center bg-white">
                <div className="flex items-center gap-4">
                  <h3 className="font-display text-3xl">{selectedGame.title}</h3>
                  <span className="font-mono text-xs bg-black text-white px-2 py-1">{selectedGame.category}</span>
                </div>
                <button 
                  onClick={closeGame}
                  className="brutal-btn p-1 hover:bg-red-400"
                >
                  <X />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center min-h-[500px]">
                {gameState === 'playing' ? (
                  <>
                    {selectedGame.id === 'snake' && <SnakeGame onGameOver={handleGameOver} />}
                    {selectedGame.id === 'breakout' && <BreakoutGame onGameOver={handleGameOver} />}
                    {['stacker', 'dodge'].includes(selectedGame.id) && (
                      <div className="text-center">
                        <Info className="w-16 h-16 mx-auto mb-4" />
                        <p className="font-display text-2xl mb-2">COMING SOON</p>
                        <p className="font-mono text-sm opacity-60">This game is currently under development.</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-500" />
                    <h4 className="font-display text-6xl mb-2 uppercase">GAME OVER</h4>
                    <p className="font-mono text-2xl mb-8">FINAL SCORE: {lastScore}</p>
                    <div className="flex gap-4 justify-center">
                      <button 
                        onClick={() => setGameState('playing')}
                        className="brutal-btn bg-black text-white px-8 py-3 text-lg"
                      >
                        TRY AGAIN
                      </button>
                      <button 
                        onClick={closeGame}
                        className="brutal-btn px-8 py-3 text-lg"
                      >
                        BACK TO MENU
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-black p-4 bg-white flex justify-between items-center font-mono text-xs">
                <div className="flex gap-4">
                  <span>WASD / ARROWS: MOVE</span>
                  <span>SPACE: ACTION</span>
                  <span>ESC: QUIT</span>
                </div>
                <div className="opacity-50">ARCADE NOVA ENGINE v1.0.4</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
