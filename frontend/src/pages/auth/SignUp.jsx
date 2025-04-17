import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import supabase from "../../../supabaseClient";
export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    async function HandleSignUp(){
        try{
            const {error} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name
                    }
                }
            })
            if(error){
                alert(error.message);
            }else{
                alert("Check your email to verify your account");
            }
        }catch(e){
            console.log(e);
        }
    }
    async function HandleGoogleSignUp(){
        try{
            const {data,error } = await supabase.auth.signInWithOAuth({
                provider: 'google'
            })
            if(error){
                alert(error.message);
            }
        }catch(e){
            console.log(e);
        }
    }
    return (
        <div className="flex justify-center items-center h-screen bg-[#212121]">
            <div
                className="flex bg-[#303030] items-center justify-center rounded-xl "
            >
                <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md px-10 py-10 ">
                    <div className="mb-2 flex justify-center"></div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-[#afafaf]">
                        Have an account?<Link to="/auth/login" className="underline">LogIn</Link>
                    </p>
                    <form className="mt-8" method="POST" action="#">
                        <div className="space-y-5">
                            <div>
                                <label className="text-base font-medium text-[#afafaf]">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name"
                                        type="text"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white "
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-base font-medium text-[#afafaf]">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                    onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        type="email"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white "
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-base font-medium text-[#afafaf]">
                                        Password
                                    </label>
                                    
                                </div>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        type="password"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    className="inline-flex w-full items-center justify-center rounded-md bg-[#212121] px-3.5 py-2.5 font-semibold leading-7 text-white hover:text-[#afafaf]"
                                    type="button"
                                    onClick={HandleSignUp}
                                >
                                    Get started
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-3 space-y-3">
                        <button
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-[#afafaf] focus:bg-gray-100 focus:text-black focus:outline-none"
                            type="button"
                            onClick={HandleGoogleSignUp}
                        >
                            <span className="mr-2 inline-block">
                                <FaGoogle className="text-xl" />
                            </span>
                            Sign up with Google
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}