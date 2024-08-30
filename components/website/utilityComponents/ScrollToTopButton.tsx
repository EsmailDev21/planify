// components/ScrollToTopButton.js
"use client";
import { motion } from "framer-motion";
import { CiCircleChevUp } from "react-icons/ci";
import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        // Show button after scrolling down 300px
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      className={`fixed bottom-4 right-4 p-3 rounded-full bg-primary text-slate-950 shadow-lg ${
        visible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
      onClick={scrollToTop}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <CiCircleChevUp size={20} />
    </motion.button>
  );
}
