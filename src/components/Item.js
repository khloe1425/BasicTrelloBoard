import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
const BoardItem = styled.div`
    background-color:#fff;
    border-radius: 14px;
    transition: background-color .25s ease-out;
    overflow:hidden;
    // transition: all 0.2s ease-in;
    &:hover {
      background-color: #f7fafc;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 4px 29px 0px;
    }
  
    & + & {
      margin-top: 10px;
    }
    .lable{
        width:100%;
        height:20px;
        background-color:#7bc86c;
    }
    .content{
        padding:8px;
    }
  `
export default function Item(props) {
    return <Draggable draggableId={props.item.id} index={props.index}>
        {(provided, snapshot) => {
            return <BoardItem
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
            >
                <div className="lable"></div>
                <div className="content">
                    {props.item.content}
                </div>
            </BoardItem>
        }
        }
    </Draggable >;
}
