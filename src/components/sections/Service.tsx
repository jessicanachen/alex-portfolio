import { useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import services from "@/data/service.json";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type ConferenceItem = {
  Year: number[];
  Conference: string;
  Description?: string;
};

type RoleItem = {
  Role: string;
  Conference: ConferenceItem[];
  Description?: string;
};

// Lazy load motion.div for SSR compatibility
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

const Service = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedCardRef = useRef<HTMLDivElement | null>(null);

  const closeModal = () => {
    setSelectedRole(null);
    setTimeout(() => {
      lastFocusedCardRef.current?.focus();
    }, 0); // time out so after modal dismount
  };

  const roleColorMap = useMemo(() => {
    const colorPool = [
      { bg: "bg-[#ffc0a05d]", text: "text-highlight1" },
      { bg: "bg-[#cfbff75d]", text: "text-primary" },
    ];

    return services.map(() => {
      const shuffledColors = [...colorPool].sort(() => Math.random() - 0.5);
      return shuffledColors;
    });
  }, []);

  useEffect(() => {
    if (selectedRole && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [selectedRole]);

  return (
    <div
      ref={ref}
      className="py-card-padding px-md-spacer lg:px-lg-spacer bg-white"
    >
      <MotionDiv
        initial={{ opacity: .5, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <h1 className="mb-sm-spacer">Academic Service</h1>
      </MotionDiv>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-card-padding gap-x-sm-spacer mb-card-padding">
        {services.map((role, index) => {
          const uniqueConferences = [
            ...new Set(role.Conference.map((r) => r.Conference)),
          ];

          const colors = roleColorMap[index];

          return (
            <MotionDiv
              key={index}
              onClick={(e) => {
                lastFocusedCardRef.current = e.currentTarget;
                setSelectedRole(role);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  lastFocusedCardRef.current =
                    e.currentTarget as HTMLDivElement;
                  setSelectedRole(role);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed="false"
              className="cursor-pointer bg-service-gradient rounded-lg p-card-padding shadow-lg outline-none focus:ring-2 focus:ring-highlight2"
              initial={{ opacity: .5, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-xs-spacer">
                {role.Role}
              </h3>
              <div className="flex flex-wrap pt-xs-spacer gap-xs-spacer">
                {uniqueConferences.map((conference, idx) => {
                  const color = colors[idx % colors.length];
                  return (
                    <p
                      key={idx}
                      className={`${color.bg} ${color.text} text-xs font-bold py-1 px-xs-spacer rounded-full`}
                    >
                      {conference}
                    </p>
                  );
                })}
              </div>
            </MotionDiv>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedRole && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-card-padding"
            initial={{ opacity: .5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: .5 }}
            onClick={closeModal}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                closeModal();
              }
            }}
            tabIndex={-1}
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
                <button
                  ref={closeBtnRef}
                  onClick={closeModal}
                  className="absolute top-card-padding right-card-padding text-muted hover:text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <h2>{selectedRole.Role}</h2>

                <div>
                  {selectedRole.Description && (
                    <p className="text-muted py-xs-spacer">
                      {selectedRole.Description}
                    </p>
                  )}
                </div>

                <div className="space-y-sm-spacer pt-sm-spacer">
                  {selectedRole.Conference.map((conference, idx) => (
                    <div key={idx}>
                      <p className="font-semibold">
                        {conference.Conference} [{conference.Year.join(", ")}]
                      </p>
                      {conference.Description && (
                        <p className="text-sm text-muted mt-1">
                          {conference.Description}
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
