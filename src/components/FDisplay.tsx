import React, { useState, useRef, useContext } from "react";
import { IoSearchSharp, IoSend } from "react-icons/io5";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import InputField from "./InputField";
import {
  MdCatchingPokemon,
  MdCategory,
  MdDateRange,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { FaLink } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { LuMilestone } from "react-icons/lu";
import { ToastContext } from "@/store/ToastContext";
import Title from "./Title";
import { VscGithub } from "react-icons/vsc";
import { SiEthereum } from "react-icons/si";

interface FDisplayProps {
  text: string;
  component?: React.ReactNode;
  list?: string[];
}

const CDisplay: React.FC<FDisplayProps> = ({ text, component, list }) => {
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");

  interface Milestone {
    name: string;
    cost: number;
    tillDate: string;
    difficulty: string;
  }

  interface Project {
    title: string;
    category: string;
    description: string;
    githubLink: string;
    startDate: string;
    endDate: string;
    totalAmount: number;
    milestones: Milestone[];
  }

  const [project, setProject] = useState<Project>({
    title: "",
    category: "",
    description: "",
    githubLink: "",
    startDate: "",
    endDate: "",
    totalAmount: 0,
    milestones: [],
  });
  const [tempMilestone, setTempMilestone] = useState<Milestone>({
    name: "",
    cost: 0,
    tillDate: "",
    difficulty: "",
  });
  const [difficulty, setDifficulty] = useState("");
  const [currentMileStoneIndex, setCurrentMileStoneIndex] = useState(0);
  const toast = useContext(ToastContext);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const githubLinkRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const milestoneRef = useRef<HTMLInputElement>(null);
  const milestoneCostRef = useRef<HTMLInputElement>(null);
  const tillDateRef = useRef<HTMLInputElement>(null);

  const dummy = [
    {
      name: "Milestone 1",
      cost: 1,
      tillDate: "2021-10-10",
      difficulty: "Beginner",
    },
    {
      name: "Milestone 2",
      cost: 2,
      tillDate: "2021-10-20",
      difficulty: "Intermediate",
    },
    {
      name: "Milestone 3",
      cost: 3,
      tillDate: "2021-10-30",
      difficulty: "Advanced",
    },
  ];

  const validateGithubLink = () => {
    return true;
    const githubLinkPattern =
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9._-]+\/?$/;

    if (githubLinkPattern.test(project.githubLink)) {
      return true;
    } else {
      toast?.showMessage("Invalid GitHub link.", "warning");
      return false;
    }
  };

  const validateProjectDetails = () => {
    console.log(project);

    if (
      project.title &&
      project.category &&
      project.description &&
      project.githubLink &&
      project.startDate &&
      project.endDate
    ) {
      if (validateGithubLink()) {
        return true;
      } else {
        toast?.showMessage("Invalid Github link!", "alert");
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
      if (/^[0-9]+$/.test(tempMilestone.cost.toString())) {
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

  const handleAddMilestoneButton = () => {
    if (currentMileStoneIndex < 10) {
      if (validateProjectDetails() && validateProjectDates()) {
        if (validateMilestoneDetails() && validateMilestoneDate()) {
          setProject((prevProject) => {
            const updatedMilestones = [...prevProject.milestones];
            updatedMilestones[currentMileStoneIndex] = {
              ...tempMilestone,
            };
            return {
              ...prevProject,
              totalAmount: prevProject.totalAmount + tempMilestone.cost,
              milestones: updatedMilestones,
            };
          });
          setCurrentMileStoneIndex(currentMileStoneIndex + 1);
          resetMilestoneDetails();
          toast?.showMessage("Milestone Added!", "info");
          console.log(project);
        }
      }
    } else {
      toast?.showMessage("Max 10 milestones are allowed.", "warning");
    }
  };

  const handleSubmitButton = () => {
    if (currentMileStoneIndex !== 0) {
      if (validateProjectDetails() && validateProjectDates()) {
        toast?.showMessage("Project submited.", "info");
        resetMilestoneDetails();
        resetProjectDetails();
        console.log(project);
      }
    } else {
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
    });
  };

  const resetProjectDetails = () => {
    // Clear the input fields after submitting the project
    if (titleRef.current) titleRef.current.value = "";
    if (categoryRef.current) categoryRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (githubLinkRef.current) githubLinkRef.current.value = "";
    if (startDateRef.current) startDateRef.current.value = "";
    if (endDateRef.current) endDateRef.current.value = "";
    setCurrentMileStoneIndex(0);
    setProject({
      title: "",
      category: "",
      description: "",
      githubLink: "",
      startDate: "",
      endDate: "",
      totalAmount: 0,
      milestones: [
        {
          name: "",
          cost: 0,
          tillDate: "",
          difficulty: "",
        },
      ],
    });
  };

  return (
    <div className="transition-all duration-500 ease-in-out">
      {isSearchEnabled ? (
        <div
          className={`flex flex-row border border-[#cccccc] items-center shadow-lg shadow-zinc-900 rounded-2xl px-4 py-2 gap-2`}
        >
          <IoSearchSharp />
          <input
            ref={searchInputRef}
            id="freelancerSearch"
            type="text"
            className={`w-full  focus:outline-none placeholder:font-body placeholder:text-gray-500`}
            placeholder="name"
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
      {/* form */}
      {component ? (
        component
      ) : (
        <div>
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
            <button
              onClick={handleSubmitButton}
              title="Submit Project"
              type="button"
              className="flex gap-4 items-center justify-center w-1/2 p-2 py-2 rounded-xl shadow-lg shadow-gray-800"
            >
              <IoSend /> Submit
            </button>
          </div>

          {/* preview */}
          {project.milestones.length > -1 ? (
            <div className="shadow-2xl shadow-gray-700 rounded-2xl mt-8">
              <div className="py-2">
                <h2 className="text-xl px-4 ">Preview</h2>
                <hr className="w-full opacity-50"></hr>
              </div>
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
                  <h4 className="text-lg">Total cost: {project.totalAmount}</h4>
                </div>
                <div className="flex flex-col flex-grow min-h-fit py-4">
                  <h1 className="text-2xl underline underline-offset-4 mb-2">Work Flow</h1>
                  {project.milestones.map((milestone, index) => {
                    return (
                      <div key={index} className="flex justify-evenly h-fit gap-2 ">
                        <div className="w-28 flex flex-col justify-end">
                          <h3 className="text-lg">{milestone.name}</h3>
                          <h4 className="text-sm">{milestone.difficulty}</h4>
                        </div>
                        <div title={`${milestone.difficulty} level`}  className="flex flex-col cursor-pointer items-center">
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
      )}
    </div>
  );
};

export default CDisplay;
