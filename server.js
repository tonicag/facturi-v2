var express = require('express');
var app = express();
var cors = require('cors')
var PORT = 80;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = require('./models');

app.get('/', (req, res) => {
    res.json({ 'message': 'hello' });
});

//routers

require('./routes/auth.routes.js')(app);
require('./routes/view.routes.js')(app);
require('./routes/company.routes.js')(app);
require('./routes/bill.routes.js')(app);
require('./routes/billEntry.routes.js')(app);

app.listen(PORT, function(err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})