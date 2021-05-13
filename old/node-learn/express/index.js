const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const captchapng = require("captchapng")
app.set("view engine", "ejs") //模板引擎
//中间件
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(cookieParser())
class VerificationCode {
	// 1.显示的文字
	// 2.生成图片
	constructor(len = 4, w = 80, h = 30) {
		this.len = len
		this.w = w
		this.h = h
		this.randomNumber = null
	}
	getRandomNumber() {
		let i = 0, res = []
		while(i < this.len) {
			i++
			res.push(Math.floor(Math.random() * 10))
		}
		return res.join("")
	}
	getImgBase64() {
		let cap = null
		this.randomNumber = this.getRandomNumber()
		cap = new captchapng(this.w, this.h, this.randomNumber)
		cap.color(0, 0, 0, 0)
		cap.color(80, 80, 80, 255)
		let img = cap.getBase64(), imgbase64 = new Buffer(img, "base64")
		return imgbase64
	}
	getJSON() {
		let imgbase64 = this.getImgBase64()
		return {
			number: this.randomNumber,
			base64: "data:image/png;base64," + imgbase64.toString("base64")
		}
	}
}

app.get("/", function(req, res){
	// req: request,请求
	// res: response,回应

	// 数据库查询:M  view层、页面模板:V  业务处理:C   --MVC

    let code = new VerificationCode(), code_data = code.getJSON()
    //种cookie
    res.cookie('yzm',code_data.number,{ maxAge: 60000 })
	res.render("index", {
		title: "图形验证码",
		pic: code_data.base64
	})
})

app.get('/api', function(req, res) {
    res.json({
        data: [{
            movie: '女儿国'
        }, {
            movie: '唐人街探案'
        }]
    })
})

app.post('/login', function(req, res) {
    //表单的数据
    //如何将表单的数据和随机数比较
    if (req.cookies.yzm === req.body.code) {
        res.send('验证码输入正确');
    } else {
        res.send('验证码输入错误')
    }
    // console.log('提交表单');
    // console.log(req.body);
    // res.send('ok')
})
app.listen(3000)
