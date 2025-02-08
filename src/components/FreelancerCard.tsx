"use Client";

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

interface FreelancerCardProps {
  freelancer: Freelancer[];
}

interface Project {
  id: string;
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
  console.log(freelancer);

  return (
    <div className="flex flex-col mt-4 p-2 gap-2 rounded-2xl  shadow-lg shadow-slate-700">
      <div className="flex px-2 gap-4 items-center">
        <div>
          <img
            src={freelancer?.picture || "/LogoWhite.png"}
            alt="profile pic"
            className="w-28 h-28 object-contain rounded "
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold uppercase truncate max-w-48">
            {freelancer?.name}
          </h1>
          <h1 className="text-base opacity-70 truncate max-w-48">
            {freelancer?.email}
          </h1>
          <p className="flex gap-2 font-bold items-center truncate max-w-48">
            {new Date(freelancer?.createdAt._seconds).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-1 items-center">
          <hr className="w-2 opacity-60" />
          <h1 className="opacity-80">About</h1>
          <hr className="w-full opacity-60" />
        </div>
        <p className="flex pl-2 flex-col gap-2 capitalize">{freelancer?.about}</p>
      </div>
    </div>
  );
}
