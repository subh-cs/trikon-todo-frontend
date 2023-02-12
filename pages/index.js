import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import TodoCard from "@/modules/TodoCard";
import Header from "@/modules/Header";
import { useEffect, useState } from "react";
import Modal from "@/modules/Modal";
import api from "@/api";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [alllTodoList, setAllTodoList] = useState([]);
  const [triggerApi, setTriggerApi] = useState(false);

  const triggerApiHandler = () => {
    setTriggerApi(!triggerApi);
  };

  const ModalHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    const getAllTodos = async () => {
      const res = await api("/getAllTodoCards");
      setAllTodoList(res.data);
    };
    getAllTodos();
  }, [triggerApi]);

  return (
    <>
      <Header ModalHandler={ModalHandler} />
      <TodoCard
        alllTodoList={alllTodoList}
        ModalHandler={ModalHandler}
        triggerApiHandler={triggerApiHandler}
      />
      {isOpenModal && (
        <Modal
          triggerApiHandler={triggerApiHandler}
          ModalHandler={ModalHandler}
        />
      )}
    </>
  );
}
