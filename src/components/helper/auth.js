import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Config from './config.js'

Vue.use(VueAxios, axios)

const instance = axios.create()

const auth = {
  setSession (token) {
    window.localStorage.setItem('segurometal-token', token)
  },
  getSession () {
    var token = window.localStorage.getItem('segurometal-token')
    return token
  },
  removeSession () {
    window.localStorage.removeItem('segurometal-token')
  },
  login (username, password) {
    var url = Config.api_base + 'RestAutenticacion'

    var params = {
      Usucod: username,
      Usucla: password
    }

    return instance.post(url, params)
  },
  logout () {
    this.removeSession()
  },
  recuperar (email) {
    var url = Config.api_base + 'RestOlvideMiClave'

    var params = {
      Mail: email
    }

    return instance.post(url, params)
  },
  recuperarByUsuario (usuario) {
    var url = Config.api_base + 'RestOlvideMiClaveXUsu'

    var params = {
      Usucod: usuario
    }

    return instance.post(url, params)
  },
  crear (nrodoc, nropoli, email, tel) {
    var url = Config.api_base + 'RestAltaAsegurado'

    var params = {
      Numdoc: nrodoc,
      Numpoli: nropoli,
      Mail: email,
      Telefono: tel
    }

    return instance.post(url, params)
  },
  cambiar (passOld, pass) {
    var url = Config.api_base + 'RestCambioClave'

    var params = {
      Token: this.getSession(),
      UsuclaOld: passOld,
      UsuclaNew: pass
    }

    return instance.post(url, params)
  },
  getInfoAsegurado () {
    var url = Config.api_base + 'RestInfoAsegurado'

    var params = {
      Token: this.getSession()
    }

    return instance.post(url, params)
  },
  getInfoAseguradoSOA (operacion, suplemento, componente) {
    var url = Config.api_base + 'RestInfSeguroObligatorio'

    var params = {
      Token: this.getSession(),
      Operacion: operacion,
      Suplemento: suplemento,
      Componente: componente
    }

    return instance.post(url, params)
  },
  getInfoPersonalAsegurado () {
    var info = window.localStorage.getItem('segurometal-infopersonal')
    return JSON.parse(info)
  },
  setInfoPersonalAsegurado (nombre, tipodoc, nrodoc, mail, nacimiento, telefono) {
    let info = {
      nombre: nombre,
      tipodoc: tipodoc,
      nrodoc: nrodoc,
      mail: mail,
      nacimiento: nacimiento,
      telefono: telefono
    }
    window.localStorage.setItem('segurometal-infopersonal', JSON.stringify(info))
  }

}

export default auth
