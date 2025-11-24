const fs = require('fs');
const path = require('path');

console.log('Setting production environment variables...');

const targetPath = path.join(__dirname, '../src/environments/environment.prod.ts');

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  console.error('Error: Variável de ambiente API_URL não definida.');
  process.exit(1);
}

fs.readFile(targetPath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Erro ao ler o arquivo ${targetPath}:`, err);
    return process.exit(1);
  }

  const result = data.replace(/__API_URL__/g, apiUrl);

  fs.writeFile(targetPath, result, 'utf8', (err) => {
    if (err) {
      console.error(`Erro ao escrever no arquivo ${targetPath}:`, err);
      return process.exit(1);
    }
    console.log(`API_URL definida com sucesso em ${targetPath}`);
  });
});
