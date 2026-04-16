const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

// 获取所有用户
router.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM user');
    res.status(200).json({
      code: 200,
      message: '获取成功',
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
});

module.exports = router;
// 1. 新增用户接口（POST）
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await db.query(
      'INSERT INTO user (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(200).json({
      code: 200,
      message: '新增成功',
      data: { id: result.insertId }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
});

// 2. 根据ID查询用户接口（GET）
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ code: 404, message: '用户不存在' });
    }
    res.status(200).json({
      code: 200,
      message: '查询成功',
      data: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
});