import app from './app';
import AppDataSource from './infra/typeorm/data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('conectado no banco com sucesso');
    app.listen(4000, () => console.log('Servidor rodando na porta 4000'));
  })
  .catch((error) => {
    console.log(error);
  });
