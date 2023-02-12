import api from "@/api";
import React, { useState } from "react";

const Modal = ({ ModalHandler, triggerApiHandler, data }) => {
  const [Title, setTitle] = useState(data ? data.title : "");
  const [Description, setDescription] = useState(data ? data.description : "");

  const submitHandler = async () => {
    if (Title === "" || Description === "") {
      alert("Please fill all the fields");
      return;
    }
    // if data is not present then it means we are adding a new todo
    if (!data) {
      const res = await api("/addtodoCard", {
        method: "post",
        data: {
          title: Title,
          description: Description,
        },
      });
      if (res.status === 200) {
        triggerApiHandler();
        ModalHandler();
      }
      return;
    }
    // if data is present then it means we are updating a todo
    if (data) {
      const res = await api(`/updateTodoCard?id=${data._id}`, {
        method: "patch",
        data: {
          title: Title,
          description: Description,
        },
      });
      if (res.status === 200) {
        triggerApiHandler();
        ModalHandler();
      }
      return;
    }
  };

  return (
    <>
      {/* <!-- Main modal --> */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        className="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full flex justify-center items-center bg-black bg-opacity-50"
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={ModalHandler}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  //   fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  //   clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                {data ? "Update your todo" : "Add your todo"}
              </h3>
              <div className="space-y-6" action="#">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Todo name
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={Title}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Buy milk"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Todo description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={Description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="I'll be going to the store to buy milk"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  onClick={submitHandler}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
