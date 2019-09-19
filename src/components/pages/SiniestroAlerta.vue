<template>
  <!-- Page -->
  <f7-page>

    <!-- Navbar -->
    <f7-navbar>
      <f7-nav-left >

      </f7-nav-left>
      <f7-nav-center sliding class="home-navbar">
        <img src="static/img/logo.png" class="home-navbar-img"/>
      </f7-nav-center>
      <f7-nav-right>

      </f7-nav-right>
    </f7-navbar>

    <!-- Lista de Cupones -->
    <f7-card class="home-card-custom" title="Siniestro" center>
      <f7-card-content :padding="true">
        <f7-block>

          <f7-grid>
            <f7-col class="custom-mensaje-siniestro">
              Sr. Asegurado, tenga en cuenta que para completar el trámite deberá realizar
              denuncia formal ante aseguradora o productor de seguros, con firma al pie, adjuntando
              registro de conducir habilitante.
            </f7-col>
          </f7-grid>

        </f7-block>
      </f7-card-content>
      <f7-card-footer>
        <f7-button fill @click="getView('home')" class="custom-boton-fill">
          <f7-icon material="home"></f7-icon>
          Inicio
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
import {EventBus} from './../../components/helper/event-bus'

export default {
  components: {
    Contacto
  },
  data () {
    return {
      cordova: Vue.cordova
    }
  },
  mounted () {
    // backbutton
    this.cordova.on('backbutton', () => {
      this.getView('home')
    })
  },
  methods: {
    checkLogin () {
      var token = Auth.getSession()

      if (token) {
        return true
      } else {
        return false
      }
    },
    getView (vista) {
      if (vista === 'home') {
        if (this.checkLogin()) {
          this.$f7.mainView.router.back()
          EventBus.$emit('Siniestro:Back')
        } else {
          this.$f7.mainView.router.load({url: '/'})
        }
      }
    }
  }
}
</script>
<style>
  .custom-mensaje-siniestro {
    color: red;
    font-size: 18px;
    text-align: center;
    font-weight: 600;
    padding: 20px;
    line-height: 30px;
  }
</style>
