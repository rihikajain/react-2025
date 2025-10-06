import { useState } from "react"
import { GoogleGenAI } from "@google/genai";
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';

function App() {
  const [question, setQuestion] = useState('')
  const [qlist, setQlist] = useState([])
  const [result, setResult] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyById6b8lJTlPSZKmW080gHRQ265xojtv4"
    //  import.meta.env.GEMINI_API_KEY
  });
  async function handleAsk(q) {
    setLoading(true)
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: q,
        config: {
          systemInstruction: "Your responses must be in plain text only. Do not use Markdown, bolding, or any special formatting characters like asterisks or hashtags. With only min 1 line and max 4 to 5 lines of answers each question that is asked, not more than that"
        }
      });
      setResult((prev) => {
        // Replace the last "loading" with the actual answer
        const newResults = [...prev];
        newResults[newResults.length - 1] = response.text;
        return newResults;
      });
    } catch (error) {
      setResult((prev) => {
        const newResults = [...prev];
        newResults[newResults.length - 1] = "Error fetching answer.";
        return newResults;
      });
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  }
  const clicked = () => {
    if (!question.trim()) return;
    setQlist((prev) => [...prev, question])
    setResult((prev) => [...prev, "loading"]);
    const currentQuestion = question;
    setQuestion('')
    handleAsk(currentQuestion)
  }
  const maxLength = Math.min(qlist.length, result.length)
  const ind = Array.from({ length: maxLength }, (_, i) => i)

  // ...existing code...

  return (
    <main className="font-semibold h-screen bg-white">
      {/* Sidebar Toggle Button */}
      <button className="fixed left-4 top-4 z-50 bg-zinc-200 rounded-full p-2 shadow" onClick={() => setOpen(!open)}>
        {!open ? <ChevronRight /> : <ChevronLeft />}
      </button>

      {/* Sidebar: fixed, only when open */}
      {open &&
        (<div className="fixed left-0 top-0 h-screen w-1/5 bg-zinc-200 z-40">
          {/* Sidebar content here */}
        </div>)
      }

      {/* Main Content Grid */}
      <div className={`flex flex-col items-center ${open ? 'ml-[20%] w-[80%]' : 'w-full'} h-screen relative`}>
        {/* Message Area: scrollable, no scrollbar */}
        <div className="w-full flex-1 pt-10 p-2 mb-5 text-white rounded-4xl overflow-auto no-scrollbar  pb-15 ">
          {!qlist.length && (<h1 className="text-xl text-black text-center">Welcome!</h1>)}
          {ind.map((i) => (
            <div key={i}>
              <div className="flex justify-end">
                <p className="rounded-xl p-2 bg-[#1689fc] text-white mr-0 mb-2 text-end max-w-xl break-words whitespace-pre-line">{qlist[i]}</p>
              </div>
              <div className="flex justify-start">
                <p className="max-w-xl rounded-xl p-2 bg-[#d3a826] text-black m-2 text-start">
                  {result[i] === "loading"
                    ? <Loader2 className="animate-spin h-6 w-6 text-black" />
                    : result[i]
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Input Bar: absolute at bottom center of message area */}
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-200 ${open ? 'w-3/4' : 'w-1/2'} p-1 pr-5 text-black rounded-4xl border border-zinc-700 flex h-16 z-50`}>
          <input type="text" placeholder="Ask me anything" value={question} onChange={(e) => setQuestion(e.target.value)} onKeyUp={(e) => { if (e.key === "Enter") clicked() }} className="w-full h-full p-3 outline-none" />
          <button
            className={` ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-90 transition-all'}`}
            onClick={clicked}
            disabled={loading}
          >
            Ask
          </button>
        </div>
      </div>
    </main>
  )
}

export default App