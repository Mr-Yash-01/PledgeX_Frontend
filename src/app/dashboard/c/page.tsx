"use client";

import CDisplay from "@/components/CDisplay";
import CreateProject from "@/components/CreateProject";
import FreelancerCard from "@/components/FreelancerCard";
import ProjectCard from "@/components/ProjectCard";
import { useState } from "react";
import { FaInbox } from "react-icons/fa";
import { IoArrowBack, IoSearchSharp } from "react-icons/io5";
import { MdOutlineCreateNewFolder } from "react-icons/md";

export default function C() {
  const [currectDisplay, setCurrentDisplay] = useState(true);
  const [isCreateProject, setIsCreateProject] = useState(false);

  const handleSpeedDialButton = () => {
    

    setCurrentDisplay(!currectDisplay);
  };

  const handleCreateProject = () => {
    
    setIsCreateProject(!isCreateProject);
  };

  return (
    <div className="p-4 flex flex-col gap-8 md:px-20 lg:px-72">

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
