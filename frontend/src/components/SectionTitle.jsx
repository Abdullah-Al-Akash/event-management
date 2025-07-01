import React from "react";

const SectionTitle = ({title}) => {
  return (
    <div className="flex justify-center py-8 mb-4">
      <h3 className="md:text-3xl text-lg text-center font-semibold text-brandGreen inline-block px-4 py-2 rounded-xl  border-s-2 border-b-4 border-brandGreen">
        {title}
      </h3>
    </div>
  );
};

export default SectionTitle;
