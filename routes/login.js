var express = require('express');
var router = express.Router();
var models =require('../models');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var axios = require('axios');

/* GET home page. */
router.post('/', async function(req, res, next) {
  let username = req.body.username
  let password = req.body.password
  let user = await models.User.findOne({
      where: {
          username: username
      }
  })
  if(!user){
      res.json({success: false, message: '用户名错误！'})
      return;
  }
  if (!bcrypt.compareSync(password, user.password)) {
      res.json({success: false, message: '密码错误！'})
      return;
  }
  var token = jwt.sign({
      user: {
          id: user.id,
          admin:false,
          username: username
      }
  },"hdasdasd", {expiresIn: 60 * 60 * 24 * 7});

  res.json({
      success: true,
      message: '请求成功',
      token: token
  })
});
router.post('/wechat', async function(req, res, next) {
  const code = req.body.code
  let params={
    grant_type:'authorization_code',
    appid:'wxf10e4d931aad21c9',
    secret:'84281b7ec34dc4127bc1812beee154b7',
    js_code:code
  }
  let response=await axios.get(`https://api.weixin.qq.com/sns/jscode2session`,{params:params})
  if(response.data.errcode){
    return res.json({success:false,msg:'code已过期'})
      }
  let user = await models.User.findOne({
      where:{openid: response.data.openid}
  })
  if(!user){
      user=await  models.User.create({openid: response.data.openid,admin:false})
  }
  var token = jwt.sign({
    user: {
        id: user.id,
        admin:false,
        openid: response.data.openid
    }
},"hdasdasd", {expiresIn: 60 * 60 * 24 * 7});
    res.json(
    {success:true,msg:"登入成功",token:token}
    )
});

module.exports = router;