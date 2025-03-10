import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import publications from "@/data/publications.json";
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

const Publications: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  try {
    return (
      <div ref={ref} className="min-h-screen pt-16 lg:pt-24">
        <div className="flex lg:hidden">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            <h1>Publications</h1>
            <MotionDiv
              className="relative mt-4 mx-auto"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 2 }}
            >
              <div className="absolute left-4 transform -translate-x-1/2 w-1 rounded-lg bg-highlight1 h-full"></div>

              {publications.map((entry: ConferenceEntry, index: number) => (
                <MotionDiv
                  key={index}
                  className={`relative flex flex-col items-center mb-10 }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1, delay: index * 0.2 }}
                >
                  <div className="flex items-center justify-center absolute left-4 transform -translate-x-1/2 bg-highlight1 border-4 border-highlight2 w-10 h-10 rounded-full">
                    <PawPrint className="w-4 h-4 text-highlight2" />
                  </div>
                  <div className="flex items-center justify-center absolute h-10 left-12 transform">
                    <h3 className="text-primary">{entry.Year}</h3>
                  </div>

                  <div className={`pl-8 mt-12 w-full`}>
                    <div className="bg-white rounded-2xl shadow-md p-4">
                      <h5>{entry.Conference}</h5>

                      {entry.Publications.map((pub, pubIndex) => (
                        <MotionDiv
                          key={pubIndex}
                          className="mt-2"
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: pubIndex * 0.1 }}
                        >
                          <h6>
                            <button
                              onClick={() =>
                                toggleExpand(`${index}-${pubIndex}`)
                              }
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
                              <span className="ml-1">
                                {expanded[`${index}-${pubIndex}`] ? "▲" : "▼"}
                              </span>
                            </button>
                          </h6>

                          {expanded[`${index}-${pubIndex}`] && (
                            <p className="pt-1 break-all">{pub.Description}</p>
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

        <div className="hidden lg:flex">
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
                              onClick={() =>
                                toggleExpand(`${index}-${pubIndex}`)
                              }
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
      </div>
    );
  } catch (error) {
    console.error("Framer Motion error:", error);
    return <div>Error loading animation</div>;
  }
};

export default Publications;
