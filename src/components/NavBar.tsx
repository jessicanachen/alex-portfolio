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
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 h-screen shadow-lg p-card-padding z-10 bg-navbar-gradient transition-all
        ${
          isOpen
            ? "w-nav-expanded-compact"
            : "min-w-nav-compact max-w-nav-compact"
        } lg:min-w-nav-width lg:max-w-nav-width`}
    >
      <div className="flex flex-col space-y-md-spacer w-full pt-lg-spacer items-center">
        <button
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="lg:hidden w-full cursor-pointer  focus:outline-highlight2"
        >
          <Menu size={32} className="text-white" />
        </button>

        <div className="w-5/6 h-5/6 border-4 border-secondary bg-secondary rounded-full items-center justify-center overflow-hidden hidden lg:flex">
          <Image
            src="/headshot.png"
            alt="Headshot"
            width={176}
            height={176}
            className="object-cover"
          />
        </div>

        <ul className="flex flex-col w-full lg:w-5/6 space-y-md-spacer text-left list-none p-0 m-0">
          {navLinks.map(({ to, icon, label }) => {
            return (
              <li key={to}>
                <ScrollLink
                  to={to}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-64}
                  containerId="scroll-container"
                  onSetActive={() => setActiveSection(to)}
                >
                  <button
                    onClick={closeMenu}
                    className={`flex items-center gap-xs-spacer font-sans text-white font-bold w-full text-left transition-all duration-200
        ${activeSection === to && isOpen ? "underline" : ""} 
        ${activeSection === to && !isOpen ? "lg:underline" : ""}
        ${isOpen ? "hover:underline text-secondary" : ""} 
        lg:hover:underline rounded-md p-1  focus:outline-highlight2`}
                  >
                    <span
                      className={`relative inline-block
          ${activeSection === to ? "text-white" : "opacity-70"} 
          ${
            activeSection === to && !isOpen
              ? "before:absolute before:content-[''] before:w-6 before:h-[4px] before:bg-white before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 lg:before:hidden"
              : ""
          }
        `}
                    >
                      {icon}
                    </span>
                    <span
                      className={`${isOpen ? "inline" : "hidden"} lg:inline`}
                    >
                      {label}
                    </span>
                  </button>
                </ScrollLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
