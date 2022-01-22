import React, { useState } from 'react';
import Item from './Item';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { IconContext } from 'react-icons'
import { AiOutlinePlus } from 'react-icons/ai'
const ColumnWrapper = styled.div`
    display:inline-block;
    width:400px;
    padding: 8px;
    background-color: #ebecf0;
    border-radius: 4px;
    padding-bottom: 20px;
    vertical-align:top;
    & + & {
      margin-left: 12px;
    }
  `
// Column title element
const ColumnTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 12px;
    display:flex;
    justify-content:space-between;
  `
// ColumnContent style
const ColumnContent = styled.div`
    min-height: 20px;
    background-color: ${props => props.isDraggingOver ? '#d4d4d4' : null};
    border-radius: 4px;
    transition: background-color .25s ease-out;
  `
export default function Column(props) {

    return <ColumnWrapper>
        <ColumnTitle>
            {props.column.title}
            <IconContext.Provider value={{ className: "search-icon" }}>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick={()=>{
                    props.setChooseColumnID(props.column.id)
                }}
                >
                    <AiOutlinePlus />
                </button>
                
            </IconContext.Provider>
        </ColumnTitle>

        <Droppable droppableId={props.column.id}>
            {(provided, snapshot) => (
                <ColumnContent
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                >
                    {props.items.map((item, index) => <Item key={item.id} item={item} index={index} />)}
                    {provided.placeholder}
                </ColumnContent>
            )}
        </Droppable>
    </ColumnWrapper>;
}
