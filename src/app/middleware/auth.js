import jwt from 'jsonwebtoken';
import { promisify } from 'util';
// promisify: transformar o padrão de callback do node em uma promise.

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;
  // E dessa forma que nos pegamos um header de uma requisição.

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const [_, token] = authHeader.split(' ');
  // estou pegando so a primeira variavel, colocando dentro da variavel token,

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

    request.id = decoded.id;
    /* estou pegando o id do usuario que esta dentro do token, e colocando 
    dentro da variavel request.id, para que todos os controllers tenha acesso
    ao id do usuario desse token.
    */

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token not provided' });
  }
};
