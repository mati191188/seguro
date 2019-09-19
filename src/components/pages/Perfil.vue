<template>

  <!-- Page -->
  <f7-page class="perfil_page">

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
        <f7-link @click="logout">
          <f7-icon material="exit_to_app"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-subnavbar class="perfil_subnavbar_custom">
      <f7-segmented>
        <f7-button tab-link="#tab1" class="perfil_subnavbar_button_custom active">
          <i class="fas fa-user"></i><br>
          <span>Perfil</span>
        </f7-button>
        <f7-button tab-link="#tab2" class="perfil_subnavbar_button_custom">
          <i class="fas fa-info"></i><br>
          <span>Mis Siniestros</span>
        </f7-button>
        <f7-button tab-link="#tab3" class="perfil_subnavbar_button_custom">
          <i class="fas fa-tools"></i><br>
          <span>Mis Auxilios</span>
        </f7-button>
      </f7-segmented>
    </f7-subnavbar>

    <f7-tabs class="perfil_tabs">
      <f7-tab id="tab1" class="active">
        <f7-block>
          <f7-card>
            <f7-card-content class="content-custom">
              <div class="data-table">
                <table>
                  <tbody>
                    <tr>
                      <td class="titulo-cell-perfil">Nombre</td>
                      <td class="descripcion-cell-perfil">{{this.infoPersonal.nombre}}</td>
                    </tr>
                    <tr>
                      <td class="titulo-cell-perfil">Nro Documento</td>
                      <td class="descripcion-cell-perfil">{{ this.getFormatDocumento() }}</td>
                    </tr>
                    <tr>
                      <td class="titulo-cell-perfil">Email</td>
                      <td class="descripcion-cell-perfil">{{this.infoPersonal.mail}}</td>
                    </tr>
                    <tr>
                      <td class="titulo-cell-perfil">Teléfono</td>
                      <td class="descripcion-cell-perfil">{{this.infoPersonal.telefono}}</td>
                    </tr>
                    <tr>
                      <td class="titulo-cell-perfil">Fecha Nacimiento</td>
                      <td class="descripcion-cell-perfil">{{formatoFecha(this.infoPersonal.nacimiento)}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </f7-card-content>
          </f7-card>
          <f7-card>
            <f7-card-content>
              <f7-list inset>
                <f7-list-button href="#" title="Cambiar Contraseña" color="green" @click="abrirCambiar()" class="perfil-cambiar-contrasenia"></f7-list-button>
              </f7-list>
            </f7-card-content>
          </f7-card>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab2">
        <f7-block>
          <f7-card v-if="siniestroHistorial">
            <f7-list accordion-list inset  class="perfil-acordeon-lista">
              <f7-list-item
                v-for="item in siniestroHistorial" :key="item.NumeroDenuncia"
                accordion-item
                :title="formatoFecha2(item.Fecha) + ' - ' + item.Estado">
                <f7-accordion-content>
                  <f7-block>
                    <f7-card>
                      <f7-card-content class="content-custom">
                        <div class="data-table">
                          <table>
                            <tbody>
                              <tr>
                                <td class="titulo-cell-perfil">Código:</td>
                                <td class="descripcion-cell-perfil">{{ item.NumeroDenuncia }}</td>
                              </tr>
                              <tr>
                                <td class="titulo-cell-perfil">Póliza:</td>
                                <td class="descripcion-cell-perfil">{{ formatoPoliza(item.Poliza) }}</td>
                              </tr>
                              <tr>
                                <td class="titulo-cell-perfil">Fecha:</td>
                                <td class="descripcion-cell-perfil">{{ formatoFecha2(item.Fecha) }}</td>
                              </tr>
                              <tr>
                                <td class="titulo-cell-perfil">Patente:</td>
                                <td class="descripcion-cell-perfil">{{ item.Patente }}</td>
                              </tr>
                              <tr>
                                <td class="titulo-cell-perfil">Estado:</td>
                                <td class="descripcion-cell-perfil">{{ item.Estado }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </f7-card-content>
                    </f7-card>
                  </f7-block>
                </f7-accordion-content>
              </f7-list-item>
            </f7-list>
          </f7-card>
          <f7-card v-else class="perfil-grua">
            No se encontraron predenuncias generadas
          </f7-card>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab3">
        <f7-block>
          <f7-card v-if="opCerradas">
            <f7-list accordion-list inset  class="perfil-acordeon-lista">
              <f7-list-item
                v-for="item in opCerradas" :key="item.id"
                accordion-item
                :title="item.vehiculo_dominio + ' - ' + formatoFecha2(item.created_at)">
                <f7-accordion-content>
                  <f7-block>
                    <f7-card>
                      <f7-card-content class="content-custom">
                        <div class="data-table">
                          <table>
                            <tbody>

                              <tr>
                                <td class="titulo-cell-perfil">Código Servicio:</td>
                                <td v-if="item.servicio.length > 0" class="descripcion-cell-perfil">
                                  {{ item.servicio[0].codigo_servicio }}
                                </td>
                              </tr>
                              <tr>
                                <td class="titulo-cell-perfil">Dominio:</td>
                                <td class="descripcion-cell-perfil">{{ item.vehiculo_dominio }}</td>
                              </tr>
                              <tr>
                                <td class="titulo-cell-perfil">Contacto:</td>
                                <td class="descripcion-cell-perfil">{{ item.celular_contacto }}</td>
                              </tr>
                              <tr v-show="false">
                                <td class="titulo-cell-perfil">Origen:</td>
                                <td class="descripcion-cell-perfil">{{ item.origen_localidad }}</td>
                              </tr>
                              <tr>
                                <td class="titulo-cell-perfil">Destino:</td>
                                <td class="descripcion-cell-perfil">{{ item.destino_localidad }}</td>
                              </tr>
                              <tr>
                                <td class="titulo-cell-perfil">Estado:</td>
                                <td v-if="item.servicio.length === 0" class="descripcion-cell-perfil">
                                  <f7-chip v-if="!item.estado" :text="getNombreEstado('pending')" :color="getColorEstado('pending')"></f7-chip>
                                  <f7-chip v-if="item.estado" :text="getNombreEstado(item.estado)" :color="getColorEstado(item.estado)"></f7-chip>
                                </td>
                                <td v-else class="descripcion-cell-perfil">
                                  <f7-chip :text="getNombreEstado(item.servicio[0].estado)" :color="getColorEstado(item.servicio[0].estado)"></f7-chip>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </f7-card-content>
                    </f7-card>
                  </f7-block>
                </f7-accordion-content>
              </f7-list-item>
            </f7-list>
          </f7-card>
          <f7-card v-else class="perfil-grua">
            No se encontraron solicitudes de gruas
          </f7-card>
        </f7-block>
      </f7-tab>
    </f7-tabs>

    <f7-card class="cerrar-sesion-full">
      <f7-card-content>
        <f7-list inset>
          <f7-list-button href="#" title="Cerrar Sesión" color="red" @click="logout()" class="perfil-cambiar-contrasenia"></f7-list-button>
        </f7-list>
      </f7-card-content>
    </f7-card>

    <!-- Contacto -->
    <Contacto />

    <f7-popup :opened="modal.cambiar">
      <f7-page>
        <f7-navbar>
          <f7-nav-center sliding class="home-navbar">
            <img src="static/img/logo.png" class="home-navbar-img"/>
          </f7-nav-center>
        </f7-navbar>

        <f7-card class="perfil-popup-custom" title="CAMBIAR CONTRASEÑA" center>
          <f7-card-content :padding="true">
            <div class="item-input login-form-control custom-input item-input-field">
              <input class="input-pass-visible" v-model="cambiarForm.password_old" placeholder="Contraseña Actual" :type="formPass.type1" required>
              <a class="button-fill button button-pass-visible" @click="visiblePass(1)">
                <i class="icon material-icons">{{formPass.icon1}}</i>
              </a>
            </div>

            <div class="item-input login-form-control custom-input item-input-field">
              <input class="input-pass-visible" v-model="cambiarForm.password" placeholder="Nueva Contraseña" :type="formPass.type2" required>
              <a class="button-fill button button-pass-visible" @click="visiblePass(2)">
                <i class="icon material-icons">{{formPass.icon2}}</i>
              </a>
            </div>

            <div class="item-input login-form-control custom-input item-input-field">
              <input class="input-pass-visible" v-model="cambiarForm.confirm_password" placeholder="Confirmar Contraseña" :type="formPass.type3" required>
              <a class="button-fill button button-pass-visible" @click="visiblePass(3)">
                <i class="icon material-icons">{{formPass.icon3}}</i>
              </a>
            </div>
          </f7-card-content>

          <Preloader v-if="preloader" />
          <f7-card-footer v-else>
            <f7-button round class="login-boton-cerrar" @click="modal.cambiar = false">Cerrar</f7-button>
            <f7-button fill @click="cambiar()">
              <f7-icon material="autorenew"></f7-icon>
              Cambiar
            </f7-button>
          </f7-card-footer>
        </f7-card>

      </f7-page>
    </f7-popup>

  </f7-page>

</template>

<script>
import Vue from 'vue'
import Contacto from './../../components/inc/contacto'
import Auth from './../../components/helper/auth'
import Preloader from './../../components/inc/preloader'
import Grua from './../../components/helper/grua'
import Siniestro from './../../components/helper/siniestro'

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
      infoPersonal: null,
      preloader: false,
      opCerradas: null,
      siniestroHistorial: null,
      modal: {
        cambiar: false
      },
      cambiarForm: {
        password_old: '',
        password: '',
        confirm_password: ''
      },
      formPass: {
        type1: 'password',
        icon1: 'visibility',
        type2: 'password',
        icon2: 'visibility',
        type3: 'password',
        icon3: 'visibility'
      }
    }
  },
  mounted () {
    // backbutton
    this.cordova.on('backbutton', () => {
      if (this.modal.cambiar === false) {
        this.$f7.mainView.router.back()
      } else {
        this.modal.cambiar = false
      }
    })

    // info del asegurado
    this.infoPersonal = Auth.getInfoPersonalAsegurado()

    // pedidos historico de gruas
    this.getGruaHistorica()

    // predenuncias generadas desde el telfono
    this.getSiniestroHistorico()
  },
  destroyed () {
    this.modal.cambiar = false
  },
  methods: {
    logout () {
      this.$f7.confirm('¿Desea cerrar sesión?', 'Segurometal', () => {
        this.modal.cambiar = false
        Auth.removeSession()
        navigator.app.exitApp()
      })
    },
    abrirCambiar () {
      this.modal.cambiar = true
    },
    cambiar () {
      this.preloader = true

      if (this.cambiarForm.password !== this.cambiarForm.confirm_password) {
        this.$toasted.show('Las contraseñas no coinciden', {icon: 'error'})
        this.preloader = false
        return false
      }

      if (this.cambiarForm.password.length < 6) {
        this.$toasted.show('La contraseña no alcanza el minimo de 6 caracteres', {icon: 'error'})
        this.preloader = false
        return false
      }

      var result = Auth.cambiar(this.cambiarForm.password_old, this.cambiarForm.password)

      result.then((response) => {
        if (response.data.Errorcod === 200) {
          this.$f7.alert('La contraseña se modificó con éxito', 'Cambio de contraseña', () => {
            this.modal.cambiar = false
            // Auth.removeSession()
            // this.$f7.mainView.router.back()
          })
        } else {
          this.$toasted.show(response.data.Errormsg, {icon: 'error'})
        }
        this.preloader = false
      })
      .catch(() => {
        this.$toasted.show('Error desconocido', {icon: 'error'})
        this.preloader = false
      })
    },
    getGruaHistorica () {
      var result = Grua.cerradas()

      result.then((response) => {
        if (response.data.length > 0) {
          this.opCerradas = response.data
        } else {
          this.opCerradas = null
        }
      })
    },
    getSiniestroHistorico () {
      var result = Siniestro.historial()

      result.then((response) => {
        let data = JSON.parse(response.data.SiniestrosListarout)
        if (data.Siniestros.length > 0) {
          this.siniestroHistorial = data.Siniestros
        } else {
          this.siniestroHistorial = null
        }
      })
    },
    getNombreEstado (status) {
      return Grua.estadosTranslate(status).nombre
    },
    getColorEstado (status) {
      return Grua.estadosTranslate(status).color
    },
    visiblePass (item) {
      if (item === 1) {
        if (this.formPass.type1 === 'password') {
          this.formPass.type1 = 'text'
          this.formPass.icon1 = 'visibility_off'
        } else {
          this.formPass.type1 = 'password'
          this.formPass.icon1 = 'visibility'
        }
      }

      if (item === 2) {
        if (this.formPass.type2 === 'password') {
          this.formPass.type2 = 'text'
          this.formPass.icon2 = 'visibility_off'
        } else {
          this.formPass.type2 = 'password'
          this.formPass.icon2 = 'visibility'
        }
      }

      if (item === 3) {
        if (this.formPass.type3 === 'password') {
          this.formPass.type3 = 'text'
          this.formPass.icon3 = 'visibility_off'
        } else {
          this.formPass.type3 = 'password'
          this.formPass.icon3 = 'visibility'
        }
      }
    },
    getFormatDocumento () {
      var doc = ''
      if (this.infoPersonal.tipodoc === 'CUIT') {
        doc = this.infoPersonal.nrodoc.toString().substring(0, 2) + '-' + this.infoPersonal.nrodoc.toString().substring(2, 10) + '-' + this.infoPersonal.nrodoc.toString().substring(10)
      }

      if (this.infoPersonal.tipodoc === 'DNI') {
        doc = this.infoPersonal.nrodoc.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      }

      return this.infoPersonal.tipodoc + ' ' + doc
    },
    formatoFecha (fecha) {
      if (fecha) {
        return moment(fecha, 'DD/MM/YY').format('DD/MM/YYYY')
      }
    },
    formatoFecha2 (fecha) {
      if (fecha) {
        return moment(fecha, 'YYYY-MM-DD').format('DD/MM/YYYY')
      }
    },
    formatoPoliza (nro) {
      let strNro = nro.toString()
      return strNro.substring(strNro.length - 1, -1) + '/' + strNro.substring(strNro.length - 1)
    }
  }
}
</script>
<style>
  .custom-input input {
    -webkit-rtl-ordering: logical;
    cursor: text;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0em;
    font: 400 13.3333px Arial;
    -webkit-writing-mode: horizontal-tb !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    box-sizing: border-box;
    border: none;
    background: 0 0;
    border-radius: 0;
    box-shadow: none;
    display: block;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 36px;
    color: #212121;
    font-size: 16px;
    font-family: inherit;
    background: #fff;
    border-style: solid;
    border-width: 1px;
    padding: 10px;
    margin-bottom: 10px;
  }
  .perfil-popup-custom {
    margin-top: 70px;
    margin-left: 8px;
    margin-right: 8px;
    background: #ffffffbf;
  }
  .content-custom div {
    padding: 0px;
  }
  .titulo-cell-perfil {
    font-weight: bold;
    padding-left: 10px !important;
    padding-right: 10px !important;
    width: 40%;
    text-align: left !important;
  }
  .descripcion-cell-perfil {
    padding-left: 10px !important;
    padding-right: 10px !important;
    width: 60%;
    text-align: left !important;
  }
  .card-footer a.link, .card-header a.link {
    color: #0d1451;
  }
  .data-table tbody {
    font-size: 14px;
  }
  .data-table tbody td {
    height: 35px;
  }
  .perfil-cambiar-contrasenia {
    text-align: center;
  }
  .perfil-siniestro {
    padding: 50px;
    text-align: center;
    font-size: 25px;
    background-color: rgba(13, 20, 81, 0.71);
    color: #fff
  }
  .perfil-grua {
    padding: 50px;
    text-align: center;
    font-size: 25px;
    background-color: rgba(13, 20, 81, 0.71);
    color: #fff
  }
  .color-green .chip-label {
    color: #4caf50 !important;
  }
  .color-red .chip-label {
    color: #f44336 !important;
  }
  .color-orange .chip-label {
    color: #ff9800 !important;
  }
  .input-pass-visible {
    width: 90% !important;
    float: left !important;
  }
  .button-pass-visible {
    width: 10% !important;
    min-width: auto !important;
    margin-bottom: 10px !important;
  }
  .cerrar-sesion-full {
    margin: 15px;
  }
</style>
