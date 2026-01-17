"use client";

import { useEffect, useState } from "react";
import Loader from "../loader";

export default function LoaderWrapper() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return <Loader />;
}
