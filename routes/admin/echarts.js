var express = require('express');
var router = express.Router();
var models = require('../../models');
var moment = require('moment');
// moment().format();
var Op = models.Sequelize.Op

// 表格
router.get('/', async function (req, res, next) {
    dates = []
    nums = []
    nums2=[]
    month = moment(new Date()).startOf('month').format()
    for (var i = 0; i < 12; i++) {
        let startTime = moment(month).subtract(i, 'month')
        let endTime = moment(month).subtract(i - 1, 'month')
        console.log(startTime, endTime)
        var where = {
            createdAt: {
                [Op.gt]: startTime,
                [Op.lt]: endTime
            }
        };
        var count = await models.User.count({
            where: where
        });
        var count2 = await models.Course.count({
            where: where
        });
        nums.unshift(count)
        nums2.unshift(count2)
        dates.unshift(startTime.format('YYYY-MM'))
    };
    res.json({
        succsss:true,
        data: {
           dates:dates,nums:nums,nums2:nums2
        },
    });
});
module.exports = router;