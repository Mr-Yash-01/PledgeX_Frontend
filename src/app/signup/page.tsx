"use client";

import InputField from "../../components/InputField";
import { BsKeyFill } from "react-icons/bs";
import Title from "@/components/Title";
import Button from "@/components/Button";
import Info from "@/components/Info";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { IoMdCheckmark, IoMdMail, IoMdPersonAdd } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { signInWithGithub, signInWithGoogle } from "@/services/auth";
import { GrLinkNext } from "react-icons/gr";
import { IoPerson } from "react-icons/io5";
import Checkbox from "@/components/Checkbox";

export default function SignUp() {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [iscb1Checked, setcb1Checked] = useState(false);
  const [iscb2Checked, setcb2Checked] = useState(false);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
    picture: "",
    uid: "",
    about: "",
    publicAddress: ""
  });

  useEffect(() => {
    // Enable/disable button based on validity of email and password
    setIsNextButtonEnabled(isEmailValid && isPasswordValid);
    if (isEmailValid && isPasswordValid) {
      nextButtonRef.current?.classList.remove("shadow-zinc-900");
      nextButtonRef.current?.classList.add("shadow-green-700");
    }
    const emailInput = document.getElementById(
      "signinEmail"
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "signinPassword"
    ) as HTMLInputElement;
    if (emailInput)
      validateEmail({
        target: emailInput,
      } as React.ChangeEvent<HTMLInputElement>);
    if (passwordInput)
      validatePassword({
        target: passwordInput,
      } as React.ChangeEvent<HTMLInputElement>);
  }, [isEmailValid, isPasswordValid, currentStep]);

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const containerDiv = document.getElementById("signinEmailDiv");

    if (!email) {
      // If email is empty, remove all validation styles
      containerDiv?.classList.remove("shadow-green-700", "shadow-red-700");
      nextButtonRef.current?.classList.remove("shadow-green-700");
      nextButtonRef.current?.classList.add("shadow-zinc-900");
      setIsEmailValid(false);
    } else if (!emailRegex.test(email)) {
      // If email is invalid, apply error style
      containerDiv?.classList.add("shadow-red-700");
      containerDiv?.classList.remove("shadow-green-700");
      nextButtonRef.current?.classList.remove("shadow-green-700");
      nextButtonRef.current?.classList.add("shadow-zinc-900");
      setIsEmailValid(false);
    } else {
      // If email is valid, apply success style
      containerDiv?.classList.add("shadow-green-700");
      containerDiv?.classList.remove("shadow-red-700");
      setIsEmailValid(true);
    }
  };

const validatePublicAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const publicAddress = e.target.value;
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    const containerDiv = document.getElementById("yourPublicAddressDiv");

    setUser((prevState) => ({ ...prevState, publicAddress }));
    // if (!publicAddress) {
    //     // If public address is empty, remove all validation styles
    //     containerDiv?.classList.remove("shadow-green-700", "shadow-red-700");
    //     nextButtonRef.current?.classList.remove("shadow-green-700");
    //     nextButtonRef.current?.classList.add("shadow-zinc-900");
    //     setUser((prevState) => ({ ...prevState, publicAddress: "" }));
    // } else if (!addressRegex.test(publicAddress)) {
    //     // If public address is invalid, apply error style
    //     containerDiv?.classList.add("shadow-red-700");
    //     containerDiv?.classList.remove("shadow-green-700");
    //     nextButtonRef.current?.classList.remove("shadow-green-700");
    //     nextButtonRef.current?.classList.add("shadow-zinc-900");
    //     setUser((prevState) => ({ ...prevState, publicAddress: "" }));
    // } else {
    //     // If public address is valid, apply success style
    //     containerDiv?.classList.add("shadow-green-700");
    //     containerDiv?.classList.remove("shadow-red-700");
    //     setUser((prevState) => ({ ...prevState, publicAddress }));
    // }
};

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const containerDiv = document.getElementById("signinPasswordDiv");

    if (e.target.value.length === 0) {
      // If password is empty, remove all validation styles
      containerDiv?.classList.remove("shadow-green-700", "shadow-red-700");
      nextButtonRef.current?.classList.remove("shadow-green-700");
      nextButtonRef.current?.classList.add("shadow-zinc-900");
      setIsPasswordValid(false);
    } else {
      // If password is non-empty, apply success style
      containerDiv?.classList.add("shadow-green-700");
      containerDiv?.classList.remove("shadow-red-700");
      setIsPasswordValid(true);
    }
  };

  const handleGoogleSignIn = async () => {
    // Clear email and password fields
    const emailInput = document.getElementById(
      "signinEmail"
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "signinPassword"
    ) as HTMLInputElement;
    if (emailInput) emailInput.value = "";
    if (passwordInput) passwordInput.value = "";
    setIsEmailValid(false);
    setIsPasswordValid(false);

    const token = await signInWithGoogle();

    const response = await axios.post("http://localhost:4000/auth/signup/gggh", {
      token
    })

    const { email, name, picture, uid } = response.data.user;
    setUser((prevState) => ({
      ...prevState,
      email,
      name,
      picture,
      uid,
    }));
    setCurrentStep(2);

  };

  const handleGithubSignIn = async () => {
    // Clear email and password fields
    const emailInput = document.getElementById(
      "signinEmail"
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "signinPassword"
    ) as HTMLInputElement;
    if (emailInput) emailInput.value = "";
    if (passwordInput) passwordInput.value = "";
    setIsEmailValid(false);
    setIsPasswordValid(false);

    const token = await signInWithGithub();

    const response = await axios.post("http://localhost:4000/auth/signup/gggh", {
      token
    })

    const { email, name, picture, uid } = response.data.user;
    setUser((prevState) => ({
      ...prevState,
      email,
      name,
      picture,
      uid,
    }));
    setCurrentStep(2);
  };

  const handlestepButton = (num: number) => {
    if (currentStep === 2 && num === 1) {
      setCurrentStep(num);
      handleFillBackground();
    }

    const password = (document.getElementById("signinPassword") as HTMLInputElement).value;
    if (isNextButtonEnabled && password.length > 0) {
      setCurrentStep(num);
      handleFillBackground();
      const email = (document.getElementById("signinEmail") as HTMLInputElement).value;
      const encryptedPassword = btoa(password); // Encrypt password using base64 encoding
      setUser((prevState) => ({ ...prevState, email, password: encryptedPassword }));
      console.log({ ...user, email, password: encryptedPassword });
    }
  };

  const [isFillingBackground, setIsFillingBackground] = useState(false);
  const handleFillBackground = () => {
    setIsFillingBackground(!isFillingBackground);
  };

  const handleCreateAccount = () => {
    const name = (document.getElementById("yourName") as HTMLInputElement)
      .value;
    setUser((prevState) => ({ ...prevState, name }));

    const updatedUser = {
      ...user,
      name,
    };

    console.log(updatedUser);

    if (
      updatedUser.email &&
      updatedUser.name &&
      updatedUser.role
    ) {
      console.log(updatedUser);
      
      axios
        .post("http://localhost:4000/auth/signup", updatedUser)
        .then((response) => {
          console.log('response');
          
          if (response.status === 201) {
            console.log("Account created successfully");
            window.location.href = "/signin";
          } else {
            console.log("Account creation failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-grow-0 items-center justify-center bg-bg text-text">
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-text px-6 py-6 md:px-24 lg:px-64 lg:py-20">
        <div className="w-full h-full flex flex-col gap-4 flex-grow rounded-lg px-6 py-4 shadow-2xl shadow-zinc-600 lg:flex-row ">
          {/* Logo and welcome message */}
          <div className="flex flex-col items-center lg:w-1/2 lg:justify-center ">
            <Title title="Sign Up" />
            <div className="flex items-center justify-center gap-2 mt-2 lg:flex-col lg:gap-16 ">
              <div
                id="step1Button"
                onClick={() => {
                  handlestepButton(1);
                  console.log("step1 tapped");
                }}
                className={`cursor-pointer flex items-center justify-center w-16 h-16 rounded-full shadow-md shadow-gray-600 text-2xl underline-offset-1 ${
                  currentStep === 1 ? "underline underline-offset-4" : ""
                } `}
              >
                {currentStep === 1 ? (
                  1
                ) : (
                  <IoMdCheckmark
                    onClick={() => {
                      console.log("checkmark tapped");
                    }}
                  ></IoMdCheckmark>
                )}
              </div>
              <div
                className={`flex-grow h-1 w-28 border rounded-2xl bg-gradient-to-r ${
                  isFillingBackground ? "bg-fill" : ""
                } lg:rotate-90`}
              ></div>
              <div
                id="step2Button"
                onClick={() => handlestepButton(2)}
                className={`cursor-pointer flex items-center justify-center w-16 h-16 rounded-full shadow-md shadow-gray-600 text-2xl ${
                  currentStep === 2 ? "underline underline-offset-4" : ""
                } `}
              >
                2
              </div>
            </div>
          </div>

          {/* Step 1 */}
          <div
            id="step1"
            className={`mt-4 md:mt-0 lg:flex-grow lg:px-16 lg:py-4 ${
              currentStep === 1 ? "block" : "hidden"
            } lg:flex-col lg:justify-center`}
          >
            <Title title="Credential Information" />
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
            <div className="flex flex-col items-end">
              <Button
                id="next"
                ref={nextButtonRef}
                title="go to step 2"
                icon={GrLinkNext}
                onClick={() => {
                  handlestepButton(2);
                }}
                disabled={!isNextButtonEnabled}
                className="md:py-4"
              />
            </div>

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
              <Info info="Already have an account?" className="text-center" />
              <Info
                info="Sign In"
                link="/signin"
                className="text-center underline"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div
            id="step2"
            className={`mt-4 md:mt-0 lg:flex-grow lg:px-16 lg:py-4 ${
              currentStep === 2 ? "block" : "hidden"
            } `}
          >
            <Title title="Personal Information" />
            <InputField
              containerId="yourNameDiv"
              id="yourName"
              title="Full Name"
              icon={IoPerson}
              placeholder="abc def ghi"
              type="email"
              onChange={validateEmail}
            />

            <InputField
              containerId="yourAboutDiv"
              id="About"
              title="About"
              icon={IoPerson}
              placeholder="describe yourwork"
              type="text"
              max={300}
            onChange={(e) => {
                setUser((prevState) => ({ ...prevState, about: e.target.value }));
            }}
            />

            <InputField
              containerId="yourPublicAddressDiv"
              id="yourPublicAddress"
              title="Public Wallet Address"
              icon={IoPerson}
              placeholder="0x1234....5678"
              type="text"
              onChange={(e) => {
                setUser((prevState) => ({ ...prevState, publicAddress: e.target.value }));
            }}
            />

            {/* checkboxes */}
            <div className="flex flex-row gap-4 justify-around">
              <div className="flex flex-row justify-center items-center gap-2">
                <Checkbox
                  checked={iscb1Checked}
                  id="cb1"
                  onChange={() => {
                    setcb1Checked(true);
                    setUser((prevState) => ({ ...prevState, role: "Clients" }));
                    setcb2Checked(false);
                  }}
                ></Checkbox>
                <Info info="Client" className="text-center" />
              </div>

              <div className="flex flex-row justify-center items-center gap-2">
                <Checkbox
                  checked={iscb2Checked}
                  id="cb2"
                  onChange={() => {
                    setcb2Checked(true);
                    setUser((prevState) => ({
                      ...prevState,
                      role: "Freelancers",
                    }));
                    setcb1Checked(false);
                  }}
                ></Checkbox>
                <Info info="Freelancer" className="text-center" />
              </div>
            </div>

            {/* create button */}
            <div className="flex flex-col items-end">
              <Button
                id="createAccount"
                name="Create"
                title="Sign Up"
                icon={IoMdPersonAdd}
                onClick={handleCreateAccount}
                className="md:py-4"
              />
            </div>

            {/* Sign up link */}
            <div className="flex flex-row items-center justify-center gap-2 mt-4 lg:flex-col">
              <Info info="Already have an account?" className="text-center" />
              <Info
                info="Sign In"
                link="/signin"
                className="text-center underline"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
