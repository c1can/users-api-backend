//const http = require("http")
const express = require('express')

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.body)
    console.log('----------')
    next()
})


let users = [
    {
        id: 1,
        name: 'carlos',
        job: 'frontend-dev'
    },
    {
        id: 2,
        name: 'messi',
        job: 'pro-soccer-player'
    },
    {
        id: 3,
        name: 'makachev',
        job: 'ufc-fighter'
    },
    {
        id: 4,
        name: 'santis',
        job: 'soccer star'
    }
]

/*const app = http.createServer((req, response) => {
    response.writeHead(200, {"Content-type": "application/json"})
    response.end(JSON.stringify(users))
})*/



//routes
app.get('/', (req, res) => {
    res.send('<h1>Hola mundo en express</h1>')
})

app.get('/notes', (req, res) => {
    res.json(users)
    console.log(req.url)
})

app.get('/notes/:id', (req, res) => {
    const idParam = req.params.id
    const num = Number(idParam)

    const user = users.find(usr => usr.id == num)
    user ? res.json(user) : res.status(404).end()
})

//esto se guarda en memoria por lo tanto si el servidor se vuelve a recargar otra vez aparecera y esto se solucionaria con
//la base de datos en mongoDB
app.delete('/notes/:id', (req, res) => {
    const idParam = req.params.id
    const num = Number(idParam)

    users = users.filter(usr => usr.id !== num)

    res.status(204).end()
})


//importante para poder leer lo que se le paso con el post 
//se necesita habilitar el express.json()
app.post('/notes', (req, res) => {
    const creation = req.body
    console.log(creation)

    const ids = users.map(usr => usr.id)
    const maxNum = Math.max(...ids)

    const newNote = {
        id: maxNum + 1,
        name: creation.name,
        job: creation.job
    }

    users = [...users, newNote]
    res.status(301).json(newNote)
})

//esto vendria siendo mi ultima ruta?
app.use((req, res) => {
    res.status(404).json({
        status: 'error'
    })
})

const PORT=3001

app.listen(PORT, () => {
    console.log(`Tu app esta list en el puerto: ${PORT}`)
})