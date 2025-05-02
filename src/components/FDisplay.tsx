import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import axios from "axios";
import ProjectCard from "./ProjectCard";
import Skeleton from "./Skeleton";

interface FDisplayProps {
  text: string;
  list?: string[];
}

const FDisplay: React.FC<FDisplayProps> = ({ text, list }) => {
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [projects, setProjects] = useState([]);
  const [fetchProjectStatus, setFetchProjectStatus] = useState(0);

  // Function to fetch projects from the API
  const fetchProjects = async () => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      window.location.href = "/signin";
    }

    try {
      const userDataObj = JSON.parse(userData);
      const role = userDataObj.role;
      const uid = userDataObj.uid;

      if (role && uid) {
        const response = await axios.get(`http://localhost:4000/fetchProjects`, {
          params: {
            role: role,
            uid: uid,
          },
        });

        if (response.data.projects.length >= 1) {
          
          setProjects(response.data.projects);
          setFetchProjectStatus(2);
        } else {
          setFetchProjectStatus(1);
        }
        
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setFetchProjectStatus(1);
    }
  };

  // Fetch projects initially and then poll every 5 seconds
  useEffect(() => {
    fetchProjects(); // Initial fetch

    const interval = setInterval(fetchProjects, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []); // Runs once on component mount
    

  if (fetchProjectStatus === 0) { 
    // Still fetching projects
    return <Skeleton />;
  }
  
  if (fetchProjectStatus === 1) {
    // Fetched, but no projects
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-bold opacity-40">NO PROJECTS</h1>
        <h3 className="font-medium opacity-40">YOU HAVE NOT INITIALIZED ANY PROJECTS YET!</h3>
      </div>
    );
  }
  
  return (
    <div className="transition-all duration-500 ease-in-out">
      {isSearchEnabled ? (
        <div className="flex flex-row border border-[#cccccc] items-center shadow-lg shadow-zinc-900 rounded-2xl px-4 py-2 gap-2">
          <IoSearchSharp />
          <input
            ref={(input) => input?.focus()}
            id="freelancerSearch"
            type="text"
            className="w-full focus:outline-none placeholder:font-body placeholder:text-gray-500"
            placeholder="Name / Category"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onBlur={(e) => {
              const parent = e.currentTarget.parentElement;
              parent?.classList.remove("shadow-gray-700");
              parent?.classList.add("shadow-zinc-900");
            }}
            onFocus={(e) => {
              const parent = e.currentTarget.parentElement;
              parent?.classList.remove("shadow-zinc-900");
              parent?.classList.add("shadow-gray-700");
            }}
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
          />
          <button
            title="close"
            type="button"
            onClick={() => {
              setIsSearchEnabled(false);
              setSearchText("");
            }}
          >
            <IoMdClose />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4 justify-between px-1">
          <h1 className="flex-shrink-0 text-xl md:text-2xl lg:text-3xl">
            {text}
          </h1>
          <hr className="w-full opacity-40" />
          {text !== "Initialize Work" && list && (
            <div
              onClick={() => setIsSearchEnabled(true)}
              className="flex items-center gap-2 p-2 rounded-xl border border-[#cccccc] cursor-pointer"
            >
              <IoSearchSharp />
              <h3>Search</h3>
            </div>
          )}
        </div>
      )}
  
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-12">
        {projects
          .filter(
            (proj) =>
              proj.title.toLowerCase().includes(searchText.toLowerCase()) ||
              proj.category.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((proj, index) => (
            <ProjectCard
              onClick={() => {
                sessionStorage.setItem("selectedProject", JSON.stringify(proj));
                window.location.href = `/dashboard/f/${proj.id}`;
              }}
              key={index}
              project={proj}
              id={index}
              projectId={proj.id}
            />
          ))}
      </div>
    </div>
  );
  

};

export default FDisplay;
