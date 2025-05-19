import React from 'react'
import background from '../assets/resources/Hero-Background-notecode@2x.png'
import logo from '../assets/resources/NoteCodeLogo.svg'
import CodeEditor from '../components/CodeEditor'

const Home = () => {
    return (
        <div className='relative w-full min-h-screen overflow-x-hidden'>
            {/* Background with gradient and image */}
            <div className='fixed inset-0 z-0'>
                <div className='relative w-full h-full bg-gradient-to-r from-purple-500 to-purple-800'>
                    <img 
                        src={background} 
                        alt="Decorative background"
                        className='absolute inset-0 w-full h-full object-cover opacity-90'
                    />
                </div>
            </div>
            
            {/* Content */}
            <div className='relative z-10 w-full min-h-screen flex flex-col'>
                {/* Header with logo */}
                <div className='pt-5 flex flex-col items-center gap-2'>
                    <img src={logo} alt="NoteCode Logo" className='w-40'/>
                    <p className='font-bold text-xl font-poppins'>Create & Share</p>
                    <p className='font-semibold text-2xl font-poppins'>Your Code Easily.</p>
                </div>
                
                {/* Code Editor */}
                <div className='flex-grow flex items-center justify-center px-4 py-8 md:py-4'>
                    <div className='w-full max-w-4xl h-full md:h-[70vh]'>
                        <CodeEditor />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home