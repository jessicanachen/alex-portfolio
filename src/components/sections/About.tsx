import dynamic from "next/dynamic";
// import about from "@/data/about.json";
// import education from "@/data/education.json";
import { useInView } from "react-intersection-observer";

// framer motion without ssr because it was not hydrating correctly with it
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const about = [
  {
    Title: "PhD Student",
    Place: "University of California, San Diego",
    Email: "Email",
    About:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    Title: "PHD Student",
    Place: "Place",
    Email: "Email",
    About:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const education = [
  {
    School: "Duke University",
    Place: "Durham, NC",
    Year: 2022,
    Notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    School: "Duke University",
    Place: "Durham, NC",
    Year: 2022,
    Notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  const aboutData = about[0];
  const headerItems = [
    aboutData.Title,
    aboutData.Place,
    aboutData.Email,
  ].filter(Boolean);

  try {
    return (
      <div ref={ref} className="min-h-screen pt-12">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
        >
          <h1>Alex Chao</h1>
          <MotionDiv
            className="font-sans text-2xl pb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 2 }}
          >
            {headerItems.join(", ")}
          </MotionDiv>
          <p>{aboutData.About}</p>

          <div className="pt-12">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <MotionDiv
                key={index}
                className="mt-2"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <h3>
                  {edu.School} | {edu.Place} | {edu.Year}
                </h3>
                <p>{edu.Notes}</p>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    );
  } catch (error) {
    console.error("Framer Motion error:", error);
  return <div>Error loading animation</div>;
  }
};

export default About;
