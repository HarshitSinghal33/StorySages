import React from "react";

// Components
import { FaRegPaperPlane } from "react-icons/fa6";
import { toast } from "react-toastify";
import Button from "../ui/Button";

export const ShareButton = ({ title, url, text }) => {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, text, url });
    } else {
      toast.error('Share not supported in that browser');
    }
  };
  return (
    <Button className='bg-white text-black flex gap-1.5 items-center font-semibold' onClick={handleShare}>Share <FaRegPaperPlane fontSize={18} /></Button>
  );
};