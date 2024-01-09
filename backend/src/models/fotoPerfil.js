import { DataTypes, Model } from 'sequelize';

export default class FotoPerfil extends Model{
    static init(sequelize) {
        super.init({
            fileName: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            url: {
                type: DataTypes.VIRTUAL,
                get() {
                    return 'http://localhost:8000/imgs/'+ this.getDataValue('fileName');
                }
            }
        },
        {
            tableName: 'fotosPerfil',
            sequelize
        })
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id'})
    }
}