import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Config from './config.js'
import Auth from './auth.js'

Vue.use(VueAxios, axios)

const instance = axios.create()

const siniestro = {
  enviar (form) {
    var url = Config.api_base + 'RestSiniestro'
    var toma1 = ''
    var toma2 = ''
    var toma3 = ''
    var toma4 = ''
    var toma5 = ''
    var toma6 = ''
    var toma7 = ''
    var toma8 = ''
    var toma9 = ''

    if (form.fotos.toma1 !== 'static/img/images.png') { toma1 = form.fotos.toma1 }
    if (form.fotos.toma2 !== 'static/img/images.png') { toma2 = form.fotos.toma2 }
    if (form.fotos.toma3 !== 'static/img/images.png') { toma3 = form.fotos.toma3 }
    if (form.fotos.toma4 !== 'static/img/images.png') { toma4 = form.fotos.toma4 }
    if (form.fotos.toma5 !== 'static/img/images.png') { toma5 = form.fotos.toma5 }
    if (form.fotos.toma6 !== 'static/img/images.png') { toma6 = form.fotos.toma6 }
    if (form.fotos.toma7 !== 'static/img/images_dni.png') { toma7 = form.fotos.toma7 }
    if (form.fotos.toma8 !== 'static/img/images_tarjeta_azul.png') { toma8 = form.fotos.toma8 }
    if (form.fotos.toma9 !== 'static/img/images_poliza_seguro.png') { toma9 = form.fotos.toma9 }

    var params = {
      Token: Auth.getSession(),
      Operacion: form.operacion,
      Suplemento: form.suplemento,
      Componente: form.componente,
      Patente: form.dominio,
      Fecha: form.fecha,
      Hora: form.hora,
      Descripcion: form.descripcion,
      Audio: form.audio,
      FotoSiniestro1: toma1,
      FotoSiniestro2: toma2,
      FotoSiniestro3: toma3,
      FotoSiniestro4: toma4,
      FotoSiniestro5: toma5,
      FotoSiniestro6: toma6,
      FotoTercero1: toma7,
      FotoTercero2: toma8,
      FotoTercero3: toma9,
      DatosAdicionalesTercero: form.descripcion_terceros
    }

    return instance.post(url, params)
  },
  historial () {
    var url = Config.api_base + 'RestSiniestrosListar'

    var params = {
      Token: Auth.getSession()
    }

    return instance.post(url, params)
  }
}

export default siniestro
