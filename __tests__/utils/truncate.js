import { sequelize } from '../../src/app/models';

export default () => {
  return Promise.all(
    Object.keys(sequelize.models).map((key) => {
      return sequelize.models[key].destroy({ truncate: true, force: true });
    })
  );
  // Ele vai pecorrer todos os models que estão no sequelize.
  // Nesse key ele vai ter o nome de cada model.
  // sequelize.models[key] aqui ele vai ter um model.
  // .destroy({ truncate: true, force: true }) O isso ele vai fazer um truncate na tabela
  // truncate: E deletar todos os dados que tem la dentro.

  // Esse destroy retorna algo que vai demorar um pouco.
  /* Promise.all vai encapsula todos esses retornos(promises), 
  e vai fazer ele esperar.
  */
};
