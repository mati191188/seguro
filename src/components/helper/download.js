import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Config from './config.js'
import Auth from './auth.js'

Vue.use(VueAxios, axios)

const instance = axios.create()

const download = {
  getDocumentos (tipo, op, sup, comp) {
    var url = Config.api_base + 'RestMuestraPDF'

    var params = {
      Token: Auth.getSession(),
      Tipoform: tipo,
      Operacion: op,
      Suplemento: sup,
      Componente: comp
    }

    return instance.post(url, params)
  },
  descargar (file) {
    return axios({
      url: file,
      method: 'GET',
      responseType: 'blob'
    })
  }
}

export default download
