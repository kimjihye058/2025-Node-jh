const { DataTypees } = require("sequelize");
const sequelize = require("./index");

const Travel = sequelize.define(
  "Travel",
  {
    id: {
      type: DataTypees.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypees.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "travellist",    // 실제 테이블 이름
    timestamps: false,    // createAt, updateAt 속성을 사용 안함
  }
);

module.exports = Travel;