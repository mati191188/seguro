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
    <f7-card class="home-card-custom" title="SEGURO OBLIGATORIO AUTOMOTOR" center>
      <f7-card-content :padding="true" class="custom-tabla">
        <f7-grid>
          <f7-col class="custom-tabla-col">
            Resol. SSN 34.225 Decr. 1716/08 Ley 26.363
          </f7-col>
        </f7-grid>

        <div v-if="!preloader_1" class="data-table">
          <table v-if="infoPoliza">
            <tbody>
              <tr>
                <td class="titulo-cell-perfil">Póliza</td>
                <td class="descripcion-cell-perfil">{{this.formatoPoliza(this.infoPoliza.SegOblPoliza)}}</td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Asegurado</td>
                <td class="descripcion-cell-perfil">{{this.infoPoliza.SegOblAsegurado}}</td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Patente</td>
                <td class="descripcion-cell-perfil">{{this.infoPoliza.SegOblPatente}}</td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Vigencia</td>
                <td class="descripcion-cell-perfil">del {{formatoFecha(this.infoPoliza.SegOblVigenciaDesde)}} al {{formatoFecha(this.infoPoliza.SegOblVigenciaHasta)}}</td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Vehículo</td>
                <td class="descripcion-cell-perfil">{{this.infoPoliza.SegOblDescVeh}}</td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Año</td>
                <td class="descripcion-cell-perfil">{{this.infoPoliza.SegOblAnoVeh}}</td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Tipo</td>
                <td class="descripcion-cell-perfil">{{this.infoPoliza.SegOblTipoVeh}}</td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Chasis</td>
                <td class="descripcion-cell-perfil">{{this.infoPoliza.SegOblChasis}}</td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Motor</td>
                <td class="descripcion-cell-perfil">{{this.infoPoliza.SegOblMotor}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr>
        <f7-grid v-if="botonDescargar.boton_1">
          <f7-col>
            <PreloaderInfinite v-if="preloader" />
            <f7-button v-else fill @click="descargar()" class="custom-boton-fill">
              <f7-icon material="cloud_download"></f7-icon>
              Seguro Obligatorio Automotor
            </f7-button>
          </f7-col>
        </f7-grid>

        <f7-grid v-if="botonDescargar.boton_2">
          <f7-col>
            <PreloaderInfinite v-if="preloader_1" />
            <f7-button v-else fill @click="certificado()" class="custom-boton-fill">
              <f7-icon material="cloud_download"></f7-icon>
              Certificado de Cobranza al Día
            </f7-button>
          </f7-col>
        </f7-grid>

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
import PreloaderInfinite from './../../components/inc/preloaderInfinite'

/* eslint-disable */
import moment from 'moment'
/* eslint-enable */

export default {
  components: {
    Contacto,
    PreloaderInfinite
  },
  data () {
    return {
      cordova: Vue.cordova,
      infoRiesgos: null,
      infoRiesgoSelect: null,
      infoPoliza: null,
      polizaID: null,
      preloader: false,
      preloader_1: false,
      botonDescargar: {
        boton_1: false,
        boton_2: false
      }
    }
  },
  mounted () {
    // backbutton
    this.cordova.on('backbutton', () => {
      this.$f7.mainView.router.back()
    })

    // setear parametro poliza ID
    this.polizaID = this.$route.params.polizaID

    // busco todos los datos
    this.preloader_1 = true
    var result = Auth.getInfoAsegurado()

    result.then((response) => {
      var data = JSON.parse(response.data.Infoasegurado)
      if (data.InfoAseCodigo === 200) {
        this.infoRiesgos = data.Riesgos

        // selecciono la poliza correcta
        this.infoRiesgos.forEach((item) => {
          if (item.InfoAseRiesgoPoliza.toString() + '-' + item.InfoAseRiesgoOperacion.toString() + '-' + item.InfoAseRiesgoSuplemento.toString() + '-' + item.InfoAseRiesgoComponente.toString() === this.polizaID) {
            this.infoRiesgoSelect = item
            var result1 = Auth.getInfoAseguradoSOA(item.InfoAseRiesgoOperacion, item.InfoAseRiesgoSuplemento, item.InfoAseRiesgoComponente)
            result1.then((response1) => {
              var data1 = JSON.parse(response1.data.SeguroObligatorioOut)
              if (data1.SegOblCodigo === 200) {
                this.infoPoliza = data1

                // habilitación descargas
                if (this.infoPoliza) {
                  if (this.infoPoliza.SegOblForms.length > 0) {
                    this.infoPoliza.SegOblForms.forEach(element => {
                      if (element.SegOblFormCodigo === 'SEGO') {
                        this.botonDescargar.boton_1 = true
                      }

                      if (element.SegOblFormCodigo === 'CCOB') {
                        this.botonDescargar.boton_2 = true
                      }
                    })
                  }
                }
              } else {
                this.$toasted.show('Error desconocido', {icon: 'error'})
              }
            }).catch(() => {
              this.$toasted.show('Error desconocido', {icon: 'error'})
            })
          }
        })
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
    descargar () {
      this.preloader = true

      var form = 'SEGO'
      var operacion = this.infoRiesgoSelect.InfoAseRiesgoOperacion
      var suplemento = this.infoRiesgoSelect.InfoAseRiesgoSuplemento
      var componente = this.infoRiesgoSelect.InfoAseRiesgoComponente

      var result = Download.getDocumentos(form, operacion, suplemento, componente)

      result.then((response) => {
        /* eslint-disable */
        let fileURL = response.data.Nompdf
        var ref = cordova.InAppBrowser.open(fileURL, '_system', 'location=no')
        this.preloader = false

        ref.addEventListener('loadstop', () => {
          this.preloader = false
        })
        ref.addEventListener('exit', () => {
          this.preloader = false
        })
        /* eslint-enable */
      })
      .catch(() => {
        this.$toasted.show('Error desconocido', {icon: 'error'})
        this.preloader = false
      })
    },
    certificado () {
      this.preloader_1 = true

      var form = 'CCOB'
      var operacion = this.infoRiesgoSelect.InfoAseRiesgoOperacion
      var suplemento = this.infoRiesgoSelect.InfoAseRiesgoSuplemento
      var componente = this.infoRiesgoSelect.InfoAseRiesgoComponente

      var result = Download.getDocumentos(form, operacion, suplemento, componente)

      result.then((response) => {
        /* eslint-disable */
        let fileURL = response.data.Nompdf
        var ref = cordova.InAppBrowser.open(fileURL, '_system', 'location=no,hardwareback=no')
        this.preloader_1 = false

        ref.addEventListener('loadstop', () => {
          this.preloader_1 = false
        })
        ref.addEventListener('exit', () => {
          this.preloader_1 = false
        })
        /* eslint-enable */
      })
      .catch(() => {
        this.$toasted.show('Error desconocido', {icon: 'error'})
        this.preloader_1 = false
      })
    },
    checkLogin () {
      var token = Auth.getSession()

      if (token) {
        return true
      } else {
        return false
      }
    },
    getView (vista) {
      if (vista === 'perfil') {
        if (this.checkLogin()) {
          this.$f7.mainView.router.load({url: '/perfil/'})
        } else {
          this.$f7.mainView.router.load({url: '/'})
        }
      }
    }
  }
}
</script>
<style>
  .titulo-cell-perfil {
    font-weight: bold;
    padding-left: 10px !important;
    padding-right: 10px !important;
    width: 40%;
    text-align: left !important;
    color: #5d5d5d;
  }
  .descripcion-cell-perfil {
    padding-left: 10px !important;
    padding-right: 10px !important;
    width: 60%;
    text-align: left !important;
    color: #5d5d5d;
  }
  .custom-tabla .card-content-inner{
    padding-top: 0px;
  }
  .custom-tabla-col {
    font-weight: 400;
    color: red;
    text-align: center;
    margin-bottom: 20px;
  }
</style>
