const express = require('express');
const app = express();
const PORT = 3001;

// 启动服务器
app.listen(PORT, function() {
    console.log("✅ 服务器启动成功！地址：http://localhost:" + PORT);
});