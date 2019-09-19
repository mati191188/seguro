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

    <f7-card class="home-card-custom" title="Mis Pólizas" center>
      <f7-card-content :padding="true">
        <f7-block class="custom-block">
          <Preloader v-if="preloader_1" />
          <f7-card v-else>
            <f7-list accordion-list inset class="perfil-acordeon-lista">

              <li class="accordion-item" v-for="item in infoPolizas" :key="item.id" >
                <a href="#" class="item-link">
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title">
                        <span class="titulo-dominio">{{formatoPoliza(item.InfoAsePolizaNumero)}}</span><br>
                        <span class="titulo2-dominio">{{item.InfoAsePolizaRama}} - {{ item.InfoAsePolizaRamaDesc }}</span><br>
                        <span class="subtitulo-dominio">{{item.InfoAsePolizaDescripcion}}</span><br>
                        <span class="subtitulo-dominio"><b><span :style="'color:' + item.InfoAsePolizaColorEstado">{{item.InfoAsePolizaEstado}}</span></b></span>
                      </div>
                    </div>
                  </div>
                </a>

                <f7-accordion-content>

                  <f7-card>
                    <f7-card-content class="content-custom">
                      <div class="data-table">
                        <table>
                          <tbody>
                            <tr>
                              <td class="titulo-cell-cupon">Asegurado:</td>
                              <td class="descripcion-cell-cupon">{{item.InfoAsePolizaAsegurado}}</td>
                            </tr>
                            <tr>
                              <td class="titulo-cell-cupon">Vigencia:</td>
                              <td class="descripcion-cell-cupon">del {{ formatoFecha(item.InfoAsePolizaVigenciaIni) }} al {{ formatoFecha(item.InfoAsePolizaVigenciaFin) }}</td>
                            </tr>
                            <tr>
                              <td class="titulo-cell-cupon">Medio de Pago:</td>
                              <td class="descripcion-cell-cupon">{{item.InfoAsePolizaMedPag}}</td>
                            </tr>
                            <tr>
                              <td class="titulo-cell-cupon">Productor:</td>
                              <td class="descripcion-cell-cupon">{{item.InfoAsePolizaProductor}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </f7-card-content>
                  </f7-card>

                  <f7-card>
                    <f7-card-content class="cupo-item-form-descarga">
                      <f7-list media-list inset>
                        <f7-list-item v-for="(value, index) in item.PolizaForms" :key="value.InfoAsePolizaFormCodigo"
                          :title="value.InfoAsePolizaDescripcion.toUpperCase()"
                          link="#"
                          @click="descargar(item, index, value)"
                          class="descargar-polizas-custom">
                          <PreloaderInfinite v-show="preloader_2 && index === descarga_click"/>
                          <img slot="media" src="static/img/poliza.svg" width="44" />
                        </f7-list-item>
                      </f7-list>
                    </f7-card-content>
                  </f7-card>

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
      infoPolizas: null,
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
        this.infoPolizas = data.Polizas
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
    descargar (poliza, index, docs) {
      this.preloader_2 = true
      this.descarga_click = index

      var operacion = poliza.InfoAsePolizaOperacion
      var suplemento = 0
      var componente = 0
      var form = docs.InfoAsePolizaFormCodigo
      var tipo = docs.InfoAsePolizaTipo
      var polizaID = poliza.InfoAsePolizaNumero + '-' + poliza.InfoAsePolizaOperacion + '-' + poliza.InfoAsePolizaRama

      if (tipo === 'FUN') {
        this.getView('estadocuenta', polizaID)
        this.preloader_2 = false
      } else {
        var result = Download.getDocumentos(form, operacion, suplemento, componente)

        result.then((response) => {
          let fileURL = response.data.Nompdf
           /* eslint-disable */
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
    formatoPoliza (nro) {
      let strNro = nro.toString()
      return strNro.substring(strNro.length - 1, -1) + '/' + strNro.substring(strNro.length - 1)
    },
    formatoFecha (fecha) {
      if (fecha) {
        return moment(fecha, 'DD/MM/YY').format('DD/MM/YYYY')
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

      if (vista === 'estadocuenta') {
        if (this.checkLogin()) {
          this.$f7.mainView.router.load({url: '/polizas/' + param1 + '/EST/'})
        } else {
          this.$f7.mainView.router.load({url: '/'})
        }
      }
    }
  }
}
</script>
<style>
  .content-custom div {
    padding: 0px;
  }
  .titulo-cell-cupon {
    font-weight: bold;
    padding-left: 10px !important;
    padding-right: 10px !important;
    width: 40%;
    text-align: left !important;
    color: #5d5d5d !important;
  }
  .descripcion-cell-cupon {
    padding-left: 10px !important;
    padding-right: 10px !important;
    width: 60%;
    text-align: left !important;
    color: #5d5d5d !important;
  }
  .data-table tbody {
    font-size: 14px;
  }
  .data-table tbody td {
    height: 35px;
  }
  .cupo-item-form-descarga .card-content-inner {
    padding: 5px;
    border: #ebebeb;
    border-style: solid;
    border-width: 1px;
  }
  .titulo-dominio {
    font-size: 16px;
    font-weight: bold;
    color: #0d1451;
  }
  .subtitulo-dominio {
    font-size: 12px;
    font-weight: 100;
  }
  .descargar-polizas-custom .item-title{
    margin-top: 10px;
  }
  .custom-block {
    padding: 0 0px;
  }
  .titulo2-dominio {
    font-size: 15px;
    font-weight: 400;
  }
</style>
