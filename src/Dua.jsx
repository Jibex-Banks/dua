import React, { useState, useEffect, useRef } from 'react';
import { Book, Share2, Download, X, Plus, Menu, MessageSquare, Send, Mail } from 'lucide-react';
import './Dua.css';
import { SparklesIcon } from 'lucide-react';

export default function Dua() {
  const [showSplash, setShowSplash] = useState(true);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shareModal, setShareModal] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generatedBlob, setGeneratedBlob] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const result = localStorage.getItem('dua_chats_list');
        if (result) {
          const savedChats = JSON.parse(result);
          setChats(savedChats);

          if (savedChats.length > 0) {
            const latestChatId = savedChats[0].id;
            setCurrentChatId(latestChatId);
            await loadChat(latestChatId);
          }
        }
      } catch (error) {
        console.log('No previous chats found');
      }
    };
    loadChats();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadChat = async (chatId) => {
    try {
      const result = localStorage.getItem(`dua_chat_${chatId}`);
      if (result) {
        const chatData = JSON.parse(result);
        setMessages(chatData.messages || []);
      }
    } catch (error) {
      console.log('Failed to load chat:', error);
      setMessages([]);
    }
  };

  const saveCurrentChat = async () => {
    if (!currentChatId || messages.length === 0) return;

    try {
      localStorage.setItem(`dua_chat_${currentChatId}`, JSON.stringify({
        id: currentChatId,
        messages: messages,
        updatedAt: Date.now()
      }));

      const updatedChats = chats.map(chat =>
        chat.id === currentChatId
          ? { ...chat, preview: getPreviewText(), updatedAt: Date.now() }
          : chat
      );

      localStorage.setItem('dua_chats_list', JSON.stringify(updatedChats));
      setChats(updatedChats);
    } catch (error) {
      console.error('Failed to save chat:', error);
    }
  };

  const getPreviewText = () => {
    const userMessages = messages.filter(m => m.type === 'user');
    if (userMessages.length > 0) {
      const text = userMessages[0].text;
      return text.substring(0, 50) + (text.length > 50 ? '...' : '');
    }
    return 'New conversation';
  };

  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      const timeoutId = setTimeout(() => {
        saveCurrentChat();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, currentChatId, chats]);

  const createNewChat = async () => {
    const newChatId = `chat_${Date.now()}`;
    const newChat = {
      id: newChatId,
      preview: 'New conversation',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setCurrentChatId(newChatId);
    setMessages([]);
    setShowSidebar(false);

    try {
      localStorage.setItem('dua_chats_list', JSON.stringify(updatedChats));
    } catch (error) {
      console.error('Failed to save new chat:', error);
    }
  };

  const switchChat = async (chatId) => {
    if (chatId === currentChatId) {
      setShowSidebar(false);
      return;
    }

    setCurrentChatId(chatId);
    await loadChat(chatId);
    setShowSidebar(false);
  };

  const deleteChat = async (chatId, e) => {
    e.stopPropagation();

    if (!window.confirm('Are you sure you want to delete this conversation?')) {
      return;
    }

    try {
      localStorage.removeItem(`dua_chat_${chatId}`);

      const updatedChats = chats.filter(chat => chat.id !== chatId);
      localStorage.setItem('dua_chats_list', JSON.stringify(updatedChats));
      setChats(updatedChats);

      if (chatId === currentChatId) {
        if (updatedChats.length > 0) {
          setCurrentChatId(updatedChats[0].id);
          await loadChat(updatedChats[0].id);
        } else {
          createNewChat();
        }
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const formatChatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else if (diffInHours < 168) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    if (!currentChatId) {
      await createNewChat();
      // Small delay to ensure chat is created
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const userMessage = { type: 'user', text: query, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    const currentQuery = query;
    setQuery('');
    setIsLoading(true);

    let response_data;
    try {
      const response = await fetch("https://JibexBanks-duabymoon.hf.space/query", {
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
      response_data = Array.isArray(data) ? data : [data];

      if (!response_data || response_data.length === 0) {
        response_data = [{ error: 'No prayers found for your query. Please try different keywords.' }];
      }
    } catch (error) {
      console.error('API Error:', error);
      response_data = [{ error: 'Sorry, an error occurred while fetching prayers. Please try again.' }];
    }

    const botMessage = { type: 'bot', duas: response_data, timestamp: Date.now() };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const getPrayerTitle = (dua) => {
    if (dua.title) {
      const words = dua.title.split(' ').slice(0, 6);
      return words.join(' ') + (dua.title.split(' ').length > 6 ? '...' : '');
    }
    return 'Prayer';
  };

  const generateDuaImage = async (dua) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext('2d');

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1e3a8a');
      gradient.addColorStop(0.5, '#3b82f6');
      gradient.addColorStop(1, '#60a5fa');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decorative circles
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(900, 150, 200, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(200, 1200, 150, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Header
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 76px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.fillText('🤲', canvas.width / 2, 100);

      ctx.font = 'bold 40px Inter, Arial';
      ctx.fillText('Dua By Moon', canvas.width / 2, 160);

      // Prayer Title
      const prayerTitle = getPrayerTitle(dua);
      ctx.font = '40px Inter, Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText(prayerTitle, canvas.width / 2, 210);

      // Card
      const padding = 80;
      const cardY = 270;
      const cardHeight = 850;
      const radius = 30;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 15;

      ctx.beginPath();
      ctx.moveTo(padding + radius, cardY);
      ctx.arcTo(canvas.width - padding, cardY, canvas.width - padding, cardY + radius, radius);
      ctx.arcTo(canvas.width - padding, cardY + cardHeight, canvas.width - padding - radius, cardY + cardHeight, radius);
      ctx.arcTo(padding, cardY + cardHeight, padding, cardY + cardHeight - radius, radius);
      ctx.arcTo(padding, cardY, padding + radius, cardY, radius);
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      let y = cardY + 70;
      const maxWidth = canvas.width - padding * 2 - 60;

      const wrapText = (text, size, weight = 'normal', fontFamily = 'Inter, Arial') => {
        const textStr = text == null ? '' : String(text);
        ctx.font = `${weight} ${size}px ${fontFamily}`;
        const words = textStr.split(' ');
        let line = '';
        const lines = [];

        for (let word of words) {
          const test = line + word + ' ';
          if (ctx.measureText(test).width > maxWidth && line !== '') {
            lines.push(line.trim());
            line = word + ' ';
          } else {
            line = test;
          }
        }
        if (line.trim() !== '') {
          lines.push(line.trim());
        }
        return lines;
      };

      // Arabic
      if (dua.arabic) {
        ctx.fillStyle = '#1e40af';
        ctx.textAlign = 'center';
        wrapText(dua.arabic, 50, 'bold', 'Scheherazade New, Arial').forEach(line => {
          ctx.fillText(line, canvas.width / 2, y);
          y += 58;
        });
        y += 35;

        // Divider
        ctx.strokeStyle = '#bfdbfe';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding + 50, y);
        ctx.lineTo(canvas.width - padding - 50, y);
        ctx.stroke();
        y += 45;
      }

      // Meaning
      if (dua.meaning) {
        ctx.fillStyle = '#475569';
        ctx.font = 'italic 40px Inter, Arial';
        ctx.textAlign = 'center';
        wrapText(dua.meaning, 42).forEach(line => {
          ctx.fillText(line, canvas.width / 2, y);
          y += 44;
        });
        y += 30;
      }

      // Reference
      if (dua.refrence) {
        ctx.fillStyle = '#64748b';
        ctx.font = '32px Inter, Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`— ${dua.refrence}`, canvas.width / 2, y);
      }

      // Footer
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 50px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Find more at duabymoon.netlify.app', canvas.width / 2, canvas.height - 80);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to generate image'));
          return;
        }
        const url = URL.createObjectURL(blob);
        resolve({ blob, url });
      }, 'image/png', 1.0);
    });
  };

  const downloadImage = (blob, filename = 'dua-prayer.png') => {
    try {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const shareWithCaption = async (blob, platform) => {
    const caption = '🤲 A beautiful Islamic prayer\n\nMay this prayer bring peace to your heart.\n\n📖 Discover more authentic Islamic duas:\nhttps://duabymoon.netlify.app';

    // Try native share first (mobile devices)
    if (navigator.canShare) {
      try {
        const file = new File([blob], 'dua-prayer.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Islamic Prayer 🤲',
            text: caption,
            files: [file],
          });
          return true;
        }
      } catch (error) {
        if (error.name === 'AbortError') return false;
      }
    }

    // Fallback: Download image + open social link
    downloadImage(blob);

    const text = encodeURIComponent(caption);
    const links = {
      whatsapp: `https://wa.me/?text=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      telegram: `https://t.me/share/url?url=https://duabymoon.netlify.app&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=https://duabymoon.netlify.app&quote=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=https://duabymoon.netlify.app`,
      reddit: `https://reddit.com/submit?title=Islamic%20Prayer&url=https://duabymoon.netlify.app`,
    };

    if (links[platform]) {
      setTimeout(() => {
        window.open(links[platform], '_blank', 'width=600,height=500,noopener,noreferrer');
      }, 500);
    }

    return false;
  };

  const handleShareClick = async (platform) => {
    if (!generatedBlob) {
      alert('Image is still generating. Please wait.');
      return;
    }

    if (platform === 'download') {
      downloadImage(generatedBlob);
      setShareModal(null);
      return;
    }

    await shareWithCaption(generatedBlob, platform);
    setShareModal(null);
    setGeneratedImage(null);
    setGeneratedBlob(null);
  };

  const handleShareButtonClick = async (dua) => {
    setShareModal({ dua });
    setIsGeneratingImage(true);
    setGeneratedImage(null);
    setGeneratedBlob(null);

    try {
      const { blob, url } = await generateDuaImage(dua);
      setGeneratedBlob(blob);
      setGeneratedImage(url);
    } catch (error) {
      console.error('Image generation failed:', error);
      alert('Failed to generate image. Please try again.');
      setShareModal(null);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const contactWhatsApp = () => {
    const message = encodeURIComponent('Hello! I found your Dua app and wanted to reach out. (Message from duabymoon.netlify.app)');
    window.open(`https://wa.me/2348155512886?text=${message}`, '_blank');
  };

  const contactEmail = () => {
    const subject = encodeURIComponent('Contact from Dua App');
    const body = encodeURIComponent('Hello,\n\nI found your Dua app and wanted to reach out.\n\n(Message from duabymoon.netlify.app)');
    window.open(`mailto:mudathirajibolamudathir@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };
  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          <div className="splash-icon">
            <Book size={80} />
          </div>
          <h1 className="splash-title">Dua</h1>
          <p className="splash-subtitle">Find Islamic Prayers</p>
          <div className="splash-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title-row">
            <h2 className="sidebar-title">Conversations</h2>
            <button onClick={() => setShowSidebar(false)} className="sidebar-close-btn">
              <X size={20} />
            </button>
          </div>
          <button onClick={createNewChat} className="new-chat-btn">
            <Plus size={18} />
            <span>New Chat</span>
          </button>
        </div>

        <div className="chats-list">
          {chats.length === 0 ? (
            <div className="empty-chats">
              <p>No conversations yet.</p>
              <p>Start a new chat!</p>
            </div>
          ) : (
            chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => switchChat(chat.id)}
                className={`chat-item ${chat.id === currentChatId ? 'chat-item-active' : ''}`}
              >
                <div className="chat-item-content">
                  <p className="chat-preview">{chat.preview}</p>
                  <p className="chat-date">{formatChatDate(chat.updatedAt)}</p>
                </div>
                <button
                  onClick={(e) => deleteChat(chat.id, e)}
                  className="chat-delete-btn"
                  title="Delete conversation"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <p className="contact-title">Need Help?</p>
          <div className="contact-buttons">
            <button onClick={contactWhatsApp} className="contact-btn whatsapp-btn">
              <MessageSquare size={18} />
              <span>WhatsApp</span>
            </button>
            <button onClick={contactEmail} className="contact-btn email-btn">
              <Mail size={18} />
              <span>Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showSidebar && <div className="sidebar-overlay" onClick={() => setShowSidebar(false)} />}

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <div className="header-left">
              <button onClick={() => setShowSidebar(true)} className="menu-btn">
                <Menu size={24} />
              </button>
              <div className="header-logo">
                <Book size={32} />
              </div>
              <div className="header-text">
                <h1>Dua</h1>
                <p>Find Islamic Prayers</p>
              </div>
            </div>
            <button onClick={createNewChat} className="header-new-chat-btn">
              <Plus size={18} />
              <span className="btn-text-desktop">New Chat</span>
            </button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="messages-container">
          <div className="messages-wrapper">
            {messages.length === 0 && (
              <div className="welcome-screen">
                <div className="welcome-icon"><SparklesIcon className="sparkles-icon" /></div>
                <h2 className="welcome-title">Welcome to Dua</h2>
                <p className="welcome-subtitle">
                  Ask for Islamic prayers and your conversations will be saved
                </p>
                <div className="examples-section">
                  <p className="examples-label">Try asking:</p>
                  <div className="examples-grid">
                    {['Prayer before leaving the house', 'Prayer before eating', 'Prayers for breaking the fast'].map((example) => (
                      <button
                        key={example}
                        onClick={() => setQuery(example)}
                        className="example-btn"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`message-row ${message.type === 'user' ? 'message-user' : 'message-bot'}`}>
                {message.type === 'user' ? (
                  <div className="user-message">
                    <p>{message.text}</p>
                  </div>
                ) : (
                  <div className="bot-messages">
                    {(message.duas || []).map((dua, duaIndex) => (
                      <div key={duaIndex} className="dua-card">
                        {!dua.error && (
                          <button
                            onClick={() => handleShareButtonClick(dua)}
                            className="share-btn-fixed"
                            title="Share this prayer"
                          >
                            <Share2 size={18} />
                          </button>
                        )}

                        {dua.error ? (
                          <div className="dua-error">
                            <p className="error-label">Error</p>
                            <p className="error-text">{dua.error}</p>
                          </div>
                        ) : (
                          <>
                            {dua.background && (
                              <div className="dua-section dua-background">
                                <p className="section-label">BACKGROUND</p>
                                <p className="section-text">{dua.background}</p>
                              </div>
                            )}

                            {dua.arabic && (
                              <div className="dua-section dua-arabic">
                                <p className="section-label">Arabic</p>
                                <p className="arabic-text" dir="rtl">{dua.arabic}</p>
                              </div>
                            )}

                            {dua.refrence && (
                              <div className="dua-section">
                                <p className="section-label">REFERENCE</p>
                                <p className="section-text reference-text">{dua.refrence}</p>
                              </div>
                            )}

                            {dua.meaning && (
                              <div className="dua-section">
                                <p className="section-label">TRANSLATION</p>
                                <p className="section-text translation-text">"{dua.meaning}"</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="message-row message-bot">
                <div className="loading-message">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for a prayer... (e.g., prayer before traveling)"
              className="message-input"
            />
            <button
              onClick={handleSearch}
              disabled={!query.trim() || isLoading}
              className="send-btn"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareModal && (
        <div className="modal-overlay" onClick={() => {
          setShareModal(null);
          setGeneratedImage(null);
          setGeneratedBlob(null);
        }}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                <Share2 size={20} />
                Share Prayer
              </h3>
              <button onClick={() => {
                setShareModal(null);
                setGeneratedImage(null);
                setGeneratedBlob(null);
              }} className="modal-close-btn">
                <X size={24} />
              </button>
            </div>

            {isGeneratingImage ? (
              <div className="generating-state">
                <div className="spinner"></div>
                <p>Generating beautiful image...</p>
              </div>
            ) : (
              <>
                {generatedImage && (
                  <div className="image-preview-container">
                    <img src={generatedImage} alt="Prayer Preview" className="preview-image" />
                  </div>
                )}

                <div className="share-options">
                  <p className="share-info">Image will be downloaded with caption!</p>

                  {/* <div className="share-grid">
                    <button onClick={() => handleShareClick('whatsapp')} className="share-option whatsapp">
                      <div className="share-icon">
                        <MessageSquare size={24} />
                      </div>
                      <span>WhatsApp</span>
                    </button>

                    <button onClick={() => handleShareClick('facebook')} className="share-option facebook">
                      <div className="share-icon">
                        <span className="icon-text">f</span>
                      </div>
                      <span>Facebook</span>
                    </button>

                    <button onClick={() => handleShareClick('twitter')} className="share-option twitter">
                      <div className="share-icon">
                        <span className="icon-text">𝕏</span>
                      </div>
                      <span>Twitter</span>
                    </button>

                    <button onClick={() => handleShareClick('telegram')} className="share-option telegram">
                      <div className="share-icon">
                        <span className="icon-text">✈</span>
                      </div>
                      <span>Telegram</span>
                    </button>

                    <button onClick={() => handleShareClick('linkedin')} className="share-option linkedin">
                      <div className="share-icon">
                        <span className="icon-text">in</span>
                      </div>
                      <span>LinkedIn</span>
                    </button>

                    <button onClick={() => handleShareClick('reddit')} className="share-option reddit">
                      <div className="share-icon">
                        <span className="icon-text">R</span>
                      </div>
                      <span>Reddit</span>
                    </button>
                  </div> */}

                  <button onClick={() => handleShareClick('telegram')} className="share-option telegram">
                    <div className="share-icon">
                      <span className="icon-text"><Share2 size={20} /></span>
                    </div>
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => handleShareClick('download')}
                    className="download-only-btn"
                  >
                    <Download size={18} />
                    Just Download Image
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}