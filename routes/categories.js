var express = require('express');
var router = express.Router();
var models = require('../models');
var Op = models.Sequelize.Op


router.get('/categories', async function(req, res, next) {
var categories=await  models.CourseCategory.findAll({
    order: [
        ['sort', 'ASC']
    ],
})
res.json({
    categories:categories
});
});
router.get('/categories/:id', async function (req, res, next) {
    var courses = await models.Course.findAll({
        where: {categoryId: req.params.id},
    });
    res.json({  success: true,
        message: '获取成功',
        data: {courses: courses}});
});
router.get('/courses/:id', async function (req, res, next) {
    var course = await models.Course.findOne({
        where: {id: req.params.id},
        include: [
        {
            model: models.User,
            as: 'user'
        },
        {
            model: models.Chapter,
        }
    ],
    });
    res.json({  success: true,
        message: '获取成功',
        data: {course: course}});
});
router.get('/chapters/:id', async function (req, res, next) {
    var chapter = await models.Chapter.findOne({
        where: {Id: req.params.id}
    });
    var course =  await models.Course.findOne({
        where: {Id: chapter.CourseId}
    });
    var chapters= await models.Chapter.findAll({
        where: {CourseId:course.id}
    });
    res.json({  success: true,
        message: '获取成功',
        data: {chapter: chapter,course:course,chapters:chapters}});
});
router.get('/articles', async function(req, res, next) {
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

    var result = await models.Article.findAndCountAll({
        order: [['id', 'DESC']],
        where: where,
        include: {
            model:models.ArticleCategory,
            as:'category'
        },
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    });

    res.json({
        articles: result.rows,
        pagination: {
            currentPage: currentPage,
            pageSize: pageSize,

            // 一共有多少条记录
            total: result.count
        }
    });
    });

module.exports = router;
