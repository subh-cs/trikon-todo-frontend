import React from "react";
import SingleTodo from "./SingleTodo";

const TodoCard = ({ alllTodoList, triggerApiHandler }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {alllTodoList.map((todo, id) => (
          <SingleTodo todo={todo} key={id} triggerApiHandler={triggerApiHandler} />
        ))}
      </div>
    </div>
  );
};

export default TodoCard;
