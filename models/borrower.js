module.exports = (sequelize, DataTypes) => {
    const Borrower = sequelize.define('borrower', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        registered_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName:'borrower',
        createdAt: 'create_at',
        updatedAt: 'update_at'
    });

    return Borrower;
};
