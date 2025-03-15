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
        <MotionDiv
          initial={{ opacity: .5, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <h1>Publications</h1>
          <MotionDiv className="relative mt-xs-spacer lg:mt-lg-spacer mx-auto">
            <div className="absolute left-4 lg:left-1/2 transform -translate-x-1/2 w-1 lg:w-2 rounded-lg bg-highlight1 h-full"></div>

            {publications.map((entry: ConferenceEntry, index: number) => (
              <MotionDiv
                key={index}
                className={`relative flex flex-col items-center lg:flex-row lg:items-center lg:mb-lg-spacer ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
                initial={{ opacity: .5, x: index % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
              >
                <div
                  className={`flex items-center justify-center absolute left-4 lg:left-1/2 transform -translate-x-1/2 bg-background lg:bg-highlight1 border-4 border-highlight1 lg:border-highlight2 w-4 lg:w-12 h-4 lg:h-12 rounded-full`}
                >
                  <PawPrint className="hidden lg:block w-6 h-6 text-highlight2" />
                </div>

                <div
                  className={`pl-md-spacer w-full lg:w-1/2 ${
                    index % 2 === 1
                      ? "lg:ml-auto lg:text-right lg:pr-md-spacer"
                      : "lg:mr-auto lg:pl-md-spacer"
                  }`}
                >
                  <h3 className="text-primary">{entry.Year}</h3>
                </div>

                <div
                  className={`pl-md-spacer mt-sm-spacer mb-lg-spacer w-full lg:w-1/2 lg:my-0  ${
                    index % 2 === 0
                      ? "lg:mr-auto lg:pr-md-spacer lg:pl-0"
                      : "lg:ml-auto lg:pl-md-spacer"
                  }`}
                >
                  <div className="bg-white rounded-lg shadow-md p-card-padding">
                    <h5>{entry.Conference}</h5>

                    {entry.Publications.map((pub, pubIndex) => (
                      <MotionDiv
                        key={pubIndex}
                        className="mt-xs-spacer lg:mt-sm-spacer"
                        initial={{ opacity: .5, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: pubIndex * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        <div>
                          <h6>
                            <button
                              onClick={() =>
                                toggleExpand(`${index}-${pubIndex}`)
                              }
                              className="flex items-center justify-between w-full text-left outline-none focus:ring-2 focus:ring-highlight2"
                            >
                              <span className="font-bold">{pub.Name}</span>
                              <span className="ml-sm-spacer">
                                {expanded[`${index}-${pubIndex}`] ? (
                                  <ChevronUp size={24} />
                                ) : (
                                  <ChevronDown size={24} />
                                )}
                              </span>
                            </button>
                          </h6>

                          {pub.Link && (
                            <Link
                              href={pub.Link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:underline focus-visible:underline focus:outline-highlight2"
                              tabIndex={0}
                            >
                              <p className="text-sm lg:text-base py-xs-spacer text-primary">
                                Visit publication ↗
                              </p>
                            </Link>
                          )}
                        </div>

                        {expanded[`${index}-${pubIndex}`] && (
                          <p className="pt-xs-spacer text-muted break-words">
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
    );
  } catch (error) {
    console.error("Framer Motion error:", error);
    return <div>Error loading animation</div>;
  }
};

export default Publications;
