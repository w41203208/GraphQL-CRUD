import { gql } from '@apollo/client';
import React, { Fragment, useState } from 'react';
import { TodoList } from '../todo/todo-list';
import { Fliter, FliterOption } from '../todo/filter';

import { GET_ALL_TASK_QUERY, GET_ALL_TASK_SUB } from '../queries/test';

export const Task = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [orderBy, setOrderBy] = useState('asc');
  const [query, setQuery] = useState(GET_ALL_TASK_SUB);
  const inputSearch = (e) => {
    setSearchValue((prev) => (prev = e.target.value));
  };

  const handleSendClick = () => {
    console.log(orderBy);
    let query = gql`
    subscription SEARCH_TASK_SUB($_like: String = "%${searchValue}%", $task: order_by = ${orderBy}) {
        todo_list(where: { task: { _like: $_like } }, order_by: {task: $task}) {
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
            <i className="fas fa-search"></i>
          </div>
          <input
            type="text"
            value={searchValue}
            onInput={(e) => inputSearch(e)}
            placeholder="Input task name"
          />
          <div className="send-search" onClick={() => handleSendClick()}>
            Search
          </div>
        </div>
        {
          <Fliter setOrderBy={setOrderBy}>
            <FliterOption optionKey={'asc'} optionName={'遞增'}>
              遞增
            </FliterOption>
            <FliterOption optionKey={'desc'} optionName={'遞減'}>
              遞減
            </FliterOption>
          </Fliter>
        }
      </div>
      <div className="task-bottom">
        <TodoList sql={query} />
      </div>
    </Fragment>
  );
};
