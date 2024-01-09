import {Model, DataTypes} from 'sequelize';

export default class Like extends Model{
    static init(sequelize) {
        super.init({
            use_id: {
                defaultValue: '',
                type: DataTypes.INTEGER
            }
        },{sequelize})

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Post, {foreignKey: 'target_post'})
    }
}




