"use client";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect, useRef } from "react";
import { Menu, BookOpen, User, Briefcase, FileText } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    {
      to: "about",
      icon: <User size={24} />,
      label: "About",
    },
    {
      to: "teaching",
      icon: <BookOpen size={24} />,
      label: "Teaching",
    },
    {
      to: "service",
      icon: <Briefcase size={24} />,
      label: "Academic Service",
    },
    {
      to: "publications",
      icon: <FileText size={24} />,
      label: "Publications",
    },
  ];

  return (
    <nav
      ref={menuRef}
      className={`fixed top-0 left-0 h-screen shadow-lg p-card-padding z-10 bg-navbar-gradient transition-all
      ${isOpen ? "w-nav-expanded-compact" : "min-w-nav-compact max-w-nav-compact"} lg:min-w-nav-width lg:max-w-nav-width`}
    >
      <div className="flex flex-col space-y-md-spacer w-full pt-lg-spacer items-center">
        <div onClick={toggleMenu} className="cursor-pointer lg:hidden w-full">
          <Menu size={32} className="inline cursor-pointer text-white" />
        </div>

        <div className="w-5/6 h-5/6 border-4 border-secondary bg-secondary rounded-full items-center justify-center overflow-hidden hidden lg:flex">
          <Image
            src="/headshot.png"
            alt="Headshot"
            width={176}
            height={176}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col w-full lg:w-5/6 space-y-md-spacer text-left">
          {navLinks.map(({ to, icon, label }) => {
            const isActive = activeSection === to;
            const showIconUnderline = isActive && !isOpen;

            return (
              <ScrollLink
                key={to}
                to={to}
                smooth={true}
                duration={500}
                spy={true}
                offset={-64}
                containerId="scroll-container"
                activeClass="active"
                className={`flex items-center gap-xs-spacer cursor-pointer font-sans text-white font-bold transition-all duration-200
                ${isActive && isOpen ? "underline" : ""} 
                ${isActive && !isOpen ? "lg:underline" : ""}
                ${isOpen ? "hover:underline text-secondary" : ""} 
                lg:hover:underline
                `}
                onSetActive={() => setActiveSection(to)}
                onClick={closeMenu}
              >
                <span
                  className={`relative inline-block 
                  hover:before:absolute hover:before:content-[''] hover:before:w-6 hover:before:h-[4px] hover:before:bg-white hover:before:bottom-[-8px] hover:before:left-1/2 hover:before:-translate-x-1/2 ${isActive ? "text-white" : "opacity-70"} 
                  ${
                    showIconUnderline
                      ? "before:absolute before:content-[''] before:w-6 before:h-[4px] before:bg-white before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 lg:before:hidden"
                      : ""
                  }
                  `}
                >
                  {icon}
                </span>
                <span className={`${isOpen ? "inline" : "hidden"} lg:inline`}>
                  {label}
                </span>
              </ScrollLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
