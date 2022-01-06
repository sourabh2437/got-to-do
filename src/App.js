import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TodoItem from './components/TodoItem'
import './App.scss'
import InitialTodoData from './mocks/initialTodos.json';
import TodoForm from "./components/TodoForm";
import Modal from "./components/Modal/Modal";
import { sortByDate } from "./utils";

const App = (props) => {
  const [todoList, setTodoList] = useState([...InitialTodoData]);
  const [completedTodoList, setCompletedTodoList] = useState([]);
  const [sortedTodoList, setSortedTodoList] = useState([...todoList]);
  const [showModal, toggleModal] = useState(false)

  const onSelect = (id, isCompleted) => {
    if (!isCompleted) {
      let list = [...todoList];
      const index = todoList.findIndex(item => item.id === id);
      if (index !== -1) {
        const item = todoList[index]
        list.splice(index, 1)
        setTodoList(list);
        setCompletedTodoList([...completedTodoList, item])
      }
    } else {
      let list = [...completedTodoList];
      const index = completedTodoList.findIndex(item => item.id === id);
      if (index !== -1) {
        const item = completedTodoList[index]
        list.splice(index, 1)
        setCompletedTodoList(list)
        setTodoList([...todoList, item]);
      }
    }
  }


  const createNewTodo = () => {
    toggleModal(true)
  }

  const handleNewTodo = (todo) => {
    const newTodoList = [...todoList, todo]
    setTodoList([...newTodoList]);
    toggleModal(false)
  }


  useEffect(() => {
    const sortedTodo = sortByDate(todoList, true);
    setSortedTodoList(sortedTodo)
  }, [todoList])

  return (
    <div className="Todo">
      <div className="Todo__Navbar">
        <div className="Todo__Navbar__Title">Got To Do</div>
        <button onClick={createNewTodo}>New ToDo</button>
      </div>
      <div className="Todo__Content">
        <div className="Todo__Title">
          Active Tasks
        </div>

        {!sortedTodoList || sortedTodoList.length === 0 ? (
          <div className="Todo__InfoText">No More Active Tasks Left!!! :D</div>
        ) : (
          <div className="Todo__Container">
            {sortedTodoList && sortedTodoList.map((todo) => {
              const { title, id, duration, excitementLevel, dueDate, dependencies } = todo;
              return <TodoItem id={id}
                key={id}
                title={title}
                isCompleted={false}
                duration={duration}
                dependencies={dependencies}
                dueDate={dueDate}
                excitementLevel={excitementLevel}
                onSelect={onSelect}
              />
            })}
          </div>)}


        {completedTodoList && completedTodoList.length > 0 && <>
          <div className="Todo__Title">
            Completed Tasks
          </div>
          <div className="Todo__Container">
            {completedTodoList && completedTodoList.map((todo) => {
              const { title, id, duration, excitementLevel, dueDate, dependencies } = todo;
              return <TodoItem id={id}
                key={id}
                title={title}
                isCompleted={true}
                duration={duration}
                dependencies={dependencies}
                dueDate={dueDate}
                excitementLevel={excitementLevel}
                onSelect={onSelect}
              />
            })}
          </div></>}
      </div>
      <Modal show={showModal} showHeader={true} onClose={() => toggleModal(false)} title="Create New Task" >
        {showModal && <TodoForm addTodoItem={handleNewTodo} />}
      </Modal>

    </div>
  );
}

App.propTypes = {};

export default App;
