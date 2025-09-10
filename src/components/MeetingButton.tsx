"use client";

import React, { useState } from "react";
import { Video } from "lucide-react";
import MeetingForm from "./MeetingForm";

const MeetingButton = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleMeetingClick = () => {
    setIsFormOpen(true);
  };

  return (
    <>
      <button
        onClick={handleMeetingClick}
        className="fixed bottom-24 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="احجز ميتنج زوم"
      >
        <Video className="h-6 w-6" />

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          احجز ميتنج زوم
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </button>

      {/* Meeting Form Modal */}
      <MeetingForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default MeetingButton;
