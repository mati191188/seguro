export default [
  {
    path: '/',
    component: require('./App.vue')
  },
  {
    path: '/perfil/',
    component: require('./components/pages/Perfil.vue')
  },
  {
    path: '/polizas/',
    component: require('./components/pages/Polizas.vue')
  },
  {
    path: '/polizas/:polizaID/EST/',
    component: require('./components/pages/PolizasEST.vue')
  },
  {
    path: '/vehiculos/',
    component: require('./components/pages/Vehiculos.vue')
  },
  {
    path: '/vehiculos/:polizaID/SOA/',
    component: require('./components/pages/VehiculosSOA.vue')
  },
  {
    path: '/siniestro/',
    component: require('./components/pages/Siniestro.vue')
  },
  {
    path: '/siniestro/alerta/',
    component: require('./components/pages/SiniestroAlerta.vue')
  },
  {
    path: '/grua/',
    component: require('./components/pages/Grua.vue')
  },
  {
    path: '/grua/:gruaID/',
    component: require('./components/pages/GruaSeguimiento.vue')
  }
]
