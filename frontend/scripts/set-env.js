const { writeFile } = require('fs');
const { promisify } = require('util');

const writeFilePromise = promisify(writeFile);

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  console.error('A variável de ambiente API_URL não foi definida!');
  process.exit(1);
}

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
};
`;

writeFilePromise(targetPath, envConfigFile)
  .then(() => console.log(`Arquivo de ambiente de produção gerado em ${targetPath}`))
  .catch(err => {
    console.error('Erro ao gerar o arquivo de ambiente:', err);
    process.exit(1);
  });

