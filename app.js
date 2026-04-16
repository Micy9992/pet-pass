const express = require('express');
const cors = require('cors');
const db = require('./config/db.js');
const userRouter = require('./routes/userRouter');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 测试路由
app.get('/', (req, res) => {
  res.send('毕设服务器运行正常！');
});

// 挂载用户路由
app.use('/api', userRouter);

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器已启动：http://localhost:${PORT}`);
});

// 测试数据库连接
db.getConnection().then(() => {
  console.log('MySQL数据库连接成功！');
}).catch((err) => {
  console.log('数据库连接失败：', err);
});