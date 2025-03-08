import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import teachingBlurb from '@/data/teaching_blurb.json';
import teaching from '@/data/teaching.json';
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

// const teachingBlurb = [
//   {
//     Blurb:
//       "Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl parturient imperdiet fames nibh justo. Amet neque class dis quam sollicitudin ante natoque sit. Risus curae rhoncus finibus nam potenti. Mus proin suspendisse suscipit sodales adipiscing nostra. Vitae quis est fames phasellus potenti libero. Quis cursus sed egestas quam tempor montes facilisis pulvinar. Sociosqu laoreet augue viverra suspendisse ac mauris aliquet adipiscing. Ridiculus cursus pretium curae pellentesque felis tincidunt. Semper eu non tempus tempus, primis consequat quisque interdum amet! Diam est dolor morbi turpis ullamcorper et metus pellentesque. Libero netus dignissim accumsan ac posuere luctus. Metus eget vivamus litora felis a. At sagittis lacus proin lorem quisque. Etiam netus placerat vulputate lacinia potenti. Senectus consectetur pharetra ex taciti per. Diam luctus condimentum volutpat gravida blandit consectetur rutrum.",
//   },
// ];

// const teaching = [
//   {
//     Class: "CompSci 210 Introduction to Computer Systems",
//     Year: [
//       {
//         Semester: "Fall",
//         Year: 2025,
//         Coteachers: [
//           {
//             Name: "Fain",
//             Link: "https://sites.duke.edu/btfain/",
//           },
//         ],
//       },
//       {
//         Semester: "Fall",
//         Year: 2025,
//         Coteachers: [
//           {
//             Name: "Fain",
//           },
//           {
//             Name: "Fain2",
//             Link: "https://sites.duke.edu/btfain/",
//           },
//         ],
//       },
//       {
//         Semester: "Fall",
//         Year: 2025,
//       },
//     ],
//     Link: "https://courses.cs.duke.edu/spring23/compsci330/",
//     Description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   },
//   {
//     Class: "CompSci 210 Introduction to Computer Systems",
//     Year: [
//       {
//         Semester: "Fall",
//         Year: 2025,
//       },
//     ],
//     Description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   },
// ];

// const ta = [
//   {
//     Class: "CompSci 210 Introduction to Computer Systems",
//     Year: [
//       {
//         Semester: "Fall",
//         Year: 2025,
//       },
//       {
//         Semester: "Spring",
//         Year: 2024,
//       },
//     ],
//   },
//   {
//     Class: "CompSci 210 Introduction to Computer Systems",
//     Year: [
//       {
//         Semester: "Fall",
//         Year: 2025,
//       },
//       {
//         Semester: "Spring",
//         Year: 2024,
//       },
//     ],
//   },
//   {
//     Class: "CompSci 210 Introduction to Computer Systems",
//     Year: [
//       {
//         Semester: "Fall",
//         Year: 2025,
//       },
//       {
//         Semester: "Spring",
//         Year: 2024,
//       },
//     ],
//   },
//   {
//     Class: "CompSci 210 Introduction to Computer Systems",
//     Year: [
//       {
//         Semester: "Fall",
//         Year: 2025,
//       },
//       {
//         Semester: "Spring",
//         Year: 2024,
//       },
//     ],
//   },
//   {
//     Class: "CompSci 210 Introduction to Computer Systems",
//     Year: [
//       {
//         Semester: "Fall",
//         Year: 2025,
//       },
//       {
//         Semester: "Spring",
//         Year: 2024,
//       },
//     ],
//   },
// ];

// Framer Motion without SSR
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const Teaching = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const teachingBlurbData = teachingBlurb[0];

  try {
    return (
      <div ref={ref} className="min-h-screen pt-12">
        {/* Teaching Blurb */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="m-6 px-6 py-6 bg-white rounded-3xl shadow-lg"
        >
          <h1 className="pb-2">Teaching</h1>
          <p>{teachingBlurbData.Blurb}</p>
        </MotionDiv>

        <div className="px-12">
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
                className="py-4"
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
                <h4>
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
            className="py-6"
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
