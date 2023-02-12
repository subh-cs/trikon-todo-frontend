import api from "@/api";
import React, { useState } from "react";
import Modal from "./Modal";

const SingleTodo = ({ todo, triggerApiHandler }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [singleTodo, setsingleTodo] = useState({});

  const deleteHandler = async () => {
    const res = await api.delete(`/deleteTodoCard?id=${todo._id}`);
    if (res.status === 200) {
      triggerApiHandler();
      alert("Todo deleted successfully");
    }
  };

  const openEditModal = async () => {
    const res = await api.get(`/getTodoCard?id=${todo._id}`);
    setsingleTodo(res.data);
    setIsOpenModal(true);
  };

  const closeEditModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div
      href="#"
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {todo.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {todo.description}
      </p>
      <div className="flex items-center justify-between mt-8">
        <img
          src="/edit.svg"
          width={30}
          className="hover:bg-slate-500 cursor-pointer"
          id={todo._id}
          onClick={openEditModal}
        ></img>
        <img
          src="/delete.svg"
          width={30}
          className="hover:bg-slate-500 cursor-pointer"
          id={todo._id}
          onClick={deleteHandler}
        ></img>{" "}
      </div>
      {isOpenModal && (
        <Modal
          ModalHandler={closeEditModal}
          triggerApiHandler={triggerApiHandler}
          data={singleTodo}
        />
      )}
    </div>
  );
};

export default SingleTodo;
