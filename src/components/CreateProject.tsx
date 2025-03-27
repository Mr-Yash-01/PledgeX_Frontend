import React, { useState, useRef, useContext } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import InputField from "./InputField";
import {
  MdCategory,
  MdDateRange,
  MdDriveFileRenameOutline,
  MdEmail,
} from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { FaLink, FaWallet } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { LuMilestone } from "react-icons/lu";
import { ToastContext } from "@/store/ToastContext";
import { VscGithub, VscPreview } from "react-icons/vsc";
import { SiEthereum } from "react-icons/si";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";
import Loader from "./Loader";

const CreateProject: React.FC = () => {
  interface Milestone {
    name: string;
    cost: number;
    tillDate: string;
    difficulty: string;
    status: string;
  }

  interface Project {
    projectId?: string;
    freelancerEmail?: string;
    freelancerPublicAddress?: string;
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

  const [project, setProject] = useState<Project>({
    projectId: "",
    freelancerEmail: "",
    freelancerPublicAddress: "",
    title: "",
    category: "",
    description: "",
    githubLink: "",
    startDate: "",
    endDate: "",
    statistics: {
      totalAmount: 0,
      averagePerMilestone: 0,
      maxPayable: 0,
      minPayable: Number.MAX_VALUE,
      paymentDone: 0,
      milestonesCompleted: 0,
      countOfDifficulties: {
        beginner: 0,
        intermediate: 0,
        advanced: 0,
      },
    },
    milestones: [],
  });

  const [tempMilestone, setTempMilestone] = useState<Milestone>({
    name: "",
    cost: 0,
    tillDate: "",
    difficulty: "",
    status: "pending",
  });
  const [difficulty, setDifficulty] = useState("");
  const [currentMileStoneIndex, setCurrentMileStoneIndex] = useState(0);
  const toast = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const freelancerRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const githubLinkRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const milestoneRef = useRef<HTMLInputElement>(null);
  const milestoneCostRef = useRef<HTMLInputElement>(null);
  const tillDateRef = useRef<HTMLInputElement>(null);

  const validateGithubLink = () => {
    // return true;
    const githubLinkPattern =
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9._-]+\/?$/;

    if (githubLinkPattern.test(project.githubLink)) {
      return true;
    } else {
      toast?.showMessage("Invalid GitHub link.", "warning");
      return false;
    }
  };

  const validateFreelancerEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(project.freelancerEmail?.toString());
  };

  const validateProjectDetails = () => {
    if (
      project.freelancerEmail &&
      project.freelancerPublicAddress &&
      project.title &&
      project.category &&
      project.description &&
      project.githubLink &&
      project.startDate &&
      project.endDate
    ) {
      if (validateFreelancerEmail()) {
        if (validateGithubLink()) {
          return true;
        } else {
          toast?.showMessage("Invalid Github link!", "alert");
          return false;
        }
      } else {
        toast?.showMessage("Invalid Client Email Format!", "alert");
        return false;
      }
    }
    toast?.showMessage("Please fill all project details.", "warning");
  };

  const validateMilestoneDetails = () => {
    if (
      tempMilestone.name &&
      tempMilestone.cost &&
      tempMilestone.tillDate &&
      difficulty
    ) {
      if (/^\d+(\.\d+)?$/.test(tempMilestone.cost.toString())) {
        return true;
      }
      toast?.showMessage("Incorrect Milestone Cost.", "alert");
      return false;
    }
    toast?.showMessage("Please fill all milestone details.", "warning");
  };

  const validateProjectDates = () => {
    if (
      new Date().toISOString().split("T")[0] <
        new Date(project.startDate).toISOString().split("T")[0] &&
      new Date(project.startDate) < new Date(project.endDate)
    ) {
      if (currentMileStoneIndex > 0) {
        if (
          new Date(project.startDate) <
            new Date(project.milestones[0].tillDate) &&
          new Date(project.milestones[currentMileStoneIndex - 1].tillDate) <
            new Date(project.endDate)
        ) {
          return true;
        } else {
          toast?.showMessage(
            "Milestone date does not align with other dates.",
            "alert"
          );
          return false;
        }
      }
      return true;
    }
    toast?.showMessage("Invalid Project Dates", "alert");
    return false;
  };

  const validateMilestoneDate = () => {
    if (
      new Date(project.startDate) < new Date(tempMilestone.tillDate) &&
      new Date(tempMilestone.tillDate) < new Date(project.endDate)
    ) {
      if (currentMileStoneIndex > 0) {
        if (
          new Date(project.milestones[currentMileStoneIndex - 1].tillDate) <
          new Date(tempMilestone.tillDate)
        ) {
          return true;
        } else {
          toast?.showMessage(
            "Milestone date does not align with other dates.",
            "alert"
          );
          return false;
        }
      }
      return true;
    }
    toast?.showMessage("Invalid Milestone Dates", "alert");
    return false;
  };

  const handleStatistics = () => {
    setProject((prevProject) => ({
      ...prevProject,
      statistics: {
        ...prevProject.statistics,
        totalAmount: prevProject.statistics.totalAmount + tempMilestone.cost,
        averagePerMilestone:
          (prevProject.statistics.totalAmount + tempMilestone.cost) /
          (currentMileStoneIndex + 1),
        maxPayable:
          tempMilestone.cost > prevProject.statistics.maxPayable
            ? tempMilestone.cost
            : prevProject.statistics.maxPayable,
        minPayable:
          tempMilestone.cost < prevProject.statistics.minPayable
            ? tempMilestone.cost
            : prevProject.statistics.minPayable,
        countOfDifficulties: {
          beginner:
            difficulty === "Beginner"
              ? prevProject.statistics.countOfDifficulties.beginner + 1
              : prevProject.statistics.countOfDifficulties.beginner,
          intermediate:
            difficulty === "Intermediate"
              ? prevProject.statistics.countOfDifficulties.intermediate + 1
              : prevProject.statistics.countOfDifficulties.intermediate,
          advanced:
            difficulty === "Advanced"
              ? prevProject.statistics.countOfDifficulties.advanced + 1
              : prevProject.statistics.countOfDifficulties.advanced,
        },
      },
    }));
  };

  const validateWalletAddress = (): boolean => {
    const walletAddressPattern = /^0x[a-fA-F0-9]{40}$/;
    if (walletAddressPattern.test(project.freelancerPublicAddress)) {
      return true;
    } else {
      toast?.showMessage("Invalid Wallet Address.", "warning");
      return false;
    }
  };

  const handleAddMilestoneButton = () => {
    if (currentMileStoneIndex < 10) {
      if (validateProjectDetails() && validateProjectDates() && validateWalletAddress()) {
        if (validateMilestoneDetails() && validateMilestoneDate()) {
          setProject((prevProject) => {
            const updatedMilestones = [...prevProject.milestones];
            updatedMilestones[currentMileStoneIndex] = {
              ...tempMilestone,
            };
            return {
              ...prevProject,
              milestones: updatedMilestones,
            };
          });
          handleStatistics();
          setCurrentMileStoneIndex(currentMileStoneIndex + 1);
          resetMilestoneDetails();
          toast?.showMessage("Milestone Added!", "info");
          
        }
      }
    } else {
      toast?.showMessage("Max 10 milestones are allowed.", "warning");
    }
  };

  const uploadToFirebase = async () => {
    try {
        // Generate a new projectId
        const projectId = uuidv4();

        // Store in a local variable instead of relying on React state
        const updatedProject = {
            ...project,
            projectId: projectId,  // Assign projectId directly
        };

        setProject(updatedProject);  // Update state, but do not rely on it immediately

        const userData = localStorage.getItem("userData");

        if (!userData) {
            throw new Error("User data not found");
        }

        const userDataObj = JSON.parse(userData);
        const clientEmail = userDataObj.email;
        const clientuid = userDataObj.uid;

        if (!clientEmail) {
            throw new Error("Freelancer email not found");
        }

        try {
            const response = await axios.post("http://localhost:4000/user/c/gt", {
                projectId,  // Use local variable
                amount: project.statistics.totalAmount,
                clientEmail: clientEmail,
                freelancerEmail: project.freelancerEmail,
            });

            if (response.data.success) {
                

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const txResponse = await signer.sendTransaction(response.data.txData);
                const txResult = await txResponse.wait();

                if (txResult && txResult.status === 1) {
                    toast?.showMessage("Transaction Successfully Mined!", "info");

                    await axios.post(
                        "http://localhost:4000/user/c/sp",
                        {
                            projectData: updatedProject, // Use the local object
                            clientEmail: clientEmail,
                            clientUId: clientuid,
                            freelancerEmail: project.freelancerEmail,
                        }
                    );

                    toast?.showMessage("Project uploaded successfully", "info");
                    resetMilestoneDetails();
                    resetProjectDetails();
                } else {
                    toast?.showMessage("Transection Failed", "error");
                }
            }
        } catch (error) {
            console.error("Error fetching transaction data:", error);
            toast?.showMessage("Transection Failed", "error");
        }
    } catch (error) {
        console.error("Error uploading doc:", error);
        toast?.showMessage("Internal Server Error", "error");
    }
};
    

  const handleSubmitButton = async () => {
    // uploadToFirebase();
    if (currentMileStoneIndex !== 0) {
      if (validateProjectDetails() && validateProjectDates()) {
        try {
          setIsLoading(true);
          
          
          await uploadToFirebase();
        } catch (error) {
          console.error("Error uploading doc:", error);
          toast?.showMessage("Internal Server Error", "error");
        }
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast?.showMessage("Min 1 milestone required.", "warning");
    }
  };

  const resetMilestoneDetails = () => {
    if (milestoneRef.current) milestoneRef.current.value = "";
    if (milestoneCostRef.current) milestoneCostRef.current.value = "";
    if (tillDateRef.current) tillDateRef.current.value = "";
    setDifficulty("");
    setTempMilestone({
      name: "",
      cost: 0,
      tillDate: "",
      difficulty: "",
      status: "pending",
    });
  };

  const resetProjectDetails = () => {
    // Clear the input fields after submitting the project
    if (freelancerRef.current) freelancerRef.current.value = "";
    if (titleRef.current) titleRef.current.value = "";
    if (categoryRef.current) categoryRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (githubLinkRef.current) githubLinkRef.current.value = "";
    if (startDateRef.current) startDateRef.current.value = "";
    if (endDateRef.current) endDateRef.current.value = "";
    if (freelancerRef.current) freelancerRef.current.value = "";
    setCurrentMileStoneIndex(0);
    setProject({
      title: "",
      category: "",
      description: "",
      githubLink: "",
      startDate: "",
      endDate: "",
      statistics: {
        totalAmount: 0,
        averagePerMilestone: 0,
        maxPayable: 0,
        minPayable: 0,
        paymentDone: 0,
        milestonesCompleted: 0,
        paymentDone: 0,
        countOfDifficulties: {
          beginner: 0,
          intermediate: 0,
          advanced: 0,
        },
      },
      milestones: [],
    });
  };

  return (
    <div>
      <div className="flex items-center gap-4 justify-between px-1">
        <h1 className="flex-shrink-0 text-xl md:text-2xl lg:text-3xl">
          Add Details
        </h1>
        <hr className="w-full opacity-40 " />
      </div>
      <div className="xl:grid xl:grid-cols-2 xl:gap-4 xl:gap-x-12">
        <InputField
          ref={freelancerRef}
          max={30}
          title="Freelancer Email"
          type="email"
          placeholder="abc@ghi.com"
          icon={MdEmail}
          onChange={(e) => {
            setProject((prevProject) => ({
              ...prevProject,
              freelancerEmail: e.target.value,
            }));
          }}
        />
        <InputField
          ref={freelancerRef}
          max={42}
          min={42}
          title="Freelancer Wallet Address"
          type="text"
          placeholder="0x123.....789"
          icon={FaWallet}
          onChange={(e) => {
            setProject((prevProject) => ({
              ...prevProject,
              freelancerPublicAddress: e.target.value,
            }));
          }}
        />
        <InputField
          ref={titleRef}
          max={30}
          title="Project Title"
          type="text"
          placeholder="30 characters"
          icon={MdDriveFileRenameOutline}
          onChange={(e) => {
            setProject((prevProject) => ({
              ...prevProject,
              title: e.target.value,
            }));
          }}
        />
        <InputField
          ref={categoryRef}
          title="Category"
          type="text"
          max={30}
          placeholder="30 Characters"
          icon={MdCategory}
          onChange={(e) => {
            setProject((prevProject) => ({
              ...prevProject,
              category: e.target.value,
            }));
          }}
        />
        <InputField
          ref={descriptionRef}
          title="Description"
          type="text"
          max={100}
          placeholder="100 Characters"
          icon={CgDetailsMore}
          onChange={(e) => {
            setProject((prevProject) => ({
              ...prevProject,
              description: e.target.value,
            }));
          }}
        />
        <InputField
          ref={githubLinkRef}
          title="Github Link"
          type="url"
          placeholder="link"
          icon={FaLink}
          onChange={(e) => {
            setProject((prevProject) => ({
              ...prevProject,
              githubLink: e.target.value,
            }));
          }}
        />
        <InputField
          ref={startDateRef}
          title="Start Date"
          type="date"
          placeholder=""
          icon={MdDateRange}
          onChange={(e) => {
            setProject((prevProject) => ({
              ...prevProject,
              startDate: e.target.value,
            }));
          }}
        />
        <InputField
          ref={endDateRef}
          title="End Date"
          type="date"
          placeholder=""
          icon={MdDateRange}
          onChange={(e) => {
            setProject((prevProject) => ({
              ...prevProject,
              endDate: e.target.value,
            }));
          }}
        />
        <InputField
          ref={milestoneRef}
          title="Milestone"
          type="text"
          placeholder="Heading"
          max={30}
          icon={LuMilestone}
          onChange={(e) => {
            setTempMilestone((prevTempMilestone) => ({
              ...prevTempMilestone,
              name: e.target.value,
            }));
          }}
        />
        <InputField
          ref={milestoneCostRef}
          title="Milestone Cost"
          type="number"
          placeholder="in ethers"
          icon={TbPigMoney}
          onChange={(e) => {
            setTempMilestone((prevTempMilestone) => ({
              ...prevTempMilestone,
              cost: parseFloat(e.target.value),
            }));
          }}
        />
        <InputField
          ref={tillDateRef}
          title="Till Date"
          type="date"
          placeholder=""
          icon={MdDateRange}
          onChange={(e) => {
            setTempMilestone((prevTempMilestone) => ({
              ...prevTempMilestone,
              tillDate: e.target.value,
            }));
          }}
        />
        <div className="flex flex-col gap-2">
          <h3 className="font-body text-lg">Difficulty Level</h3>
          <div className="flex justify-around items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="difficulty"
                value="Beginner"
                checked={difficulty === "Beginner"}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                  setTempMilestone((prevTempMilestone) => ({
                    ...prevTempMilestone,
                    difficulty: e.target.value,
                  }));
                }}
              />
              Beginner
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="difficulty"
                value="Intermediate"
                checked={difficulty === "Intermediate"}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                  setTempMilestone((prevTempMilestone) => ({
                    ...prevTempMilestone,
                    difficulty: e.target.value,
                  }));
                }}
              />
              Intermediate
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="difficulty"
                value="Advanced"
                checked={difficulty === "Advanced"}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                  setTempMilestone((prevTempMilestone) => ({
                    ...prevTempMilestone,
                    difficulty: e.target.value,
                  }));
                }}
              />
              Advanced
            </label>
          </div>
        </div>

        <div className="flex justify-around gap-4 mt-4">
          <button
            onClick={handleAddMilestoneButton}
            title="Add Milestone"
            type="button"
            className="flex gap-4 items-center justify-center w-1/2 p-2 py-2 rounded-xl shadow-lg shadow-gray-800"
          >
            <IoMdAdd /> Milestone
          </button>

          {isLoading ? (
            <div className="w-1/2 flex items-center justify-center"><Loader /></div>
            
          ) : (
            <button
              onClick={handleSubmitButton}
              title="Submit Project"
              type="button"
              className="flex gap-4 items-center justify-center w-1/2 p-2 py-2 rounded-xl shadow-lg shadow-gray-800"
            >
              <IoSend /> Submit
            </button>
          )}
        </div>

        {/* preview */}
        {project.milestones.length > -1 ? (
          <div className="shadow-2xl shadow-gray-700 rounded-2xl mt-8">
            <div className="p-2 px-4 gap-2 flex items-center">
              <VscPreview></VscPreview>
              <h2 className="text-xl">Preview</h2>
            </div>
            <hr className="w-full opacity-50"></hr>
            <div className="px-4">
              <div className=" mt-2">
                <p className="flex items-center justify-between gap-4">
                  <span className="text-2xl font-bold">{project.title}</span>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <VscGithub className="w-6 h-6"></VscGithub>{" "}
                  </a>
                </p>
                <h3 className="text-lg flex gap-2 items-center">
                  <MdCategory /> {project.category}
                </h3>
                <p className="text-sm">{project.description}</p>
                <h4 className="text-lg">From: {project.startDate}</h4>
                <h4 className="text-lg">To: {project.endDate}</h4>
                <h4 className="text-lg">
                  Total cost: {project.statistics.totalAmount}
                </h4>
                <h4 className="text-lg">
                  Average per milestone:{" "}
                  {project.statistics.averagePerMilestone}
                </h4>
                <h4 className="text-lg">
                  Max payable: {project.statistics.maxPayable}
                </h4>
                <h4 className="text-lg">
                  Min payable: {project.statistics.minPayable}
                </h4>
                <h4 className="text-lg">Count of difficulties:</h4>
                <h4 className="text-lg">
                  Beginner: {project.statistics.countOfDifficulties.beginner}
                </h4>
                <h4 className="text-lg">
                  Intermediate:{" "}
                  {project.statistics.countOfDifficulties.intermediate}
                </h4>
                <h4 className="text-lg">
                  Advanced: {project.statistics.countOfDifficulties.advanced}
                </h4>
              </div>
              <div className="flex flex-col flex-grow min-h-fit py-4">
                <h1 className="text-2xl underline underline-offset-4 mb-2">
                  Work Flow
                </h1>
                {project.milestones.map((milestone, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-evenly h-fit gap-2 "
                    >
                      <div className="w-28 flex flex-col justify-end">
                        <h3 className="text-lg">{milestone.name}</h3>
                        <h4 className="text-sm">{milestone.difficulty}</h4>
                      </div>
                      <div
                        title={`${milestone.difficulty} level`}
                        className="flex flex-col cursor-pointer items-center"
                      >
                        <div className="w-1 h-20 rounded-t bg-[#cccccc]"></div>
                        <div
                          className={`rounded-full h-8 w-8 ${
                            milestone.difficulty === "Beginner"
                              ? "milestone-green"
                              : milestone.difficulty === "Intermediate"
                              ? "milestone-yellow"
                              : "milestone-red"
                          } p-[2px] flex items-center justify-center`}
                        >
                          <div className=" bg-[#cccccc] rounded-full h-4 w-4"></div>
                        </div>
                      </div>
                      <div className="w-28 pl-2 flex flex-col justify-end">
                        <h3 className="text-lg flex items-center gap-1">
                          <SiEthereum />
                          {milestone.cost}
                        </h3>
                        <h4 className="text-sm">{milestone.tillDate}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CreateProject;
