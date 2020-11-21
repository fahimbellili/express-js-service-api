const express = require('express');
const config = require('config');

const router = express.Router();

const auth = require('../middlewares/auth');
const todoListCtrl = require('../controllers/todoList');

const todoList_post_url = config.get('apiConf.todoList_post_url');
const todoList_put_del_get_url = config.get('apiConf.todoList_put_del_get_url');
const todoList_get_all_url = config.get('apiConf.todoList_get_all_url');

router.post(todoList_post_url, auth, todoListCtrl.createTodoList);
router.put(todoList_put_del_get_url, auth, todoListCtrl.updateTodoList);
router.delete(todoList_put_del_get_url, auth, todoListCtrl.deleteTodoList);
router.get(todoList_put_del_get_url, auth, todoListCtrl.todoListGetOne);
router.get(todoList_get_all_url, auth, todoListCtrl.todoListGetAll);

module.exports = router;
