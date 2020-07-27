import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        },
      },
    }
  );
  // User e o nome do model

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
    // O compare vai comparar se esse password bate com o password_hash.
  };
  // prototype: e para definir um novo metodo para o model de user.
  // Estamos usando um function e não um arrow function, porque precisamos do this
  // O this se refere a uma estancia desse usuario, com isso vou ter acesso ao password_hash desse user.

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    // id: this.id: permiti que o id seja encriptada dentro do toke.
    // process.env.APP_SECRET: e para diferenciar o token da sua aplicação de outros tokens, tem que ser algo muito unico.
  };

  return User;
};
