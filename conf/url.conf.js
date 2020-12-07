const base_url = '/api/v1';

// User URLs
const user_url = `${base_url}/user`;
const user_register_url = `${user_url}/register`;
const user_login_url = `${user_url}/login`;
const user_current_url = `${user_url}/me`;

// Todo URLs
const todo_post_url = `${user_current_url}/todo`;
const todo_put_del_get_one_url = `${todo_post_url}/:id`;
const todo_get_all_url = `${user_current_url}/all-todos`;

// TodoList URLs
const todoList_post_url = `${user_current_url}/todo-list`;
const todoList_put_del_get_one_url = `${todoList_post_url}/:id`;
const todoList_get_all_url = `${user_current_url}/all-todo-lists`;

module.exports = {
  base_url,
  user_url,
  user_register_url,
  user_login_url,
  user_current_url,

  todo_post_url,
  todo_put_del_get_one_url,
  todo_get_all_url,

  todoList_post_url,
  todoList_put_del_get_one_url,
  todoList_get_all_url,
};
