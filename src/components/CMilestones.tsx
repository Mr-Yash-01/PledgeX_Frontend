import { ToastContext } from "@/store/ToastContext";
import axios from "axios";
import { useContext } from "react";
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
  actionable : boolean,
  projectId : string,
  index: number,
  freelancerPublicAddress: string,
  milestoneAmount: number
}



export const CMilestones = ({ milestoneData, actionable, projectId, index, milestoneAmount, freelancerPublicAddress }: FMilestoneProps) => {

    const toast = useContext(ToastContext);

  const handleCheckClick = async() => {
    try {      
        const response = await axios.put('http://localhost:4000/user/c/sm', {
            projectId : projectId,
            index : index,
            milestoneAmount : milestoneAmount,
            freelancerPublicAddress : freelancerPublicAddress
        })

        if (response.status === 200) {
            toast?.showMessage('Work updated successfully', 'info');
        } else {
            toast?.showMessage('Error updating work', 'alert');
        }
        

    } catch (error) {
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
        className="flex flex-col cursor-pointer items-center">
        <div className={`w-1 h-24 border  ${milestoneData.status !== 'pending' ? 'bg-[#cccccc]' : 'border-b-transparent'}`}></div>
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
                (milestoneData.status === 'pending') ? 
                <FaClock  className={`w-4 h-4 cursor-not-allowed `} /> :
                (milestoneData.status === 'sent') ?
                <FaCheck onClick={handleCheckClick} className={`w-4 h-4 cursor-pointer `} /> :
                <BiCheckDouble className={` w-6 h-6`} /> 
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
