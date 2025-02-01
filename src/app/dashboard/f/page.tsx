"use client";

import FDisplay from "@/components/FDisplay";
import KeyMoney from "@/components/KeyMoney";
import ProjectCard from "@/components/ProjectCard";
import { ToastContext } from "@/store/ToastContext";
import { useContext, useState } from "react";
import { FaInbox } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";

export default function F() {
  const [currectDisplay, setCurrentDisplay] = useState(false);
  const toast = useContext(ToastContext);

  const handleSpeedDialButton = () => {
    console.log("Speed Dial button clicked");
    toast?.showMessage("Speed Dial button clicked",'alert');
    setCurrentDisplay(!currectDisplay);
  };

  return (
    <div className="p-4 flex flex-col gap-8 pb-32 md:px-20 lg:px-72">
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
        <FDisplay
          list={["Project 1", "Project 2", "Project 3"]}
          text="Projects"
          component={<ProjectCard />}
        />
      ) : (
        // List of freelancers
        <FDisplay
          text="Initialize Work"
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
          <MdOutlineCreateNewFolder className="w-8 h-8" />
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
