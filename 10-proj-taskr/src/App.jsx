import { useState, useEffect } from "react"
let useFetchh = (url) => {
  let [data, setData] = useState(null)
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(null)

  useEffect(() => {
    let fetchData = async () => {
      try {
        let res = await fetch(url)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        let dataa = await res.json()
        setData(dataa)

        return
      } catch (error) {
        setError(error);
      }
      finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])
  return { data, error, loading }
}

function App() {

  const { data, error, loading } = useFetchh("https://randomuser.me/api/")

  if (loading) {
    return (
      <div className="p-4 bg-blue-100 text-blue-800 rounded-lg shadow-md">
        Loading user data...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 font-mono rounded-lg shadow-md">
        <p className="font-semibold mb-2">Error Detected!</p>
        <p className="text-sm break-words">
          {/* The error object's message will contain details about the failed fetch */}
          **{error.message}** </p>
      </div>
    )
  }
  return (

    (
      <div className="p-4 bg-green-100 text-green-800 rounded-lg shadow-md">
        <p className="font-semibold mb-2">Data Fetched Successfully!</p>
        <pre className="text-xs overflow-auto max-h-64">
          {Object.values(data).map(value => {
            <p>value</p>
          })}
          {Object.keys(data).map(key => {
            <p>{key}: {JSON.stringify(data[key])}</p>
          })}
        </pre>
        {data.results && data.results.length > 0 && (
          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700">First User Details:</h2>
            <p><strong>Name:</strong> {data.results[0].name.first} {data.results[0].name.last}</p>
            <p><strong>Email:</strong> {data.results[0].email}</p>
          </div>
        )}
      </div>
    )

  )
}

export default App
