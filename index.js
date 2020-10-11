const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const math = require('@89evandroalmeida/nodejs-math-example');

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    const data = JSON.parse(msg);
    let result;
    switch (data.operator) {
      case '+':
        result = math.add(parseFloat(data.num1), parseFloat(data.num2), '+')
        break;
      case '-':
        result = math.subtract(parseFloat(data.num1), parseFloat(data.num2), '-')
        break;
      case '*':
        result = math.multiply(parseFloat(data.num1), parseFloat(data.num2), '*')
        break;
      case '/':
        result = math.divide(parseFloat(data.num1), parseFloat(data.num2), '/')
        break;    
      default:
        result = 'Operador inválido'
        break;
    }
    result = 'O resultado da operação é: ' + result;
    ws.send(result);
  });
})

server.listen(process.env.PORT || 9898, () => {
  console.log('Servidor rodando na porta: ', server.address().port)
});