'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Course, {foreignKey: 'userId'});
    }
  };
  User.init({
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    admin: DataTypes.INTEGER,
    openid: DataTypes.STRING,
    password: DataTypes.STRING,
    username:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};