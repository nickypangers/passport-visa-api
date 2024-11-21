import { onError } from 'stoker/middlewares'
import countryRoute from './routes/countryRoute'
import visaRoute from './routes/visaRoute'
import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'

const app = new OpenAPIHono()

app.use('*', cors())

app.route('/country', countryRoute)
app.route('/visa', visaRoute)

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '2.0.0',
    title: 'Passport Visa API',
    contact: {
      email: 'nixon@nickypangers.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    },
  },
  servers: [
    {
      url: 'https://rough-sun-2523.fly.dev/'
    }
  ],
  externalDocs: {
    description: 'Find out more about Passport Visa API',
    url: 'https://github.com/nickypangers/passport-visa-api'
  }
})

app.onError(onError);

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch
}