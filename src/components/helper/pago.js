import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Config from './config.js'
import Auth from './auth.js'

Vue.use(VueAxios, axios)

const instance = axios.create()

const pago = {
  gire (op, form) {
    var url = Config.api_base + 'RestGire'

    var params = {
      Token: Auth.getSession(),
      Operacion: op,
      TipPago: form
    }

    return instance.post(url, params)
  },
  cupon (op, form) {
    var url = Config.api_base + 'RestMuestraPDF'

    var params = {
      Token: Auth.getSession(),
      Tipoform: form,
      Operacion: op,
      Suplemento: 0,
      Componente: 0
    }

    return instance.post(url, params)
  }
}

export default pago
