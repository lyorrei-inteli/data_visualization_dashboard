export const routes = {
  predictions: {
    base: '/protected/predictions',
    create: '/protected/predictions/create',
  },
  auth: {
    login: "/auth/login"
  }
}

export const apiRoutes = {
  auth: {
    login: '/login',
    signup: '/signup',
  },
  predictions: {
    get: '/predictions',
    create: '/predictions/create'
  }
}