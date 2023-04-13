import { useState, useCallback, useEffect } from "react";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

// Props
interface NavbarItemProps {
  label: string;
}
interface MobileMenuProps {
  visible: boolean;
}

// Menu items
const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => (
  <div className="text-white cursor-pointer hover:text-gray-300 transition">
    {label}
  </div>
);

// Menu available on small screens
const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => (
  <>
    {visible && (
      <div className="opacity-90 bg-black w-56 absolute top-8 left-[-100%] py-5 flex-col border-t-white border-gray-800 border-2">
        <div className="flex flex-col ">
          <div className="px-3 text-center text-gray-400 hover:bg-zinc-900 text-sm hover:text-white hover:font-semibold py-2.5">
            Home
          </div>
          <div className="px-3 text-center text-gray-400 hover:bg-zinc-900 text-sm hover:text-white hover:font-semibold py-2.5">
            Series
          </div>
          <div className="px-3 text-center text-gray-400 hover:bg-zinc-900 text-sm hover:text-white hover:font-semibold py-2.5">
            Films
          </div>
          <div className="px-3 text-center text-gray-400 hover:bg-zinc-900 text-sm hover:text-white hover:font-semibold py-2.5">
            New & Popular
          </div>
          <div className="px-3 text-center text-gray-400 hover:bg-zinc-900 text-sm hover:text-white hover:font-semibold py-2.5">
            My List
          </div>
          <div className="px-3 text-center text-gray-400 hover:bg-zinc-900 text-sm hover:text-white hover:font-semibold py-2.5">
            Browse by language
          </div>
        </div>
      </div>
    )}
  </>
);

// Main component
const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, [showMobileMenu]);

  const toggleProfile = useCallback(() => {
    setShowProfile((current) => !current);
  }, [showProfile]);

  useEffect(() => {
    const handleScroll = () => {
        if(window.scrollY > TOP_OFFSET) {
            setShowBackground(true)
        } else {
            setShowBackground(false)
        }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <nav className="w-full fixed z-40">
      {/* Logo and Nav Items   */}
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}`} >
        <img src="/images/logo.png" alt="logo" className="h-[18px] lg:h-7" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by language" />
        </div>

        {/* Mobile Menu */}
        <div
          onClick={toggleMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className={`text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>

        {/* Right side icons */}
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>

          {/* Profile Menu */}
          <div
            onClick={toggleProfile}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden relative">
              <img src="/images/default-blue.png" alt="profile" />
            </div>
            <BsChevronDown className={`text-white transition ${showProfile ? "rotate-180" : "rotate-0"}`} />
            <AccountMenu visible={showProfile} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
