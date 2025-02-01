'use Client';

import { MdCategory } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { FaComputer } from "react-icons/fa6";

interface FreelancerCardProps {
    freelancer?: any;
}

/**
 * ProjectCard component displays the details of a project.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.project - The project object containing project details.
 * @param {Function} props.onClick - The function to be called when the card is clicked.
 *
 * @typedef {Object} ProjectCardProps
 * @property {Object} project - The project object containing project details.
 * @property {Function} onClick - The function to be called when the card is clicked.
 *
 * @example
 * <ProjectCard
 *   project={{
 *     name: "Project Name",
 *     category: "Category",
 *     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
 *     imageUrl: "/path.png",
 *     startDate: "1/10/2003",
 *     endDate: "09/09/2003",
 *     statistics: {
 *       amount1: "$10,000",
 *       amount2: "$10,000",
 *       amount3: "$10,000",
 *       amount4: "$10,000"
 *     }
 *   }}
 *   onClick={() => console.log("Card clicked")}
 * />
 */
export default function FreelancerCard({ freelancer }: FreelancerCardProps) {

    return (
        <div className="rounded-2xl shadow-sm my-4 shadow-gray-800 flex flex-col gap-2 p-4 cursor-pointer lg:flex lg:flex-row lg:justify-around">
            <div className="flex flex-col gap-1 lg:w-1/2">
                <h2 className="font-bold text-2xl font-body md:text-3xl lg:text-4xl">Freelancer Name</h2>
                <hr className="w-full opacity-10" />
                <h6 className="flex items-center gap-2 md:text-lg lg:text-xl"><FaComputer /> Post</h6>
                <p className="text-[13px] md:text-[16px] lg:text-[18px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.</p>
            </div>
            <div className="flex flex-col gap-2">
                {/* <div className="flex flex-col items-center">
                    <img src="/path.png" alt="file" className="w-2/3 md:w-1/2 lg:w-1/3" />
                    <div className="flex justify-between gap-20">
                        <p>1/10/2003</p>
                        <p>09/09/2003</p>
                    </div>
                </div> */}

                {/* Skills */}
                <div className="">
                    <h6 className="flex gap-2 items-center border-b w-min px-2 rounded-md md:mx-8"><IoStatsChart /> Skills</h6>
                    <div className="flex justify-around p-2 gap-2">
                        <div>
                            <p>Amount: $10,000</p>
                            <p>Amount: $10,000</p>
                        </div>
                        <div>
                            <p>Amount: $10,000</p>
                            <p>Amount: $10,000</p>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="">
                    <h6 className="flex gap-2 items-center border-b w-min px-2 rounded-md md:mx-8"><IoStatsChart /> Statistics</h6>
                    <div className="flex justify-around p-2 gap-2">
                        <div>
                            <p>Amount: $10,000</p>
                            <p>Amount: $10,000</p>
                        </div>
                        <div>
                            <p>Amount: $10,000</p>
                            <p>Amount: $10,000</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );

}