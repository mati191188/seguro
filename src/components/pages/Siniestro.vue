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

    <f7-card class="home-card-custom" center>
      <f7-card-header>
        Informar un Siniestro
      </f7-card-header>
      <f7-card-content :padding="true">
        <div class="row" no-gap>
          <f7-col width="100">
            <div class="login-form-control custom-input">
              <label>Dominio:  <small>(involucrado en el siniestro)</small></label>
              <select v-model="form.dominio">
                <option v-for="item in infoRiesgos" :key="item.id" :value="item.InfoAseRiesgoId">
                  {{item.InfoAseRiesgoId + ' - ' + item.InfoAseRiesgoDescripcion}}
                </option>
              </select>
            </div>
          </f7-col>
          <f7-col width="100">
            <label>Fecha Hora:  <small>(exacta del siniestro)</small></label>
          </f7-col>
          <f7-col width="50">
            <f7-input v-model="form.fecha" type="date" class="login-form-control custom-input"></f7-input>
          </f7-col>
          <f7-col width="50">
            <f7-input v-model="form.hora" type="time" class="login-form-control custom-input"></f7-input>
          </f7-col>
          <f7-col width="100">
            <label>Fotos:  <small>(toma fotos de los detalles del siniestro)</small></label>
             <div class="row" no-gap>
              <f7-col width="33">
                <f7-link @click="tomarFoto(1)" link="#">
                  <img :src="form.fotos.toma1" class="fotos-galeria-siniestro">
                </f7-link>
              </f7-col>
              <f7-col width="33">
                <f7-link @click="tomarFoto(2)" link="#">
                  <img :src="form.fotos.toma2" class="fotos-galeria-siniestro">
                </f7-link>
              </f7-col>
              <f7-col width="33">
                <f7-link @click="tomarFoto(3)" link="#">
                  <img :src="form.fotos.toma3" class="fotos-galeria-siniestro">
                </f7-link>
              </f7-col>
              <f7-col width="33">
                <f7-link @click="tomarFoto(4)" link="#">
                  <img :src="form.fotos.toma4" class="fotos-galeria-siniestro">
                </f7-link>
              </f7-col>
              <f7-col width="33">
                <f7-link @click="tomarFoto(5)" link="#">
                  <img :src="form.fotos.toma5" class="fotos-galeria-siniestro">
                </f7-link>
              </f7-col>
              <f7-col width="33">
                <f7-link @click="tomarFoto(6)" link="#">
                  <img :src="form.fotos.toma6" class="fotos-galeria-siniestro">
                </f7-link>
              </f7-col>
            </div>
          </f7-col>
          <f7-col width="100">
            <label>Contanos:  <small>(escribí y/o grabá los hechos del siniestro)</small></label>
            <f7-input v-model="form.descripcion" type="textarea" class="login-form-control custom-input"></f7-input>
          </f7-col>
          <f7-col width="50">
            <f7-button class="custom-boton-audio" @click="grabar()" v-if="!statusRecord">
              <f7-icon material="mic"></f7-icon> Grabar
            </f7-button>
            <f7-button class="custom-boton-audio" @click="pararGrabar()" v-if="statusRecord">
              <f7-icon material="mic_off"></f7-icon>
              Parar
            </f7-button>
            <div class="chip chip-outline color-red" v-if="statusRecord">
              <div class="chip-label">
                <f7-icon material="record_voice_over"></f7-icon>
                 Grabando ...
              </div>
            </div>
          </f7-col>
          <f7-col width="50">
            <f7-button class="custom-boton-audio" @click="escucharAudio()" v-if="!statusAudio && statusEndRecord && this.form.audio">
              <f7-icon material="play_arrow"></f7-icon>
              Escuchar
            </f7-button>
            <f7-button class="custom-boton-audio" @click="pararAudio()" v-if="statusAudio && this.form.audio">
              <f7-icon material="stop"></f7-icon>
              Parar
            </f7-button>
          </f7-col>
          <f7-col width="100">
            <hr class="division-bloques-custom">
          </f7-col>
          <f7-col width="100">
            <label>Datos de terceros:  <small>(tome las siguientes fotos)</small></label>
             <div class="row" no-gap>
              <f7-col width="33">
                <f7-link @click="tomarFoto(7)" link="#">
                  <img :src="form.fotos.toma7" class="fotos-galeria-siniestro">
                </f7-link>
              </f7-col>
              <f7-col width="33">
                <f7-link @click="tomarFoto(8)" link="#">
                  <img :src="form.fotos.toma8" class="fotos-galeria-siniestro">
                </f7-link>
              </f7-col>
              <f7-col width="33">
                <f7-link @click="tomarFoto(9)" link="#">
                  <img :src="form.fotos.toma9" class="fotos-galeria-siniestro">
                </f7-link>
              </f7-col>
            </div>
          </f7-col>
          <f7-col width="100">
            <label>Adicional:  <small>(info adicional del tercero)</small></label>
            <f7-input v-model="form.descripcion_terceros" type="textarea" class="login-form-control custom-input"></f7-input>
          </f7-col>
        </div>
      </f7-card-content>
      <Preloader v-if="preloader" />
      <f7-card-footer v-else>
        <f7-button fill @click="enviar()" class="custom-boton-fill">
          <f7-icon material="send"></f7-icon>
          Enviar
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
import Auth from './../../components/helper/auth'
import Preloader from './../../components/inc/preloader'
import Siniestro from './../../components/helper/siniestro'
import {EventBus} from './../../components/helper/event-bus'

/* eslint-disable */
import moment from 'moment'
import { setTimeout } from 'timers';
/* eslint-enable */

export default {
  components: {
    Contacto,
    Preloader
  },
  data () {
    return {
      cordova: Vue.cordova,
      preloader: false,
      infoRiesgos: null,
      statusRecord: false,
      statusEndRecord: false,
      statusAudio: false,
      form: {
        dominio: '',
        operacion: 0,
        suplemento: 0,
        componente: 0,
        fecha: moment().format('YYYY-MM-DD'),
        hora: moment().format('HH:mm'),
        audio: null,
        audio_tmp: null,
        descripcion: '',
        fotos: {
          toma1: 'static/img/images.png',
          toma2: 'static/img/images.png',
          toma3: 'static/img/images.png',
          toma4: 'static/img/images.png',
          toma5: 'static/img/images.png',
          toma6: 'static/img/images.png',
          toma7: 'static/img/images_dni.png',
          toma8: 'static/img/images_tarjeta_azul.png',
          toma9: 'static/img/images_poliza_seguro.png'
        },
        descripcion_terceros: ''
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
  },
  created () {
    EventBus.$on('Siniestro:Back', () => {
      this.preloader = true
      this.$toasted.show('Finalizando', {icon: 'info'})
      setTimeout(() => {
        this.$f7.mainView.router.back()
      }, 1000)
    })
  },
  methods: {
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
    tomarFoto (id) {
      /* eslint-disable */
      this.cordova.on('deviceready', () => {
        navigator.camera.getPicture((imageData) => {
          if (id === 1) {
            this.form.fotos.toma1 = 'data:image/jpeg;base64,' + imageData
          }

          if (id === 2) {
            this.form.fotos.toma2 = 'data:image/jpeg;base64,' + imageData
          }

          if (id === 3) {
            this.form.fotos.toma3 = 'data:image/jpeg;base64,' + imageData
          }

          if (id === 4) {
            this.form.fotos.toma4 = 'data:image/jpeg;base64,' + imageData
          }

          if (id === 5) {
            this.form.fotos.toma5 = 'data:image/jpeg;base64,' + imageData
          }

          if (id === 6) {
            this.form.fotos.toma6 = 'data:image/jpeg;base64,' + imageData
          }

          if (id === 7) {
            this.form.fotos.toma7 = 'data:image/jpeg;base64,' + imageData
          }

          if (id === 8) {
            this.form.fotos.toma8 = 'data:image/jpeg;base64,' + imageData
          }

          if (id === 9) {
            this.form.fotos.toma9 = 'data:image/jpeg;base64,' + imageData
          }
        }, () => {
          this.$toasted.show('Error al capturar la imagen', {icon: 'error'})
        }, {
          quality: 15,
          destinationType: Camera.DestinationType.DATA_URL
        })
      })
      /* eslint-enable */
    },
    grabar () {
      /* eslint-disable */
      this.cordova.on('deviceready', () => {
        var nameFile = 'siniestro_sm.mp3'
        this.form.audio = new Media(nameFile)
        this.form.audio.startRecord()
        this.statusRecord = true
        this.statusEndRecord = false
      })
      /* eslint-enable */
    },
    pararGrabar () {
      /* eslint-disable */
      this.cordova.on('deviceready', () => {
        this.form.audio.stopRecord()
        this.statusRecord = false
        this.statusEndRecord = true

        this.cargarAudio()
      })
      /* eslint-enable */
    },
    escucharAudio () {
      /* eslint-disable */
      this.cordova.on('deviceready', () => {
        var nameFile = 'siniestro_sm.mp3'

        this.form.audio_tmp = new Media(nameFile, null, null, (mediaStatus) => {
          if (mediaStatus === Media.MEDIA_STOPPED) {
            this.statusAudio = false
          }
        })
        this.form.audio_tmp.play()

        this.statusAudio = true
      })
      /* eslint-enable */
    },
    pararAudio () {
      /* eslint-disable */
      this.cordova.on('deviceready', () => {
        this.form.audio_tmp.stop()
        this.form.audio_tmp.release()
        this.statusAudio = false
      })
      /* eslint-enable */
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
    enviar () {
      this.$f7.confirm('¿Enviar predenuncia de siniestro?', 'Informar un siniestro', () => {
        if (this.form.dominio.length === 0) {
          this.$toasted.show('El dominio no esta cargado', {icon: 'error'})
          this.preloader = false
          return false
        }

        if (this.form.fecha.length === 0) {
          this.$toasted.show('La fecha no fue cargada', {icon: 'error'})
          this.preloader = false
          return false
        }

        if (this.form.hora.length === 0) {
          this.$toasted.show('La hora no fue cargada', {icon: 'error'})
          this.preloader = false
          return false
        }

        this.setearDatosIdentificacion()
        // this.cargarAudio()
        this.actionEnviar()
        this.eliminarFile()
      })
    },
    actionEnviar () {
      this.preloader = true
      this.form.audio = window.localStorage.getItem('segurometal-siniestro-audio')

      var result = Siniestro.enviar(this.form)
      result.then((response) => {
        this.$toasted.show('Predenuncia realizada', {icon: 'info'})
        this.$f7.mainView.router.load({url: '/siniestro/alerta/'})
        this.preloader = false
      })
      .catch(() => {
        this.$toasted.show('Error desconocido', {icon: 'error'})
        this.preloader = false
      })
    },
    cargarAudio () {
      /* eslint-disable */
      window.resolveLocalFileSystemURL('file:///storage/emulated/0/siniestro_sm.mp3', function (entry) {
        entry.file(function(file) {
          var reader = new FileReader()
          reader.onload = function(e) {
            var content = e.target.result
            window.localStorage.removeItem('segurometal-siniestro-audio')
            window.localStorage.setItem('segurometal-siniestro-audio', content)
          }
          reader.readAsDataURL(file)
        })
      })
      /* eslint-enable */
    },
    eliminarFile () {
      /* eslint-disable */
      window.resolveLocalFileSystemURL('file:///storage/emulated/0/', function (entry) {
        entry.getFile('siniestro_sm.mp3', {create:false}, function(fileEntry) {
          fileEntry.remove(function(){
          },function(error){
          },function(){
          })
        })
      })
      /* eslint-enable */
    },
    setearDatosIdentificacion () {
      this.infoRiesgos.forEach((riesgo) => {
        if (riesgo.InfoAseRiesgoId === this.form.dominio) {
          this.form.operacion = riesgo.InfoAseRiesgoOperacion
          this.form.suplemento = riesgo.InfoAseRiesgoSuplemento
          this.form.componente = riesgo.InfoAseRiesgoComponente
        }
      })
    }
  }
}
</script>
<style>
  .perfil-siniestro {
    padding: 50px;
    text-align: center;
    font-size: 25px;
    background-color: rgba(13, 20, 81, 0.71);
    color: #fff
  }
  .custom-input textarea {
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
    height: 72px;
    color: #212121;
    font-size: 16px;
    font-family: inherit;
    background: #fff;
    border-style: solid;
    border-width: 1px;
    padding: 10px;
    margin-bottom: 10px;
  }
  .custom-boton-fill {
    margin-bottom: 10px;
    width: 100%;
  }
  .fotos-galeria-siniestro {
    width: 100%;
  }
  .custom-boton-audio {
    border-style: solid;
    border-width: 2px;
    border-color: #0d1451;
    margin-bottom: 10px;
  }
  .division-bloque-custom {
    margin-bottom: 20px;
    margin-top: 20px;
  }
</style>

