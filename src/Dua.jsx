import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Share2, Download, X, Plus, Menu, MessageSquare, Send, Mail, Star, Users, ChevronRight, Heart } from 'lucide-react';
import './Dua.css';

const API_BASE = 'https://JibexBanks-duabymoon.hf.space';

/* ── Feedback Modal ─────────────────────────────── */
function FeedbackModal({ onClose }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || 'Anonymous', message: message.trim() }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setTimeout(onClose, 2500);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="modal-overlay-dark" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <div className="feedback-modal-header">
          <div className="feedback-modal-title">
            <Heart size={18} className="feedback-heart-icon" />
            <h3>Share Your Thoughts</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="feedback-success">
            <span className="feedback-success-icon">🌙</span>
            <p className="feedback-success-title">JazakAllah Khayran!</p>
            <p className="feedback-success-sub">Your feedback means the world to us.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="feedback-field">
              <label htmlFor="fb-name">Your Name <span className="optional">(optional)</span></label>
              <input id="fb-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Abdullah" className="feedback-input" maxLength={60} />
            </div>
            <div className="feedback-field">
              <label htmlFor="fb-message">Message <span className="required">*</span></label>
              <textarea id="fb-message" value={message} onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how we can improve, or share your experience..."
                className="feedback-textarea" maxLength={500} rows={4} required />
              <span className="char-count">{message.length}/500</span>
            </div>
            {status === 'error' && <p className="feedback-error">Something went wrong. Please try again.</p>}
            <button type="submit" className="feedback-submit-btn" disabled={!message.trim() || status === 'loading'}>
              {status === 'loading' ? (
                <span className="btn-loading">
                  <span className="dot-loader"><span /><span /><span /></span>
                  Sending...
                </span>
              ) : (<><Send size={15} /> Send Feedback</>)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────── */
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
  const [visitorCount, setVisitorCount] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const messagesEndRef = useRef(null);

  // PWA install prompt
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); setShowInstallBtn(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShowInstallBtn(false);
    setDeferredPrompt(null);
  };

  // Splash
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // Visitor count
  useEffect(() => {
    fetch(`${API_BASE}/visit`).then(r => r.ok ? r.json() : null).then(d => d && setVisitorCount(d.visitors)).catch(() => {});
  }, []);

  // Load chats
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dua_chats_list');
      if (saved) {
        const list = JSON.parse(saved);
        setChats(list);
        if (list.length > 0) { setCurrentChatId(list[0].id); loadChat(list[0].id); }
      }
    } catch {}
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const loadChat = (chatId) => {
    try {
      const data = localStorage.getItem(`dua_chat_${chatId}`);
      if (data) setMessages(JSON.parse(data).messages || []);
    } catch { setMessages([]); }
  };

  const getPreviewText = useCallback(() => {
    const um = messages.filter(m => m.type === 'user');
    if (um.length) { const t = um[0].text; return t.slice(0, 50) + (t.length > 50 ? '...' : ''); }
    return 'New conversation';
  }, [messages]);

  const saveCurrentChat = useCallback(() => {
    if (!currentChatId || !messages.length) return;
    try {
      localStorage.setItem(`dua_chat_${currentChatId}`, JSON.stringify({ id: currentChatId, messages, updatedAt: Date.now() }));
      const updated = chats.map(c => c.id === currentChatId ? { ...c, preview: getPreviewText(), updatedAt: Date.now() } : c);
      localStorage.setItem('dua_chats_list', JSON.stringify(updated));
      setChats(updated);
    } catch {}
  }, [currentChatId, messages, chats, getPreviewText]);

  useEffect(() => {
    if (currentChatId && messages.length) { const t = setTimeout(saveCurrentChat, 500); return () => clearTimeout(t); }
  }, [messages, currentChatId, saveCurrentChat]);

  const createNewChat = () => {
    const id = `chat_${Date.now()}`;
    const chat = { id, preview: 'New conversation', createdAt: Date.now(), updatedAt: Date.now() };
    const updated = [chat, ...chats];
    setChats(updated); setCurrentChatId(id); setMessages([]); setShowSidebar(false);
    try { localStorage.setItem('dua_chats_list', JSON.stringify(updated)); } catch {}
    return id;
  };

  const switchChat = (chatId) => {
    if (chatId === currentChatId) { setShowSidebar(false); return; }
    setCurrentChatId(chatId); loadChat(chatId); setShowSidebar(false);
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this conversation?')) return;
    try {
      localStorage.removeItem(`dua_chat_${chatId}`);
      const updated = chats.filter(c => c.id !== chatId);
      localStorage.setItem('dua_chats_list', JSON.stringify(updated));
      setChats(updated);
      if (chatId === currentChatId) {
        if (updated.length > 0) { setCurrentChatId(updated[0].id); loadChat(updated[0].id); }
        else createNewChat();
      }
    } catch {}
  };

  const formatChatDate = (ts) => {
    const d = new Date(ts), now = new Date(), h = (now - d) / 3600000;
    if (h < 24) return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    if (h < 48) return 'Yesterday';
    if (h < 168) return d.toLocaleDateString('en-US', { weekday: 'short' });
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    const chatId = currentChatId || createNewChat();
    if (!currentChatId) setCurrentChatId(chatId);

    const userMsg = { type: 'user', text: query, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    const q = query;
    setQuery(''); setIsLoading(true);

    let data;
    try {
      const res = await fetch(`${API_BASE}/query`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: q }) });
      if (!res.ok) throw new Error();
      const json = await res.json();
      data = Array.isArray(json) ? json : [json];
      if (!data.length) data = [{ error: 'No prayers found. Try different keywords.' }];
    } catch {
      data = [{ error: 'Sorry, an error occurred while fetching prayers. Please try again.' }];
    }

    setMessages(prev => [...prev, { type: 'bot', duas: data, timestamp: Date.now() }]);
    setIsLoading(false);
  };

  const getPrayerTitle = (dua) => {
    if (!dua.title) return 'Prayer';
    const words = dua.title.split(' ');
    return words.slice(0, 6).join(' ') + (words.length > 6 ? '...' : '');
  };

  const generateDuaImage = (dua) => new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080; canvas.height = 1350;
    const ctx = canvas.getContext('2d');

    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bg.addColorStop(0, '#040d21'); bg.addColorStop(0.5, '#071030'); bg.addColorStop(1, '#0d1a42');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.08; ctx.fillStyle = '#f0a020';
    ctx.beginPath(); ctx.arc(900, 120, 250, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(150, 1250, 180, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#f0ede8'; ctx.font = 'bold 72px serif'; ctx.textAlign = 'center';
    ctx.fillText('🤲', canvas.width / 2, 105);
    ctx.font = '36px Georgia, serif'; ctx.fillText('Dua by Moon', canvas.width / 2, 160);
    ctx.fillStyle = '#f0a020'; ctx.font = '26px serif';
    ctx.fillText(getPrayerTitle(dua), canvas.width / 2, 200);

    const gd = ctx.createLinearGradient(200, 0, 880, 0);
    gd.addColorStop(0, 'transparent'); gd.addColorStop(0.5, '#f0a020'); gd.addColorStop(1, 'transparent');
    ctx.strokeStyle = gd; ctx.lineWidth = 1; ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.moveTo(200, 228); ctx.lineTo(880, 228); ctx.stroke(); ctx.globalAlpha = 1;

    const pad = 60, cy = 260, ch = 880, cr = 28;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 20;
    ctx.beginPath();
    ctx.moveTo(pad+cr, cy); ctx.arcTo(canvas.width-pad, cy, canvas.width-pad, cy+cr, cr);
    ctx.arcTo(canvas.width-pad, cy+ch, canvas.width-pad-cr, cy+ch, cr);
    ctx.arcTo(pad, cy+ch, pad, cy+ch-cr, cr);
    ctx.arcTo(pad, cy, pad+cr, cy, cr); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;

    ctx.fillStyle = '#f0a020'; ctx.fillRect(pad, cy, 3, ch);

    let y = cy + 70;
    const maxW = canvas.width - pad * 2 - 60;
    const wrap = (text, size, color = '#f0ede8', weight = 'normal', fam = 'Inter, Arial') => {
      ctx.font = `${weight} ${size}px ${fam}`; ctx.fillStyle = color; ctx.textAlign = 'center';
      const words = String(text ?? '').split(' '); let line = '', lines = [];
      for (const w of words) { const t = line+w+' '; ctx.measureText(t).width > maxW && line ? (lines.push(line.trim()), line = w+' ') : (line = t); }
      if (line.trim()) lines.push(line.trim()); return lines;
    };

    if (dua.arabic) {
      wrap(dua.arabic, 48, '#f0a020', 'bold', 'Arial').forEach(l => { ctx.fillText(l, canvas.width/2, y); y += 58; }); y += 28;
      const div2 = ctx.createLinearGradient(200,0,880,0);
      div2.addColorStop(0,'transparent'); div2.addColorStop(0.5,'rgba(240,160,32,0.3)'); div2.addColorStop(1,'transparent');
      ctx.strokeStyle = div2; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(200,y); ctx.lineTo(880,y); ctx.stroke(); y += 36;
    }
    if (dua.meaning) { wrap(dua.meaning, 36, 'rgba(240,237,232,0.85)').forEach(l => { ctx.fillText(l, canvas.width/2, y); y += 44; }); y += 24; }
    if (dua.refrence) { wrap(`— ${dua.refrence}`, 28, 'rgba(240,160,32,0.6)').forEach(l => { ctx.fillText(l, canvas.width/2, y); y += 36; }); }

    ctx.fillStyle = 'rgba(240,160,32,0.4)'; ctx.font = '26px Inter, Arial'; ctx.textAlign = 'center';
    ctx.fillText('duabymoon.netlify.app', canvas.width/2, canvas.height - 55);

    canvas.toBlob(blob => {
      if (!blob) { reject(new Error('Failed')); return; }
      resolve({ blob, url: URL.createObjectURL(blob) });
    }, 'image/png', 1.0);
  });

  const downloadImage = (blob, filename = 'dua-prayer.png') => {
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = filename; a.style.display = 'none';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const shareWithCaption = async (blob, platform) => {
    const caption = '🤲 A beautiful Islamic prayer\n\nMay this prayer bring peace to your heart.\n\n📖 Discover more authentic Islamic duas:\nhttps://duabymoon.netlify.app';
    if (navigator.canShare) {
      try {
        const file = new File([blob], 'dua-prayer.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) { await navigator.share({ title: 'Islamic Prayer 🤲', text: caption, files: [file] }); return true; }
      } catch (e) { if (e.name === 'AbortError') return false; }
    }
    downloadImage(blob);
    const txt = encodeURIComponent(caption);
    const links = { whatsapp: `https://wa.me/?text=${txt}`, twitter: `https://twitter.com/intent/tweet?text=${txt}`, telegram: `https://t.me/share/url?url=https://duabymoon.netlify.app&text=${txt}` };
    if (links[platform]) setTimeout(() => window.open(links[platform], '_blank', 'width=600,height=500'), 500);
    return false;
  };

  const handleShareClick = async (platform) => {
    if (!generatedBlob) return;
    if (platform === 'download') { downloadImage(generatedBlob); setShareModal(null); return; }
    await shareWithCaption(generatedBlob, platform);
    setShareModal(null); setGeneratedImage(null); setGeneratedBlob(null);
  };

  const handleShareButtonClick = async (dua) => {
    setShareModal({ dua }); setIsGeneratingImage(true); setGeneratedImage(null); setGeneratedBlob(null);
    try { const { blob, url } = await generateDuaImage(dua); setGeneratedBlob(blob); setGeneratedImage(url); }
    catch { setShareModal(null); }
    finally { setIsGeneratingImage(false); }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSearch(); } };
  const closeShare = () => { setShareModal(null); setGeneratedImage(null); setGeneratedBlob(null); };

  const contactWhatsApp = () => {
    const msg = encodeURIComponent('Hello! (from duabymoon.netlify.app)');
    window.open(`https://wa.me/2348155512886?text=${msg}`, '_blank');
  };
  const contactEmail = () => window.open('mailto:mudathirajibolamudathir@gmail.com?subject=Contact from Dua App', '_blank');

  /* ── Splash ─────────── */
  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="stars-layer" aria-hidden="true" />
        <div className="splash-glow" />
        <div className="splash-content">
          <span className="splash-moon-emoji">🌙</span>
          <div className="splash-line" />
          <h1 className="splash-title">Dua <span>by Moon</span></h1>
          <p className="splash-tagline">Islamic Prayer Finder</p>
          <div className="splash-dots"><span /><span /><span /></div>
        </div>
      </div>
    );
  }

  /* ── Main App ─────────── */
  return (
    <div className="app-container">
      {/* Ambient background layers */}
      <div className="stars-layer" aria-hidden="true" />
      <div className="geo-layer" aria-hidden="true" />

      {/* SIDEBAR */}
      <aside className={`sidebar ${showSidebar ? 'sidebar-open' : ''}`} aria-label="Navigation">
        <div className="sidebar-header">
          <div className="sidebar-top-row">
            <div className="sidebar-brand">
              <span className="sidebar-moon-glyph">🌙</span>
              <span className="sidebar-brand-name">Dua by Moon</span>
            </div>
            <button onClick={() => setShowSidebar(false)} className="sidebar-close-btn" aria-label="Close sidebar">
              <X size={17} />
            </button>
          </div>
          <button onClick={createNewChat} className="new-chat-btn" id="new-chat-sidebar">
            <Plus size={15} />
            <span>New Conversation</span>
          </button>
        </div>

        <div className="chats-list">
          {chats.length === 0 ? (
            <div className="empty-chats">
              <span className="empty-chats-icon">🌙</span>
              <p>No conversations yet</p>
              <p className="empty-chats-sub">Start by asking for a prayer</p>
            </div>
          ) : chats.map(chat => (
            <div key={chat.id} onClick={() => switchChat(chat.id)}
              className={`chat-item ${chat.id === currentChatId ? 'chat-item-active' : ''}`}
              role="button" tabIndex={0}>
              <span className="chat-item-icon">💬</span>
              <div className="chat-item-content">
                <p className="chat-preview">{chat.preview}</p>
                <p className="chat-date">{formatChatDate(chat.updatedAt)}</p>
              </div>
              <button onClick={(e) => deleteChat(chat.id, e)} className="chat-delete-btn" aria-label="Delete">
                <X size={13} />
              </button>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <button onClick={() => setShowFeedback(true)} className="sidebar-feedback-btn" id="feedback-btn">
            <Heart size={15} className="feedback-heart-icon" />
            <span>Send Feedback</span>
          </button>
          <div className="sidebar-contact">
            <p className="contact-label">Need Help?</p>
            <div className="contact-row">
              <button onClick={contactWhatsApp} className="contact-btn whatsapp-btn">
                <MessageSquare size={13} /><span>WhatsApp</span>
              </button>
              <button onClick={contactEmail} className="contact-btn email-btn">
                <Mail size={13} /><span>Email</span>
              </button>
            </div>
          </div>
          {visitorCount && (
            <div className="sidebar-visitors">
              <Users size={12} />
              <span>{visitorCount.toLocaleString()} visitors have sought guidance</span>
            </div>
          )}
        </div>
      </aside>

      {showSidebar && <div className="sidebar-overlay" onClick={() => setShowSidebar(false)} aria-hidden="true" />}

      {/* MAIN */}
      <main className="main-content">
        <header className="app-header">
          <div className="header-content">
            <div className="header-left">
              <button onClick={() => setShowSidebar(true)} className="menu-btn" id="menu-btn" aria-label="Open menu">
                <Menu size={20} />
              </button>
              <div className="header-brand">
                <span className="header-moon">🌙</span>
                <div className="header-text">
                  <h1>Dua by Moon</h1>
                  <p>Islamic Prayer Finder</p>
                </div>
              </div>
            </div>
            <div className="header-actions">
              {showInstallBtn && (
                <button onClick={handleInstall} className="install-btn" id="install-pwa-btn">
                  <Download size={14} />
                  <span className="btn-label">Install App</span>
                </button>
              )}
              <button onClick={createNewChat} className="header-new-chat-btn" id="new-chat-header" aria-label="New chat">
                <Plus size={15} />
                <span className="btn-label">New Chat</span>
              </button>
            </div>
          </div>
        </header>

        <div className="messages-container">
          <div className="messages-wrapper">

            {/* Welcome */}
            {messages.length === 0 && (
              <div className="welcome-screen">
                <div className="welcome-hero">
                  <span className="welcome-crescent">🌙</span>
                  <h2 className="welcome-title">
                    Assalamu <span className="welcome-title-accent">Alaikum</span>
                  </h2>
                  <div className="welcome-divider" />
                  <p className="welcome-subtitle">
                    Describe your need and I'll find the perfect Islamic prayer.
                    Backed by Quran &amp; authentic Hadith.
                  </p>
                </div>

                <div className="examples-section">
                  <p className="examples-label">Try asking</p>
                  <div className="examples-grid">
                    {[
                      'Prayer before leaving the house',
                      'Prayer before eating a meal',
                      'Dua for healing and good health',
                      'Prayer for forgiveness',
                      'Dua when feeling anxious',
                      'Prayer for travelling safely',
                    ].map(ex => (
                      <button key={ex} onClick={() => setQuery(ex)} className="example-btn"
                        id={`ex-${ex.replace(/\s+/g,'-').toLowerCase().slice(0,20)}`}>
                        <ChevronRight size={13} className="example-arrow" />
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>

                {visitorCount && (
                  <div className="welcome-visitors">
                    <Users size={13} />
                    <span>{visitorCount.toLocaleString()} Muslims have used Dua by Moon</span>
                  </div>
                )}
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.type === 'user' ? 'message-user' : 'message-bot'}`}>
                {msg.type === 'user' ? (
                  <div className="user-message"><p>{msg.text}</p></div>
                ) : (
                  <div className="bot-messages">
                    {(msg.duas || []).map((dua, di) => (
                      <article key={di} className="dua-card">
                        {!dua.error && (
                          <button onClick={() => handleShareButtonClick(dua)} className="share-btn-fixed" aria-label="Share prayer" title="Share">
                            <Share2 size={15} />
                          </button>
                        )}
                        {dua.error ? (
                          <div className="dua-error">
                            <p className="error-label">No results</p>
                            <p className="error-text">{dua.error}</p>
                          </div>
                        ) : (
                          <>
                            {dua.title && (
                              <div className="dua-title-row">
                                <Star size={13} className="dua-star" />
                                <h3 className="dua-title">{dua.title}</h3>
                              </div>
                            )}
                            {dua.background && (
                              <div className="dua-section dua-background">
                                <p className="section-label">Background</p>
                                <p className="section-text">{dua.background}</p>
                              </div>
                            )}
                            {dua.arabic && (
                              <div className="dua-section dua-arabic">
                                <p className="section-label">Arabic</p>
                                <p className="arabic-text" dir="rtl" lang="ar">{dua.arabic}</p>
                              </div>
                            )}
                            {dua.refrence && (
                              <div className="dua-section">
                                <p className="section-label">Reference</p>
                                <p className="section-text reference-text">{dua.refrence}</p>
                              </div>
                            )}
                            {dua.meaning && (
                              <div className="dua-section">
                                <p className="section-label">Translation</p>
                                <p className="section-text translation-text">"{dua.meaning}"</p>
                              </div>
                            )}
                          </>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading */}
            {isLoading && (
              <div className="message-row message-bot">
                <div className="loading-card">
                  <div className="loading-dots"><span /><span /><span /></div>
                  <p className="loading-text">Finding your prayer...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="input-container">
          <div className="input-wrapper">
            <input type="text" id="prayer-search-input"
              value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Describe your need… (e.g. prayer before sleeping)"
              className="message-input" aria-label="Prayer search" />
            <button onClick={handleSearch} disabled={!query.trim() || isLoading}
              className="send-btn" id="send-btn" aria-label="Send">
              <Send size={17} />
            </button>
          </div>
          <p className="input-disclaimer">Duas sourced from Quran &amp; authentic Hadith</p>
        </div>

        {visitorCount && (
          <div className="visitors-footer">
            <span>🌙</span>
            <span>{visitorCount.toLocaleString()} visitors have sought guidance here</span>
          </div>
        )}
      </main>

      {/* SHARE MODAL */}
      {shareModal && (
        <div className="sm-overlay" onClick={closeShare}>
          <div className="sm-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sm-handle" />
            <div className="sm-header">
              <div className="sm-header-bg" />
              <div className="sm-header-content">
                <div className="sm-icon-wrap"><Share2 size={18} /></div>
                <div>
                  <h3 className="sm-title">Share this Prayer</h3>
                  {shareModal.dua?.title && <p className="sm-subtitle">{shareModal.dua.title.split(' ').slice(0,5).join(' ')}{shareModal.dua.title.split(' ').length>5?'…':''}</p>}
                </div>
              </div>
              <button onClick={closeShare} className="sm-close" aria-label="Close"><X size={17} /></button>
            </div>

            {isGeneratingImage ? (
              <div className="sm-generating">
                <div className="sm-spinner" />
                <p className="sm-gen-text">Crafting your prayer image…</p>
                <p className="sm-gen-sub">This takes just a moment</p>
              </div>
            ) : (
              <div className="sm-body">
                {generatedImage && (
                  <div className="sm-preview-wrap">
                    <img src={generatedImage} alt="Prayer card" className="sm-preview-img" />
                    <div className="sm-preview-badge"><span>🌙</span><span>Dua by Moon</span></div>
                  </div>
                )}
                <p className="sm-share-label">Share to</p>
                <div className="sm-platforms">
                  <button onClick={() => handleShareClick('whatsapp')} className="sm-platform-btn sm-whatsapp" aria-label="WhatsApp">
                    <div className="sm-platform-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                    </div>
                    <span>WhatsApp</span>
                  </button>
                  <button onClick={() => handleShareClick('twitter')} className="sm-platform-btn sm-twitter" aria-label="X / Twitter">
                    <div className="sm-platform-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </div>
                    <span>X / Twitter</span>
                  </button>
                  <button onClick={() => handleShareClick('telegram')} className="sm-platform-btn sm-telegram" aria-label="Telegram">
                    <div className="sm-platform-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    </div>
                    <span>Telegram</span>
                  </button>
                  <button onClick={() => handleShareClick('download')} className="sm-platform-btn sm-download" aria-label="Download">
                    <div className="sm-platform-icon"><Download size={20} /></div>
                    <span>Download</span>
                  </button>
                </div>
                <p className="sm-tip">💡 Image downloads automatically when sharing on desktop</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FEEDBACK MODAL */}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </div>
  );
}