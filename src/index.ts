import { Hono } from 'hono'
import countryRoute from './routes/countryRoute'
import visaRoute from './routes/visaRoute'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/country', countryRoute)
app.route('/visa', visaRoute)

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch
}