import dynamic from "next/dynamic";
import about from "@/data/about.json";
import education from "@/data/education.json";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

interface About {
  Title: string;
  Place: string;
  Email: string;
  About: string;
  Links?: string[];
}

// framer motion without ssr because it was not hydrating correctly with it
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const parseAboutWithLinks = (text: string, links: string[]) => {
  const parts = [];
  let remaining = text;
  let match;
  let linkIndex = 0;

  const regex = /\[\[(.+?)\]\]/;

  while ((match = regex.exec(remaining)) !== null) {
    const [fullMatch, linkText] = match;
    const before = remaining.slice(0, match.index);
    const after = remaining.slice(match.index + fullMatch.length);

    if (before) parts.push(before);

    const url = links[linkIndex++] || "#";

    parts.push(
      <Link
        key={`link-${linkIndex}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:underline focus-visible:underline focus:outline-highlight2"
        tabIndex={0}
      >
        {linkText}
      </Link>
    );

    remaining = after;
  }

  if (remaining) parts.push(remaining);

  return parts;
};

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
          initial={{ opacity: 0.5, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <h1>Alex Chao</h1>

          <MotionDiv
            className="font-sans text-lg lg:text-2xl pb-xs-spacer lg:pb-card-spacing"
            initial={{ opacity: 0.5, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            {headerItems.join(", ")}

            <p>{parseAboutWithLinks(aboutData.About, aboutData.Links)}</p>
          </MotionDiv>

          <div className="pt-md-spacer lg:pt-lg-spacer">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <MotionDiv
                key={index}
                className="mt-xs-spacer"
                initial={{ opacity: 0.5, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
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
