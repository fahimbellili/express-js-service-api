const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const todoCtrl = require('../controllers/todo');
const {
  todo_post_url,
  todo_put_del_get_url,
  todo_get_all_url,
} = require('../../conf/url.conf');

router.post(todo_post_url, auth, todoCtrl.createTodo);
router.put(todo_put_del_get_url, auth, todoCtrl.updateTodo);
router.delete(todo_put_del_get_url, auth, todoCtrl.deleteTodo);
router.get(todo_put_del_get_url, auth, todoCtrl.todoGetOne);
router.get(todo_get_all_url, auth, todoCtrl.todoGetAll);

module.exports = router;
