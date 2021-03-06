import ui from './ui'
export default async ({
  config,
  dependencies: {
    routes = [],
    createSwaggerDefinition,
    http: {
      methods: {
        GET
      },
      status: {
        OK
      }
    }
  }
}) => {
  const {
    swagger: {
      urls
    }
  } = config

  const { description, version } = config.pkg
  const title = config.pkg.name
  const contact = config.pkg.author
  const swaggerDef = createSwaggerDefinition([ ...routes ], { title, description, contact, version })
  const docsRoute = {
    path: urls.docs,
    method: GET,
    handler: ctx => {
      ctx.body = swaggerDef
      ctx.status = OK
    }
  }
  const uiRoute = {
    path: urls.ui,
    method: GET,
    handler: ctx => {
      ctx.body = ui(urls)
      ctx.status = OK
    }
  }
  routes.push(docsRoute, uiRoute)
}
