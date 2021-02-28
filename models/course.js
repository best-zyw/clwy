'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Course.belongsTo(models.CourseCategory,{
        as:'category',
        foreignKey:'categoryId'
      });
      models.Course.belongsTo(models.User,{
        as:'user',
        foreignKey:'userId'
      });
      models.Course.hasMany(models.Chapter, {foreignKey: 'CourseId'});
    }
  };
  Course.init({
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    body: DataTypes.TEXT,
    image: DataTypes.STRING,
    target_person: DataTypes.STRING,
    target_person_details: DataTypes.STRING,
    published: DataTypes.INTEGER,
    completed: DataTypes.INTEGER,
    recommended: DataTypes.INTEGER,
    free: DataTypes.INTEGER,
    introductory: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
