import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import publications from "@/data/publications.json";
import { PawPrint, ChevronUp, ChevronDown } from "lucide-react";

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
      <div ref={ref} className="min-h-screen pt-sm-spacer lg:pt-lg-spacer">
        <div className="flex lg:hidden">
          <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <h1>Publications</h1>
            <MotionDiv className="relative mt-xs-spacer mx-auto">
              <div className="absolute left-4 transform -translate-x-1/2 w-1 rounded-lg bg-highlight1 h-full"></div>

              {publications.map((entry: ConferenceEntry, index: number) => (
                <MotionDiv
                  key={index}
                  className={`relative flex flex-col items-center mb-md-spacer }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex items-center justify-center absolute left-4 transform -translate-x-1/2 bg-background border-4 border-highlight1 w-4 h-4 rounded-full"></div>
                  <div className="flex items-center justify-center absolute h-4 left-md-spacer transform">
                    <h3 className="text-primary">{entry.Year}</h3>
                  </div>

                  <div className={`pl-md-spacer mt-lg-spacer w-full`}>
                    <div className="bg-white rounded-lg shadow-md p-card-padding">
                      <h5>{entry.Conference}</h5>

                      {entry.Publications.map((pub, pubIndex) => (
                        <MotionDiv
                          key={pubIndex}
                          className="mt-xs-spacer"
                          initial={{ opacity: 0, y: 8 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            duration: 0.4,
                            delay: pubIndex * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <h6>
                            <button
                              onClick={() =>
                                toggleExpand(`${index}-${pubIndex}`)
                              }
                              className="flex items-end justify-between w-full text-left"
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
                              <span className="ml-xs-spacer">
                                {expanded[`${index}-${pubIndex}`] ? (
                                  <ChevronUp size={24} />
                                ) : (
                                  <ChevronDown size={24} />
                                )}
                              </span>
                            </button>
                          </h6>

                          {expanded[`${index}-${pubIndex}`] && (
                            <p className="pt-xs-spacer break-all text-muted">
                              {pub.Description}
                            </p>
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
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <h1>Publications</h1>
            <MotionDiv className="relative mt-lg-spacer mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-2 rounded-lg bg-highlight1 h-full"></div>

              {publications.map((entry: ConferenceEntry, index: number) => (
                <MotionDiv
                  key={index}
                  className={`relative flex items-center mb-lg-spacer ${
                    index % 2 === 0 ? "flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className={`w-1/2 p-md-spacer  ${
                      index % 2 === 1
                        ? "ml-auto text-right pr-md-spacer"
                        : "mr-auto pl-md-spacer"
                    }`}
                  >
                    <h3 className="text-primary">{entry.Year}</h3>
                  </div>

                  <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 bg-highlight1 border-4 border-highlight2 w-12 h-12 rounded-full">
                    <PawPrint className="w-6 h-6 text-highlight2" />
                  </div>

                  <div
                    className={`w-1/2 ${
                      index % 2 === 0
                        ? "mr-auto pr-md-spacer"
                        : "ml-auto pl-md-spacer"
                    }`}
                  >
                    <div className="bg-white rounded-lg shadow-md p-card-padding w-full">
                      <h5>{entry.Conference}</h5>

                      {entry.Publications.map((pub, pubIndex) => (
                        <MotionDiv
                          key={pubIndex}
                          className="mt-sm-spacer"
                          initial={{ opacity: 0, y: 8 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            duration: 0.4,
                            delay: pubIndex * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <h6 className="">
                            <button
                              onClick={() =>
                                toggleExpand(`${index}-${pubIndex}`)
                              }
                              className="flex items-end justify-between w-full text-left"
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
                              <span className="ml-sm-spacer">
                                {expanded[`${index}-${pubIndex}`] ? (
                                  <ChevronUp size={24} />
                                ) : (
                                  <ChevronDown size={24} />
                                )}
                              </span>
                            </button>
                          </h6>

                          {expanded[`${index}-${pubIndex}`] && (
                            <p className="pt-xs-spacer text-muted">{pub.Description}</p>
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
