'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Chapter.belongsTo(models.Course,{
        // as:'Course',
        foreignKey:'CourseId'
      });
    }
  };
  Chapter.init({
    CourseId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    video: DataTypes.STRING,
    time: DataTypes.STRING,
    published: DataTypes.INTEGER,
    sort: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chapter',
  });
  return Chapter;
};