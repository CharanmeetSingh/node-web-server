const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

let app = express();

app.use((req, res, next) => {
    let now = new Date().toString();
    console.log(`${now}: ${req.method} ${req.url}`);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrYear', () => new Date().getFullYear());
hbs.registerHelper('upper', (text) => text.toUpperCase());

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our website!'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle this request'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(port, () => {
    console.log(`Server is now up on port : ${port}`);
});