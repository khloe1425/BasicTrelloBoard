import './App.css';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { INITIAL_BOARD } from './config/initBoard';
import Column from './components/Column';
import { useState } from 'react';
import Modal from './components/Modal';
const BoardEl = styled.div`
  white-space:nowrap;
`


function App() {
  const [initBoard, setBoard] = useState(INITIAL_BOARD);
  const [chooseColumnID, setChooseColumnID] = useState(null);
  const addNewTask = (columnID, initBoard, content) => {
    if (content) {
      let itemID = Object.keys(initBoard.items).length + 1;

      let newBoard = { ...initBoard };
      newBoard.items = { ...newBoard.items, [`item-${itemID}`]: { id: `item-${itemID}`, content } };
      newBoard.columns[columnID].itemsIds.push(`item-${itemID}`);
      setBoard(newBoard);
    }
  }
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result
    console.log("Source: ", source, "Des: ", destination, "Dragg: ", draggableId);
    if (!destination) {
      return;
    } else if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Find column from which the item was dragged from
    const columnStart = (initBoard.columns)[source.droppableId]

    // Find column in which the item was dropped
    const columnFinish = (initBoard.columns)[destination.droppableId]

    // Moving items in the same list
    if (columnStart === columnFinish) {
      // Get all item ids in currently active list
      const newItemsIds = [...columnStart.itemsIds];

      // Remove the id of dragged item from its original position
      newItemsIds.splice(source.index, 1)

      // Insert the id of dragged item to the new position
      newItemsIds.splice(destination.index, 0, draggableId)
      console.log(newItemsIds);
      // Create new, updated, object with data for columns
      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds
      }

      // Create new board state with updated data for columns
      const newState = {
        ...initBoard,
        columns: {
          ...initBoard.columns,
          [newColumnStart.id]: newColumnStart
        }
      }

      // Update the board state with new data
      setBoard(newState)
    } else {
      // Moving items from one list to another
      // Get all item ids in source list
      const newStartItemsIds = [...columnStart.itemsIds]

      // Remove the id of dragged item from its original position
      newStartItemsIds.splice(source.index, 1)

      // Create new, updated, object with data for source column
      const newColumnStart = {
        ...columnStart,
        itemsIds: newStartItemsIds
      }

      // Get all item ids in destination list
      const newFinishItemsIds = [...columnFinish.itemsIds]

      // Insert the id of dragged item to the new position in destination list
      newFinishItemsIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for destination column
      const newColumnFinish = {
        ...columnFinish,
        itemsIds: newFinishItemsIds
      }

      // Create new board state with updated data for both, source and destination columns
      const newState = {
        ...initBoard,
        columns: {
          ...initBoard.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish
        }
      }

      // Update the board state with new data
      setBoard(newState)
    }
  }
  const onDragStart = (start) => {
    console.log(start);
    document.body.style.transition = "background-color 0.3s ease-out"
    document.body.style.backgroundColor = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${start.source.index + 0.4})`
  }
  return (
    <BoardEl >
      <Modal addNewTask={addNewTask} chooseColumnID={chooseColumnID} initBoard={initBoard} />
      <DragDropContext onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        {/* Get all columns in the order specified in 'board-initial-data.ts' */}
        {initBoard.columnsOrder.map(columnId => {
          // Get id of the current column

          const column = (initBoard.columns)[columnId]

          // Get item belonging to the current column
          const items = column.itemsIds.map((itemId) => (initBoard.items)[itemId])
          // Render the BoardColumn component
          return <Column key={column.id} column={column} items={items} setChooseColumnID={setChooseColumnID} />
        })}
      </DragDropContext>
    </BoardEl>
  );
}

export default App;
