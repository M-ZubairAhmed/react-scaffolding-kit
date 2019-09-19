import express, { Router, static as expressStatic } from 'express'
import { join } from 'path'
import { createServer } from 'http'
import emoji from 'node-emoji'

const app = express()
const router = Router()
const port = process.env.PORT || 8080
const time = new Date()

// Point at assets
app.use('/', expressStatic(join(__dirname, 'build')))
app.use('/assets', expressStatic(join(__dirname, 'build', 'assets')))

app.use(
  '/',
  router.get('*', (req, res) => {
    // A unique name for intex html since it doesnt change that often
    // also its not possible to get generate hash of the file here, for inputting to server
    const route = join(__dirname, 'build', 'index.1554065223284.html')
    res.sendFile(route)
  }),
)

app.set('port', port)

const server = createServer(app)

server.listen(port, () =>
  console.info(
    `${emoji.get('rocket')}${emoji.get('rocket')}${emoji.get(
      'rocket',
    )} - Production server started on ${emoji.get(
      'clock1',
    )} ${time.toUTCString()} at port : ${emoji.get('tv')} ${port}`,
  ),
)
