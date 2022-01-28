import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { TodoUpdate } from './todo-update';
import { GET_ALL_TASK_QUERY } from '../queries/test';

export const TodoItem = (props) => {
  const { name, id, desc, byDo } = props;
  const viewDesc = desc === undefined ? 'test-desc' : desc;
  /*const [isDo, setIsDo] = useState(false);*/

  const [open, setOpen] = useState(false);
  const [deleteTodo] = useMutation(
    gql`
      mutation MyMutation($id: Int = 29) {
        delete_todo_list_by_pk(id: $id) {
          id
        }
      }
    `,
    {
      refetchQueries: [
        GET_ALL_TASK_QUERY, // DocumentNode object parsed with gql
        'MyQuery', // Query name
      ],
    }
  );
  const openUpdateTask = () => {
    setOpen((prev) => (prev = true));
  };
  const deleteTask = () => {
    console.log('delete');
    deleteTodo({
      variables: {
        id: id,
      },
    });
  };

  return (
    <div className="todo-item-card">
      <div className="todo-item-title">
        <h3 className="todo-name">{name}</h3>
        <div className="icon-group">
          <div className="todo-icon" onClick={() => openUpdateTask()}>
            <i className="fas fa-edit"></i>
          </div>
          <div className="todo-icon delete" onClick={() => deleteTask()}>
            <i className="fas fa-times"></i>
          </div>
        </div>
      </div>
      <div className="todo-desc">{viewDesc}</div>
      <div className="todo-byDo">
        <span className="title">Assign to：</span>
        <span>{byDo}</span>
      </div>
      {open && (
        <TodoUpdate
          originName={name}
          originByDo={byDo}
          setOpen={setOpen}
          id={id}
        />
      )}
    </div>
  );
};
