import { Link as ScrollLink } from "react-scroll";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 h-screen w-64 shadow-lg z-10 p-4 bg-primary">
      <div className="flex flex-col space-y-10 w-full text-center pt-12 items-center">
        <div className="w-40 h-40 bg-secondary rounded-full"></div>
        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          containerId="scroll-container"
          className="cursor-pointer font-sans text-white font-bold hover:underline"
        >
          About
        </ScrollLink>
        <ScrollLink
          to="teaching"
          smooth={true}
          duration={500}
          containerId="scroll-container"
          className="cursor-pointer font-sans  text-white font-bold hover:underline"
        >
          Teaching
        </ScrollLink>
        <ScrollLink
          to="service"
          smooth={true}
          duration={500}
          containerId="scroll-container"
          className="cursor-pointer font-sans text-white font-bold hover:underline"
        >
          Academic Service
        </ScrollLink>
        <ScrollLink
          to="publications"
          smooth={true}
          duration={500}
          containerId="scroll-container"
          className="cursor-pointer font-sans text-white font-bold hover:underline"
        >
          Publications
        </ScrollLink>
      </div>
    </nav>
  );
};

export default NavBar;
