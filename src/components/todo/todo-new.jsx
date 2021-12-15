import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';

import { ADD_TASK_QUERY, GET_ALL_TASK_QUERY } from '../queries/test';

export const TodoNew = () => {
  const [addTask] = useMutation(ADD_TASK_QUERY, {
    refetchQueries: [
      GET_ALL_TASK_QUERY, // DocumentNode object parsed with gql
      'MyQuery', // Query name
    ],
    onCompleted: () => resetInput(),
  });
  const [open, setOpen] = useState(false);
  const [byDo, setByDo] = useState('');
  const [name, setName] = useState('');

  const inputName = (e) => {
    setName(e.target.value);
  };
  const inputDo = (e) => {
    setByDo(e.target.value);
  };

  const resetInput = () => {
    setByDo('');
    setName('');
    setOpen((prev) => (prev = false));
  };

  const handleClick = () => {
    addTask({
      variables: {
        task: name,
        assignee: byDo,
      },
    });
  };

  const closeAddNew = () => {
    resetInput();
  };
  return (
    <Fragment>
      {open ? (
        <div className="todo-item-input">
          <div className="input-box">
            <div className="input">
              <span>DoName：</span>
              <input type="text" value={name} onInput={(e) => inputName(e)} />
            </div>
            <div className="input">
              <span>DoBy：</span>
              <input type="text" value={byDo} onInput={(e) => inputDo(e)} />
            </div>
          </div>
          <div className="do-box">
            <div className="confirm bottom" onClick={() => handleClick()}>
              Cofirm
            </div>
            <div className="cancel bottom" onClick={() => closeAddNew()}>
              Cancel
            </div>
          </div>
        </div>
      ) : (
        <div className="todo-item-new" onClick={() => setOpen(!open)}>
          <div className="new-icon">+</div>
        </div>
      )}
    </Fragment>
  );
};
