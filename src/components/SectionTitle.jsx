/** @format */

import React from "react";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center space-y-1 md:w-72 mx-auto my-20">
      <h4 className="text-[#D99904]">--- {title} ---</h4>
      <h3 className="text-2xl border-t-2 py-4 border-[#E8E8E8] border-b-2">
        {subtitle}
      </h3>
    </div>
  );
};

export default SectionTitle;
