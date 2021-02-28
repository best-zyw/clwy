var express = require('express');
var router = express.Router();
var models = require('../../models');
var bcrypt = require('bcryptjs');
var Op = models.Sequelize.Op

// 文章列表
router.get('/', async function (req, res, next) {
    var currentPage = parseInt(req.query.currentPage) || 1;
    var pageSize = parseInt(req.query.pageSize) || 5;
    var where = {};

    // 模糊查询标题
    var title = req.query.title;

    if (title) {
        where.title = {
            [Op.like]: '%' + title + '%'
        }
    }
    var result = await models.User.findAndCountAll({
        order: [['id', 'DESC']],
        where: where,
        // include: {
        //     model:models.UserCategory,
        //     as:'category'
        // },
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    });

    res.json({
        Users: result.rows,
        pagination: {
            currentPage: currentPage,
            pageSize: pageSize,

            // 一共有多少条记录
            total: result.count
        }
    });
});

// 新增
router.post('/', async function (req, res, next) {
    let username = req.body.username
    let password = req.body.password
  let findUser = await models.User.findOne({
    where: {username: username}
  })
  
    if(findUser){
      return res.json({
        success: false,
        message: '用户名已注册！'
      });
    }
  
    password = bcrypt.hashSync(password, 8);
    
    let user = await models.User.create({
      username: username,
      password: password,
      admin: true
  })
  
    res.json({  success: true,
      message: '请求成功',
      user: {
        id: user.id,
        name: user.username
    }});
  });

// 查询单条文章
router.get('/:id', async function (req, res, next) {
    var User = await models.User.findOne({
        where: {id: req.params.id},
    });
    res.json({User: User});
});

// 修改
router.put('/:id', async function (req, res, next) {
    var User = await models.User.findByPk(req.params.id);
    User.update(req.body);
    res.json({User: User});
});

// 删除
router.delete('/:id', async function (req, res, next) {
    var User = await models.User.findByPk(req.params.id);
    User.destroy();
    res.json({msg: '删除成功'});
});

module.exports = router;