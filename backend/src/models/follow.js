import {Model} from 'sequelize';

export default class Follow extends Model{
    static init(sequelize) {
        super.init({}, {
            sequelize
        })
        
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'quem_segue'});
        this.belongsTo(models.User, {foreignKey: 'seguido'});
    }
};