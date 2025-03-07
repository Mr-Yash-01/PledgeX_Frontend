"use client";

import CDisplay from "@/components/CDisplay";
import CreateProject from "@/components/CreateProject";
import FreelancerCard from "@/components/FreelancerCard";
import KeyMoney from "@/components/KeyMoney";
import ProjectCard from "@/components/ProjectCard";
import { useState } from "react";
import { FaInbox } from "react-icons/fa";
import { IoArrowBack, IoSearchSharp } from "react-icons/io5";
import { MdOutlineCreateNewFolder } from "react-icons/md";

export default function C() {
  const [currectDisplay, setCurrentDisplay] = useState(true);
  const [isCreateProject, setIsCreateProject] = useState(false);

  const handleSpeedDialButton = () => {
    console.log(1);

    setCurrentDisplay(!currectDisplay);
  };

  const handleCreateProject = () => {
    console.log(2);
    setIsCreateProject(!isCreateProject);
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

      {isCreateProject ? (
        <CreateProject />
      ) : (
        <>
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
        </>
      )}




      {/* Speed Dial */}
      {isCreateProject ? (
        <button
          type="button"
          title="Search"
          onClick={handleCreateProject}
          className="fixed bottom-4 right-4 rounded-full bg-zinc-900 p-4 shadow-lg shadow-gray-700"
        >
          <IoArrowBack className="w-8 h-8" />
        </button>
      ) : (
        <>
          {currectDisplay ? (
            <button
              type="button"
              title="Search"
              onClick={handleSpeedDialButton}
              className="fixed bottom-24 right-4 rounded-full bg-zinc-900 p-4 shadow-lg shadow-gray-700"
            >
              <IoSearchSharp className="w-8 h-8" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSpeedDialButton}
              className="fixed bottom-24 right-4 rounded-full bg-zinc-900 p-4 shadow-lg shadow-gray-700"
              title="Inbox"
            >
              <FaInbox className="w-8 h-8" />
            </button>
          )}
          <button
            type="button"
            title="Search"
            onClick={handleCreateProject}
            className="fixed bottom-4 right-4 rounded-full bg-zinc-900 p-4 shadow-lg shadow-gray-700"
          >
            <MdOutlineCreateNewFolder className="w-8 h-8" />
          </button>
        </>
      )}
    </div>
  );
}
