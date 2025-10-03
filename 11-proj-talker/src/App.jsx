import { useState } from "react"
import { GoogleGenAI } from "@google/genai";

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
      setResult((prev) => [...prev, response.text.replace(/\*\*/g, '')])
    } catch (error) {
      console.error("API Error:", error);
    }

  }
  const clicked = () => {

  }
  // bg-zinc-800
  return (
    <main className=" h-screen ">
      <div className="grid grid-cols-5 h-screen text-center">
        <div className="col-span-1 bg-zinc-600">

        </div>

        <div className="col-span-4 p-10  ">
          <div className="container h-18/20  rounded-4xl mb-5 text-white pt-10 flex flex-col">
            {question && (
              <div className="flex justify-end">
                <p className=" rounded-xl p-2 bg-[#1689fc] text-black m-2 text-end  justify-end">{question}</p>
              </div>
            )}

            {result.map((d, i) => {
              return (
              <p key={i} className="flex justify-start rounded-xl p-2 bg-[#d3a826] text-black m-2 text-start">{d}</p>)
            })}
          </div>
          <div className="bg-zinc-900  h-2/20 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-16 ">
            <input type="text" placeholder="Ask me anything" onChange={(e) => setQuestion(e.target.value)} className="w-full h-full p-3 outline-none" />
            <button className="hover:scale-90 transition-all" onClick={handleAsk}>Ask</button>
          </div>
        </div>

      </div>
    </main>
  )
}

export default App
