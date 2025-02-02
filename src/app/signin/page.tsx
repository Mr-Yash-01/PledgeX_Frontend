'use client';

import InputField from "../../components/InputField";
import { BsFillPlugFill, BsKeyFill } from "react-icons/bs";
import Title from "@/components/Title";
import Button from "@/components/Button";
import Info from "@/components/Info";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { signInWithGoogle, signInWithGithub } from "@/services/auth";
import { useRouter } from "next/navigation";


export default function Signin() {
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isConnectButtonEnabled, setIsConnectButtonEnabled] = useState(false);
    const router = useRouter();
    

    useEffect(() => {
        // Enable/disable button based on validity of email and password
        setIsConnectButtonEnabled(isEmailValid && isPasswordValid);
    }, [isEmailValid, isPasswordValid]);

    const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const containerDiv = document.getElementById("signinEmailDiv");

        if (!email) {
            // If email is empty, remove all validation styles
            containerDiv?.classList.remove("shadow-green-700", "shadow-red-700");
            setIsEmailValid(false);
        } else if (!emailRegex.test(email)) {
            // If email is invalid, apply error style
            containerDiv?.classList.add("shadow-red-700");
            containerDiv?.classList.remove("shadow-green-700");
            setIsEmailValid(false);
        } else {
            // If email is valid, apply success style
            containerDiv?.classList.add("shadow-green-700");
            containerDiv?.classList.remove("shadow-red-700");
            setIsEmailValid(true);
        }
    };

    const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const containerDiv = document.getElementById("signinPasswordDiv");

        if (e.target.value.length === 0) {
            // If password is empty, remove all validation styles
            containerDiv?.classList.remove("shadow-green-700", "shadow-red-700");
            setIsPasswordValid(false);
        } else {
            // If password is non-empty, apply success style
            containerDiv?.classList.add("shadow-green-700");
            containerDiv?.classList.remove("shadow-red-700");
            setIsPasswordValid(true);
        }
    };

    const handleConnect = () => {
        console.log("Connect button clicked");

        const email = (document.getElementById("signinEmail") as HTMLInputElement).value;
        const password = btoa((document.getElementById("signinPassword") as HTMLInputElement).value); // Encrypt password using base64 encoding

        axios.post('http://localhost:4000/auth/signin/ep', { email, password }, {withCredentials: true})
            .then(response => {
                try {
                    console.log(response);
                    if (response.status === 200) {
                        // Redirect to dashboard
                        const userData = response.data.user;
                        console.log(userData);

                        localStorage.setItem('userData', JSON.stringify(userData));
                        

                        if (userData.role === 'Clients') {
                            router.push("/dashboard/c");
                        } else {
                            router.push("/dashboard/f");
                        }
                        
                        // if (userData.role === 'Clients') {
                        //     window.location.href = "/dashboard/c";
                        // } else {
                        //     window.location.href = "/dashboard/f";
                        // }

                    } else {
                        console.log("User does not exist");
                    }

                } catch (error) {
                    console.log(error);

                }
            }).catch(error => {
                console.log(error);
            });

    };

    const handleGoogleSignIn = async () => {
        const token = await signInWithGoogle();
        console.log(token);

        axios.post('http://localhost:4000/auth/signin/gg',{ token })
            .then(response => {
                try {
                    console.log(response);
                    if (response.status === 200) {
                        console.log("Google sign-in successful");
                        // Redirect to dashboard
                    } else {
                        console.log("Google sign-in failed");
                    }
                } catch (error) {
                    console.log(error);
                }
            }).catch(error => {
                console.log(error);
            });

    };

    const handleGithubSignIn = async () => {
        const token = await signInWithGithub();
        console.log(token);

        axios.post('http://localhost:4000/auth/signin/gh', { token })
            .then(response => {
                try {
                    console.log(response);
                    if (response.status === 200) {
                        console.log("Github sign-in successful");
                        // Redirect to dashboard
                    } else {
                        console.log("Github sign-in failed");
                    }
                } catch (error) {
                    console.log(error);
                }
            }).catch(error => {
                console.log(error);
            });

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg text-text">
            <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-text px-6 py-6 md:px-24 lg:px-64 lg:py-20" >
                <div className="w-full h-full flex flex-col gap-4 flex-grow rounded-lg px-6 py-4 shadow-2xl shadow-zinc-600 md:gap-[4px] lg:flex-row">
                    {/* Logo and welcome message */}
                    <div className="flex flex-col items-center lg:w-1/2 lg:justify-center">
                        <img src="/LogoWhite.svg" alt="logo" className="w-1/2 md:w-1/3 lg:w-4/6" />
                        <Title title="Welcome back!" />
                        <Info className="md:text" info="Access your account securely"></Info>
                    </div>

                    {/* Sign in form */}
                    <div className="mt-4 md:mt-0 lg:flex-grow lg:px-16 py-4">
                        <Title title="Sign In" />
                        <Info info="Enter your Credentials" />
                        <InputField
                            containerId="signinEmailDiv"
                            id="signinEmail"
                            title="Email"
                            icon={IoMdMail}
                            placeholder="abc@def.com"
                            type="email"
                            onChange={validateEmail}
                        />
                        <InputField
                            containerId="signinPasswordDiv"
                            id="signinPassword"
                            title="Password"
                            icon={BsKeyFill}
                            placeholder="Min 6 Characters"
                            type="password"
                            onChange={validatePassword}
                        />
                        <Info info="Forgot Password?" className="text-right underline" />
                        <Button
                            id="connect"
                            name="Connect"
                            title="Sign In"
                            icon={BsFillPlugFill}
                            onClick={handleConnect}
                            disabled={!isConnectButtonEnabled}
                            className="md:py-4"
                        />

                        {/* Divider */}
                        <div className="flex flex-row items-center gap-4 mt-8">
                            <hr className="w-full opacity-30"></hr>
                            <Info info="Or" className="text-center" />
                            <hr className="w-full opacity-30"></hr>
                        </div>

                        {/* Social sign in buttons */}
                        <Button
                            name="Google"
                            title="Sign In with Google"
                            onClick={handleGoogleSignIn}
                            className="w-full flex justify-center items-center"
                            icon={FaGoogle}
                        />
                        <Button
                            name="Github"
                            title="Sign In with Github"
                            onClick={handleGithubSignIn}
                            className="w-full flex justify-center items-center"
                            icon={FaGithub}
                        />
                        {/* Sign up link */}
                        <div className="flex flex-row items-center justify-center gap-2 mt-4 lg:flex-col">
                            <Info info="Don't have an account?" className="text-center" />
                            <Info info="Sign Up" link="/signup" className="text-center underline" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
