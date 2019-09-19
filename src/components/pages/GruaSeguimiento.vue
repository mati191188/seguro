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

    <!-- info de servicio -->
    <f7-card class="home-card-custom" center>
      <f7-card-header>
        ESTADOS DEL SERVICIO
        <f7-link @click="actionObtenerOperacionById()" class="grua-boton-refresh">
          <f7-icon material="refresh"></f7-icon>
        </f7-link>
      </f7-card-header>
      <f7-card-content class="content-custom">
        <Preloader v-if="preloader" />
        <div v-else class="data-table">
          <table v-if="this.operacion">
            <tbody>
              <tr>
                <td class="titulo-cell-perfil">Código Servicio:</td>
                <td v-if="this.servicio" class="descripcion-cell-perfil">
                  {{ this.servicio.codigo_servicio }}
                </td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Dominio:</td>
                <td class="descripcion-cell-perfil">{{ this.operacion[0].vehiculo_dominio }}</td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Contacto:</td>
                <td class="descripcion-cell-perfil">{{ this.operacion[0].celular_contacto }}</td>
              </tr>
              <tr v-show="false">
                <td class="titulo-cell-perfil">Origen:</td>
                <td class="descripcion-cell-perfil">{{ this.operacion[0].origen_localidad }}</td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Destino:</td>
                <td class="descripcion-cell-perfil">{{ this.operacion[0].destino_localidad }}</td>
              </tr>
              <tr>
                <td class="titulo-cell-perfil">Estado:</td>
                <td v-if="!this.servicio" class="descripcion-cell-perfil">
                  <f7-chip v-if="!this.operacion[0].estado" :text="getNombreEstado('pending')" :color="getColorEstado('pending')"></f7-chip>
                  <f7-chip v-if="this.operacion[0].estado" :text="getNombreEstado(this.operacion[0].estado)" :color="getColorEstado(this.operacion[0].estado)"></f7-chip>
                </td>
                <td v-else class="descripcion-cell-perfil">
                  <f7-chip :text="getNombreEstado(this.servicio.estado)" :color="getColorEstado(this.servicio.estado)"></f7-chip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </f7-card-content>
    </f7-card>

    <!-- seguimiento tiempo real grua -->
    <f7-card class="home-card-custom" center v-if="this.geoGrua.length > 0">
      <f7-card-header>
        SEGUIMIENTO DE GRUA
        <f7-link @click="actionObtenerOperacionById()" class="grua-boton-refresh">
          <f7-icon material="refresh"></f7-icon>
        </f7-link>
      </f7-card-header>
      <f7-card-content class="custom-mapa">
        <Preloader v-if="preloader" />
        <l-map
          v-else
          :options="options"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="markerLatLngDestino">
              <l-icon
                :icon-size="dynamicSize"
                :icon-anchor="dynamicAnchor"
                icon-url="static/img/pin-destino.png" >
              </l-icon>
            </l-marker>
            <l-marker :lat-lng="markerLatLngGruaInicio" >
              <l-icon
                :icon-size="dynamicSize"
                :icon-anchor="dynamicAnchor"
                icon-url="static/img/pin-home.png" >
              </l-icon>
            </l-marker>
            <l-marker :lat-lng="markerLatLngGruaFin" >
              <l-icon
                :icon-size="dynamicSize"
                :icon-anchor="dynamicAnchor"
                icon-url="static/img/pin-grua.png" >
              </l-icon>
            </l-marker>
            <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
        </l-map>
      </f7-card-content>
    </f7-card>

    <!-- Contacto -->
    <Contacto />

  </f7-page>
</template>

<script>
  import Vue from 'vue'
  import Contacto from './../../components/inc/contacto'
  import Preloader from './../../components/inc/preloader'
  import Grua from './../../components/helper/grua'
  import Auth from './../../components/helper/auth'
  import { LMap, LTileLayer, LMarker, LPolyline, LIcon } from 'vue2-leaflet'

  export default {
    components: {
      Contacto,
      Preloader,
      LMap,
      LTileLayer,
      LMarker,
      LPolyline,
      LIcon
    },
    data () {
      return {
        cordova: Vue.cordova,
        preloader: false,
        operacion: null,
        servicio: null,
        gruaID: null,
        geoGrua: [],
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        options: {zoomControl: false, zoomSnap: true},
        bounds: null,
        zoom: 13,
        // center: [-33.049767, -61.174171],
        center: [0, 0],
        markerLatLngDestino: [0, 0],
        markerLatLngGruaInicio: [0, 0],
        markerLatLngGruaFin: [0, 0],
        polyline: {
          latlngs: [],
          color: 'green'
        },
        iconSize: 25
      }
    },
    mounted () {
      // backbutton
      this.cordova.on('backbutton', () => {
        this.$f7.mainView.router.back()
      })

      // setear parametro grua ID
      this.gruaID = this.$route.params.gruaID

      // set operacion en curso
      this.actionObtenerOperacionById()

      setInterval(() => {
        this.actionObtenerOperacionById()
      }, 15000)

      // seteo de posición
      /* eslint-disable */
      cordova.plugins.diagnostic.isLocationEnabled( (result) => {
        if(!result) {
          this.$f7.alert("Para mejorar la experiencia del servicio, active el GPS", 'Seguimiento de grua')
        }
      })

      Vue.cordova.geolocation.getCurrentPosition((position) => {
        this.center = [position.coords.latitude, position.coords.longitude]
        this.markerLatLngDestino = [position.coords.latitude, position.coords.longitude]
      })
      /* eslint-enable */
    },
    computed: {
      dynamicSize () {
        return [this.iconSize, this.iconSize * 1.15]
      },
      dynamicAnchor () {
        return [this.iconSize / 2, this.iconSize * 1.15]
      }
    },
    methods: {
      actionObtenerOperacionById () {
        this.preloader = false
        var result = Grua.operacionById(this.gruaID)

        result.then((response) => {
          if (response.data.length > 0) {
            this.operacion = response.data

            if (response.data[0].servicio) {
              this.servicio = response.data[0].servicio

              if (response.data[0].servicio.servicio_movil.length > 0) {
                this.geoGrua = response.data[0].servicio.servicio_movil
                var lastReg = this.geoGrua.length - 1

                this.markerLatLngGruaInicio = [this.geoGrua[0].latitud, this.geoGrua[0].longitud]
                this.markerLatLngGruaFin = [this.geoGrua[lastReg].latitud, this.geoGrua[lastReg].longitud]

                let arrGeo = []
                this.geoGrua.forEach((element) => {
                  arrGeo.push([element.latitud, element.longitud])
                })
                this.polyline.latlngs = arrGeo
              }
            }
          } else {
            this.operacion = null
          }
          this.preloader = false
        })
        .catch(() => {
          this.$toasted.show('Error desconocido', {icon: 'error'})
          this.preloader = false
        })
      },
      zoomUpdated (zoom) {
        this.zoom = zoom
      },
      centerUpdated (center) {
        this.center = center
      },
      boundsUpdated (bounds) {
        this.bounds = bounds
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
  .content-custom div {
    padding: 0px;
  }
  .grua-boton-refresh {
    color: #fff !important;
    right: 0px !important;
    position: absolute !important;
    top: 7px !important;
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
  .custom-mapa .card-content-inner {
    padding: 0px;
    height: 350px;
  }
</style>
