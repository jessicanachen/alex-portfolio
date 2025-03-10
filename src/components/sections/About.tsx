import dynamic from "next/dynamic";
import about from "@/data/about.json";
import education from "@/data/education.json";
import { useInView } from "react-intersection-observer";

// framer motion without ssr because it was not hydrating correctly with it
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const aboutData = about[0];
  const headerItems = [
    aboutData.Title,
    aboutData.Place,
    aboutData.Email,
  ].filter(Boolean);

  try {
    return (
      <div ref={ref} className="min-h-screen pt-sm-spacer lg:pt-lg-spacer">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
        >
          <h1>Alex Chao</h1>

          <MotionDiv
            className="font-sans text-lg lg:text-2xl pb-xs-spacer lg:pb-card-spacing"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 2 }}
          >
            {headerItems.join(", ")}
          </MotionDiv>
          <p>{aboutData.About}</p>


          <div className="pt-md-spacer lg:pt-lg-spacer">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <MotionDiv
                key={index}
                className="mt-xs-spacer"
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
