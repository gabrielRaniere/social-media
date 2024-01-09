import {Model, DataTypes} from 'sequelize';

export default class Post extends Model {
    static init(sequelize) {
        super.init({
            title: {
                type: DataTypes.STRING,
                defaultValue: 'sem titulo',
            },
            Description: {
                type: DataTypes.STRING,
                defaultValue: 'sem descrição'
            },
            hastags: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            img: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            filename: {
                type: DataTypes.VIRTUAL
            }
        },{
            tableName: 'posts',
            sequelize,
            hooks: {
                beforeSave(post) {
                    post.img = `http://localhost:8000/imgs/${post.filename}`
                }
            }
        })

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'use_id'});
        this.hasMany(models.Coment, {foreignKey: 'post_id'});
        this.hasMany(models.Like, {foreignKey: 'target_post'})
    }
}