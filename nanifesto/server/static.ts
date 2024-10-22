import express from 'express';
import path from 'path';
const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log('Listening on port 9000');
app.listen(9000);