import React, { useState, useCallback } from 'react'
import './App.css';
import Lists from './components/Lists';
import Form from './components/Form';

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App() {


  // 할 일 목록, 데이터가 변할 떄 화면을 다시 렌더링 해주기 위해서는 state를 사용
  const [todoData, setTodoData] = useState(initialTodoData);

  const [value, setValue] = useState(""); // 값을 보관해주는 역할


  const handleSubmit = (e) => {  // 제출 했을 때 저장하기 
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData((prev) => [...prev, newTodo])  // 상태변경, value는 글쓰고 나서 빈값으로 만들어주는 역할
    localStorage.setItem('todoData',JSON.stringify([...todoData,newTodo]));
    setValue("");
  }


  const handleClick = useCallback((id) => {   // useCallback을 이용한 함수 최적화
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData)
    localStorage.setItem('todoData',JSON.stringify(newTodoData));
  }, [todoData]);

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData',JSON.stringify([]));
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-blue-100'>
      <div className='w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg'>
        <div className='flex justify-between mb-3'>
          <h1>할 일 목록</h1>
          <button
            className='p-2 text-red-500 border-2 border-red-400 rounded
                          hover:text-white hover:bg-red-200'
            onClick={handleRemoveClick}>Delete All</button>
        </div>

        <Lists todoData={todoData} setTodoData={setTodoData} handleClick={handleClick} />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />

      </div>
    </div>
  )
}
