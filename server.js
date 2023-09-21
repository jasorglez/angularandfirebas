const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;

// Crear un servidor HTTP
const server = http.createServer((req, res) => {
  // Obtener la URL de la solicitud
  const url = req.url;

  // Ruta de la página HTML correspondiente a la URL
  let filePath = '';
  let message = '';

  if (url === '/example1') {
    filePath = 'example1.html';
    message = 'Bienvenido a la página 1';
  } else if (url === '/example2') {
    filePath = 'example2.html';
    message = 'Bienvenido a la página 2';
  } else if (url === '/example3') {
    filePath = 'example3.html';
    message = 'Bienvenido a la página 3';
  } else if (url === '/') {
    filePath = 'index.html';
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página no encontrada');
    return;
  }

  // Leer el archivo HTML correspondiente
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error interno del servidor');
    } else {
      if (message) {
        data = data.toString().replace('{{message}}', message);
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

// Escuchar en el puerto 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});
