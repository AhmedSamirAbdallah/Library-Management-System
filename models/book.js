module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
      id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
      },

      isbn:{
        type:DataTypes.STRING,
        unique: true,
        allowNull:false
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false
      },

      author: {
        type: DataTypes.STRING,
        allowNull: false
      },

      published_date: {
        type: DataTypes.DATE,
        allowNull: true
      },

      quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
      },

      location:{
        type:DataTypes.STRING,
        allowNull:false
      },
    },{
      createdAt: 'create_at',
      updatedAt: 'update_at'
      
    });
  
    return Book;
  };
  