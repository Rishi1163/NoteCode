import React, { useState, useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-xcode';
import share from '../assets/resources/Share.svg';
import axios from 'axios'

const CodeEditor = () => {
  const [language, setLanguage] = useState('html');
  const [theme, setTheme] = useState("monokai");
  const [code, setCode] = useState(`<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      h1 {
        color: #cca3a3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample..., visit devChallenges.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`);

  const editorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [key, setKey] = useState(0); // Add key state to force remount

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Force full theme reload when theme changes
  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [theme]);

  const handleShare = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/snippet/post`, {
        code, language, theme
      })

      const { uuid } = res.data
      const sharableUrl = `${window.location.origin}/snippet/${uuid}`
      console.log("shareAbleurl", sharableUrl)
      await navigator.clipboard.writeText(sharableUrl)
      alert("Sharable link copied to clipboard")
    } catch (error) {
      console.error("Error while generating shareable link:", error);
      alert("Something went wrong. Try again.");
    }
  }

  // console.log(import.meta.env.VITE_BACKEND_URL)

  return (
    <div className='relative flex justify-center'>
      <AceEditor
        key={key}
        ref={editorRef}
        mode={language}
        theme={theme}
        value={code}
        onChange={setCode}
        fontSize={isMobile ? 14 : 16}
        height={isMobile ? '60vh' : '70vh'}
        width={isMobile ? '85vw' : '70vw'}
        showPrintMargin={false}
        showGutter={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false
        }}
        style={{
          borderRadius: '4px'
        }}
      />

      {/* Rest of your component remains the same */}
      <div className='absolute flex gap-2 w-full bottom-3 left-16 md:left-40'>
        <div className='bg-gray-300 py-1 px-2 rounded-full md:w-20 w-16'>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className='w-14 text-xs md:text-sm outline-none font-poppins bg-transparent'>
            <option value="html">HTML</option>
            <option value="javascript">JavaScript</option>
            <option value='python'>Python</option>
            <option value='java'>Java</option>
          </select>
        </div>

        <div className='hidden md:block bg-gray-300 py-1 rounded-full md:w-22 w-16'>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className='w-14 md:w-[4.5rem] px-3 text-xs md:text-sm outline-none font-poppins bg-transparent'>
            <option value="monokai">Dark</option>
            <option value="github">Light</option>
            <option value="twilight">Twilight</option>
            <option value="xcode">Xcode</option>
          </select>
        </div>

        <button className='absolute right-22 md:right-72 -bottom-2 z-10 rounded-full bg-blue-600 px-3 py-1 md:px-5 cursor-pointer md:py-2 mb-2 text-white flex gap-2  font-semibold font-poppins hover:bg-blue-700 transition-colors' onClick={handleShare}>
          <img src={share} alt="Share" className='h-5 w-5' />
          Share
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;