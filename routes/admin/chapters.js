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
    var CourseId = req.query.CourseId;

    if (title) {
        where.title = {
            [Op.like]: '%' + title + '%'
        }
    };
    if(CourseId){
        where.CourseId=CourseId
    }

    var result = await models.Chapter.findAndCountAll({
        order: [['sort', 'ASC']],
        where: where,
        include: {
            model:models.Course,
            // as:'Course'
        },
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    });

    res.json({
        Chapters: result.rows,
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
    var Chapter = await models.Chapter.create(req.body)
    res.json({Chapter: Chapter});
});

// 查询单条文章
router.get('/:id', async function (req, res, next) {
    var Chapter = await models.Chapter.findOne({
        where: {id: req.params.id},
    });
    res.json({Chapter: Chapter});
});

// 修改
router.put('/:id', async function (req, res, next) {
    var Chapter = await models.Chapter.findByPk(req.params.id);
    Chapter.update(req.body);
    res.json({Chapter: Chapter});
});

// 删除
router.delete('/:id', async function (req, res, next) {
    var Chapter = await models.Chapter.findByPk(req.params.id);
    Chapter.destroy();
    res.json({msg: '删除成功'});
});

module.exports = router;