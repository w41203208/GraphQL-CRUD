import { gql } from '@apollo/client';

export const GET_ALL_TASK_QUERY = gql`
  query MyQuery {
    todo_list(order_by: { id: asc }) {
      id
      task
      assignee
    }
  }
`;

export const ADD_TASK_QUERY = gql`
  mutation MyMutation($task: String = "", $assignee: String = "") {
    insert_todo_list_one(object: { task: $task, assignee: $assignee }) {
      task
      assignee
    }
  }
`;
export const GET_ALL_TASK_SUB = gql`
  subscription GET_ALL_TASK_SUB {
    todo_list(order_by: { task: asc }) {
      id
      task
      assignee
    }
  }
`;
