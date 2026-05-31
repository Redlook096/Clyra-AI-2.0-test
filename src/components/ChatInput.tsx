import React from 'react';
import { Send, Brain } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function ChatInput({ input, setInput, onSubmit, isLoading }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative max-w-4xl w-full mx-auto"
    >
      <div className="relative group flex items-center bg-white rounded-full p-2 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
        
        {/* Left Icon Decorator */}
        <div className="absolute left-4 w-6 h-6 flex items-center justify-center pointer-events-none">
          <div className="relative w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center shadow-inner">
             {/* Simulating the 'brain' gradient icon from the image */}
             <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 blur-[1px]"></div>
             <Brain className="w-3.5 h-3.5 text-white absolute" />
          </div>
        </div>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What's in your mind?..."
          disabled={isLoading}
          className="w-full bg-transparent outline-none pl-12 pr-12 py-3 text-[15px] placeholder:text-gray-400 text-gray-800 disabled:opacity-50"
        />

        <button
          onClick={onSubmit}
          disabled={!input.trim() || isLoading}
          className="absolute right-2.5 bg-primary hover:bg-primary-hover text-white w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:hover:shadow-none"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4 -ml-0.5" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
