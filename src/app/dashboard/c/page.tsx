"use client";

import CDisplay from "@/components/CDisplay";
import FreelancerCard from "@/components/FreelancerCard";
import KeyMoney from "@/components/KeyMoney";
import ProjectCard from "@/components/ProjectCard";
import { useState } from "react";
import { FaInbox } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

export default function C() {
  const [currectDisplay, setCurrentDisplay] = useState(true);

  const handleSpeedDialButton = () => {
    console.log("Speed Dial button clicked");
    setCurrentDisplay(!currectDisplay);
  };

  return (
    <div className="p-4 flex flex-col gap-8 md:px-20 lg:px-72">
      {/* Financial Details */}
      <div className="flex">
        {/* card */}
        <div className="flex justify-between p-4 shadow-lg shadow-gray-800 w-full rounded-2xl md:px-8">
          <KeyMoney keyName="Total Investment:" value="$100,000" />
          <KeyMoney keyName="Total Returns:" value="$50,000" />
        </div>
      </div>

      {currectDisplay ? (
        //Project Details
        <CDisplay
          list={["Project 1", "Project 2", "Project 3"]}
          text="Projects"
          component={<ProjectCard />}
        />
      ) : (
        // List of freelancers
        <CDisplay
          list={["Freelancer 1", "Freelancer 2", "Freelancer 3"]}
          text="Freelancers"
          component={<FreelancerCard />}
        />
      )}

      {/* Speed Dial */}
      {currectDisplay ? (
        <button
          type="button"
          title="Search"
          onClick={handleSpeedDialButton}
          className="fixed bottom-4 right-4 rounded-full bg-zinc-900 p-4 shadow-lg shadow-gray-700"
        >
          <IoSearchSharp className="w-8 h-8" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSpeedDialButton}
          className="fixed bottom-4 right-4 rounded-full bg-zinc-900 p-4 shadow-lg shadow-gray-700"
          title="Inbox"
        >
          <FaInbox className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}
