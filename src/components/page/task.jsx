import { gql } from '@apollo/client';
import React, { Fragment, useState } from 'react';
import { TodoList } from '../todo/todo-list';
import { GET_ALL_TASK_QUERY } from '../queries/test';

export const Task = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState(GET_ALL_TASK_QUERY);
  const inputSearch = (e) => {
    setSearchValue((prev) => (prev = e.target.value));
  };

  const handleSendClick = () => {
    let query = gql`
      query MyQuery($_like: String = "%${searchValue}%") {
        todo_list(where: { task: { _like: $_like } }) {
          task
          id
          assignee
        }
      }
    `;
    setQuery((prev) => (prev = query));
  };
  return (
    <Fragment>
      <div className="task-top">
        <div className="search-box">
          <div className="search-icon">
            <i class="fas fa-search"></i>
          </div>
          <input
            type="text"
            value={searchValue}
            onInput={(e) => inputSearch(e)}
            placeholder="Input task name"
          />
        </div>
        <div className="send-search" onClick={() => handleSendClick()}>
          Search
        </div>
      </div>
      <div className="task-bottom">
        <TodoList sql={query} />
      </div>
    </Fragment>
  );
};
