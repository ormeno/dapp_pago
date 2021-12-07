const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const hashPayment = require('./lib/hashPayment')

const port = process.env.PORT || 3000;

app.set('port',port)
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', hashPayment, (req, res) => {
    alert('sig0')
    const { recipient, amount, nonce, defaultAccount, hash, contractAddress} = req.body
    const contentRes = {
        recipient,
        amount,
        nonce,
        defaultAccount,
        hash,
        contractAddress
    }
    alert('s1')
    console.log(contentRes)
    res.render('index2', {contentRes})
})


app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', port)
})