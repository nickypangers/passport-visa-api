import { onError } from 'stoker/middlewares'
import countryRoute from './routes/countryRoute'
import visaRoute from './routes/visaRoute'
import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

app.route('/country', countryRoute)
app.route('/visa', visaRoute)

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Passport Visa API',
  }
})

app.onError(onError);

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch
}