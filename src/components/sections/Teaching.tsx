import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import teachingBlurb from "@/data/teaching_blurb.json";
import teaching from "@/data/teaching.json";
import ta from "@/data/ta.json";

type Coteacher = {
  Name: string;
  Link?: string;
};

type Year = {
  Semester: string;
  Year: number;
  Coteachers?: Coteacher[];
};

type TeachingCourse = {
  Class: string;
  Year: Year[];
  Link?: string;
  Description: string;
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

  try {
    return (
      <div ref={ref} className="min-h-screen pt-12">
        {/* Teaching Blurb */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mx-6 lg:m-6 px-6 py-6 bg-white rounded-3xl shadow-lg"
        >
          <div className="flex justify-between items-center">
            <h1 className={`${expanded ? "pb-2" : "pb-0"}`}>Teaching</h1>
            <button
              onClick={toggleExpand}
              className={`lg:hidden text-lg focus:outline-none ${expanded ? "text-highlight1" : "text-highlight2"}`}
            >
              {expanded ? "▲" : "▼"}
            </button>
          </div>

          <p className={`${expanded ? "flex" : "hidden"}`}>{teachingBlurbData.Blurb}</p>
        </MotionDiv>

        <div className="p-8 max-w-2xl lg:max-w-4xl lg:px-12 lg:py-0">
          {/* Instructing Experience */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <h2>Instructor Experience</h2>
            {teaching.map((course: TeachingCourse, index) => (
              <MotionDiv
                key={index}
                className="py-2 lg:py-4"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h3>
                  {course.Link ? (
                    <a
                      href={course.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {course.Class}
                    </a>
                  ) : (
                    course.Class
                  )}
                </h3>
                <h4 className="py-2">
                  {course.Year.map((year, yIndex) => (
                    <span key={yIndex}>
                      {year.Semester} {year.Year}
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
                                className="underline"
                              >
                                {teacher.Name}
                              </a>
                            ) : (
                              teacher.Name
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
                <p>{course.Description}</p>
              </MotionDiv>
            ))}
          </MotionDiv>

          {/* TA Experience */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="py-4 lg:py-6"
          >
            <h2>TA Experience</h2>
            <ul className="py-2">
              {ta.map((course, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
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
        </div>
      </div>
    );
  } catch (error) {
    console.error("Framer Motion error:", error);
    return <div>Error loading animation</div>;
  }
};

export default Teaching;
