import {Model, DataTypes} from 'sequelize';

export default class Coment extends Model {
    static init(sequelize) {
        super.init({
            message: {
                type: DataTypes.INTEGER,
                defaultValue: '',
                validate: {
                    len: {
                        args: [2, 150],
                        msg: 'comentário deve ter entre 2 a 150 caracteres'
                    }
                }
            },
        }, {
            sequelize
        })

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id'});
        this.belongsTo(models.Post, {foreignKey: 'post_id'})
    }
}