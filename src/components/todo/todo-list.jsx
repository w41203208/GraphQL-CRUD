import React, { Children, useState, Fragment } from 'react';
import { TodoItem } from './todo-item';
import { TodoNew } from './todo-new';
import { gql, useQuery, useSubscription } from '@apollo/client';

export const TodoList = (props) => {
  const { sql, orderBy } = props;
  const { loading, error, data } = useSubscription(sql);

  return (
    <Fragment>
      {loading ? (
        <div>loading....</div>
      ) : (
        <div className="todo-list-card">
          <div className="todo-list-title">
            <h2>ListName</h2>
          </div>
          <div className="todo-lists">
            {data.todo_list.map((item) => {
              const { __typename, id, task, assignee } = item;
              return (
                <TodoItem
                  name={task}
                  id={id}
                  key={task + id}
                  byDo={assignee}
                ></TodoItem>
              );
            })}
            <TodoNew />
          </div>
        </div>
      )}
    </Fragment>
  );
};
