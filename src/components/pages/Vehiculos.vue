<template>
  <!-- Page -->
  <f7-page>

    <!-- Navbar -->
    <f7-navbar>
      <f7-nav-left >
        <f7-link back>
          <f7-icon material="arrow_back_ios"></f7-icon>
        </f7-link>
      </f7-nav-left>
      <f7-nav-center sliding class="home-navbar">
        <img src="static/img/logo.png" class="home-navbar-img"/>
      </f7-nav-center>
      <f7-nav-right>
        <f7-link @click="getView('perfil')">
          <f7-icon material="person_outline"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <!-- Lista de Polizas -->
    <f7-card class="home-card-custom" title="Mis Vehículos" center>
      <f7-card-content :padding="true">
        <f7-block>
          <Preloader v-if="preloader_1" />
          <f7-card v-else>
            <f7-list accordion-list inset class="perfil-acordeon-lista">

              <li class="accordion-item" v-for="item in infoRiesgos" :key="item.id" >
                <a href="#" class="item-link">
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title">
                        <span class="titulo-dominio">{{item.InfoAseRiesgoId}}</span><br>
                        <span class="titulo2-dominio">{{item.InfoAseRiesgoDescripcion}}</span><br><br>
                        <span class="subtitulo-dominio">Número de Póliza: <b>{{formatoPoliza(item.InfoAseRiesgoPoliza)}}</b></span><br>
                        <span class="subtitulo-dominio">Vigencia Hasta: <b>{{formatoFecha(item.InfoAseRiesgoVigenciaFin)}}</b></span>
                      </div>
                    </div>
                  </div>
                </a>

                <f7-accordion-content>
                  <f7-list media-list>
                    <f7-list-item v-for="(value, index) in item.RiesgoForms" :key="value.InfoAseRiesgoFormCodigo"
                      :title="value.InfoAseRiesgoFormDescripcion.toUpperCase()"
                      link="#"
                      @click="descargar(item, index, value)"
                      class="descargar-polizas-custom">
                      <PreloaderInfinite v-show="preloader_2 && index === descarga_click"/>
                      <img slot="media" src="static/img/vehiculo.svg" width="44" />
                    </f7-list-item>
                  </f7-list>
                </f7-accordion-content>

              </li>

            </f7-list>
          </f7-card>
        </f7-block>
      </f7-card-content>
    </f7-card>

    <!-- Contacto -->
    <Contacto />

  </f7-page>
</template>

<script>
import Vue from 'vue'
import Contacto from './../../components/inc/contacto'
import Auth from './../../components/helper/auth'
import Download from './../../components/helper/download'
import Preloader from './../../components/inc/preloader'
import PreloaderInfinite from './../../components/inc/preloaderInfinite'

/* eslint-disable */
import moment from 'moment'
/* eslint-enable */

export default {
  components: {
    Contacto,
    Preloader,
    PreloaderInfinite
  },
  data () {
    return {
      cordova: Vue.cordova,
      infoRiesgos: null,
      preloader_1: false,
      preloader_2: false,
      descarga_click: null
    }
  },
  mounted () {
    // backbutton
    this.cordova.on('backbutton', () => {
      this.$f7.mainView.router.back()
    })

    this.preloader_1 = true
    var result = Auth.getInfoAsegurado()

    result.then((response) => {
      var data = JSON.parse(response.data.Infoasegurado)
      if (data.InfoAseCodigo === 200) {
        this.infoRiesgos = data.Riesgos
      } else {
        this.$toasted.show(data.InfoAseDescripcion, {icon: 'error'})
        Auth.removeSession()
        this.$f7.mainView.router.back()
      }
      this.preloader_1 = false
    })
    .catch(() => {
      this.$toasted.show('Error desconocido', {icon: 'error'})
      this.preloader_1 = false
    })
  },
  methods: {
    formatoPoliza (nro) {
      let strNro = nro.toString()
      return strNro.substring(strNro.length - 1, -1) + '/' + strNro.substring(strNro.length - 1)
    },
    formatoFecha (fecha) {
      if (fecha) {
        return moment(fecha, 'DD/MM/YY').format('DD/MM/YYYY')
      }
    },
    descargar (riesgo, index, docs) {
      this.preloader_2 = true
      this.descarga_click = index

      var operacion = riesgo.InfoAseRiesgoOperacion
      var suplemento = riesgo.InfoAseRiesgoSuplemento
      var componente = riesgo.InfoAseRiesgoComponente
      var form = docs.InfoAseRiesgoFormCodigo
      var tipo = docs.InfoAseRiesgoFormTipo
      var polizaID = riesgo.InfoAseRiesgoPoliza + '-' + operacion + '-' + suplemento + '-' + componente

      if (tipo === 'FUN') {
        this.getView('vehiculosoa', polizaID)
        this.preloader_2 = false
      } else {
        var result = Download.getDocumentos(form, operacion, suplemento, componente)

        result.then((response) => {
          /* eslint-disable */
          let fileURL = response.data.Nompdf
          var ref = cordova.InAppBrowser.open(fileURL, '_system', 'location=no,hardwareback=no')
          this.preloader_2 = false

          ref.addEventListener('loadstop', () => {
            this.preloader_2 = false
          })
          ref.addEventListener('exit', () => {
            this.preloader_2 = false
          })
          /* eslint-enable */
        })
        .catch(() => {
          this.$toasted.show('Error desconocido', {icon: 'error'})
          this.preloader_2 = false
        })
      }
    },
    checkLogin () {
      var token = Auth.getSession()

      if (token) {
        return true
      } else {
        return false
      }
    },
    getView (vista, param1) {
      if (vista === 'perfil') {
        if (this.checkLogin()) {
          this.$f7.mainView.router.load({url: '/perfil/'})
        } else {
          this.$f7.mainView.router.load({url: '/'})
        }
      }

      if (vista === 'vehiculosoa') {
        if (this.checkLogin()) {
          this.$f7.mainView.router.load({url: '/vehiculos/' + param1 + '/SOA/'})
        } else {
          this.$f7.mainView.router.load({url: '/'})
        }
      }
    }
  }
}
</script>
<style>
  .titulo-dominio {
    font-size: 16px;
    font-weight: bold;
    color: #0d1451;
  }
  .subtitulo-dominio {
    font-size: 13px;
    font-weight: 100;
  }
  .descargar-polizas-custom .item-title{
    margin-top: 10px;
  }
  .titulo2-dominio {
    font-size: 15px;
    font-weight: 400;
  }
</style>
