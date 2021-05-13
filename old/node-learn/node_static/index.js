// node 核心模块
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const mime = require('mime');
const handlebars = require('handlebars');

const server = http.createServer();
server.on('request', request.bind(this));

function request(req, res) {
  const { pathname } = 
    url.parse(req.url);
  let filepath  = path.join(
    config.root, pathname);
  if (pathname === '/') {
    const rootPath = 
      path.join(config.root, 
      'index.html')
    // 文件的类型 text/html png text/css mime
    console.log()
    // header http 响应头 状态码， 响应体
    console.log(mime.getType(rootPath));
    res.setHeader('Content-Type', 
    mime.getType(rootPath)+';charset=utf-8');
    return fs.createReadStream(rootPath)
    .pipe(res)
  }

  // 文件或目录 
  // 文件系统 接口
  fs.stat(filepath, (err, stats) => {
    if (err) {
      res.end('not found');
      return ;
    }
    if (stats.isDirectory()) {
      console.log('目录');
      // 得到所有文件
      // 阻塞 异步  无阻塞 node 
      let files = fs.readdirSync(filepath);
      files = files.map(file => ({
        name: file,
        url: path.join(pathname, file)
      }));
      // list 函数返回compile 之后的模板
      let html  = list()({
        title: pathname,
        files
      })
      
      res.setHeader('Content-Type',
       'text/html');
      res.end(html)
    //   console.log(files);
      // readFile  readFileSync
    } else {
        res.setHeader(
            'Content-Type',
            mime.getType(filepath) + ';charset=utf-8',
            fs.createReadStream(filepath).pipe(res),
        )
    }
  })

  function list() {
    let tmpl = fs.readFileSync(path.resolve(__dirname, 'template', 'list.html'), 'utf8')
    // console.log(tmpl)
    return handlebars.compile(tmpl);
  }
  // const = url.parse(req.url)
  // /  => index.html
  // 识别出/  path  
  // js DOM Global 
  // // http://localhost:3000/a/index.html?a=c
  // /images/a.png
  // /template/*.html
}

server.listen(config.port, () => {
  console.log(`静态文件服务器启动成功，
  访问localhost:${config.port}`)
})
