import React from "react";
import Button from "../../atom/button";

const HomeScreen = () => {
  return (
    <div className="h-screen">
      <div className="py-6 px-4  ">
        <h1 className="text-3xl font-extrabold">ZURIDAO</h1>
      </div>

      <div className="grid grid-cols-2 place-items-center him">
        <div className="grid grid-rows-2">
          <h1 className=" text-4xl font-black max-w-sm mb-6 tracking-wide ">
            WELCOME TO THE BEST WEB3 VOTING SYSTEM
          </h1>
          <p className="max-w-2xl text-xl font-normal">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
            autem obcaecati doloribus optio expedita earum ad omnis cum sed.
            Corporis repellat, illum sapiente deleniti molestias facere sit?
            Corporis, veniam veritatis!
          </p>
          <div className="btns">
            <Button title="Login as an Admin" />{" "}
            <Button title="Login as a Voter" outline cls="ml-4" />
          </div>
        </div>
        <div className="right">
          <img
            src="blockchain-voting-preview-600.jpeg"
            alt=""
            srcset=""
            className="max-w-full "
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
