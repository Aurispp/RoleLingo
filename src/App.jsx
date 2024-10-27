import { useState } from 'react';
import { Users, ArrowLeft } from 'lucide-react';
import RoleCard from './components/RoleCard';
import Timer from './components/Timer';

export default function App() {
  const [minutes, setMinutes] = useState(5);
  const [gameState, setGameState] = useState('setup');
  const [timerState, setTimerState] = useState('prep'); // prep, transition, conversation, ended
  const [currentScenario, setCurrentScenario] = useState(null);
  const [gameKey, setGameKey] = useState(0);
  
  const handleInputChange = (e) => {
    const value = Math.min(Math.max(1, e.target.value), 60);
    setMinutes(value);
  };

  const startGame = () => {
    setGameState('prep');
    setTimerState('prep');
    setGameKey(prev => prev + 1);
  };

  const handlePrepTimeComplete = () => {
    setTimerState('transition');
    // Start fading out "Let's Start!" after 3 seconds
    setTimeout(() => {
      const transitionElement = document.querySelector('.animate-bounce');
      if (transitionElement) {
        transitionElement.style.opacity = '0';
      }
    }, 3000);
    // Switch to conversation after 5 seconds total
    setTimeout(() => {
      setTimerState('conversation');
    }, 5000);
  };

  const handleConversationTimeComplete = () => {
    setTimerState('ended');
  };

  const handleBackToMenu = () => {
    setGameState('setup');
    setTimerState('prep');
    setCurrentScenario(null);
    setGameKey(prev => prev + 1);
  };

  const handleScenarioUpdate = (scenario) => {
    setCurrentScenario(scenario);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {gameState === 'setup' && (
          <div className="flex flex-col items-center gap-8 p-8">
            <h1 className="text-4xl font-bold text-gray-800 text-center">
              Ready to TalkTango?
            </h1>
            
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={minutes}
                  onChange={handleInputChange}
                  className="w-28 text-center text-2xl py-2 px-4 border border-gray-200 rounded-lg
                           focus:outline-none focus:border-blue-400 transition-all"
                  min="1"
                  max="60"
                />
                <span className="text-gray-600 text-xl">minutes</span>
              </div>

              <button
                className="flex items-center justify-center px-8 py-3 text-lg font-medium
                         text-white bg-[#4169e1] rounded-full 
                         hover:bg-blue-600 transition-all duration-300"
                onClick={startGame}
              >
                Tango Time! →
              </button>

              <div className="flex items-center text-gray-500 text-sm gap-2">
                <Users className="w-4 h-4" />
                <span>Get ready for a 2-player conversation!</span>
              </div>
            </div>
          </div>
        )}

        {gameState === 'prep' && (
          <div className="w-full p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/3">
                <RoleCard 
                  activePlayer={1} 
                  onScenarioChange={handleScenarioUpdate}
                  gameKey={gameKey}
                />
              </div>

              <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-8">
                <div className="w-full min-h-[280px] flex flex-col items-center">
                  <div className="flex-1 flex flex-col items-center gap-6 w-full">
                    <h2 className="text-3xl font-bold text-gray-800 text-center w-full">
                      {currentScenario?.theme || 'Loading...'}
                    </h2>
                    
                    {timerState === 'prep' && (
                      <div className="flex flex-col items-center space-y-2">
                        <Timer 
                          key="prep-timer"
                          initialSeconds={20} 
                          onComplete={handlePrepTimeComplete}
                        />
                        <p className={`
                          text-gray-600 transition-all duration-500
                          ${timerState === 'prep' ? 'opacity-100' : 'opacity-0'}
                        `}>
                          Preparation Time
                        </p>
                      </div>
                    )}
                    
                    {timerState === 'transition' && (
                      <div 
                        className={`
                          transition-all duration-1000 ease-in-out
                          ${timerState === 'transition' ? 'opacity-100' : 'opacity-0'}
                        `}
                      >
                        <div className="animate-bounce text-2xl text-[#4169e1] font-bold transition-opacity duration-1000">
                          Let's Start!
                        </div>
                      </div>
                    )}
                    
                    {timerState === 'conversation' && (
                      <div className="flex flex-col items-center space-y-2 transition-opacity duration-500">
                        <Timer 
                          key="conversation-timer"
                          initialSeconds={minutes * 60} 
                          onComplete={handleConversationTimeComplete}
                        />
                        <p className="text-gray-600">
                          Tango Time
                        </p>
                      </div>
                    )}

                    {timerState === 'ended' && (
                      <div className="transition-all duration-1000 ease-in-out opacity-0 animate-fade-in">
                        <div className="text-6xl font-bold text-[#4169e1]">
                          0:00
                        </div>
                        <p className="text-gray-600 mt-2">Time's Up!</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-6 w-full flex justify-center">
                    <button
                      className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-full 
                                hover:bg-gray-300 transition-all"
                      onClick={handleBackToMenu}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Menu
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <RoleCard 
                  activePlayer={2}
                  onScenarioChange={handleScenarioUpdate}
                  gameKey={gameKey}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}