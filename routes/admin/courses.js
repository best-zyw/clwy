var express = require('express');
var router = express.Router();
var models = require('../../models');
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

    var result = await models.Course.findAndCountAll({
        order: [
            ['id', 'DESC']
        ],
        where: where,
        include: [{
                model: models.CourseCategory,
                as: 'category',
            },
            {
                model: models.User,
                as: 'user'
            },
            {
                model: models.Chapter,
            }
        ],
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    });

    res.json({
        Courses: result.rows,
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
    var Course = await models.Course.create(req.body)
    res.json({
        Course: Course
    });
});

// 查询单条文章
router.get('/:id', async function (req, res, next) {
    var Course = await models.Course.findOne({
        where: {
            id: req.params.id
        },
    });
    res.json({
        Course: Course
    });
});

// 修改
router.put('/:id', async function (req, res, next) {
    var Course = await models.Course.findByPk(req.params.id);
    Course.update(req.body);
    res.json({
        Course: Course
    });
});

// 删除
router.delete('/:id', async function (req, res, next) {
    var Course = await models.Course.findByPk(req.params.id);
    Course.destroy();
    res.json({
        msg: '删除成功'
    });
});

module.exports = router;