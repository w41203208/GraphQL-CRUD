import React, { useState, Children } from 'react';

export const FliterOption = ({ children, isSelected, onClick }) => {
  return (
    <div
      className={isSelected ? 'filter-option active' : 'filter-option'}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const Fliter = ({ children, setOrderBy }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedOption, setSelectOption] = useState('遞增');
  const [selectedOptionKey, setSelectOptionKey] = useState('asc');

  const onOptionClick = (child) => {
    const {
      props: { optionKey, optionName },
    } = child;
    setSelectOption((prev) => (prev = optionName));
    setSelectOptionKey((prev) => (prev = optionKey));
    setOrderBy((prev) => (prev = optionKey));
    setOpenFilter((prev) => (prev = false));
  };

  return (
    <div className="filter-time">
      <div
        className={openFilter ? 'filter-view active' : 'filter-view'}
        onClick={() => setOpenFilter(!openFilter)}
      >
        <div className="filter-name">{selectedOption}</div>
        <i className="fas fa-angle-down"></i>
      </div>
      {openFilter && (
        <div
          className={
            openFilter ? 'filter-option-box active' : 'filter-option-box'
          }
        >
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
