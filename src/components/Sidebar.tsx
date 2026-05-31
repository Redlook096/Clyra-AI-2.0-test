import React from 'react';
import { Plus, Search, MessageSquare, Trash2, Edit2, Settings, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  onNewChat: () => void;
}

export function Sidebar({ onNewChat }: SidebarProps) {
  const conversations = [
    "Create Html Game Environment...",
    "Apply To Leave For Emergency",
    "What Is UI UX Design?",
    "Create POS System",
    "What Is UX Audit?",
    "Create Chatbot GPT...",
    "How Chat GPT Work?",
  ];

  const recentConversations = [
    "Crypto Lending App Name",
    "Operator Grammar Types",
    "Min States For Binary DFA"
  ];

  const selectedIndex = 5;

  return (
    <aside className="w-[320px] bg-white rounded-[28px] h-full flex flex-col overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100/50">
      
      {/* Header */}
      <div className="p-6 pb-2">
        <h1 className="font-display font-semibold text-xl tracking-[0.2em] text-gray-900 mb-6">
          CHAT A.I+
        </h1>
        
        <div className="flex gap-2 mb-6">
          <button 
            onClick={onNewChat}
            className="flex-1 bg-primary hover:bg-primary-hover text-white rounded-full py-2.5 px-4 flex items-center justify-center gap-2 font-medium text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New chat
          </button>
          <button className="w-10 h-10 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors shadow-sm shrink-0">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lists */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6 custom-scrollbar">
        
        {/* Current */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
             <span className="text-xs font-medium text-gray-400">Your conversations</span>
             <button className="text-xs font-medium text-primary hover:text-primary-hover transition-colors">Clear All</button>
          </div>
          
          <ul className="space-y-0.5">
            {conversations.map((title, i) => {
              const isSelected = i === selectedIndex;
              return (
                <li key={i} className="relative">
                  <button
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all group",
                      isSelected ? "bg-sidebar-hover text-primary" : "text-gray-700 hover:bg-gray-50/80"
                    )}
                  >
                    <MessageSquare className={cn("w-4 h-4 shrink-0", isSelected ? "text-primary" : "text-gray-400")} />
                    <span className="truncate flex-1 text-left">{title}</span>
                    
                    {isSelected && (
                      <div className="flex items-center gap-1.5 shrink-0 opacity-100">
                         <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500 transition-colors" />
                         <Edit2 className="w-3.5 h-3.5 text-gray-400 hover:text-gray-800 transition-colors" />
                      </div>
                    )}
                  </button>
                  {/* Indicator Pip for selected */}
                  {isSelected && (
                    <motion.div 
                      layoutId="sidebar-indicator"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Older */}
        <div className="border-t border-gray-100 pt-6">
          <div className="px-2 mb-2">
             <span className="text-xs font-medium text-gray-400">Last 7 Days</span>
          </div>
          <ul className="space-y-0.5">
            {recentConversations.map((title, i) => (
              <li key={i}>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all text-gray-700 hover:bg-gray-50/80"
                  )}
                >
                  <MessageSquare className="w-4 h-4 shrink-0 text-gray-300" />
                  <span className="truncate flex-1 text-left">{title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Profile & Settings */}
      <div className="p-4 bg-white mt-auto rounded-b-[28px] space-y-2">
         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
           <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
             <Settings className="w-3.5 h-3.5 text-gray-600" />
           </div>
           Settings
         </button>
         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-100 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors shadow-sm">
           <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="User" />
           </div>
           Andrew Neilson
         </button>
      </div>
    </aside>
  );
}
