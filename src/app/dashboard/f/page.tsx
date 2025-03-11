"use client";

import FDisplay from "@/components/FDisplay";
import ProjectCard from "@/components/ProjectCard";

export default function F() {


  return (
    <div className="p-4 flex flex-col gap-8 pb-32 md:px-20 lg:px-72">

      <FDisplay
          list={["Project 1", "Project 2", "Project 3"]}
          text="Projects"
          component={<ProjectCard />}
        />

    </div>
  );
}
