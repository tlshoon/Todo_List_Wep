import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';



const Lists = React.memo(({ todoData, setTodoData, handleClick }) => { // 메모를 이용한 렌더링 최적화


    const handleEnd = (result) => {
        // console.log('result',result)
        if (!result.destination) return;

        const newTodoData = [...todoData];
        
        // 1. 변경시키는 아이템을 배열에서 지워줌
        // 2. return 값으로 지워진 아이템을 잡아줌
        const [reorderItem] = newTodoData.splice(result.source.index, 1);

        // 원하는 자리에 reorderItem을 Insert 해줌
        newTodoData.splice(result.destination.index, 0, reorderItem);
        setTodoData(newTodoData);
        localStorage.setItem('todoData',JSON.stringify(newTodoData));
    }


    return (
        <div>
            <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId='todo'>
                    {(provided) => (    // 안에서 전해주는 정보를 div요소에다 줌
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {todoData.map((data, index) => (
                                <Draggable
                                    key={data.id}
                                    draggableId={data.id.toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (

                                        <List
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            completed={data.completed}
                                            todoData={todoData}
                                            setTodoData={setTodoData}
                                            provided={provided}
                                            snapshot={snapshot}
                                            handleClick={handleClick}
                                        />

                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
});

export default Lists


