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

    <!-- Lista de Cupones -->
    <f7-card class="home-card-custom" title="VENCIMIENTOS/PAGOS" center>
      <f7-card-content :padding="true" v-if="!preloader_1">
        <f7-block class="content-custom">

          <f7-card>
            <f7-card-content class="content-custom" v-if="this.infoPolizasSelect">
              <div class="data-table">
                <table>
                  <tbody>
                    <tr>
                      <td class="titulo-cell-cupon">Póliza:</td>
                      <td class="descripcion-cell-cupon">{{this.formatoPoliza(this.infoPolizasSelect.InfoAsePolizaNumero)}}</td>
                    </tr>
                    <tr>
                      <td class="titulo-cell-cupon">Rama:</td>
                      <td class="descripcion-cell-cupon">{{this.infoPolizasSelect.InfoAsePolizaRama}} - {{ this.infoPolizasSelect.InfoAsePolizaRamaDesc }}</td>
                    </tr>
                    <tr>
                      <td class="titulo-cell-cupon">Estado:</td>
                      <td class="descripcion-cell-cupon"><span :style="'color:' + this.infoPolizasSelect.InfoAsePolizaColorEstado">{{this.infoPolizasSelect.InfoAsePolizaEstado}}</span></td>
                    </tr>
                    <tr>
                      <td class="titulo-cell-cupon">Descripción:</td>
                      <td class="descripcion-cell-cupon">{{this.infoPolizasSelect.InfoAsePolizaDescripcion}}</td>
                    </tr>
                    <tr>
                      <td class="titulo-cell-cupon">Medio de Pago:</td>
                      <td class="descripcion-cell-cupon">{{this.infoPolizasSelect.InfoAsePolizaMedPag}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </f7-card-content>
          </f7-card>

          <f7-card v-if="this.infoPolizasSelect.InfoAsePolizaUltPagoImporte>0">
            <f7-card-content class="content-custom">
              <div class="data-table">
                <table>
                  <tbody>
                    <tr>
                      <td class="titulo-cell-cupon-col3">Último Pago:</td>
                      <td class="descripcion-cell-cupon-col3">{{ this.formatoFecha(this.infoPolizasSelect.InfoAsePolizaUltPagoFecha) }}</td>
                      <td class="descripcion-cell-cupon-col3">{{ this.formatoImporte(this.infoPolizasSelect.InfoAsePolizaUltPagoImporte) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </f7-card-content>
          </f7-card>

          <f7-card v-if="this.infoPolizasSelect.InfoAsePolizaHabPagoSaldo==='S'">
            <f7-card-content class="content-custom">
              <div class="data-table">
                <table>
                  <tbody>
                    <tr>
                      <td class="titulo-cell-cupon-col2">Total Emitido:</td>
                      <td class="descripcion-cell-cupon-col2">{{this.formatoImporte(this.infoPolizasSelect.InfoAsePolizaDebitos)}}</td>
                    </tr>
                    <tr>
                      <td class="titulo-cell-cupon-col2">Créditos:</td>
                      <td class="descripcion-cell-cupon-col2">{{this.formatoImporte(this.infoPolizasSelect.InfoAsePolizaCreditos)}}</td>
                    </tr>
                    <tr>
                      <td class="titulo-cell-cupon-col2">Pagos:</td>
                      <td class="descripcion-cell-cupon-col2">{{this.formatoImporte(this.infoPolizasSelect.InfoAsePolizaPagos)}}</td>
                    </tr>
                    <tr>
                      <td class="titulo-cell-cupon-col2 custom-color-saldo">Saldo:</td>
                      <td class="descripcion-cell-cupon-col2 custom-color-saldo">{{this.formatoImporte(this.infoPolizasSelect.InfoAsePolizaSaldo)}}</td>
                    </tr>
                    <tr>
                      <td class="td-cupon-imprimir-left">
                        <f7-button fill @click="imprimir('CUSA')" class="custom-boton-fill custom-boton-fill-cupon">
                          <f7-icon material="print"></f7-icon>
                          Cupón
                        </f7-button>
                      </td>
                      <td class="td-cupon-imprimir-right">
                        <f7-button fill @click="pagar('BPSA')" class="custom-boton-fill custom-boton-fill-cupon">
                          <f7-icon material="payment"></f7-icon>
                          Pagar
                        </f7-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </f7-card-content>
          </f7-card>

          <f7-card v-if="this.infoPolizasSelect.InfoAsePolizaHabPagoDeuda==='S'">
            <f7-card-content class="content-custom">
              <div class="data-table">
                <table>
                  <tbody>
                    <tr>
                      <td class="titulo-cell-cupon-col2">Deuda a la Fecha:</td>
                      <td class="descripcion-cell-cupon-col2">{{this.formatoImporte(this.infoPolizasSelect.InfoAsePolizaDeuda)}}</td>
                    </tr>
                    <tr>
                      <td class="td-cupon-imprimir-left">
                        <f7-button fill @click="imprimir('CUDE')" class="custom-boton-fill custom-boton-fill-cupon">
                          <f7-icon material="print"></f7-icon>
                          Cupón
                        </f7-button>
                      </td>
                      <td class="td-cupon-imprimir-right">
                        <f7-button fill @click="pagar('BPDE')" class="custom-boton-fill custom-boton-fill-cupon">
                          <f7-icon material="payment"></f7-icon>
                          Pagar
                        </f7-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </f7-card-content>
          </f7-card>

          <f7-card v-if="this.infoPolizasSelect.InfoAsePolizaHabPagoProxVenc==='S'">
            <f7-card-content class="content-custom">
              <div class="data-table">
                <table>
                  <tbody>
                    <tr>
                      <td class="titulo-cell-cupon-col2">Próximo Vto: {{ this.formatoFecha(this.infoPolizasSelect.InfoAsePolizaProxVencFecha) }}</td>
                      <td class="descripcion-cell-cupon-col2">{{this.formatoImporte(this.infoPolizasSelect.InfoAsePolizaProxVencImporte)}}</td>
                    </tr>
                    <tr>
                      <td class="td-cupon-imprimir-left">
                        <f7-button fill @click="imprimir('CUPV')" class="custom-boton-fill custom-boton-fill-cupon">
                          <f7-icon material="print"></f7-icon>
                          Cupón
                        </f7-button>
                      </td>
                      <td class="td-cupon-imprimir-right">
                        <f7-button fill @click="pagar('BPPV')" class="custom-boton-fill custom-boton-fill-cupon">
                          <f7-icon material="payment"></f7-icon>
                          Pagar
                        </f7-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </f7-card-content>
          </f7-card>

          <f7-card v-if="this.infoPolizasSelect.InfoAsePolizaHabPagoCtdo==='S'">
            <f7-card-content class="content-custom">
              <div class="data-table">
                <table>
                  <tbody>
                    <tr>
                      <td class="titulo-cell-cupon-col2">Pago Contado: {{ this.formatoFecha(this.infoPolizasSelect.InfoAsePolizaPagoCtdoFecha) }}</td>
                      <td class="descripcion-cell-cupon-col2">{{this.formatoImporte(this.infoPolizasSelect.InfoAsePolizaPagoCtdo)}}</td>
                    </tr>
                    <tr>
                      <td class="td-cupon-imprimir-left">
                        <f7-button fill @click="imprimir('CUCT')" class="custom-boton-fill custom-boton-fill-cupon">
                          <f7-icon material="print"></f7-icon>
                          Cupón
                        </f7-button>
                      </td>
                      <td class="td-cupon-imprimir-right">
                        <f7-button fill @click="pagar('BPCT')" class="custom-boton-fill custom-boton-fill-cupon">
                          <f7-icon material="payment"></f7-icon>
                          Pagar
                        </f7-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </f7-card-content>
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
import Pago from './../../components/helper/pago'
import Preloader from './../../components/inc/preloader'

/* eslint-disable */
import moment from 'moment'
/* eslint-enable */

export default {
  components: {
    Contacto,
    Preloader
  },
  data () {
    return {
      cordova: Vue.cordova,
      infoPolizas: null,
      infoPolizasSelect: {},
      polizaID: null,
      preloader_1: false,
      preloader_2: false
    }
  },
  mounted () {
    // backbutton
    this.cordova.on('backbutton', () => {
      this.$f7.mainView.router.back()
    })

    // setear parametro poliza ID
    this.polizaID = this.$route.params.polizaID

    // setear datos pantalla
    this.setDatosPantalla()
  },
  methods: {
    setDatosPantalla () {
      this.preloader_1 = true
      var result = Auth.getInfoAsegurado()

      result.then((response) => {
        var data = JSON.parse(response.data.Infoasegurado)
        if (data.InfoAseCodigo === 200) {
          this.infoPolizas = data.Polizas
          this.infoPolizas.forEach((item) => {
            if (item.InfoAsePolizaNumero.toString() + '-' + item.InfoAsePolizaOperacion.toString() + '-' + item.InfoAsePolizaRama.toString() === this.polizaID) {
              this.infoPolizasSelect = item
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
    formatoPoliza (nro) {
      let strNro = nro.toString()
      return strNro.substring(strNro.length - 1, -1) + '/' + strNro.substring(strNro.length - 1)
    },
    formatoFecha (fecha) {
      if (fecha) {
        return moment(fecha, 'DD/MM/YY').format('DD/MM/YYYY')
      }
    },
    formatoImporte (valor) {
      if (valor) {
        return '$ ' + valor
      } else {
        return '$ 0,00'
      }
    },
    imprimir (form) {
      if (form) {
        var result = Pago.cupon(this.infoPolizasSelect.InfoAsePolizaOperacion, form)
        result.then((response) => {
          /* eslint-disable */
          let fileURL = response.data.Nompdf
          var ref = cordova.InAppBrowser.open(fileURL, '_system', 'location=no,hardwareback=no')

          ref.addEventListener('loadstop', () => {
            this.setDatosPantalla()
          })
          ref.addEventListener('exit', () => {
            this.setDatosPantalla()
          })
          /* eslint-enable */
        })
        .catch(() => {
          this.$toasted.show('Error desconocido', {icon: 'error'})
        })
      } else {
        this.$toasted.show('Form no seteado', {icon: 'error'})
      }
    },
    pagar (form) {
      if (form) {
        var result = Pago.gire(this.infoPolizasSelect.InfoAsePolizaOperacion, form)
        result.then((response) => {
          var data = JSON.parse(response.data.Gireout)

          if (data.ErrorCod === 403) {
            this.$toasted.show(data.ErrorMsg, {icon: 'error'})
            return false
          }

          /* eslint-disable */
          var ref = cordova.InAppBrowser.open(data.Rutahtmlgire, '_self', 'location=no,hardwareback=no')
          /* eslint-enable */
        })
        .catch(() => {
          this.$toasted.show('Error desconocido', {icon: 'error'})
        })
      } else {
        this.$toasted.show('Form no seteado', {icon: 'error'})
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
  .titulo-cell-cupon-col3 {
    font-weight: bold;
    padding-left: 10px !important;
    padding-right: 10px !important;
    width: 33%;
    text-align: left !important;
    color: #5d5d5d !important;
  }
  .descripcion-cell-cupon-col3 {
    padding-left: 10px !important;
    padding-right: 10px !important;
    width: 33%;
    text-align: right !important;
    color: #5d5d5d !important;
  }
  .titulo-cell-cupon-col2 {
    font-weight: bold;
    padding-left: 10px !important;
    padding-right: 10px !important;
    width: 40%;
    text-align: left !important;
    color: #5d5d5d !important;
  }
  .descripcion-cell-cupon-col2 {
    padding-left: 10px !important;
    padding-right: 10px !important;
    width: 60%;
    text-align: right !important;
    color: #5d5d5d !important;
  }
  .td-cupon-imprimir-left {
    padding-left: 0px !important;
    padding-right: 10px !important;
    width: 50%;
    text-align: center !important;
  }
  .td-cupon-imprimir-right {
    padding-left: 10px !important;
    padding-right: 0px !important;
    width: 50%;
    text-align: center !important;
  }
  .custom-boton-fill-cupon {
    margin-bottom: 0px !important;
  }
  .custom-color-saldo {
    background: #e8e8e8 !important;
    font-weight: bold;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #000;
  }
  .custom-block {
    padding: 0 0px;
  }
</style>
