import React from "react";

const Button = ({ onPress, title, outline, cls }) => {
  return (
    <button
      className={`py-2 px-6 my-4 text-lg ${cls} ${
        outline
          ? "border-[#2ec3b4] border-[1px] text-[#2ec3b4]"
          : "bg-[#2ec3b4] text-white"
      } `}
    >
      {title}
    </button>
  );
};

export default Button;
