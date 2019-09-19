// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCordova from 'vue-cordova'

// Import F7
/* eslint-disable no-unused-vars */
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
/* eslint-disable no-unused-vars
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
*/

// OR for Material Theme:
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'

// Import App Custom Styles
import AppStyles from '../static/css/app.css'

// Import Icons
import FontsAwesomeIcons from '../static/css/fontawesome-icons.css'
import MaterialIcons from '../static/css/material-icons.css'

// Import Routes
import Routes from './routes.js'

import App from './App'

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// Init Cordova Vue
Vue.use(VueCordova)

// Moment
import moment from 'moment'
Vue.prototype.moment = moment

// ###################################
// Mapa OPEN STREEP MAPS
import { LMap, LTileLayer, LMarker, LPolyline, LIcon } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-polyline', LPolyline)
Vue.component('l-icon', LIcon)

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
// ###################################

// ###################################
// Toast notification
import Toasted from 'vue-toasted'
Vue.use(Toasted, {duration: 5000, position: 'bottom-right', iconPack: 'material', theme: 'toasted-primary'})
// ###################################

/* eslint-disable no-new */
// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    material: true,
    routes: Routes,
    view: {
      pushState: true
    }
  },
  // Register App Component
  components: {
    app: App
  }
})
