'use client';

import { MdCategory } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";


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

interface ProjectCardProps {
    project: Project;
    id: number;
    projectId: string;
    onClick : (projectId : string) => void;
}

export default function ProjectCard({ project, id, projectId, onClick }: ProjectCardProps) {  



    return (
        <div
            id={id.toString()}
            onClick={() => onClick(projectId)}
            className="rounded-2xl shadow-lg shadow-slate-800 flex flex-col gap-2 p-4 cursor-pointer my-4 lg:flex lg:flex-row lg:justify-around"
        >
            <div className="flex flex-col gap-1 lg:w-1/2">
                <h2 className="font-bold text-2xl font-body md:text-3xl lg:text-4xl">{project.title}</h2>
                <hr className="w-full opacity-10" />
                <h6 className="flex items-center gap-2 md:text-lg lg:text-xl">
                    <MdCategory /> {project.category}
                </h6>
                <p className="text-[13px] md:text-[16px] lg:text-[18px]">{project.description}</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center">
                    <img src='/path.png' alt="file" className="w-2/3 md:w-1/2 lg:w-1/3" />
                    <div className="flex justify-between gap-20">
                        <p>{project.startDate}</p>
                        <p>{project.endDate}</p>
                    </div>
                </div>

                {/* Statistics */}
                <div className="">
                    <h6 className="flex gap-2 items-center border-b w-min px-2 rounded-md md:mx-8">
                        <IoStatsChart /> Statistics
                    </h6>
                    <div className="flex py-2 gap-4">
                        <div className="flex flex-col w-1/2 gap-2 justify-center">
                            <p className="flex justify-between">
                                <span className="opacity-80">Total</span>
                                <span>
                                    {Number.isInteger(project.statistics.totalAmount)
                                        ? project.statistics.totalAmount
                                        : project.statistics.totalAmount.toFixed(4)}
                                </span>
                            </p>
                            <p title="Average Per Milestone" className="flex justify-between">
                                <span className="opacity-80">APV</span>
                                <span>
                                    {Number.isInteger(project.statistics.averagePerMilestone)
                                        ? project.statistics.averagePerMilestone
                                        : project.statistics.averagePerMilestone.toFixed(4)}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col w-1/2 gap-2 justify-center">
                            <p className="flex justify-between">
                                <span className="opacity-80 truncate max-w-[80px]">Max Payable</span>
                                <span>
                                    {Number.isInteger(project.statistics.maxPayable)
                                        ? project.statistics.maxPayable
                                        : project.statistics.maxPayable.toFixed(2)}
                                </span>
                            </p>
                            <p className="flex justify-between">
                                <span className="opacity-80 truncate max-w-[80px]">Min Payable</span>
                                <span>
                                    {Number.isInteger(project.statistics.minPayable)
                                        ? project.statistics.minPayable
                                        : project.statistics.minPayable.toFixed(2)}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
