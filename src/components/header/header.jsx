import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = (props) => {
  return (
    <div className="header-container">
      <div className="header-title">
        <span>.Todo</span>
      </div>
      <div className="header-sidebar">
        <ul className="header-side-links">
          <li className="header-side-link">
            <NavLink to={'/home'}>
              <i className="fas fa-home"></i>
              <span>Overview</span>
            </NavLink>
          </li>
          <li className="header-side-link">
            <NavLink to={'/task'}>
              <i className="fas fa-folder-open"></i>
              <span>Task</span>
            </NavLink>
          </li>
        </ul>
        <ul className="header-side-links">
          <li className="header-side-link">
            <NavLink to={'/setting'}>
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </NavLink>
          </li>
          <li className="header-side-link">
            <NavLink to={'/info'}>
              <i className="fas fa-user"></i>
              <span>Info</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
