import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Config from './config.js'
import Auth from './auth.js'

Vue.use(VueAxios, axios)

const instance = axios.create()

const grua = {
  solicitar (dominio, celular, nrodoc, usuario, latitud, longitud, origen, destino) {
    var url = Config.api_base_web + 'solicitarAsistencia'

    if (nrodoc.toString().length === 11) {
      nrodoc = 0
    }

    var params = {
      usuario: usuario,
      dominio: dominio,
      dni: nrodoc,
      celular: celular,
      origen_latitud: latitud,
      origen_longitud: longitud,
      origen_localidad: origen,
      destino_localidad: destino
    }

    return instance.post(url, params)
  },
  abiertas () {
    var info = Auth.getInfoPersonalAsegurado()
    var url = Config.api_base_web + 'SolicitudesAbiertas'

    var params = {
      usuario: info.tipodoc + info.nrodoc
    }

    return instance.post(url, params)
  },
  cerradas () {
    var info = Auth.getInfoPersonalAsegurado()
    var url = Config.api_base_web + 'SolicitudesCerradas'

    var params = {
      usuario: info.tipodoc + info.nrodoc
    }

    return instance.post(url, params)
  },
  operacionById (gruaID) {
    var url = Config.api_base_web + 'getSolicitud'

    var params = {
      id: gruaID
    }

    return instance.post(url, params)
  },
  estadosTranslate (status) {
    var arrEstado = {}
    switch (status) {
      case 'pending':
        arrEstado = {nombre: 'Pendiente', color: 'red'}
        break
      case 'processed':
        arrEstado = {nombre: 'Procesado', color: 'orange'}
        break
      case 'handled':
        arrEstado = {nombre: 'Gestionado', color: 'orange'}
        break
      case 'created':
        arrEstado = {nombre: 'Creado', color: 'blue'}
        break
      case 'truck_assigned':
        arrEstado = {nombre: 'Asignado', color: 'blue'}
        break
      case 'finished':
        arrEstado = {nombre: 'Finalizado', color: 'green'}
        break
      case 'updated':
        arrEstado = {nombre: 'Modificado', color: 'blue'}
        break
      case 'reasign':
        arrEstado = {nombre: 'Reasignado', color: 'blue'}
        break
      case 'arriving_to_origin':
        arrEstado = {nombre: 'Llegando al origen', color: 'blue'}
        break
      case 'missed':
        arrEstado = {nombre: 'Perdido', color: 'red'}
        break
      case 'arrived':
        arrEstado = {nombre: 'Arribado', color: 'green'}
        break
      case 'arriving_to_destination':
        arrEstado = {nombre: 'Llegando a destino', color: 'green'}
        break
    }
    return arrEstado
  }
}

export default grua
