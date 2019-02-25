const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

const port = 80;

const assistant = new AssistantV1({
  username: 'apikey',
  password: 'Taqu8lnfTz8Thn9zL4jK2J7kuU4UORTuMxLyMwPqqc9u',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-07-10',
});


app.post('/conversation/', (req, res) => {
 const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id:'2038ded2-15f2-4786-96a5-1cab66d93b96',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) res.status(500).json(err);

    res.json(response);
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));
