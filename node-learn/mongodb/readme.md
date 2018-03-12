mongodb NOSQL 数据库
文档数据库 区别于关系型数据库
doc json
支持全面的js解析 shell

C:/mongodb/bin/mongo.exe

mongod -v

<!-- 建立连接，每次都要，用一个单独的命令行窗口 -->
<!-- ../数据库所在位置 -->
mongod --dbpath ../
我的： mongod --dbpath F:\mongodb\db\data

mongo shell
<!-- 步奏 -->
<!-- 开另一个命令行窗口 -->
1. mongo (会出现一个单独的箭头就是成功了)
2. show dbs 列出数据库
3. use  选用数据库  tutorial是默认的
  比如：use test
命名空间的方式
colloction 集合
4. db 是整个
  db.users.insert({ 填入数据})
show collection 展示整个users
5. db.users.find({ 填入数据 }) 查找你想查询数据的东西
6. db.users.count()  显示里面有多少个数据
<!-- 更新操作 -->
db.users.update({ 填入数据比如：username：‘李婷’}
... ,{$set:
...{country:'liting'}
...})

mongodb 不需要先声明（像sql一样建表）直接打命令保存就可以创建了
colum 冗余

 .find() 返回的是cursor
 $开始的运算符
 mongodb js 风格的编译
 表达范围 $gt $lt
 用json对象
 db.numbers.createIndex({num:1})  创建一个升序索引，