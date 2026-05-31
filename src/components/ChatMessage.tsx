import React from 'react';
import { Message } from '../types';
import { Bot, User, Edit3, ThumbsUp, ThumbsDown, Copy, MoreVertical, RefreshCcw } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface ChatMessageProps {
  message: Message;
  isLast: boolean;
}

export function ChatMessage({ message, isLast }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col mb-8 w-full group"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
             <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=100&auto=format&fit=crop" 
                alt="AI" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-8">
          {isUser ? (
            <div className="flex items-center justify-between">
              <p className="text-gray-900 font-medium text-[15px] pt-1">
                {message.text}
              </p>
              <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 opacity-0 group-hover:opacity-100">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[13px] font-semibold text-primary uppercase tracking-wide">Chat A.I +</span>
                <span className="w-1.5 h-1.5 rounded-full border border-primary text-primary flex items-center justify-center text-[8px] font-bold">★</span>
              </div>
              <div className="markdown-body">
                <Markdown>{message.text}</Markdown>
              </div>
              
              {/* Actions Footer */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-md hover:bg-gray-50 text-xs flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <span className="w-px h-3 bg-gray-200 mx-1"></span>
                  <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-md hover:bg-gray-50 text-xs flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                  <span className="w-px h-3 bg-gray-200 mx-1"></span>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-50 text-xs flex items-center gap-1">
                    <Copy className="w-4 h-4" />
                  </button>
                  <span className="w-px h-3 bg-gray-200 mx-1"></span>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-50 text-xs">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                {isLast && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full font-medium transition-colors border border-gray-100">
                    <RefreshCcw className="w-3.5 h-3.5" />
                    Regenerate
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
