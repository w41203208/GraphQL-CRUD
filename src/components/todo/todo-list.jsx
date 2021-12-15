import React, { Children, useState, Fragment } from 'react';
import { TodoItem } from './todo-item';
import { TodoNew } from './todo-new';
import { useQuery } from '@apollo/client';

const FliterOption = ({ children, isSelected, onClick }) => {
  return (
    <div className="filter-option" onClick={onClick}>
      {children}
    </div>
  );
};

const Fliter = ({ children }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedOption, setSelectOption] = useState('Today');
  const [selectedOptionKey, setSelectOptionKey] = useState('Today');

  const onOptionClick = (child) => {
    const {
      props: { optionKey },
    } = child;
    setSelectOption((prev) => (prev = optionKey));
    setSelectOptionKey((prev) => (prev = optionKey));
  };

  return (
    <div className="filter-time">
      <div className="filter-view" onClick={() => setOpenFilter(!openFilter)}>
        <div className="filter-name">{selectedOption}</div>
        <i className="fas fa-angle-down"></i>
      </div>
      {openFilter && (
        <div className="filter-option-box">
          {Children.map(children, (child) =>
            React.cloneElement(child, {
              ...child.props,
              onClick: () => onOptionClick(child),
              isSelected: child.props.optionKey === selectedOptionKey,
            })
          )}
        </div>
      )}
    </div>
  );
};

export const TodoList = (props) => {
  const { sql } = props;
  const { loading, error, data } = useQuery(sql);

  return (
    <Fragment>
      {loading ? (
        <div>loading....</div>
      ) : (
        <div className="todo-list-card">
          <div className="todo-list-title">
            <h2>ListName</h2>
            {/*<Fliter>
              <FliterOption optionKey={'Today'}>Today</FliterOption>
              <FliterOption optionKey={'This Week'}>This Week</FliterOption>
              <FliterOption optionKey={'This Month'}>This Month</FliterOption>
            </Fliter>*/}
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
