import { ToastContext } from "@/store/ToastContext";
import axios from "axios";
import { useContext, useState } from "react";
import { BiCheckDouble } from "react-icons/bi";
import { FaCheck, FaClock } from "react-icons/fa";
import { SiEthereum } from "react-icons/si";

interface Milestone {
  name: string;
  cost: number;
  tillDate: string;
  difficulty: string;
  status: string;
}

interface FMilestoneProps {
  milestoneData: Milestone;
  actionable: boolean;
  projectId: string;
  index: number;
}

export const FMilestone = ({
  milestoneData,
  actionable,
  projectId,
  index,
}: FMilestoneProps) => {
  const toast = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const handleClockClick = async () => {
    try {
      setLoading(true);
      const response = await axios.put("http://localhost:4000/user/f/sm", {
        projectId: projectId,
        index: index,
      });

      if (response.status === 200) {
        setLoading(false);
        toast?.showMessage("Work updated successfully", "info");
      } else {
        setLoading(false);
        toast?.showMessage("Error error updating work", "alert");
      }
    } catch (error) {
      toast?.showMessage("Error error updating work", "alert");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-evenly h-fit gap-2 ">
      <div className="w-28 flex flex-col justify-end">
        <h3 className="text-lg">{milestoneData.name}</h3>
        <h4 className="text-sm">{milestoneData.difficulty}</h4>
      </div>
      <div
        title={`${milestoneData.difficulty} level`}
        className="flex flex-col cursor-pointer items-center"
      >
        <div
          className={`w-1 h-24 border  ${
            milestoneData.status !== "pending"
              ? "bg-[#cccccc]"
              : "border-b-transparent"
          }`}
        ></div>
        <div
          className={`rounded-full h-8 w-8 ${
            milestoneData.difficulty === "Beginner"
              ? "milestone-green"
              : milestoneData.difficulty === "Intermediate"
              ? "milestone-yellow"
              : "milestone-red"
          } p-[2px] flex items-center justify-center`}
        >
          <div className=" bg-[#cccccc] rounded-full h-4 w-4"></div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex justify-end pt-4">
          {
            loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
            ) : (
              milestoneData.status === "pending" ? (
                <FaClock
                  onClick={handleClockClick}
                  className={`w-4 h-4 cursor-pointer `}
                />
              ) : milestoneData.status === "sent" ? (
                <FaCheck className={`w-4 h-4 cursor-not-allowed `} />
              ) : (
                <BiCheckDouble className={` w-6 h-6`} />
              )
            )
          }
        </div>
        <div className="w-28 pl-2 flex flex-col justify-end">
          <h3 className="text-lg flex items-center gap-1">
            <SiEthereum />
            {milestoneData.cost.toFixed(4)}
          </h3>
          <h4 className="text-sm">{milestoneData.tillDate}</h4>
        </div>
      </div>
    </div>
  );
};
