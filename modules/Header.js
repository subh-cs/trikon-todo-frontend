import React, { useState } from "react";

const Header = ({ ModalHandler }) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="">
        <img src="logo.png" width="200"></img>
      </div>
      <button
        onClick={ModalHandler}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Add Todo
      </button>
    </div>
  );
};

export default Header;
