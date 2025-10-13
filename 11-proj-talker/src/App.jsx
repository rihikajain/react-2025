import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { ChevronRight, ChevronLeft, Loader2, Trash2, MessageSquare, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [question, setQuestion] = useState("");
  const [currentChatId, setCurrentChatId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
  });

  const lastRequestTime = useRef(0);
  const RATE_LIMIT_MS = 3000;

  // Load sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chat_sessions");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed);
      if (parsed.length > 0) setCurrentChatId(parsed[0].id);
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem("chat_sessions", JSON.stringify(sessions));
  }, [sessions]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, currentChatId]);

  const currentSession = sessions.find(s => s.id === currentChatId);

  async function handleAsk(q, sessionIdParam = null) {
    const sessionIdToUse = sessionIdParam || currentChatId;
    const session = sessions.find(s => s.id === sessionIdToUse);
    if (!session) return;

    const now = Date.now();
    if (now - lastRequestTime.current < RATE_LIMIT_MS) {
      updateSessionResult(sessionIdToUse, "⏳ Wait a few seconds before asking again.");
      return;
    }
    lastRequestTime.current = now;

    if (!sessionIdParam) updateSessionQlist(sessionIdToUse, q, "loading");

    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: q,
        config: { systemInstruction: "Plain text only, 1-5 lines max." }
      });
      updateSessionResult(sessionIdToUse, response.text || "No response received.");
    } catch (error) {
      console.error("API Error:", error);
      updateSessionResult(sessionIdToUse, "❌ Error fetching answer.");
    } finally {
      setLoading(false);
    }
  }

  function updateSessionQlist(sessionId, q, initialResult = null) {
    setSessions(prev =>
      prev.map(s => {
        if (s.id !== sessionId) return s;
        return { ...s, qlist: [...s.qlist, q], result: [...s.result, initialResult ?? ""] };
      })
    );
  }

  function updateSessionResult(sessionId, answer) {
    setSessions(prev =>
      prev.map(s => {
        if (s.id !== sessionId) return s;
        const newResult = [...s.result];
        newResult[newResult.length - 1] = answer;
        return { ...s, result: newResult };
      })
    );
  }

  function clicked() {
    if (!question.trim() || loading) return;

    if (!currentSession) {
      const sessionId = uuidv4();
      const firstMsg = question;
      const newSession = {
        id: sessionId,
        title: firstMsg,
        qlist: [firstMsg],
        result: ["loading"]
      };
      setSessions(prev => [newSession, ...prev]);
      setCurrentChatId(sessionId);
      setQuestion("");
      handleAsk(firstMsg, sessionId);
      return;
    }

    handleAsk(question);
    setQuestion("");
  }

  function newChat() {
    const id = uuidv4();
    const session = { id, title: "New Chat", qlist: [], result: [] };
    setSessions(prev => [session, ...prev]);
    setCurrentChatId(id);
  }

  function selectSession(id) {
    setCurrentChatId(id);
  }

  function clearAllSessions() {
    setSessions([]);
    setCurrentChatId(null);
    localStorage.removeItem("chat_sessions");
  }

  return (
    <main className="font-semibold h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-14 bg-blue-500 text-white flex items-center px-4 z-50 shadow-md">
        <img src="../public/chat.png" alt="Logo" className="w-8 h-8 rounded-full mr-2" />
        <h1 className="text-lg font-bold">Talker</h1>
      </div>

      {/* Sidebar Toggle */}
      <button
        className="fixed left-2 top-16 z-50 bg-zinc-200 rounded-full p-2 shadow"
        onClick={() => setSidebarOpen(prev => !prev)}
      >
        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed left-0 top-14 h-[calc(100%-3.5rem)] w-1/5 bg-zinc-200 z-40 p-4 flex flex-col">
          {/* Scrollable History */}
          <div className="flex-1 overflow-y-auto mb-2">
            <button
              className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded mb-4 hover:bg-blue-600 w-full mt-9"
              onClick={newChat}
            >
              <Plus className="w-4 h-4" /> New Chat
            </button>

            <h2 className="text-lg font-bold mb-2">Chat History</h2>
            <div className="space-y-2">
              {sessions.map(s => (
                <div
                  key={s.id}
                  onClick={() => selectSession(s.id)}
                  className={`cursor-pointer bg-white hover:bg-zinc-300 flex items-center gap-2 rounded-xl p-2 transition ${s.id === currentChatId ? "border-2 border-blue-500" : ""}`}
                >
                  <MessageSquare className="w-4 h-4 text-gray-700" />
                  <span className="truncate">{s.qlist[0] || s.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clear All button */}
          <div className="mt-auto">
            <button
              onClick={clearAllSessions}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 w-full"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className={`flex flex-col items-center ${sidebarOpen ? "ml-[20%] w-[80%]" : "ml-0 w-full"} h-screen relative pt-14`}>
        <div className="w-full flex-1 pt-4 p-2 mb-5 overflow-auto pb-12">
          {!currentSession || currentSession.qlist.length === 0 ? (
            <h1 className="text-xl text-black text-center mt-8">Welcome! Start a new chat 👋</h1>
          ) : (
            currentSession.qlist.map((q, i) => (
              <div key={i} id={`msg-${i}`}>
                <div className="flex justify-end">
                  <p className="rounded-xl p-2 bg-[#1689fc] text-white mb-2 text-end max-w-xl break-words whitespace-pre-line">{q}</p>
                </div>
                <div className="flex justify-start">
                  <p className="max-w-xl rounded-xl p-2 bg-[#d3a826] text-black m-2 text-start">
                    {currentSession.result[i] === "loading" ? <Loader2 className="animate-spin h-6 w-6 text-black" /> : currentSession.result[i]}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-200 w-3/4 p-1 pr-5 text-black rounded-3xl border border-zinc-700 flex h-16 z-50">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyUp={e => { if (e.key === "Enter") clicked(); }}
            className="w-full h-full p-3 outline-none bg-transparent rounded-3xl"
          />
          <button
            className={`${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-90 transition-all"}`}
            onClick={clicked}
            disabled={loading}
          >
            Ask
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
