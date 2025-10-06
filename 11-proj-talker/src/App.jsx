import { useState } from "react"
import { GoogleGenAI } from "@google/genai";
import { ChevronRight, ChevronLeft, Heading1 } from 'lucide-react';

function App() {
  const [question, setQuestion] = useState('')
  const [qlist, setQlist] = useState([])
  const [result, setResult] = useState([])
  const [open, setOpen] = useState(true)

  const ai = new GoogleGenAI({ apiKey: import.meta.env.GEMINI_API_KEY });
  async function handleAsk() {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: question,
        config: {
          systemInstruction: "Your responses must be in plain text only. Do not use Markdown, bolding, or any special formatting characters like asterisks or hashtags. With only min 1 line and max 4 to 5 lines of answers each question that is asked, not more than that"
        }
      });
      console.log(response);
      setResult((prev) => [...prev, response.text])
    } catch (error) {
      console.error("API Error:", error);
    }

  }
  const clicked = () => {
    if (!question.trim()) return;
    setQlist((prev) => [...prev, question])
    const currentQuestion = question;
    setQuestion('')
    handleAsk(currentQuestion)
  }
  const maxLength = Math.min(qlist.length, result.length)
  const ind = Array.from({ length: maxLength }, (_, i) => i)
  // bg-zinc-800
  return (
    <main className=" h-screen font-semibold">
      <div className={`grid ${open ? 'grid-cols-5' : 'grid-cols-1'} h-screen text-center`}>
        <button className="mt-10 absolute left-10 bottom-12 z-10" onClick={() => setOpen(!open)}>
          {!open ? <ChevronRight /> : <ChevronLeft />}
        </button>
        {open &&
          (<div className={`col-span-1} bg-zinc-200 relative`}>

          </div>)}

        {(<div className={`col-span-${open ? '4' : 'full'} p-10`}>
          {!question && (<h1 className="text-xl">Welcome!</h1>)}
          <div className=" h-18/20 w-full  rounded-4xl mb-5  text-white pt-10 flex flex-col overflow-auto">


            {ind.map((i) => (
              <div key={i} >
                <div className="flex justify-end">
                  <p className=" rounded-xl p-2 bg-[#1689fc] overflow-auto text-white mr-0 mb-2 text-end max-w-xl">{qlist[i]}</p>
                </div>

                <div className="flex justify-start">
                  <p className="max-w-xl rounded-xl p-2 bg-[#d3a826] text-black m-2 text-start">
                    {result[i]
                      // && result[i].split('\n').map((line, idx) => (
                      //     <span key={idx} className="block">{line}</span>
                      // ))
                    }
                  </p>
                </div>

              </div>
            ))}
          </div>
          <div className="bg-zinc-200  h-1/20 w-1/2 p-1 pr-5 text-black m-auto rounded-4xl border border-zinc-700 flex h-16 z-[999] ">
            <input type="text" placeholder="Ask me anything" value={question} onChange={(e) => setQuestion(e.target.value)} onKeyUp={(e) => { if (e.key === "Enter") clicked() }} className="w-full h-full p-3 outline-none" />
            <button className="hover:scale-90 transition-all" onClick={clicked} >Ask</button>
          </div>
        </div>)
        }
      </div>
    </main>
  )
}

export default App
