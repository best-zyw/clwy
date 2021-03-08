var express = require('express');
var router = express.Router();
var models = require('../models')


router.get('/', async function(req, res, next) {
var recommended_courses=await  models.Course.findAll({
  where: {recommended:1},
})
var calendar_courses=await  models.Course.findAll({
  order: [
    ['createdAt', 'DESC']
],
})
var popular_courses=await  models.Course.findAll({
  order: [
    ['likesCount', 'DESC']
],
})
var introductory_courses=await  models.Course.findAll({
  where: {introductory:1},
})
res.json({
  success: true,
  message: '获取成功',
 data:{recommended_courses:recommended_courses,calendar_courses:calendar_courses,
  popular_courses:popular_courses,introductory_courses:introductory_courses}
});
});

module.exports = router;
