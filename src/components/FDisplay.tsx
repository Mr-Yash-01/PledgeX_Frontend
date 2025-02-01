import React, { useState, useRef } from "react";
import { IoSearchSharp, IoSend } from "react-icons/io5";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import InputField from "./InputField";
import {
  MdCategory,
  MdDateRange,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { FaLink } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { LuMilestone } from "react-icons/lu";
import { GiTakeMyMoney } from "react-icons/gi";

interface FDisplayProps {
  text: string;
  component?: React.ReactNode;
  list?: string[];
}

const CDisplay: React.FC<FDisplayProps> = ({ text, component, list }) => {
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [project, setProject] = useState({
    title: "",
    category: "",
    description: "",
    githubLink: "",
    startDate: "",
    endDate: "",
    totalAmount: "",
    milestones: [],
  });
  const [difficulty, setDifficulty] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const githubLinkRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const totalAmountRef = useRef<HTMLInputElement>(null);
  const milestoneRef = useRef<HTMLInputElement>(null);
  const milestoneCostRef = useRef<HTMLInputElement>(null);
  const tillDateRef = useRef<HTMLInputElement>(null);

const handleAddMilestone = () => {
    const milestoneName = milestoneRef.current?.value;
    const milestoneCost = milestoneCostRef.current?.value;
    const tillDate = tillDateRef.current?.value;
    const startDate = startDateRef.current?.value;
    const endDate = endDateRef.current?.value;

    if (!startDate || !endDate) {
        alert("Please fill in the start and end dates before adding a milestone.");
        return;
    }

    if (new Date(tillDate) < new Date(startDate) || new Date(tillDate) > new Date(endDate)) {
        alert("Till Date must be between Start Date and End Date.");
        return;
    }

    if (milestoneName && milestoneCost && tillDate && difficulty) {
        setProject((prevProject) => ({
            ...prevProject,
            milestones: [
                ...prevProject.milestones,
                {
                    name: milestoneName,
                    cost: milestoneCost,
                    tillDate: tillDate,
                    difficulty: difficulty,
                },
            ],
        }));

        // Clear the input fields after adding the milestone
        if (milestoneRef.current) milestoneRef.current.value = "";
        if (milestoneCostRef.current) milestoneCostRef.current.value = "";
        if (tillDateRef.current) tillDateRef.current.value = "";
        setDifficulty("");
        console.log(project);
    } else {
        alert("Please fill in all milestone fields.");
    }
};

  const handleSubmit = () => {
    // Handle the submit logic here
    const title = titleRef.current?.value;
    const category = categoryRef.current?.value;
    const description = descriptionRef.current?.value;
    const githubLink = githubLinkRef.current?.value;
    const startDate = startDateRef.current?.value;
    const endDate = endDateRef.current?.value;
    const totalAmount = totalAmountRef.current?.value;

    if (!title || !category || !description || !githubLink || !startDate || !endDate || !totalAmount) {
        alert("Please fill in all fields.");
        return;
    }

    if (title.length > 30 || category.length > 30) {
        alert("Title and Category must be less than 30 characters.");
        return;
    }

    if (description.length > 100) {
        alert("Description must be less than 100 characters.");
        return;
    }

    if (isNaN(parseFloat(totalAmount))) {
        alert("Total Amount must be a valid number.");
        return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
        alert("Start Date must be earlier than End Date.");
        return;
    }

    setProject({
        ...project,
        title,
        category,
        description,
        githubLink,
        startDate,
        endDate,
        totalAmount,
    });
    console.log("Project submitted:", project);
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
            title="Project Title"
            type="text"
            placeholder="Title"
            icon={MdDriveFileRenameOutline}
          />
          <InputField
            ref={categoryRef}
            title="Category"
            type="text"
            placeholder="category"
            icon={MdCategory}
          />
          <InputField
            ref={descriptionRef}
            title="Description"
            type="text"
            placeholder="Max. 100 Characters"
            icon={CgDetailsMore}
          />
          <InputField
            ref={githubLinkRef}
            title="Github Link"
            type="url"
            placeholder="link"
            icon={FaLink}
          />
          <InputField
            ref={startDateRef}
            title="Start Date"
            type="date"
            placeholder=""
            icon={MdDateRange}
          />
          <InputField
            ref={endDateRef}
            title="End Date"
            type="date"
            placeholder=""
            icon={MdDateRange}
          />
          <InputField
            ref={totalAmountRef}
            title="Total Amount"
            type="number"
            placeholder="in ethers"
            icon={GiTakeMyMoney}
          />
          <InputField
            ref={milestoneRef}
            title="Milestone"
            type="text"
            placeholder="Heading"
            icon={LuMilestone}
          />
          <InputField
            ref={milestoneCostRef}
            title="Milestone Cost"
            type="text"
            placeholder="in ethers"
            icon={TbPigMoney}
          />
          <InputField
            ref={tillDateRef}
            title="Till Date"
            type="date"
            placeholder=""
            icon={MdDateRange}
          />
          <div className="flex flex-col gap-2">
            <h3 className="font-body text-lg">Difficulty Level</h3>
            <div className="flex justify-around items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  checked={difficulty === "easy"}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                Easy
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="difficulty"
                  value="moderate"
                  checked={difficulty === "moderate"}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                Moderate
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="difficulty"
                  value="difficult"
                  checked={difficulty === "difficult"}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                Difficult
              </label>
            </div>
          </div>

          <div className="flex justify-around gap-4 mt-4">
            <button
              onClick={handleAddMilestone}
              title="Add Milestone"
              type="button"
              className="flex gap-4 items-center justify-center w-1/2 p-2 py-2 rounded-xl shadow-lg shadow-gray-700"
            >
              <IoMdAdd /> Milestone
            </button>
            <button
              onClick={handleSubmit}
              title="Submit Project"
              type="button"
              className="flex gap-4 items-center justify-center w-1/2 p-2 py-2 rounded-xl shadow-lg shadow-gray-700"
            >
              <IoSend /> Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CDisplay;
