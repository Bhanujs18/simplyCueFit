const express = require('express');
const router = express.Router();
const postController = require('../controller/post')

router.get('/posts' , postController.getPost)
router.post('/savePost' , postController.savePost)
router.patch('/updatePost' , postController.updatePost)


module.exports = router;