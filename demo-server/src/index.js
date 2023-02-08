import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(cors());

app.set('view engine', 'hbs');
app.set('views', './src/components');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/story/:id', (req, res) => {
  console.log(req.params.id, req.query);

  const templateData =
    'templateData' in req.query && typeof req.query.templateData === 'string'
      ? JSON.parse(req.query.templateData)
      : req.query;

  res.render(req.params.id, templateData);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
