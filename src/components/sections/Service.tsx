import { useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import services from "@/data/service.json";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type RoleItem = {
  Year: number[];
  Role: string;
  Description?: string;
};

type ServiceItem = {
  Conference: string;
  Role: RoleItem[];
};

// Lazy load motion.div for SSR compatibility
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const Service = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null
  );

  const closeModal = () => setSelectedService(null);

  return (
    <div
      ref={ref}
      className="py-card-padding px-md-spacer lg:px-lg-spacer bg-white"
    >
      {/* Page Header */}
      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <h1 className="mb-sm-spacer">Academic Service</h1>
      </MotionDiv>

      {/* Grid of Conference Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-card-padding gap-x-sm-spacer">
        {services.map((service, index) => {
          const uniqueRoles = [...new Set(service.Role.map((r) => r.Role))];

          return (
            <MotionDiv
              key={index}
              onClick={() => setSelectedService(service)}
              className="cursor-pointer bg-service-gradient rounded-lg p-card-padding shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-xs-spacer">
                {service.Conference}
              </h3>
              <div className="flex flex-wrap gap-xs-spacer">
                {uniqueRoles.map((role, idx) => {
                  const isFirst = Math.random() < 0.5;
                  const bgClass = isFirst
                    ? "bg-[#ffc0a05d] text-highlight1"
                    : "bg-[#cfbff75d] text-primary";

                  return (
                    <p
                      key={idx}
                      className={`${bgClass} text-xs font-bold py-1 px-xs-spacer rounded-full`}
                    >
                      {role}
                    </p>
                  );
                })}
              </div>
            </MotionDiv>
          );
        })}
      </div>

      {/* Modal with Detailed View */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-background rounded-xl shadow-xl max-w-2xl w-full p-card-padding relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bgserice-gradient">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-muted hover:text-black transition"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <h2>
                  {selectedService.Conference}
                </h2>

                <div className="space-y-sm-spacer pt-sm-spacer">
                  {selectedService.Role.map((role, idx) => (
                    <div key={idx}>
                      <p className="font-semibold">
                        {role.Role} [{role.Year.join(", ")}]
                      </p>
                      {role.Description && (
                        <p className="text-sm text-muted mt-1">
                          {role.Description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Service;
