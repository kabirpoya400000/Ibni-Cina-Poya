import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Mic, Phone, Send, Volume2, Loader2, User } from 'lucide-react';
import { chatWithHakimStream, generateHakimVoice } from '../services/geminiService';
import { ChatMessage } from '../types';

export default function HakimConsultation() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '1',
    role: 'ai',
    text: 'سلام بر شما. من ابن سینا هستم. چه مشکلی شما را به اینجا کشانده است؟'
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'fa-IR';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleSend(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        if (isVoiceMode && event.error !== 'no-speech') {
          setIsVoiceMode(false);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const playPcmData = async (base64: string) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const audioCtx = audioCtxRef.current;
    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0;
    }
    const audioBuffer = audioCtx.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.playbackRate.value = 1.15;
    source.connect(audioCtx.destination);
    source.start();
    
    return new Promise(resolve => {
      source.onended = resolve;
    });
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', text: '', isStreaming: true }]);

    try {
      let fullText = '';
      const stream = await chatWithHakimStream(messages, text);
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: fullText } : m));
      }
      
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, isStreaming: false } : m));
      setIsTyping(false);

      try {
        const audioBase64 = await generateHakimVoice(fullText);
        if (audioBase64) {
          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, audioBase64 } : m));
          await playPcmData(audioBase64);
          
          if (isVoiceMode && recognitionRef.current) {
            setIsListening(true);
            recognitionRef.current.start();
          }
        }
      } catch (audioErr) {
        console.error('Audio generation failed', audioErr);
        if (isVoiceMode && recognitionRef.current) {
            setIsListening(true);
            recognitionRef.current.start();
        }
      }
    } catch (error) {
      console.error('Chat failed', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'ai', 
        text: 'متاسفانه در برقراری ارتباط مشکلی پیش آمد. لطفا دوباره تلاش کنید.' 
      }]);
      if (isVoiceMode) setIsVoiceMode(false);
    }
  };

  const toggleVoiceMode = () => {
    if (!recognitionRef.current) return alert('مرورگر شما از تشخیص صدا پشتیبانی نمی‌کند.');
    
    if (isVoiceMode) {
      setIsVoiceMode(false);
      setIsListening(false);
      recognitionRef.current.stop();
    } else {
      setIsVoiceMode(true);
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const startSingleDictation = () => {
    if (!recognitionRef.current) return alert('مرورگر شما از تشخیص صدا پشتیبانی نمی‌کند.');
    setIsVoiceMode(false);
    setIsListening(true);
    recognitionRef.current.start();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-4xl mx-auto">
      <div className="flex items-center justify-between bg-white border border-slate-200 shadow-sm p-4 rounded-2xl mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">حکیم ابن سینا</h2>
            <p className="text-sm text-slate-500">مشاوره آنلاین طب سنتی</p>
          </div>
        </div>
        <button 
          onClick={toggleVoiceMode}
          className={`p-3 rounded-full transition-all ${isVoiceMode ? 'bg-red-500 text-white animate-pulse shadow-md' : 'bg-slate-50 border border-slate-200 text-emerald-600 hover:text-emerald-700 hover:bg-slate-100'}`}
          title="حالت مکالمه پیوسته"
        >
          <Phone className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 p-4 mb-6 rounded-2xl bg-slate-50 border border-slate-100">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white shadow-sm rounded-2xl rounded-tl-none' 
                : 'bg-white border border-slate-200 shadow-sm text-slate-800 rounded-2xl rounded-tr-none'
            }`}>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
              {msg.role === 'ai' && msg.audioBase64 && !msg.isStreaming && (
                <button 
                  onClick={() => playPcmData(msg.audioBase64!)}
                  className="mt-3 p-2 rounded-full bg-slate-50 border border-slate-200 text-emerald-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 shadow-sm p-4 rounded-2xl rounded-tr-none">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border border-slate-200 shadow-sm p-4 rounded-2xl shrink-0 flex items-center gap-3">
        <button 
          onClick={startSingleDictation}
          className={`p-3.5 rounded-xl transition-all ${isListening && !isVoiceMode ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-50 border border-slate-200 text-emerald-600 hover:text-emerald-700 hover:bg-slate-100'}`}
        >
          <Mic className="w-5 h-5" />
        </button>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="پیام خود را بنویسید..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 font-medium transition-all"
        />
        <button 
          onClick={() => handleSend(input)}
          className="p-3.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
