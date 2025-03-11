import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import FreelancerCard from "./FreelancerCard";
import Skeleton from "./Skeleton";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  githubLink: string;
  // Add other project properties here
}

interface CDisplayProps {
  text: string;
  component: React.ReactNode;
  list: string[];
}

interface Freelancer {
  name: string;
  createdAt: string;
  email: string;
  projects: Project[];
  publicAddress: string;
  role: string;
  uid: string;
  picture: string;
}

const CDisplay: React.FC<CDisplayProps> = ({ text, component, list }) => {
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  // Function to fetch both projects and freelancers
  const fetchData = async () => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      console.error("User data not found");
      return;
    }

    try {
      const userDataObj = JSON.parse(userData);
      const role = userDataObj.role;
      const uid = userDataObj.uid;

      if (role && uid) {
        // Fetch Projects
        const projectsResponse = await axios.get(`http://localhost:4000/fetchProjects`, {
          params: { role, uid },
        });

        setProjects(projectsResponse.data.projects);
        

        // Fetch Freelancers
        const freelancersResponse = await axios.get(`http://localhost:4000/fetchFreelancers`, {
          params: { role, uid },
        });

        setFreelancers(freelancersResponse.data.freelancers);
        
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data initially and then poll every 5 seconds
  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  if (projects.length > 0) {
    
    
    return (
      <div className="transition-all duration-500 ease-in-out">
  
        {isSearchEnabled ? (
          <div>
            <div className="flex flex-row border border-[#cccccc] items-center shadow-lg shadow-zinc-900 rounded-2xl px-4 py-2 gap-2">
              <IoSearchSharp />
              <input
                id="freelancerSearch"
                type="text"
                ref={(input) => input?.focus()}
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
          </div>
        ) : (
          <div className="flex items-center gap-4 justify-between px-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl">{text}</h1>
            <hr className="w-full opacity-40" />
            <div
              onClick={() => setIsSearchEnabled(!isSearchEnabled)}
              className="flex items-center gap-2 p-2 rounded-xl border border-[#cccccc]"
            >
              <IoSearchSharp />
              <h3>Search</h3>
            </div>
          </div>
        )}
  
        {text === "Projects" ? (
          <div className="mt-4 xl:grid xl:grid-cols-2 xl:gap-4 xl:gap-x-12">
            {projects
              .filter(
                (proj) =>
                  proj.title.toLowerCase().includes(searchText.toLowerCase()) ||
                  proj.category.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((proj, index) => (
                <ProjectCard
                  onClick={() => {
                    sessionStorage.setItem(
                      "selectedProject",
                      JSON.stringify(proj)
                    );
                    window.location.href = `/dashboard/c/${proj.id}`;
                  }}
                  key={index}
                  project={proj}
                  id={index}
                  projectId={proj.id}
                />
              ))}
          </div>
        ) : (
          <div className="mt-4 xl:grid xl:grid-cols-3 xl:gap-4 xl:gap-x-12">
            {freelancers
              .filter(
                (freelancer) =>
                  !searchText ||
                  freelancer.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  freelancer.email.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((freelancer, index) => (
                <div key={index}>
                  <FreelancerCard freelancer={freelancer} />
                </div>
              ))}
          </div>
        )}
      </div>
    );
    
  } else {
    
    
    return <Skeleton/>;
  }


};

export default CDisplay;
