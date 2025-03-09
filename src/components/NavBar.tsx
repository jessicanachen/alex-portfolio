"use client"
import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect, useRef } from "react";
import { Menu, BookOpen, User, Briefcase, FileText } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <nav
      ref={menuRef}
      className={`fixed top-0 left-0 h-screen shadow-lg z-10 p-4 bg-primary transition-all
      ${isOpen ? "w-36" : "w-16"} lg:w-64`}
    >
      <div
        className={`flex flex-col space-y-10 w-full pt-12 ${
          isOpen ? "text-left" : "text-center"
        } lg:text-center lg:items-center lg:flex`}
      >
        {/* menu icon for now but could also be a headshot just may look funny */}
        <div onClick={toggleMenu} className="cursor-pointer lg:hidden">
          <Menu size={32} className={`inline cursor-pointer text-white`} />{" "}
        </div>
        {/* headshot */}
        <div className="w-40 h-40 bg-secondary rounded-full hidden lg:flex"></div>

        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          containerId="scroll-container"
          className="cursor-pointer font-sans text-white font-bold hover:underline"
          onClick={closeMenu}
        >
          <User className={`${isOpen ? "opacity-90" : "opacity-70"} inline`} size={24} />{" "}
          <span className={`${isOpen ? "inline" : "hidden"} lg:inline`}>
            About
          </span>
        </ScrollLink>
        <ScrollLink
          to="teaching"
          smooth={true}
          duration={500}
          containerId="scroll-container"
          className="cursor-pointer font-sans text-white font-bold hover:underline"
          onClick={closeMenu}
        >
          <BookOpen className={`${isOpen ? "opacity-90" : "opacity-70"} inline`} size={24} />{" "}
          <span className={`${isOpen ? "inline" : "hidden"} lg:inline`}>
            Teaching
          </span>
        </ScrollLink>
        <ScrollLink
          to="service"
          smooth={true}
          duration={500}
          containerId="scroll-container"
          className="cursor-pointer font-sans text-white font-bold hover:underline"
          onClick={closeMenu}
        >
          <Briefcase className={`${isOpen ? "opacity-90" : "opacity-70"} inline`} size={24} />{" "}
          <span className={`${isOpen ? "inline" : "hidden"} lg:inline`}>
            Academic Service
          </span>
        </ScrollLink>
        <ScrollLink
          to="publications"
          smooth={true}
          duration={500}
          containerId="scroll-container"
          className="cursor-pointer font-sans text-white font-bold hover:underline"
          onClick={closeMenu}
        >
          <FileText className={`${isOpen ? "opacity-90" : "opacity-70"} inline`} size={24} />{" "}
          <span className={`${isOpen ? "inline" : "hidden"} lg:inline`}>
            Publications
          </span>
        </ScrollLink>
      </div>
    </nav>
  );
};

export default NavBar;
