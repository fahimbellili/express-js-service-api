export const base_url = '/api/v1';

// User URLs
export const user_url = '/user';
export const user_register_url = `${user_url}/register`;
export const user_login_url = `${user_url}/login`;
export const user_current_url = `${user_url}/me`;

// Todo URLs
export const todo_post_url = `${user_current_url}/todo`;
export const todo_put_del_get_one_url = `${todo_post_url}/:id`;
export const todo_get_all_url = `${user_current_url}/all-todos`;

// TodoList URLs
export const todoList_post_url = `${user_current_url}/todo-list`;
export const todoList_put_del_get_one_url = `${todoList_post_url}/:id`;
export const todoList_get_all_url = `${user_current_url}/all-todo-lists`;
