import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
// import services from '@/data/service.json';

// Framer Motion without SSR
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const services = [
  {
    Conference: "ACM SIGCSE TS",
    Role: [
      {
        Year: [2023, 2024],
        Role: "Reviewer",
      },
    ],
  },
  {
    Conference: "ACM SIGCSE TS",
    Role: [
      {
        Year: [2023, 2024],
        Role: "Reviewer",
      },
      {
        Year: [2023, 2024],
        Role: "Reviewer",
      },
    ],
  },
  {
    Conference: "ACM SIGCSE TS",
    Role: [
      {
        Year: [2023, 2024],
        Role: "Reviewer",
      },
    ],
  },
  {
    Conference: "ACM SIGCSE TS",
    Role: [
      {
        Year: [2023, 2024],
        Role: "Reviewer",
      },
      {
        Year: [2023, 2024],
        Role: "Reviewer",
      },
    ],
  },
  {
    Conference: "ACM SIGCSE TS",
    Role: [
      {
        Year: [2023, 2024],
        Role: "Reviewer",
      },
    ],
  },
  {
    Conference: "ACM SIGCSE TS",
    Role: [
      {
        Year: [2023, 2024],
        Role: "Reviewer",
      },
      {
        Year: [2023, 2024],
        Role: "Reviewer",
      },
    ],
  },
];

const Service = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  try {
    return (
      <div ref={ref} className="p-12 shadow-lg bg-white">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
        >
          <h1>Academic Service</h1>
        </MotionDiv>

        {/* Carousel */}
        <MotionDiv
          className="overflow-x-auto flex space-x-4 pt-2 pb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {services.map((service, index) => (
            <MotionDiv
              key={index}
              className="flex flex-col rounded-lg bg-secondary p-4 min-w-[300px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <h3>{service.Conference}</h3>
              <ul>
                {service.Role.map((roleItem, roleIndex) => (
                  <li key={roleIndex}>
                    [{roleItem.Year.join(", ")}] {roleItem.Role}
                  </li>
                ))}
              </ul>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    );
  } catch (error) {
    console.error("Framer Motion error:", error);
    return <div>Error loading animation</div>;
  }
};

export default Service;
