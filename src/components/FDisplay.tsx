import React, { useState, useContext, useEffect } from "react";
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


  useEffect(() => {
    // Adjust the import based on your firebase config file

    const fetchProjects = async () => {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        throw new Error("User data not found");
      }

      const userDataObj = JSON.parse(userData);
      const role = userDataObj.role;
      const uid = userDataObj.uid;

      if (role && uid) {
        const response = await axios.get(`http://localhost:4000/fetchProjects`, {
          params : {
            role: role,
            uid: uid
          }
        });

        console.log('res',response.data);
        setProjects(response.data.projects);
        // You can set the fetched projects to state or handle them as needed
      }
    };

    fetchProjects();
  }, []);
    

  if (projects.length < 1) {
    return <Skeleton/>
  } else {
    return (
      <div className="transition-all duration-500 ease-in-out">
        {isSearchEnabled ? (
          <div
            className={`flex flex-row border border-[#cccccc] items-center shadow-lg shadow-zinc-900 rounded-2xl px-4 py-2 gap-2`}
          >
            <IoSearchSharp />
            <input
              ref={(input) => input?.focus()}
              id="freelancerSearch"
              type="text"
              className={`w-full  focus:outline-none placeholder:font-body placeholder:text-gray-500`}
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
                setIsSearchEnabled(!isSearchEnabled);
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
            <hr className="w-full opacity-40 " />
  
            {text !== "Initialize Work" ? (
              <div
                onClick={() => setIsSearchEnabled(!isSearchEnabled)}
                className={`${
                  list ? "" : "hidden"
                }flex items-center gap-2 p-2 rounded-xl border border-[#cccccc]`}
              >
                <IoSearchSharp />
                <h3>Search</h3>
              </div>
            ) : null}
          </div>
        )}
  
  <div className="grid grid-cols-1 md:grid-cols-2  xl:gap-x-12">
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
              window.location.href = `/dashboard/f/${proj["id"]}`;
            }}
            key={index}
            project={proj}
            id={index}
            projectId={proj["id"]}
          />
            ))}
        </div>
        
      </div>
    );
  }

};

export default FDisplay;
