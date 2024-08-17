const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Borrower = require("./borrower")(sequelize, require('sequelize').DataTypes);;
const Book = require("./book")(sequelize, require('sequelize').DataTypes);;

module.exports = (sequelize,DataTypes) => {
    const Borrowing = sequelize.define('borrowing',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        borrower_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:Borrower,
                key:'id'
            }
        },
        book_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:Book,
                key:'id'
            }
        },
        date_from:{
            type:DataTypes.DATE,
            allowNull:false
        },
        date_to:{
            type:DataTypes.DATE,
            allowNull:false
        },
        active:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        }
    },{
        tableName:'borrowing',
        createdAt: 'create_at',
        updatedAt: 'update_at'
    });
    return Borrowing;
}