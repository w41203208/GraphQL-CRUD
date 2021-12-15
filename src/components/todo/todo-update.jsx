import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react';

import { GET_ALL_TASK_QUERY } from '../queries/test';

export const TodoUpdate = (props) => {
  const { originName, originByDo, setOpen, id } = props;
  const [updateTodo] = useMutation(
    gql`mutation MyMutation(
        $task: String = "test"
        $assignee: String = "test"
        $id: Int = ${parseInt(id)}
      ) {
        update_todo_list_by_pk(
          pk_columns: { id: $id }
          _set: { task: $task, assignee: $assignee }
        ) {
          task
          assignee
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

  const [name, setName] = useState(originName);
  const [byDo, setByDo] = useState(originByDo);

  const inputName = (e) => {
    setName(e.target.value);
  };

  const inputDo = (e) => {
    setByDo(e.target.value);
  };
  const handleClick = () => {
    console.log('update!');
    updateTodo({
      variables: {
        task: name,
        assignee: byDo,
      },
    });
    setOpen(false);
  };
  const closeUpdate = () => {
    console.log('cancel!');
    setOpen(false);
  };

  return (
    <div className="todo-update">
      <div className="update-input-box">
        <div className="input">
          <span>DoName：</span>
          <input type="text" value={name} onInput={(e) => inputName(e)} />
        </div>
        <div className="input">
          <span>DoBy：</span>
          <input type="text" value={byDo} onInput={(e) => inputDo(e)} />
        </div>
      </div>
      <div className="update-buttom-box">
        <div className="confirm bottom" onClick={() => handleClick()}>
          Update
        </div>
        <div className="cancel bottom" onClick={() => closeUpdate()}>
          Cancel
        </div>
      </div>
    </div>
  );
};
