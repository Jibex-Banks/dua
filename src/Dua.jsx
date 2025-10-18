import React, { useState, useEffect, useRef } from 'react';
import { Search, Book } from 'lucide-react';
import { SparklesIcon } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import axios from 'axios';


export default function Dua() {
  const [showSplash, setShowSplash] = useState(true);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSearch = () => {
    if (!query.trim()) return;

    const userMessage = { type: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    // Simulated API response - replace with actual API call
    setTimeout(async () => {
      try {
        // const queryApi = await axios.post("http://127.0.0.1:8000/query", {"question": query });
        const queryApi = await axios.post("https://h3nt3z9t-8000.uks1.devtunnels.ms/query", { "question": query });
        var response_data = queryApi.data;
      } catch (error) {
        response_data = [{ "background": "Sorry,Our system is down, there was an issue with our System" }];
      }

      const botMessage = { type: 'bot', duas: response_data };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="mb-6 animate-bounce">
            <Book className="w-20 h-20 text-white mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Dua</h1>
          <p className="text-blue-200 text-lg">Find Qur'anic Prayers</p>
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <Book className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">Dua</h1>
            <p className="text-xs text-blue-100">Find Qur'anic Prayers</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <SparklesIcon className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Welcome to Dua
              </h2>
              <p className="text-gray-500 mb-6">
                Ask for any Qur'anic prayer in natural language
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Note:</span> Currently, only Qur'anic prayers are available. More Islamic prayers will be added soon, In sha Allah.
                </p>
              </div>
              <div className="mt-8 space-y-2">
                <p className="text-sm text-gray-600 font-semibold">Try asking:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Prayer before traveling', 'Dua for guidance', 'Prayer for patience'].map((example) => (
                    <button
                      key={example}
                      onClick={() => setQuery(example)}
                      className="px-4 py-2 bg-white border border-blue-200 rounded-full text-sm text-blue-600 hover:bg-blue-50 transition"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index}>
              {message.type === 'user' ? (
                <div className="flex justify-end mb-4">
                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs shadow-md">
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-start mb-4">
                  <div className="space-y-3 max-w-xl">
                    {message.duas.map((dua, duaIndex) => (
                      <div
                        key={duaIndex}
                        className="bg-white rounded-2xl rounded-tl-sm shadow-lg p-5 border border-blue-100"
                      >
                        {dua.background && (
                          <div className="mb-4 pb-4 border-b border-gray-200">
                            <p className="text-xs font-semibold text-blue-600 mb-2">
                              BACKGROUND
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {dua.background}
                            </p>
                          </div>
                        )}

                        {dua.arabic && (
                          <div className="rounded-3xl mb-4 pb-4 border border-blue-600 bg-blue-200 p-3 shadow-sm">
                            <p className="text-sm font-semibold text-blue-600 mb-2">
                              Arabic
                            </p>
                            <p className="arabic_text text-sl text-blue-600 leading-relaxed" dir='rtl' >
                              {dua.arabic}
                            </p>
                          </div>
                        )}

                        {dua.refrence && (
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-blue-600 mb-2">
                              REFERENCE
                            </p>
                            <p className="text-sm text-gray-800 font-medium">
                              {dua.refrence}
                            </p>
                          </div>
                        )}

                        {dua.meaning && (
                          <div>
                            <p className="text-xs font-semibold text-blue-600 mb-2">
                              TRANSLATION
                            </p>
                            <p className="text-sm text-gray-800 leading-relaxed italic">
                              "{dua.meaning}"
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white rounded-2xl rounded-tl-sm shadow-md px-6 py-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask for a prayer... (e.g., prayer before traveling)"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                disabled={!query.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                <SendHorizonal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}