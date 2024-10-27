import { useState } from 'react';
import { Clock } from 'lucide-react';

export default function App() {
  const [minutes, setMinutes] = useState(5);

  const handleInputChange = (e) => {
    const value = Math.min(Math.max(1, e.target.value), 60);
    setMinutes(value);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 p-8 max-w-lg w-full">
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
            onClick={() => console.log('Tango Time!')}
          >
            Tango Time! →
          </button>

          <div className="flex items-center text-gray-500 text-sm gap-1">
            <Clock className="w-4 h-4" />
            <span>Set time and let the conversation flow</span>
          </div>
        </div>
      </div>
    </div>
  );
}