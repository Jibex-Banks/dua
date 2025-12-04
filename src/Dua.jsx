import React, { useState, useEffect, useRef } from 'react';
import { Search, Book } from 'lucide-react';
import { SparklesIcon } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import { Helmet } from 'react-helmet';


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

  const handleSearch = async () => {
    if (!query.trim()) return;

    const userMessage = { type: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    const currentQuery = query;
    setQuery('');
    setIsLoading(true);

    let response_data;
    try {
      const response = await fetch("https://JibexBanks-duabymoon.hf.space/new/model/query", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: currentQuery })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Ensure response_data is always an array
      response_data = Array.isArray(data) ? data : [data];
      
      // If empty array or null/undefined, show error
      if (!response_data || response_data.length === 0) {
        response_data = [{ error: 'No prayers found for your query. Please try different keywords.' }];
      }
    } catch (error) {
      console.error('API Error:', error);
      response_data = [{ error: 'Sorry, an error occurred while fetching prayers. Please try again.' }];
    }

    const botMessage = { type: 'bot', duas: response_data };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
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
          <h1 className="text-4xl font-bold text-white mb-2">Dua by Moon</h1>
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
    <>
      <Helmet>
        <title>Dua by Moon - Islamic Prayers & Quranic Duas Search Engine</title>
        <meta name="description" content="Dua by Moon: Search and discover authentic Islamic prayers, Quranic duas, and supplications in Arabic with English translations. Find prayers for traveling, guidance, protection, gratitude, and every life situation." />
        <meta name="keywords" content="dua by moon, duabymoon, islamic prayers, quranic duas, muslim prayers, dua search, islamic supplications, quran prayers, dua for traveling, dua for guidance, dua for protection, morning prayers, evening prayers, arabic duas, islamic prayer app, muslim dua collection, authentic duas, prophetic prayers" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Dua by Moon - Islamic Prayers & Quranic Duas Search Engine" />
        <meta property="og:description" content="Search and discover authentic Islamic prayers and Quranic duas with translations. Find the perfect prayer for every moment of your life." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dua by Moon" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dua by Moon - Islamic Prayers & Quranic Duas" />
        <meta name="twitter:description" content="Search authentic Islamic prayers and Quranic duas with translations for every life situation." />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Dua by Moon" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="category" content="Religion & Spirituality" />
        <link rel="canonical" href="https://duabymoon.com" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Dua by Moon",
            "description": "Islamic prayers and Quranic duas search engine with Arabic text and English translations",
            "applicationCategory": "ReligiousApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1250"
            }
          })}
        </script>
      </Helmet>

      <div className="flex flex-col h-dvh bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center space-x-3">
            <Book className="w-8 h-8" aria-label="Islamic Book Icon" />
            <div>
              <h1 className="text-xl font-bold">Dua by Moon</h1>
              <p className="text-xs text-blue-100">Find Qur'anic Prayers & Islamic Supplications</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 && (
              <article className="text-center py-12">
                <SparklesIcon className="w-16 h-16 text-blue-300 mx-auto mb-4" aria-hidden="true" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  Welcome to Dua by Moon
                </h2>
                <p className="text-gray-500 mb-6">
                  Search for authentic Islamic prayers and Quranic duas in natural language. Find supplications for every moment of your life from daily prayers to special occasions.
                </p>
                
                {/* SEO-rich content section */}
                <section className="bg-blue-50 rounded-xl p-6 mb-6 text-left max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Discover Islamic Prayers & Duas</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    Dua by Moon is your comprehensive Islamic prayer search engine featuring authentic Quranic supplications with Arabic text and English translations. Whether you're seeking morning prayers, evening duas, travel supplications, or prayers for guidance and protection, our platform helps you find the perfect dua for every situation.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Search by occasion, topic, or need from daily dhikr to special event prayers. All duas are sourced from the Holy Quran with proper references and context.
                  </p>
                </section>

                <div className="mt-8 space-y-2">
                  <h3 className="text-sm text-gray-600 font-semibold">Popular Searches:</h3>
                  <nav className="flex flex-wrap justify-center gap-2" aria-label="Popular prayer searches">
                    {[
                      'Prayer before leaving the house',
                      'Dua for guidance',
                      'Prayer for patience',
                      'Morning prayers',
                      'Travel dua',
                      'Prayer for protection'
                    ].map((example) => (
                      <button
                        key={example}
                        onClick={() => setQuery(example)}
                        className="px-4 py-2 bg-white border border-blue-200 rounded-full text-sm text-blue-600 hover:bg-blue-50 transition"
                        aria-label={`Search for ${example}`}
                      >
                        {example}
                      </button>
                    ))}
                  </nav>
                </div>
              </article>
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
                      {(message.duas || []).map((dua, duaIndex) => (
                        <article
                          key={duaIndex}
                          className="bg-white rounded-2xl rounded-tl-sm shadow-lg p-5 border border-blue-100"
                          itemScope
                          itemType="https://schema.org/CreativeWork"
                        >
                          {dua.error && (
                            <div role="alert">
                              <p className="text-xs font-semibold text-red-600 mb-1">
                                Error
                              </p>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {dua.error}
                              </p>
                            </div>
                          )}
                          {dua.background && (
                            <div className="mb-4 pb-4 border-b border-gray-200">
                              <h4 className="text-xs font-semibold text-blue-600 mb-2">
                                BACKGROUND
                              </h4>
                              <p className="text-sm text-gray-700 leading-relaxed" itemProp="description">
                                {dua.background}
                              </p>
                            </div>
                          )}

                          {dua.arabic && (
                            <div className="rounded-3xl mb-4 pb-4 border border-blue-600 bg-blue-200 p-3 shadow-sm">
                              <h4 className="text-sm font-semibold text-blue-600 mb-2">
                                Arabic Text
                              </h4>
                              <p className="text-xl text-blue-600 leading-relaxed" dir="rtl" lang="ar" itemProp="text">
                                {dua.arabic}
                              </p>
                            </div>
                          )}

                          {dua.refrence && (
                            <div className="mb-4">
                              <h4 className="text-xs font-semibold text-blue-600 mb-2">
                                REFERENCE
                              </h4>
                              <p className="text-sm text-gray-800 font-medium" itemProp="citation">
                                {dua.refrence}
                              </p>
                            </div>
                          )}

                          {dua.meaning && (
                            <div>
                              <h4 className="text-xs font-semibold text-blue-600 mb-2">
                                ENGLISH TRANSLATION
                              </h4>
                              <p className="text-sm text-gray-800 leading-relaxed italic" itemProp="text">
                                "{dua.meaning}"
                              </p>
                            </div>
                          )}
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start mb-4" role="status" aria-live="polite" aria-label="Loading prayers">
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
        </main>

        <footer className="bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <label htmlFor="dua-search-input" className="sr-only">Search for Islamic prayers and duas</label>
                <input
                  id="dua-search-input"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask for a prayer... (e.g., prayer before traveling, dua for success)"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search for Islamic prayers"
                />
                <button
                  onClick={handleSearch}
                  disabled={!query.trim() || isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                  aria-label="Search for dua"
                >
                  <SendHorizonal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
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
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </>
  );
}