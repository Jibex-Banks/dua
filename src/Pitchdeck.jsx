import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Book, Search, Heart, Globe, Users, Smartphone, MessageCircle, Star, Target, Lightbulb, TrendingUp, Mail } from 'lucide-react';

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      type: 'title',
      content: (
        <div className="h-full flex flex-col items-center justify-center text-white p-8">
          <Book className="w-24 h-24 mb-6" />
          <h1 className="text-6xl font-bold mb-4">Dua Search</h1>
          <p className="text-3xl mb-8">Connecting Muslims to Qur'anic Prayers Through AI</p>
          <p className="text-xl italic">"Ask in your own words, receive divine guidance"</p>
        </div>
      )
    },
    
    // Slide 2: The Problem
    {
      type: 'content',
      title: 'The Challenge Muslims Face Daily',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Language Barrier</h3>
            <p className="text-gray-700">Most Muslims don't know prayers in Arabic or can't remember specific verses</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Search Difficulty</h3>
            <p className="text-gray-700">Traditional Islamic texts aren't easily searchable by intent or situation</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Time-Consuming</h3>
            <p className="text-gray-700">Finding the right prayer for a specific life situation takes hours of research</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Disconnect</h3>
            <p className="text-gray-700">Young Muslims struggle to connect with traditional Islamic resources</p>
          </div>
          <div className="mt-8 p-6 bg-blue-900 text-white rounded-lg">
            <p className="text-2xl font-bold">1.8 billion Muslims worldwide</p>
            <p className="text-xl mt-2">80% don't speak Arabic as a first language</p>
          </div>
        </div>
      )
    },
    
    // Slide 3: The Solution
    {
      type: 'content',
      title: 'Dua Search - Your AI-Powered Prayer Assistant',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg mb-6">
            <p className="text-xl">Natural language search for Qur'anic prayers. Users ask questions like "prayer before traveling" and instantly receive relevant verses with translation and context.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <MessageCircle className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">Natural Language Processing</h3>
                <p className="text-gray-700">Ask in plain English (or any language)</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <Search className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">Instant Results</h3>
                <p className="text-gray-700">AI-powered search returns relevant prayers in seconds</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <Book className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">Complete Context</h3>
                <p className="text-gray-700">Background, Arabic text, reference, and translation</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <Smartphone className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">Mobile-First Design</h3>
                <p className="text-gray-700">Beautiful, intuitive chat interface</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <Star className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">Authentic Sources</h3>
                <p className="text-gray-700">Only verified Qur'anic prayers</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-6 bg-blue-900 text-white rounded-lg text-center">
            <p className="text-2xl font-bold">"From searching through books for hours to finding the right prayer in seconds"</p>
          </div>
        </div>
      )
    },
    
    // Slide 4: How It Works
    {
      type: 'content',
      title: 'The Technology Behind Dua Search',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Technical Architecture</h3>
            <div className="space-y-3">
              <p><strong>Frontend:</strong> React-based mobile-first interface</p>
              <p><strong>AI Engine:</strong> Natural Language Processing for query understanding</p>
              <p><strong>Database:</strong> Curated collection of authenticated Qur'anic prayers</p>
              <p><strong>API:</strong> Fast, scalable backend for instant responses</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <h4 className="font-bold text-red-900 mb-3">Traditional Method</h4>
              <p className="text-gray-700">Manual search through books</p>
              <p className="text-3xl font-bold text-red-600 mt-4">30+ minutes</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h4 className="font-bold text-green-900 mb-3">Our Solution</h4>
              <p className="text-gray-700">AI-powered search</p>
              <p className="text-3xl font-bold text-green-600 mt-4">20 seconds</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Why It's Better</h3>
            <div className="grid grid-cols-1 gap-3">
              <p className="text-gray-700">✓ <strong>Traditional Apps:</strong> Static content, poor search</p>
              <p className="text-gray-700">✓ <strong>General Islamic Apps:</strong> Too broad, not focused</p>
              <p className="text-gray-700">✓ <strong>Our Advantage:</strong> AI-powered, conversational, prayer-specific</p>
            </div>
          </div>
        </div>
      )
    },
    
    // Slide 5: Product Screenshots
    {
      type: 'content',
      title: 'Product Demonstration',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 p-3 text-white text-sm font-bold">Splash Screen</div>
              <div className="aspect-[9/16] bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center p-6">
                <Book className="w-16 h-16 text-white mb-4" />
                <p className="text-white text-2xl font-bold text-center">Dua</p>
                <p className="text-white text-sm text-center mt-2">Find Qur'anic Prayers</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 p-3 text-white text-sm font-bold">Welcome Screen</div>
              <div className="aspect-[9/16] bg-gray-50 p-4">
                <div className="bg-blue-600 p-3 rounded-lg text-white mb-4">
                  <Book className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-center font-bold">Dua</p>
                  <p className="text-xs text-center">Find Qur'anic Prayers</p>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg mb-2">Welcome to Dua</h3>
                  <p className="text-sm text-gray-600 mb-4">Ask for any Qur'anic prayer in natural language</p>
                  <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800 mb-4">
                    Note: Currently, only Qur'anic prayers are available. More Islamic prayers will be added soon.
                  </div>
                  <p className="text-sm font-bold mb-2">Try asking:</p>
                  <div className="space-y-2">
                    <div className="bg-white border border-blue-200 rounded-full px-3 py-1 text-xs text-blue-600">Prayer before traveling</div>
                    <div className="bg-white border border-blue-200 rounded-full px-3 py-1 text-xs text-blue-600">Dua for guidance</div>
                    <div className="bg-white border border-blue-200 rounded-full px-3 py-1 text-xs text-blue-600">Prayer for patience</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 p-3 text-white text-sm font-bold">Search Results</div>
              <div className="aspect-[9/16] bg-gray-50 p-3 overflow-y-auto">
                <div className="bg-blue-600 text-white rounded-lg p-2 mb-3 ml-auto max-w-[80%] text-xs">
                  I want to eat
                </div>
                <div className="bg-white rounded-lg shadow p-3 text-xs">
                  <div className="mb-2">
                    <p className="font-bold text-blue-600 mb-1">BACKGROUND</p>
                    <p className="text-gray-700 text-[10px]">Hadrat Anas bin Malikra relates that the Holy Prophet said...</p>
                  </div>
                  <div className="bg-blue-100 p-2 rounded mb-2">
                    <p className="font-bold text-blue-600 mb-1">Arabic</p>
                    <p className="text-right text-[10px]" dir="rtl">رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ</p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-600 mb-1">TRANSLATION</p>
                    <p className="text-gray-700 text-[10px]">"O my Lord, a beggar I am of whatever good You bestow upon me."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-900 text-white p-6 rounded-lg text-center">
            <p className="text-xl font-bold">Chat-like interface familiar to all users</p>
            <p className="mt-2">Demonstrate responsive design with instant results</p>
          </div>
        </div>
      )
    },
    
    // Slide 6: Market Opportunity
    {
      type: 'content',
      title: 'Market Opportunity',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Target Market</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Users className="w-8 h-8 mb-2" />
                <p className="font-bold">Young Muslims (18-35)</p>
                <p className="text-sm">Tech-savvy, seeking connection to faith</p>
              </div>
              <div>
                <Star className="w-8 h-8 mb-2" />
                <p className="font-bold">New Muslims/Converts</p>
                <p className="text-sm">Need accessible Islamic resources</p>
              </div>
              <div>
                <Globe className="w-8 h-8 mb-2" />
                <p className="font-bold">Non-Arabic Speakers</p>
                <p className="text-sm">1.4 billion Muslims worldwide</p>
              </div>
              <div>
                <Heart className="w-8 h-8 mb-2" />
                <p className="font-bold">Parents</p>
                <p className="text-sm">Teaching children about prayers</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-3xl font-bold text-blue-900">1.8 billion</p>
              <p className="text-gray-700">Global Muslim Population</p>
              <p className="text-sm text-gray-600">(24% of world population)</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-3xl font-bold text-blue-900">65%</p>
              <p className="text-gray-700">Smartphone Penetration</p>
              <p className="text-sm text-gray-600">Among Muslims</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-3xl font-bold text-blue-900">$500M+</p>
              <p className="text-gray-700">Islamic App Market</p>
              <p className="text-sm text-gray-600">Growing 12% annually</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-3xl font-bold text-blue-900">200M+</p>
              <p className="text-gray-700">Target Market</p>
              <p className="text-sm text-gray-600">Smartphone-using Muslims</p>
            </div>
          </div>
        </div>
      )
    },
    
    // Slide 7: Impact Model
    {
      type: 'content',
      title: 'Our Approach - Impact Over Profit',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg text-center">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Free for Everyone, Forever</h3>
            <p className="text-lg">Our mission is to connect Muslims to their faith, not to monetize spirituality</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 text-xl mb-3">✓ Completely Free Access</h4>
              <p className="text-gray-700">All Qur'anic prayers accessible to everyone, no paywalls or subscriptions</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 text-xl mb-3">✓ No Advertisements</h4>
              <p className="text-gray-700">Clean, distraction-free experience that respects the spiritual nature of the content</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 text-xl mb-3">✓ Community-Driven</h4>
              <p className="text-gray-700">Built with love for the Muslim community, sustained by donations and grants</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 text-xl mb-3">✓ Open & Transparent</h4>
              <p className="text-gray-700">Committed to keeping this resource accessible for generations to come</p>
            </div>
          </div>
          
          <div className="bg-blue-900 text-white p-6 rounded-lg text-center">
            <p className="text-xl font-bold">Sustainability through voluntary support, grants, and partnerships with Islamic organizations</p>
          </div>
        </div>
      )
    },
    
    // Slide 8: Roadmap
    {
      type: 'content',
      title: 'Development Roadmap',
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-600 p-4">
            <h3 className="font-bold text-green-900 mb-2">Q1 2025 (Current)</h3>
            <div className="space-y-1 text-sm">
              <p>✅ MVP Launch - Qur'anic prayers only</p>
              <p>✅ Natural language search</p>
              <p>✅ Mobile-responsive design</p>
              <p>🔄 User testing and feedback</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
            <h3 className="font-bold text-blue-900 mb-2">Q2 2025</h3>
            <div className="space-y-1 text-sm">
              <p>• Expand to Hadith-based prayers</p>
              <p>• Add audio recitations</p>
              <p>• Implement user accounts</p>
              <p>• Multi-language support (Arabic, Urdu, Turkish, Malay)</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
            <h3 className="font-bold text-blue-900 mb-2">Q3 2025</h3>
            <div className="space-y-1 text-sm">
              <p>• Mobile apps (iOS & Android)</p>
              <p>• Personalized prayer collections</p>
              <p>• Bookmark and favorites</p>
              <p>• Social sharing features</p>
              <p>• Community features</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
            <h3 className="font-bold text-blue-900 mb-2">Q4 2025</h3>
            <div className="space-y-1 text-sm">
              <p>• Advanced AI - context-aware recommendations</p>
              <p>• Voice search capability</p>
              <p>• Offline mode</p>
              <p>• Partnerships with mosques and Islamic centers</p>
            </div>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
            <h3 className="font-bold text-purple-900 mb-2">2026 and Beyond</h3>
            <div className="space-y-1 text-sm">
              <p>• Daily prayer reminders with relevant duas</p>
              <p>• Integration with Islamic calendar events</p>
              <p>• Educational content and courses</p>
              <p>• Global expansion (10+ languages)</p>
            </div>
          </div>
        </div>
      )
    },
    
    // Slide 9: Traction
    {
      type: 'content',
      title: 'Traction & Metrics',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Current Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold">MVP</p>
                <p>In beta testing</p>
              </div>
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p>Authenticated prayers</p>
              </div>
              <div>
                <p className="text-3xl font-bold">&lt;2s</p>
                <p>Average response time</p>
              </div>
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p>Free forever</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-4 text-xl">Early User Feedback</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-700 italic">"Finally, an easy way to find prayers!"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-700 italic">"The interface is so intuitive"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-700 italic">"This is what modern Islamic apps should look like"</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-4 text-xl">Growth Strategy</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-blue-600" />
                <span>SEO & Islamic content marketing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Mosque partnerships</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>Social media outreach</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <span>Word of mouth</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Slide 10: Team
    {
      type: 'content',
      title: 'The Team',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Founding Team</h3>
            <p>Dedicated to serving the Muslim community</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 text-lg mb-2">Mudathir Mudathir</h4>
              <p className="text-sm text-gray-600 mb-2">Founder/CEO, CTO, UI/UX Designer</p>
              <p className="text-gray-700">Vision, strategy, and technical architecture. Leading product development and design.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 text-lg mb-2">Islamic Scholar Advisors</h4>
              <p className="text-sm text-gray-600 mb-2">Ibrahim Faremi, Abdul Basit</p>
              <p className="text-gray-700">Ensuring content authenticity and Islamic accuracy</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-blue-900 text-xl mb-4">Advisory Board</h3>
            <div className="space-y-2 text-sm">
              <p>• Islamic scholars for content verification</p>
              <p>• Tech industry mentors</p>
              <p>• Muslim community leaders</p>
            </div>
          </div>
          
          <div className="bg-blue-900 text-white p-6 rounded-lg text-center">
            <p className="font-bold text-lg">A team passionate about using technology to serve the Ummah</p>
          </div>
        </div>
      )
    },
    
    // Slide 11: Competitive Advantage
    {
      type: 'content',
      title: 'Why We Will Win',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-5 rounded-lg">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-blue-900 text-lg mb-2">Technology First</h4>
                <p className="text-sm text-gray-700">AI-powered natural language understanding, fastest and most accurate search, modern beautiful interface</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-5 rounded-lg">
            <div className="flex items-start space-x-3">
              <Star className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-blue-900 text-lg mb-2">Authentic & Trusted</h4>
                <p className="text-sm text-gray-700">Only verified Qur'anic sources, Islamic scholar reviewed, transparent references</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-5 rounded-lg">
            <div className="flex items-start space-x-3">
              <Heart className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-blue-900 text-lg mb-2">User Experience</h4>
                <p className="text-sm text-gray-700">Chat-based interface familiar to all users, mobile-first design, instant results</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-5 rounded-lg">
            <div className="flex items-start space-x-3">
              <Target className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-blue-900 text-lg mb-2">Focused Niche</h4>
                <p className="text-sm text-gray-700">Prayer-specific, not trying to be everything Islamic. Deep, not broad. Best solution for one problem.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-5 rounded-lg">
            <div className="flex items-start space-x-3">
              <Globe className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-blue-900 text-lg mb-2">Scalable</h4>
                <p className="text-sm text-gray-700">API-first architecture, multi-language ready, global from day one</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Slide 12: Impact Goals
    {
      type: 'content',
      title: '3-Year Impact Goals',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Measuring Our Impact</h3>
            <p>Success is measured in lives touched, not dollars earned</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">Year 1 (2025)</p>
              <p className="text-4xl font-bold text-blue-900 mb-2">50K</p>
              <p className="text-sm text-gray-700">Users Connected</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">Year 2 (2026)</p>
              <p className="text-4xl font-bold text-blue-900 mb-2">500K</p>
              <p className="text-sm text-gray-700">Users Connected</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">Year 3 (2027)</p>
              <p className="text-4xl font-bold text-blue-900 mb-2">2M</p>
              <p className="text-sm text-gray-700">Users Connected</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-4 text-xl">Key Focus Areas</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700"><strong>Year 1:</strong> Product development, user growth, community building</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700"><strong>Year 2:</strong> Scale reach, launch mobile apps, expand language support</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-700"><strong>Year 3:</strong> International expansion, institutional partnerships, educational programs</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
            <h3 className="font-bold text-green-900 mb-3 text-xl">Sustainability Model</h3>
            <div className="space-y-2 text-sm">
              <p>✓ Islamic foundation grants and zakat funds</p>
              <p>✓ Voluntary donations from the community</p>
              <p>✓ Partnerships with mosques and Islamic organizations</p>
              <p>✓ Educational institution sponsorships</p>
            </div>
          </div>
        </div>
      )
    },
    
    // Slide 13: Support Needed
    {
      type: 'content',
      title: 'Support & Partnership Opportunities',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold mb-3">How You Can Help</h3>
            <p className="text-lg">Help us bring 1.8 billion Muslims closer to their faith</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 text-xl mb-3">🤝 Partnership</h4>
              <p className="text-gray-700">Partner with us as a mosque, Islamic center, or educational institution to bring Dua Search to your community</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 text-xl mb-3">💝 Donation/Grant</h4>
              <p className="text-gray-700">Support our mission through grants, zakat, or sadaqah to keep the platform free for everyone</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 text-xl mb-3">📢 Spread the Word</h4>
              <p className="text-gray-700">Share Dua Search with your community, on social media, and with those seeking to strengthen their connection to faith</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 text-xl mb-3">🎓 Content Collaboration</h4>
              <p className="text-gray-700">Islamic scholars and educators can help us verify and expand our prayer database</p>
            </div>
          </div>
          
          <div className="bg-blue-900 text-white p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-3">Initial Support Goal: $50,000</h3>
            <div className="space-y-2 text-sm">
              <p>• Product Development: Mobile apps, additional features</p>
              <p>• Content Expansion: Hadith integration, multi-language support</p>
              <p>• Infrastructure: Hosting, AI improvements, audio recitations</p>
              <p>• Community Outreach: Marketing, partnerships, educational materials</p>
            </div>
          </div>
        </div>
      )
    },
    
    // Slide 14: Impact & Vision
    {
      type: 'content',
      title: 'Our Impact & Vision',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg text-center">
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">Social Mission</h3>
            <p className="text-2xl">"Bringing 1.8 billion Muslims closer to their faith through technology"</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-6 rounded-lg">
              <Globe className="w-10 h-10 text-blue-600 mb-3" />
              <h4 className="font-bold text-blue-900 mb-2">Accessibility</h4>
              <p className="text-sm text-gray-700">Make Islamic prayers accessible to non-Arabic speakers worldwide</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <Book className="w-10 h-10 text-blue-600 mb-3" />
              <h4 className="font-bold text-blue-900 mb-2">Education</h4>
              <p className="text-sm text-gray-700">Help Muslims learn and understand Qur'anic wisdom</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <Heart className="w-10 h-10 text-blue-600 mb-3" />
              <h4 className="font-bold text-blue-900 mb-2">Connection</h4>
              <p className="text-sm text-gray-700">Strengthen spiritual connection through ease of access</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <Star className="w-10 h-10 text-blue-600 mb-3" />
              <h4 className="font-bold text-blue-900 mb-2">Preservation</h4>
              <p className="text-sm text-gray-700">Digital preservation of Islamic knowledge for future generations</p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
            <h3 className="font-bold text-purple-900 mb-4 text-xl text-center">Long-Term Vision</h3>
            <p className="text-center text-gray-700 text-lg">
              Become the #1 trusted platform for Islamic prayers worldwide, helping millions of Muslims connect with their faith daily through technology
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-3 text-center">The Future</h3>
            <div className="space-y-2 text-center">
              <p>✨ AI that understands your life context</p>
              <p>🤲 Personalized spiritual guidance</p>
              <p>🌍 Global Muslim community platform</p>
              <p>📚 Preserving and sharing Islamic knowledge for generations</p>
            </div>
          </div>
        </div>
      )
    },
    
    // Slide 15: Call to Action
    {
      type: 'content',
      title: 'Join Us in This Journey',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg text-center">
            <h3 className="text-3xl font-bold mb-4">Let's Make Islamic Prayers Accessible</h3>
            <p className="text-xl">To every Muslim, everywhere</p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-4 text-xl">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-blue-600" />
                <a href="mailto:mudathirajibolamudathir@gmail.com" className="text-blue-600 hover:underline">
                  mudathirajibolamudathir@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-6 h-6 text-blue-600" />
                <a href="https://duabymoon.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  duabymoon.netlify.app
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
            <h3 className="font-bold text-green-900 mb-4 text-xl">12-Month Milestones</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                <span>100,000+ registered users</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                <span>Hadith library launch</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                <span>iOS & Android apps live</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                <span>10+ language support</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                <span>50+ mosque partnerships</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                <span>Sustainable funding model</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-900 text-white p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-4 text-center">Next Steps</h3>
            <div className="space-y-2">
              <p>1️⃣ Schedule a detailed product demo</p>
              <p>2️⃣ Discuss partnership or support opportunities</p>
              <p>3️⃣ Meet the team</p>
              <p>4️⃣ Explore collaboration possibilities</p>
            </div>
          </div>
          
          <div className="text-center p-8">
            <p className="text-2xl font-bold text-blue-900 mb-2">🤲 Dua Search 🤲</p>
            <p className="text-lg text-gray-600 italic">"Where Technology Meets Faith"</p>
          </div>
        </div>
      )
    }
  ];

  const currentSlideData = slides[currentSlide];
  const isGradientSlide = currentSlideData.type === 'title';

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div 
          className={`relative rounded-lg shadow-2xl overflow-hidden ${
            isGradientSlide 
              ? 'bg-gradient-to-br from-blue-600 to-blue-900' 
              : 'bg-white'
          }`}
          style={{ aspectRatio: '16/9', minHeight: '600px' }}
        >
          <div className="h-full overflow-y-auto">
            {currentSlideData.type === 'content' && (
              <div className="p-12">
                <h2 className="text-4xl font-bold text-blue-900 mb-8 pb-4 border-b-4 border-blue-600">
                  {currentSlideData.title}
                </h2>
                {currentSlideData.content}
              </div>
            )}
            {currentSlideData.type === 'title' && currentSlideData.content}
          </div>

          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;