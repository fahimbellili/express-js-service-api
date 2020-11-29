const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const todoListCtrl = require('../controllers/todoList');
const {
  todoList_post_url,
  todoList_put_del_get_url,
  todoList_get_all_url,
} = require('../../conf/url.conf');

router.post(todoList_post_url, auth, todoListCtrl.createTodoList);
router.put(todoList_put_del_get_url, auth, todoListCtrl.updateTodoList);
router.delete(todoList_put_del_get_url, auth, todoListCtrl.deleteTodoList);
router.get(todoList_put_del_get_url, auth, todoListCtrl.todoListGetOne);
router.get(todoList_get_all_url, auth, todoListCtrl.todoListGetAll);

module.exports = router;
