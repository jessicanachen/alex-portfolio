import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import services from '@/data/service.json';

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);


const Service = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  try {
    return (
      <div ref={ref} className="py-card-padding px-md-spacer lg:px-lg-spacer shadow-lg bg-white">
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
          className="overflow-x-auto flex pt-xs-spacer lg:pt-sm-spacer space-x-xs-spacer lg:space-x-sm-spacer"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {services.map((service, index) => (
            <MotionDiv
              key={index}
              className="flex flex-col rounded-lg shadow-lg bg-secondary p-card-padding min-w-60 lg:min-w-72"
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
