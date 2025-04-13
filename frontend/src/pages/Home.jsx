import { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineContentCopy } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { IoCheckmark } from "react-icons/io5";
import { AiOutlineDislike } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";
import axios from 'axios'
import supabase from '../../supabaseClient';
export default function Home() {
    const [data, setData] = useState('')
    const [prompt, setPrompt] = useState("")
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false)
    const [userImage, setUserImage] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    useEffect(() => {
        async function fetchCurrentUser() {
            const { data } = await supabase.auth.getSession()
            setUserImage(data?.session?.user?.user_metadata?.avatar_url)
            setName(data?.session?.user?.user_metadata?.name)
            setEmail(data?.session?.user?.user_metadata?.email)
        }
        fetchCurrentUser()
    }, [])
    async function FetchPrompt() {
        setPrompt('')
        setIsLoading(true)
        try {
            const response = await axios.post("http://localhost:3000/api/response", {
                prompt: prompt,
                lastPrompt: data
            })
            setData(response.data)
            setIsLoading(false)
            const doc = new DOMParser().parseFromString(response.data, 'text/html')
            console.log(doc.body.innerHTML)
            setChatHistory([...chatHistory, { user: 'You', message: prompt }, { user: 'AI', message: doc.body.innerHTML }])
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="mx-auto flex flex-col h-screen border shadow-lg bg-[#212121]">
            <div className='md:w-50%'>
            </div>
            <div className=" text-white py-4 px-6 flex flex-row justify-between text-lg font-semibold">
                <RxHamburgerMenu size={20} />
                <p>DeepChatGem</p>
                <div onClick={() => setIsOpen(!isOpen)}>
                    {userImage ? <img src={userImage} className='w-8 h-8 rounded-full' /> : <LuUserRound size={20} />}
                    {isOpen && <div className='absolute top-16 right-4 bg-[#303030] p-4 rounded-lg w-[80%]'>
                        <div className='flex flex-row gap-4 items-center mb-4'>
                            {userImage ? <img src={userImage} className='w-8 h-8 rounded-full' /> : <LuUserRound size={20} />}
                            <div className='flex flex-col'>
                                <p className='text-white text-sm tracking-wider'>{name}</p>
                                <p className='text-[#afafaf] text-sm tracking-wider'>{email}</p>
                            </div>
                        </div>
                        <hr className='border-[#afafaf] border-t-[0.1px] mb-4' />
                        <button
                            className="text-sm relative inline-flex w-full items-center justify-center rounded-md border border-red-900 bg-red-700 px-3.5 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white focus:outline-none"
                            onClick={() => {
                                supabase.auth.signOut()
                            }}
                        >
                            Sign Out
                        </button>

                    </div>}
                </div>

            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        className={`max-w-max px-4 py-3 rounded-2xl  ${message.user === 'You'
                            ? 'shadow-sm bg-[#303030] self-end text-right ml-auto'
                            : 'self-start'
                            }`}
                    >
                        {message.user === 'You' ? (
                            <p className="text-white">{message.message}</p>
                        ) : (
                            <div>
                                <div className="text-[#afafaf]" dangerouslySetInnerHTML={{ __html: message.message }} />
                                <div className='mt-4 flex flex-row gap-4'>
                                    {!copied ? <MdOutlineContentCopy size={18} color='#afafaf' onClick={() => {
                                        navigator.clipboard.writeText(message.message)
                                        setTimeout(() => {
                                            setCopied(false)
                                        }, 2000)
                                    }} /> : <IoCheckmark size={18} color='#afafaf' />}
                                    <AiOutlineLike size={18} color='#afafaf' />
                                    <AiOutlineDislike size={18} color='#afafaf' />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex flex-row justify-between items-center gap-3 p-4 bg-[#303030] m-5 rounded-3xl">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask something..."
                    className="flex-1 rounded-lg px-4 py-2 text-white focus:outline-none placeholder:text-[#afafaf]"
                />
                <div className='cursor-pointer bg-[#afafaf] p-2 rounded-full'>
                    <FaArrowUp
                        onClick={FetchPrompt}
                        color='black'
                        size={20}
                    />
                </div>

            </div>
        </div>
    );
}