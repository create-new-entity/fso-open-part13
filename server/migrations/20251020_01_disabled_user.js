const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn(
            'users',
            'disabled',
            {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        );

        await queryInterface.createTable('tokens', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            token: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('tokens');
        await queryInterface.removeColumn('users', 'disabled');
    }
};