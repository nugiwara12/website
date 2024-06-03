import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { usePathname } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import app from "../config";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/"); // redirect to login page if the user is not authenticated
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // redirect to the login page after logout
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <nav>
      <div className="flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 w-64 flex justify-center items-center">
          <div
            onClick={() => setOpen(!open)}
            className={`relative border-b-4 border-transparent py-3 ${
              open ? "border-indigo-700 transform transition duration-300" : ""
            }`}
          >
            <div className="flex justify-center items-center space-x-3 cursor-pointer">
              <div className="font-semibold dark:text-white text-gray-900 text-lg">
                <div className="cursor-pointer">John Sarmiento</div>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                <img
                  src="profile/luffy.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {open && (
              <div
                ref={dropdownRef}
                className="absolute w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5"
                style={{
                  transform: "scale(1)",
                  opacity: "1",
                  transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
                }}
              >
                <ul className="space-y-3 dark:text-white">
                  <li className="font-medium">
                    <a
                      href="#"
                      className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                    >
                      <div className="mr-3">
                        <AccountCircleIcon />
                      </div>
                      Profile
                    </a>
                  </li>
                  <li className="font-medium">
                    <a
                      href="#"
                      className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                    >
                      <div className="mr-3">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </div>
                      Setting
                    </a>
                  </li>
                  <hr className="dark:border-gray-700" />
                  <li className="font-medium">
                    <a
                      href="#"
                      className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                    >
                      <div className="mr-3 text-red-600">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          ></path>
                        </svg>
                      </div>
                      <button
                        onClick={handleLogout}
                        className=" text-black font-bold py-2 px-4 rounded"
                      >
                        Log Out
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
