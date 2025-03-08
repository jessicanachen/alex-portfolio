"use client";
import { Element } from "react-scroll";

import NavBar from "@/components/NavBar";
// import About from "@/components/sections/About";
// import Teaching from "@/components/sections/Teaching";
// import Service from "@/components/sections/Service";
// import Publications from "@/components/sections/Publications";

export default function Home() {
  return (
    <div className="flex w-full">
      <NavBar />
      <div id="scroll-container" className="flex flex-col w-full h-screen pl-64 overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <Element
          name="about"
          id="about"
          className="min-h-fit flex flex-col px-12 snap-start snap-always"
        >
          About
          {/* <About /> */}
        </Element>
        <Element
          name="teaching"
          id="teaching"
          className="min-h-fit flex flex-col snap-start snap-always"
        >
          Teaching
          {/* <Teaching /> */}
        </Element>
        <Element
          name="service"
          id="service"
          className="flex flex-col pt-12 snap-start snap-always"
        >
          Service
          {/* <Service /> */}
        </Element>
        <Element
          name="publications"
          id="publications"
          className="min-h-fit flex flex-col px-12 snap-start snap-always"
        >
          Publications
          {/* <Publications /> */}
        </Element>
      </div>
    </div>
  );
}
