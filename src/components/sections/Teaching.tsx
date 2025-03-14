import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import teachingBlurb from "@/data/teaching_blurb.json";
import teaching from "@/data/teaching.json";
import ta from "@/data/ta.json";
import { ChevronUp, ChevronDown } from "lucide-react";

type Coteacher = {
  Name: string;
  Link?: string;
};

type Year = {
  Semester: string;
  Year: number;
  Link?: string;
  Coteachers?: Coteacher[];
};

type TeachingCourse = {
  Class: string;
  Year: Year[];
  Description: string;
};

type TA = {
  GTA: boolean;
  Class: string;
  Year: Year[];
};


const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const Teaching = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const teachingBlurbData = teachingBlurb[0];

  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={ref} className="min-h-screen py-lg-spacer">
      {/* Teaching Blurb */}
      <MotionDiv
        initial={{ opacity: .5, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="mx-card-padding px-card-padding py-card-padding bg-white rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center">
          <h1 className={`${expanded ? "pb-xs-spacer" : "pb-0"}`}>Teaching</h1>
          <button
            onClick={toggleExpand}
            className="lg:hidden text-lg focus:outline-none focus:ring-2 focus:ring-highlight2"
            aria-expanded={expanded}
            aria-label="Expand or collapse teaching section"
          >
            {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
        <p className={`${expanded ? "flex" : "hidden"}`}>
          {teachingBlurbData.Blurb}
        </p>
      </MotionDiv>

      <div className="px-card-padding">
        <div className="px-card-padding max-w-2xl lg:max-w-4xl pt-md-spacer lg:pt-lg-spacer">
          {/* Instructor Experience */}
          <MotionDiv
            initial={{ opacity: .5, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2>Instructor Experience</h2>
            {teaching.map((course: TeachingCourse, index) => (
              <MotionDiv
                key={index}
                className="pt-xs-spacer lg:pt-sm-spacer"
                initial={{ opacity: .5, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <h3>{course.Class}</h3>
                <h4 className="py-xs-spacer">
                  {course.Year.map((year, yIndex) => (
                    <span key={yIndex}>
                      {year.Link ? (
                        <a
                          href={year.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline focus:outline-none focus:ring-2 focus:ring-highlight2"
                          tabIndex={0}
                        >
                          {year.Semester} {year.Year}
                        </a>
                      ) : (
                        <>
                          {year.Semester} {year.Year}
                        </>
                      )}
                      {year.Coteachers &&
                        year.Coteachers.length > 0 &&
                        " co-taught with "}
                      {year.Coteachers &&
                        year.Coteachers.map((teacher, tIndex) => (
                          <span key={tIndex}>
                            {teacher.Link ? (
                              <a
                                href={teacher.Link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline focus:outline-none focus:ring-2 focus:ring-highlight2"
                                tabIndex={0}
                              >
                                {teacher.Name}
                              </a>
                            ) : (
                              <span>{teacher.Name}</span>
                            )}
                            {year.Coteachers &&
                              tIndex < year.Coteachers.length - 1 &&
                              ", "}
                          </span>
                        ))}
                      {yIndex !== course.Year.length - 1 && " | "}
                    </span>
                  ))}
                </h4>
                <p className="text-muted">{course.Description}</p>
              </MotionDiv>
            ))}
          </MotionDiv>

          {[
            { title: "GTA Experience", filter: (c: TA) => c.GTA },
            { title: "UTA Experience", filter: (c: TA) => !c.GTA },
          ].map((section, secIndex) => (
            <MotionDiv
              key={secIndex}
              initial={{ opacity: .5, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="pt-md-spacer lg:pt-lg-spacer"
            >
              <h2>{section.title}</h2>
              <ul className="py-xs-spacer">
                {ta.filter(section.filter).map((course, index) => (
                  <MotionDiv
                    key={index}
                    initial={{ opacity: .5, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                  >
                    <li>
                      [
                      {course.Year.map((year, yIndex) => (
                        <span key={yIndex}>
                          {year.Semester} {year.Year}
                          {yIndex < course.Year.length - 1 && ", "}
                        </span>
                      ))}
                      ]<b> {course.Class}</b>
                    </li>
                  </MotionDiv>
                ))}
              </ul>
            </MotionDiv>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teaching;
