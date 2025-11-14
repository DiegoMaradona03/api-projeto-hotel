const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerDoc = require('../src/swagger.json');
const routes = require('../src/routes');

const port = process.env.PORT || 3600;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(routes);

app.listen(port, () =>{
    console.log('API respondendo em http://localhost:' + port);
    console.log('Documentação em http://localhost:' + port + '/docs');
});