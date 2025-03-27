"use client";

import { CMilestones } from "@/components/CMilestones";
import DifficultyMeter from "@/components/DifficultyMeter";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { FaClock, FaGithub } from "react-icons/fa";
import { IoIosDoneAll } from "react-icons/io";
import { LuMilestone } from "react-icons/lu";
import { MdCategory } from "react-icons/md";
import { SiEthereum } from "react-icons/si";

interface Milestone {
  name: string;
  cost: number;
  tillDate: string;
  difficulty: string;
  status: string;
}

interface Project {
  title: string;
  category: string;
  description: string;
  githubLink: string;
  startDate: string;
  endDate: string;
  statistics: {
    totalAmount: number;
    averagePerMilestone: number;
    maxPayable: number;
    minPayable: number;
    paymentDone: number;
    milestonesCompleted: number;
    countOfDifficulties: {
      beginner: number;
      intermediate: number;
      advanced: number;
    };
  };
  milestones: Milestone[];
}

const ProjectDashboard: React.FC = () => {
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);

  // Extract projectId from URL and fetch session storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split("/");
      const id = pathSegments[pathSegments.length - 1]; // Last segment as projectId
      setProjectId(id);

      const storedProject = sessionStorage.getItem("selectedProject");
      if (storedProject) {
        setProjectData(JSON.parse(storedProject));
      } else {
        console.warn("No project data found in session storage");
      }
    }
  }, []);

  // Fetch project data from the backend
  const fetchProjectData = async () => {
    if (!projectId) return; // Ensure projectId is available before making the request

    try {
      const response = await axios.get(
        `http://localhost:4000/fetchProject?projectId=${projectId}`
      );
      
      setProjectData(response.data.projectData);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  // Implement polling every 5 seconds
  useEffect(() => {
    if (!projectId) return; // Start polling only if projectId exists

    fetchProjectData(); // Initial fetch
    const interval = setInterval(fetchProjectData, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [projectId]); // Runs whenever projectId changes

  

  return (
    <div className="flex flex-col p-4 pb-40 gap-12 xl:px-72 xl:grid xl:grid-cols-2 xl:gap-12">
      {/* ProjectDetails */}
      <div className="shadow-all-directions rounded-2xl">
        <h2 className="flex items-center gap-2 text-xl px-4 py-2">
          <CgDetailsMore /> ABOUT
        </h2>
        <hr className="opacity-20"></hr>
        <div className="flex flex-col gap-1 px-4 py-2">
          <h1 title={projectData?.title} className="text-6xl truncate capitalize cursor-pointer xl:text-8xl">{projectData?.title}</h1>
          <p title={projectData?.category} className="flex gap-2 truncate capitalize cursor-pointer items-center text-2xl xl:text-4xl">
            <MdCategory /> {projectData?.category}
          </p>
          <p title={projectData?.description} className="text-sm truncate capitalize cursor-pointer xl:text-xl">{projectData?.description}</p>
          <a
            href={projectData?.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-base opacity-80 underline underline-offset-2 xl:text-2xl"
          >
            <FaGithub /> Source code
          </a>
        </div>
      </div>

      {/* Statistics */}
      <div className="shadow-all-directions rounded-2xl">
        <h2 className="flex items-center gap-2 text-xl px-4 py-2">
          <CgDetailsMore /> STATISTICS
        </h2>
        <hr className="opacity-20"></hr>
        <div className="flex flex-col  p-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col justify-between gap-1">
              <p className="flex justify-between items-center text-lg">
                <span className="opacity-80 text-base truncate max-w-[160px]">
                  Total Investment
                </span>
                <span className="flex items-center gap-1 text-gray-400 underline underline-offset-4">
                  <SiEthereum /> {projectData?.statistics.totalAmount}
                </span>
              </p>
              <p className="flex justify-between items-center text-lg">
                <span
                  className="opacity-80 text-base truncate max-w-[160px]"
                  title="Average per milestone"
                >
                  APM
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <SiEthereum /> {projectData?.statistics.averagePerMilestone}
                </span>
              </p>
              <p className="flex justify-between items-center text-lg">
                <span className="opacity-80 text-base truncate max-w-[160px]">
                  Max Payable
                </span>
                <span className="flex items-center gap-1 text-blue-500">
                  <SiEthereum /> {projectData?.statistics.maxPayable}
                </span>
              </p>
              <p className="flex justify-between items-center text-lg">
                <span className="opacity-80 text-base truncate max-w-[160px]">
                  Min Payable
                </span>
                <span className="flex items-center gap-1 text-orange-500">
                  <SiEthereum /> {projectData?.statistics.minPayable}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="flex justify-between items-center text-lg">
                <span className="opacity-80 text-base truncate max-w-[160px]">
                  Payment Done
                </span>
                <span className="flex items-center gap-1 text-purple-500">
                  <SiEthereum /> {projectData?.statistics.paymentDone}
                </span>
              </p>
              <p className="flex justify-between items-center text-lg">
                <span className="opacity-80 text-base truncate max-w-[160px]">
                  Payment Pending
                </span>
                <span className="flex items-center gap-1 text-yellow-600">
                  <SiEthereum />{" "}
                  {(projectData?.statistics.totalAmount ?? 0) -
                    (projectData?.statistics.paymentDone ?? 0)}
                </span>
              </p>
              <p className="flex justify-between items-center text-lg">
                <span
                  className="opacity-80 text-base truncate max-w-[160px]"
                  title="Paid per milestone"
                >
                  PPM
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <SiEthereum />{" "}
                  {projectData?.statistics.milestonesCompleted > 0
                    ? (
                        projectData.statistics.paymentDone /
                        projectData.statistics.milestonesCompleted
                      ).toFixed(2)
                    : 0}
                </span>
              </p>
              <div className="flex justify-between items-center text-lg">
                <span className="opacity-80 text-base truncate max-w-[160px]">
                  Milestones
                </span>
                <div className="flex items-center w-1/2 justify-evenly gap-2">
                  <span className="flex items-center gap-1 text-indigo-500">
                    <IoIosDoneAll className="text-2xl" />
                    {projectData?.statistics.milestonesCompleted}
                  </span>
                  <span className="flex items-center gap-2 text-teal-500">
                    <FaClock className="text-sm" />
                    {(projectData?.milestones?.length ?? 0) -
                      (projectData?.statistics?.milestonesCompleted ?? 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Meter */}
      <div className="shadow-all-directions rounded-2xl h-fit">
        <h2 className="flex items-center gap-2 text-xl px-4 py-2">
          <CgDetailsMore /> Level Gauge
        </h2>
        <hr className="opacity-20"></hr>
        <div className="flex flex-col items-center p-2 justify-between">
          <DifficultyMeter
            advanced={projectData?.statistics.countOfDifficulties.advanced ?? 0}
            beginner={projectData?.statistics.countOfDifficulties.beginner ?? 0}
            intermediate={
              projectData?.statistics.countOfDifficulties.intermediate ?? 0
            }
          />
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-full w-2 h-2 bg-green-700" />
              Beginner
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full w-2 h-2 bg-yellow-400" />
              Intermediate
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full w-2 h-2 bg-red-500" />
              Advance
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="shadow-all-directions rounded-2xl">
        <h2 className="flex items-center gap-2 text-xl px-4 py-2">
          <LuMilestone /> Milestones
        </h2>
        <hr className="opacity-20"></hr>
        <div className="p-8">
            {projectData?.milestones.map((milestone, index) => (
              <CMilestones
              projectId={projectId}
              index={index}
              milestoneAmount={projectData?.milestones[index]?.cost}
              freelancerPublicAddress={projectData?.freelancerPublicAddress}
              actionable={index === 0 || projectData.milestones[index - 1]?.status === 'approved'}
              milestoneData={milestone}
              key={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
