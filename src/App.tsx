import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { Message, ChatSession } from './types';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'user',
      text: 'Create a chatbot gpt using python language what will be step for that',
      timestamp: Date.now() - 10000,
    },
    {
      id: '2',
      role: 'model',
      text: `Sure, I can help you get started with creating a chatbot using GPT in Python. Here are the basic steps you'll need to follow:

1. **Install the required libraries:** You'll need to install the transformers library from Hugging Face to use GPT. You can install it using \`pip\`.

2. **Load the pre-trained model:** GPT comes in several sizes and versions, so you'll need to choose the one that fits your needs. You can load a pre-trained GPT model. This loads the 1.3B parameter version of GPT-Neo, which is a powerful and relatively recent model.

3. **Create a chatbot loop:** You'll need to create a loop that takes user input, generates a response using the GPT model, and outputs it to the user. Here's an example loop that uses the \`input()\` function to get user input and the \`gpt()\` function to generate a response. This loop will keep running until the user exits the program or the loop is interrupted.

4. **Add some personality to the chatbot:** While GPT can generate text, it doesn't have any inherent personality or style. You can make your chatbot more interesting by adding custom prompts or responses that reflect your desired personality. You can then modify the chatbot loop to use these prompts and responses when appropriate. This will make the chatbot seem more human-like and engaging.

**These are just the basic steps to get started with a GPT chatbot in Python. Depending on your requirements, you may need to add more features or complexity to the chatbot. Good luck!**`,
      timestamp: Date.now() - 5000,
    },
    {
      id: '3',
      role: 'user',
      text: 'What is use of that chatbot ?',
      timestamp: Date.now() - 2000,
    },
    {
       id: '4',
       role: 'model',
       text: `**Chatbots can be used for a wide range of purposes, including:**\n\nCustomer service chatbots can handle frequently asked questions, provide basic support, and help customers navigate a website or application. E-commerce chatbots can assist with product discovery, recommend items.`,
       timestamp: Date.now() - 1000,
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        let errorMsg = 'Network response was not ok';
        try {
          const errData = await response.json();
          if (errData.error) errorMsg = errData.error;
        } catch(e) {}
        throw new Error(errorMsg);
      }

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.text,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Error fetching response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: `**System Error:** ${error.message || 'Failed to communicate with AI Server.'}\n\nPlease check your server connection or API key configuration.`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-screen w-full bg-surface-bg p-4 font-sans text-gray-900 gap-4 overflow-hidden relative">
      <Sidebar onNewChat={clearChat} />

      <main className="flex-1 bg-panel-bg rounded-[28px] flex flex-col relative overflow-hidden shadow-sm border border-gray-100/50">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-8 md:px-16 pt-12 pb-32 custom-scrollbar">
           <div className="max-w-4xl mx-auto flex flex-col">
              {messages.map((message, i) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  isLast={i === messages.length - 1} 
                />
              ))}
              <div ref={bottomRef} className="h-4" />
           </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-8 left-0 w-full px-8 flex justify-center pointer-events-none">
          <div className="pointer-events-auto w-full max-w-4xl">
             <ChatInput 
               input={input} 
               setInput={setInput} 
               onSubmit={handleSubmit} 
               isLoading={isLoading} 
             />
          </div>
        </div>

        {/* Upgrade Tag */}
        <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-hover text-white py-6 px-1.5 rounded-l-xl transition-all shadow-lg hover:pr-3 flex flex-col items-center gap-2 group z-10 custom-writing-mode">
           <span className="text-[11px] font-semibold tracking-wider whitespace-nowrap rotate-180" style={{ writingMode: 'vertical-rl' }}>Upgrade to Pro</span>
           <Sparkles className="w-3.5 h-3.5 mt-2 text-yellow-300" />
        </button>
      </main>
    </div>
  );
}
