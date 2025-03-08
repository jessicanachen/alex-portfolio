import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import publications from '@/data/publications.json';
import { PawPrint } from "lucide-react";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

interface Publication {
  Name: string;
  Link?: string;
  Description: string;
}

interface ConferenceEntry {
  Year: string;
  Conference: string;
  Publications: Publication[];
}

// const publications = [
//   {
//     Conference: "Conference Name",
//     Year: "Jan 2023",
//     Publications: [
//       {
//         Name: "Students Use of GitHub Copilot for Working with Large Code Bases Making it longer to see what happens",
//         Description:
//           "Anshul Shah, Fatimah Alhumrani, William G. Griswold, Leo Porter, and Adalbert Gerald Soosai Raj. 2024. A Comparison of Student Behavioral Engagement in Traditional Live Coding and Active Live Coding Lectures. In Proceedings of the 2024 Innovation and Technology in Computer Science Education V. 1 (ITiCSE 2024), July 8-10, 2024, Milan, Italy. ACM, New York, NY, USA, 7 pages. https://doi.org/10.1145/3649217.3653537",
//         Link: "https://doi.org/10.1145/3649217.3653537",
//       },
//       {
//         Name: "Students Use of GitHub Copilot for Working with Large Code Bases",
//         Description:
//           "Anshul Shah, Fatimah Alhumrani, William G. Griswold, Leo Porter, and Adalbert Gerald Soosai Raj. 2024. A Comparison of Student Behavioral Engagement in Traditional Live Coding and Active Live Coding Lectures. In Proceedings of the 2024 Innovation and Technology in Computer Science Education V. 1 (ITiCSE 2024), July 8-10, 2024, Milan, Italy. ACM, New York, NY, USA, 7 pages. https://doi.org/10.1145/3649217.3653537",
//       },
//     ],
//   },
//   {
//     Conference: "Conference Name",
//     Year: "Jan 2023",
//     Publications: [
//       {
//         Name: "Students Use of GitHub Copilot for Working with Large Code Bases",
//         Description:
//           "Anshul Shah, Fatimah Alhumrani, William G. Griswold, Leo Porter, and Adalbert Gerald Soosai Raj. 2024. A Comparison of Student Behavioral Engagement in Traditional Live Coding and Active Live Coding Lectures. In Proceedings of the 2024 Innovation and Technology in Computer Science Education V. 1 (ITiCSE 2024), July 8-10, 2024, Milan, Italy. ACM, New York, NY, USA, 7 pages. https://doi.org/10.1145/3649217.3653537",
//         Link: "https://doi.org/10.1145/3649217.3653537",
//       },
//     ],
//   },
//   {
//     Conference: "Conference Name",
//     Year: "Jan 2023-Current",
//     Publications: [
//       {
//         Name: "Students Use of GitHub Copilot for Working with Large Code Bases",
//         Description:
//           "Anshul Shah, Fatimah Alhumrani, William G. Griswold, Leo Porter, and Adalbert Gerald Soosai Raj. 2024. A Comparison of Student Behavioral Engagement in Traditional Live Coding and Active Live Coding Lectures. In Proceedings of the 2024 Innovation and Technology in Computer Science Education V. 1 (ITiCSE 2024), July 8-10, 2024, Milan, Italy. ACM, New York, NY, USA, 7 pages. https://doi.org/10.1145/3649217.3653537",
//       },
//     ],
//   },
// ];

const Publications: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  try {
    return (
      <div ref={ref} className="min-h-screen pt-12">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
        >
          <h1>Publications</h1>
          <MotionDiv
            className="relative mt-10 mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 2 }}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 rounded-lg bg-highlight1 h-full"></div>

            {publications.map((entry: ConferenceEntry, index: number) => (
              <MotionDiv
                key={index}
                className={`relative flex items-center mb-10 ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <div
                  className={`w-1/2 p-6  ${
                    index % 2 === 1
                      ? "ml-auto text-right pr-12"
                      : "mr-auto pl-12"
                  }`}
                >
                  <h3 className="text-primary">{entry.Year}</h3>
                </div>

                <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 bg-highlight1 border-4 border-highlight2 w-12 h-12 rounded-full">
                  <PawPrint className="w-6 h-6 text-highlight2" />
                </div>

                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "mr-auto pr-12" : "ml-auto pl-12"
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h5>{entry.Conference}</h5>

                    {entry.Publications.map((pub, pubIndex) => (
                      <MotionDiv
                        key={pubIndex}
                        className="mt-4"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: pubIndex * 0.1 }}
                      >
                        <h6>
                          <button
                            onClick={() => toggleExpand(`${index}-${pubIndex}`)}
                            className="flex items-center justify-between w-full text-left"
                          >
                            {pub.Link ? (
                              <Link
                                href={pub.Link}
                                target="_blank"
                                className="hover:underline "
                              >
                                {pub.Name}
                              </Link>
                            ) : (
                              pub.Name
                            )}
                            <span className="ml-2">
                              {expanded[`${index}-${pubIndex}`] ? "▲" : "▼"}
                            </span>
                          </button>
                        </h6>

                        {expanded[`${index}-${pubIndex}`] && (
                          <p className="pt-2">{pub.Description}</p>
                        )}
                      </MotionDiv>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>
    );
  } catch (error) {
    console.error("Framer Motion error:", error);
    return <div>Error loading animation</div>;
  }
};

export default Publications;
