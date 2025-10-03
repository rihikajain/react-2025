import { useState } from "react"
import { GoogleGenAI } from "@google/genai";
import { ChevronRight, ChevronLeft } from 'lucide-react';

function App() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState([])


  const ai = new GoogleGenAI({ apiKey: "AIzaSyById6b8lJTlPSZKmW080gHRQ265xojtv4" });

  async function handleAsk() {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: question,
        // config: {
        //   systemInstruction: "Your responses must be in plain text only. Do not use Markdown, bolding, or any special formatting characters like asterisks or hashtags."
        // }
      });
      console.log(response);
      setResult((prev) => [...prev, response.text.split('*')])
    } catch (error) {
      console.error("API Error:", error);
    }

  }
  const clicked = () => {

  }

  let [open, setOpen] = useState(true)
  // bg-zinc-800
  return (
    <main className=" h-screen ">
      <div className={`grid ${open ? 'grid-cols-5' : 'grid-cols-1'} h-screen text-center`}>
        <button className="mt-10 absolute left-10 z-10" onClick={() => setOpen(!open)}>{!open ? <ChevronRight /> : <ChevronLeft />}</button>
        {open && (<div className={`col-span-1} bg-zinc-200 relative`}>
          <div></div>

        </div>)}

        {(<div className={`col-span-${open ? '4' : 'full'} p-10`}>
          <div className=" h-18/20 w-full  rounded-4xl mb-5  text-white pt-10 flex flex-col">
            {question && (
              <div className="flex justify-end">
                <p className=" rounded-xl p-2 bg-[#1689fc] overflow-auto text-black mr-0 mb-2 text-end max-w-xl">{question}</p>
              </div>
            )}

            {result.map((d, i) => {
              return (
                <p key={i} className="max-w-xl rounded-xl p-2 bg-[#d3a826] text-black m-2 text-start">{d}</p>)
            })}
          </div>
          <div className="bg-zinc-200  h-2/20 w-1/2 p-1 pr-5 text-black m-auto rounded-4xl border border-zinc-700 flex h-16 ">
            <input type="text" placeholder="Ask me anything" onChange={(e) => setQuestion(e.target.value)} className="w-full h-full p-3 outline-none" />
            <button className="hover:scale-90 transition-all" onClick={handleAsk}>Ask</button>
          </div>
        </div>)
        }
      </div>
    </main>
  )
}

export default App
