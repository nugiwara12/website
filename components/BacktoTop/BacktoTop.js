"use client";
import React, { useState, useEffect } from "react";

const BackTop = () => {
  const [showScrollButton, setShowScrollButton] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleScroll = () => {
      console.log(showScrollButton);
      if (window.scrollY > 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showScrollButton]); // Include showScrollButton in the dependency array

  const scrollToTop = () => {
    if (typeof window === "undefined") {
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      {showScrollButton && (
        <button
          className="fixed bottom-3 right-3 z-50 animate-bounce text-black p-3 rounded-full bg-sky-500 shadow-xl"
          onClick={scrollToTop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="24px"
            height="24px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M4 12l1.41 1.41L11 7.83v11.17h2V7.83l5.59 5.58L20 12l-8-8-8 8z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BackTop;
