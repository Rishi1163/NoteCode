import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AceEditor from "react-ace"

import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-xcode'

const Snippetpage = () => {
  const { uuid } = useParams()
  const [loading, setLoading] = useState(true)
  const [snippet, setSnippet] = useState(null)

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/snippet/${uuid}`)
        console.log("Snippet fetched:", res.data.snippet)
        setSnippet(res.data.snippet)
      } catch (error) {
        console.error("Error fetching snippet", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSnippet()
  }, [uuid])

  if (loading) return <p className="text-center mt-10 text-lg text-black font-bold">Loading...</p>
  if (!snippet) return <p className="text-center mt-10 text-red-500">Snippet not found.</p>

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-purple-800 flex flex-col items-center px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 font-poppins drop-shadow-md">Shared Snippet</h1>
      <div className="w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden">
        <AceEditor
          mode={snippet.language}
          theme={snippet.theme}
          value={snippet.code}
          readOnly={true}
          fontSize={16}
          showPrintMargin={false}
          width="100%"
          height="70vh"
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
            useWorker: false,
          }}
        />
      </div>
    </div>
  )
}

export default Snippetpage
