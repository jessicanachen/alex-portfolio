"use client";
import { useState } from "react";
import { Element } from "react-scroll";
import {
  AlignVerticalJustifyStart,
  AlignVerticalSpaceAround
} from "lucide-react";

import NavBar from "@/components/NavBar";
import About from "@/components/sections/About";
import Teaching from "@/components/sections/Teaching";
import Service from "@/components/sections/Service";
import Publications from "@/components/sections/Publications";

type SnapMode = "none" | "normal" | "always";

export default function Home() {
  const [snapMode, setSnapMode] = useState<SnapMode>("none");

  const toggleSnap = () => {
    setSnapMode((prev) =>
      prev === "none" ? "normal" : prev === "normal" ? "always" : "none"
    );
  };

  const getSnapClasses = () => {
    if (snapMode === "normal") return "snap-y snap-normal";
    if (snapMode === "always") return "snap-y snap-always";
    return "";
  };

  return (
    <div className="flex w-full">
      <NavBar />

      {/* Scrollable content area */}
      <div
        id="scroll-container"
        className={`flex flex-col w-full h-screen pl-nav-compact lg:pl-nav-width overflow-y-auto scroll-smooth ${getSnapClasses()}`}
      >
        <Element
          name="about"
          id="about"
          className="min-h-fit px-md-spacer lg:px-lg-spacer max-w-2xl lg:max-w-4xl flex flex-col pt-lg-spacer snap-start"
        >
          <About />
        </Element>
        <Element
          name="teaching"
          id="teaching"
          className="min-h-fit flex flex-col snap-start"
        >
          <Teaching />
        </Element>
        <Element
          name="service"
          id="service"
          className="flex flex-col pt-md-spacer lg:pt-lg-spacer snap-start"
        >
          <Service />
        </Element>
        <Element
          name="publications"
          id="publications"
          className="min-h-fit flex flex-col pt-lg-spacer px-md-spacer lg:px-lg-spacer snap-start"
        >
          <Publications />
        </Element>
      </div>

      {/* Toggle button - bottom right */}
      <button
        onClick={toggleSnap}
        className={`fixed bottom-4 right-4 z-20 transition-colors duration-1000 ease-in-out ${
          snapMode === "none"
            ? "bg-primary hover:bg-highlight2"
            : snapMode === "normal"
            ? "bg-highlight2 hover:bg-highlight1"
            : "bg-highlight1 hover:bg-primary"
        } text-white p-xs-spacer rounded-full shadow-lg transition-colors`}
        title={`Scroll snapping: ${snapMode}`}
      >
        {snapMode === "none" ? (
          <AlignVerticalSpaceAround size={24} />
        ) : snapMode === "normal" ? (
          <AlignVerticalJustifyStart size={24} />
        ) : (
          <AlignVerticalJustifyStart size={24} />
        )}
      </button>
    </div>
  );
}
