import { isNumber } from "lodash";
import React, { useEffect, useState } from "react";

export default function useScroll(myRef) {
  const [id, setId] = useState("");
  const handleScroll = () => {
    setId("");
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isNumber(id)) {
      setTimeout(() => {
        myRef.current.scrollIntoView({ behavior: "smooth" });
        setId("");
      }, 100);
    }
  }, [id]);

  return [id, setId];
}
