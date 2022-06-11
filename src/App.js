import { AddToDo } from './AddToDo';
import { ToDos } from './ToDos';
import { Divider, Typography } from 'antd';
import React, { useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import './App.css';
import { useMount, useUpdateEffect, useMemoizedFn, useCreation } from 'ahooks';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDoCategories, setToDoCategories] = useState([]);
  const [selectedToDo, setSelectedToDo] = useState({});

  useMount(() => {
    const savedToDos = JSON.parse(localStorage.getItem('toDos'));
    const savedCategories = JSON.parse(localStorage.getItem('toDoCategories'));

    setToDos([...(savedToDos ?? [])]);
    setToDoCategories([...(savedCategories ?? [])]);
  });

  useUpdateEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
    localStorage.setItem('toDoCategories', JSON.stringify(toDoCategories));
  }, [toDos, toDoCategories]);

  const setNewCategories = chosenCategories => {
    for (let i = 0; i < chosenCategories?.length; i++) {
      if (!toDoCategories?.includes(chosenCategories[i])) {
        setToDoCategories([...toDoCategories, chosenCategories[i]]);
      }
    }
  };

  const findById = useMemoizedFn((arr, id) => {
    return arr?.find(item => item?.id === id);
  });

  const filterById = (arr, id) => {
    return arr?.filter(item => item?.id !== id);
  };

  const addToDoHandler = useMemoizedFn(({ toDoName, chosenCategories }) => {
    setNewCategories(chosenCategories);

    // check if add or edit
    if (selectedToDo?.id) {
      const filteredToDos = filterById(toDos, selectedToDo?.id);

      setToDos([
        {
          id: selectedToDo?.id,
          name: toDoName,
          categories: [...chosenCategories],
          isComplete: false,
        },
        ...filteredToDos,
      ]);
    } else {
      setToDos([
        {
          id: uniqueId(),
          name: toDoName,
          categories: [...chosenCategories],
          isComplete: false,
        },
        ...toDos,
      ]);
    }

    setSelectedToDo({});
  });

  const cancelAddToDoHandler = useMemoizedFn(() => {
    setSelectedToDo({});
  });

  const completeTaskHandler = useMemoizedFn((isComplete, toDoId) => {
    const selectedToDo = findById(toDos, toDoId);
    const filteredToDos = filterById(toDos, toDoId);

    setToDos([
      {
        ...selectedToDo,
        isComplete: isComplete,
      },
      ...filteredToDos,
    ]);
  });

  const deleteTaskHandler = useMemoizedFn(toDoId => {
    const filteredToDos = filterById(toDos, toDoId);

    setToDos([...filteredToDos]);
  });

  const editTaskHandler = useMemoizedFn(toDoId => {
    const selectedToDo = findById(toDos, toDoId);

    setSelectedToDo(selectedToDo);
  });

  return (
    <div className='App'>
      <Typography.Title level={4} className='title'>
        TODO App ✔️
      </Typography.Title>

      <Divider className='divider' />

      <AddToDo
        categories={toDoCategories}
        onAddToDo={addToDoHandler}
        onCancelToDo={cancelAddToDoHandler}
        selectedToDo={selectedToDo}
      />

      <ToDos
        toDos={toDos}
        selectedToDo={selectedToDo}
        categories={toDoCategories}
        onChangeComplete={completeTaskHandler}
        onDeleteTask={deleteTaskHandler}
        onEditTask={editTaskHandler}
      />
    </div>
  );
}

export default App;
