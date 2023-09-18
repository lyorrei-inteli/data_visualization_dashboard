export const routes = {
  flight: {
    base: '/protected/flights',
    create: '/protected/flights/create',
  },
  auth: {
    login: "/auth/login"
  }
}

export const apiRoutes = {
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
  },
  flight: {
    get: '/api/flight',
    create: '/api/flight/create'
  }
}