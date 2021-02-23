'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ArticleCategory.hasMany(models.Article, {foreignKey: 'categoryId'});
    }
  };
  ArticleCategory.init({
    name: DataTypes.STRING,
    sort: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticleCategory',
  });
  return ArticleCategory;
};