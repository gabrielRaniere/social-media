import {Model, DataTypes} from 'sequelize';
import bcrypt from 'bcrypt';

export default class User extends Model{
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 15],
                        msg: 'nome precisa ter 3 a 15 caracteres...'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    isEmail: {
                        msg: 'formato de email invalido'
                    }
                }
            },

            password: {
                type: DataTypes.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [8, 15],
                        msg: 'senha precisa ter 8 a 15 caracteres...'
                    }
                }
            },

            password_hash: {
                type: DataTypes.STRING,
                defaultValue: '',
            }


        },{
            hooks: {
                beforeSave: async (user)  => {
                    if(!user.password) return;
                    user.password_hash = await bcrypt.hash(user.password, 8);
                    user.password = ''
                }
            },
            sequelize,
            modelName: 'User'
        })
        return this;
    }

    static associate(models) {
        this.hasOne(models.FotoPerfil, {foreignKey: 'user_id'});
        this.hasMany(models.Post, {foreignKey: 'use_id'});
        this.hasMany(models.Coment, {foreignKey: 'user_id'});

        this.hasMany(models.Follow, {foreignKey: 'quem_segue'});
        this.hasMany(models.Follow, {foreignKey: 'seguido'});
    }
}

