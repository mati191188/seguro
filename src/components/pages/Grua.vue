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

    <!-- Gruas activas -->
    <f7-card v-show="opAbiertas" class="home-card-custom" center>
      <f7-card-header>
        SERVICIOS ACTIVOS
        <f7-link @click="actionObtenerOperacionesAbiertas()" class="grua-boton-refresh">
          <f7-icon material="refresh"></f7-icon>
        </f7-link>
      </f7-card-header>
      <f7-card-content :padding="true">
        <Preloader v-if="preloader_1" />
        <div v-else class="data-table">
          <table>
            <tbody>
              <tr>
                <td class="titulo-cell" style="width: 20%">DOMINIO</td>
                <td class="titulo-cell" style="width: 35%">ESTADO</td>
                <td class="titulo-cell" style="width: 15%">SEGUIMIENTO</td>
              </tr>
              <tr v-for="item in opAbiertas" :key="item.id">
                <td class="descripcion-cell" style="width: 33%">{{ item.vehiculo_dominio }}</td>
                <td v-if="item.servicio.length === 0" class="descripcion-cell" style="width: 33%">
                  <f7-chip v-if="!item.estado" :text="getNombreEstado('pending')" :color="getColorEstado('pending')"></f7-chip>
                  <f7-chip v-if="item.estado" :text="getNombreEstado(item.estado)" :color="getColorEstado(item.estado)"></f7-chip>
                </td>
                <td v-else class="descripcion-cell" style="width: 33%">
                  <f7-chip :text="getNombreEstado(item.servicio[0].estado)" :color="getColorEstado(item.servicio[0].estado)"></f7-chip>
                </td>
                <td class="descripcion-cell" style="width: 33%">
                  <f7-link @click="irSeguimiento(item.id)">
                    <f7-icon material="arrow_forward"></f7-icon>
                  </f7-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </f7-card-content>
    </f7-card>

    <!-- Solicitud de gruas -->
    <f7-card class="home-card-custom" title="SOLICITAR GRUA" center>
      <f7-card-content :padding="true">

        <div class="login-form-control custom-input">
          <label>Domino:  <small>(a transportar en la grua)</small></label>
          <select v-model="form.dominio">
            <option v-for="item in infoRiesgos" :key="item.id" :value="item.InfoAseRiesgoId">
              {{item.InfoAseRiesgoId + ' - ' + item.InfoAseRiesgoDescripcion}}
            </option>
          </select>
        </div>
        <label>Celular:  <small>(donde podamos contactarlo en este momento)</small></label>
        <div class="item-input login-form-control custom-input item-input-field">
          <input v-model="form.celular" placeholder="Ej: 3416909987" type="number" />
        </div>

        <label v-show="false">Origen:  <small>(localidad mas cercana donde este en este momento)</small></label>
        <f7-input v-show="false" v-model="form.origen" type="text" class="login-form-control custom-input"></f7-input>

        <label>Localidad destino:  <small>(localidad donde tenemos que llevarlo)</small></label>
        <f7-input v-model="form.destino" type="text" class="login-form-control custom-input"></f7-input>

      </f7-card-content>


      <Preloader v-if="preloader" />
      <f7-card-footer v-else>
        <f7-button fill @click="solicitar()" class="custom-boton-fill">
          <f7-icon material="assignment_turned_in"></f7-icon>
          Solicitar
        </f7-button>
      </f7-card-footer>
    </f7-card>

    <!-- Contacto -->
    <Contacto />

  </f7-page>
</template>

<script>
  import Vue from 'vue'
  import Contacto from './../../components/inc/contacto'
  import Preloader from './../../components/inc/preloader'
  import Auth from './../../components/helper/auth'
  import Grua from './../../components/helper/grua'

  export default {
    components: {
      Contacto,
      Preloader
    },
    data () {
      return {
        cordova: Vue.cordova,
        preloader: false,
        preloader_1: false,
        infoRiesgos: null,
        infoPersonal: null,
        opAbiertas: null,
        position: {
          lat: 0,
          lng: 0
        },
        form: {
          dominio: '',
          celular: '',
          origen: '',
          destino: ''
        }
      }
    },
    mounted () {
      // backbutton
      this.cordova.on('backbutton', () => {
        this.$f7.mainView.router.back()
      })

      // carga de dominios
      this.actionObtenerDominios()

      // carga de info personal
      this.infoPersonal = Auth.getInfoPersonalAsegurado()

      // obtener operaciones abiertas
      this.actionObtenerOperacionesAbiertas()

      // seteo el nro de telefono
      this.cordova.on('deviceready', () => {
        window.plugins.sim.requestReadPermission(() => {
          window.plugins.sim.getSimInfo((result) => {
            if (result.phoneNumber.length > 0) {
              this.form.celular = result.phoneNumber
            }
          })
        })
      })
      if (this.form.celular === '') {
        this.form.celular = this.infoPersonal.telefono
      }

      // seteo de posición
      /* eslint-disable */
      cordova.plugins.diagnostic.isLocationEnabled( (result) => {
        if(!result) {
          this.$f7.alert("Para mejorar la experiencia del servicio, active el GPS", 'Solicitud de grua')
        }
      })
      Vue.cordova.geolocation.getCurrentPosition((position) => {
        this.position.lat = position.coords.latitude
        this.position.lng = position.coords.longitude
      })
      /* eslint-enable */
    },
    methods: {
      solicitar () {
        this.$f7.confirm('¿Confirmar Grua?', 'Solicitud de grua', () => {
          if (this.form.celular.length !== 10) {
            this.$toasted.show('El telefono no puede tener menos de 10 dígitos', {icon: 'error'})
            this.preloader = false
            return false
          }

          if (this.form.dominio.length === 0) {
            this.$toasted.show('El dominio no fue cargado', {icon: 'error'})
            this.preloader = false
            return false
          }

          this.actionSolicitar()
        })
      },
      actionSolicitar () {
        this.preloader = true

        let username = this.infoPersonal.tipodoc + this.infoPersonal.nrodoc

        let latitud = this.position.lat
        if (this.position.lat === null) {
          latitud = 0
        }

        let longitud = this.position.lng
        if (this.position.lng === null) {
          longitud = 0
        }

        var result = Grua.solicitar(this.form.dominio,
                                    this.form.celular,
                                    this.infoPersonal.nrodoc,
                                    username,
                                    latitud,
                                    longitud,
                                    this.form.origen,
                                    this.form.destino)

        result.then((response) => {
          if (response.data.status === 'ok') {
            this.actionObtenerOperacionesAbiertas()
          } else {
            this.$toasted.show(response.data.msj, {icon: 'error'})
          }
          this.preloader = false
        })
        .catch(() => {
          this.$toasted.show('Error desconocido', {icon: 'error'})
          this.preloader = false
        })
      },
      actionObtenerDominios () {
        this.preloader = true
        var result = Auth.getInfoAsegurado()

        result.then((response) => {
          var data = JSON.parse(response.data.Infoasegurado)
          if (data.InfoAseCodigo === 200) {
            var infoRiesgos = []
            data.Riesgos.forEach(function (riesgo) {
              if (riesgo.InfoAseRiesgoSOS === 'S') {
                infoRiesgos.push(riesgo)
              }
            })
            this.infoRiesgos = infoRiesgos

            if (this.infoRiesgos.length === 1) {
              this.form.dominio = this.infoRiesgos[0].InfoAseRiesgoId
            }
          } else {
            this.$toasted.show(data.InfoAseDescripcion, {icon: 'error'})
            Auth.removeSession()
            this.$f7.mainView.router.back()
          }
          this.preloader = false
        })
        .catch(() => {
          this.$toasted.show('Error desconocido', {icon: 'error'})
          this.preloader = false
        })
      },
      actionObtenerOperacionesAbiertas () {
        this.preloader_1 = true
        var result = Grua.abiertas()

        result.then((response) => {
          if (response.data.length > 0) {
            this.opAbiertas = response.data
          } else {
            this.opAbiertas = null
          }
          this.preloader_1 = false
        })
        .catch(() => {
          this.$toasted.show('Error desconocido', {icon: 'error'})
          this.preloader_1 = false
        })
      },
      irSeguimiento (id) {
        if (this.checkLogin()) {
          this.$f7.mainView.router.load({url: '/grua/' + id})
        } else {
          this.$f7.mainView.router.load({url: '/'})
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
      },
      getNombreEstado (status) {
        return Grua.estadosTranslate(status).nombre
      },
      getColorEstado (status) {
        return Grua.estadosTranslate(status).color
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
  .custom-input select {
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
    height: 40px;
    color: #212121;
    font-size: 16px;
    font-family: inherit;
    background: #fff;
    border-style: solid;
    border-width: 1px;
    padding: 10px;
    margin-bottom: 10px;
  }
  .custom-input option {
    color: #212121;
    font-size: 16px;
  }
  label{
    font-weight: bold;
    font-size: 15px;
  }
  label small {
    font-weight: 100;
    font-size: 10px;
  }
  .content-custom div {
    padding: 0px;
  }
  .titulo-cell {
    font-weight: bold;
    padding-left: 10px !important;
    padding-right: 10px !important;
    text-align: center !important;
  }
  .descripcion-cell {
    padding-left: 10px !important;
    padding-right: 10px !important;
    text-align: center !important;
  }
  .data-table tbody {
    font-size: 14px;
  }
  .data-table tbody td {
    height: 35px;
  }
  .grua-boton-refresh {
    color: #fff !important;
    right: 0px !important;
    position: absolute !important;
    top: 7px !important;
  }
  .custom-boton-fill {
    margin-bottom: 10px;
    width: 100%;
  }
</style>
