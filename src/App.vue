<template>

  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through main>

        <f7-pages>
          <f7-page>

            <!-- Navbar -->
            <f7-navbar>
              <f7-nav-left class="home_navbar_button"> </f7-nav-left>
              <f7-nav-center sliding class="home-navbar">
                <img src="static/img/logo.png" class="home-navbar-img"/>
              </f7-nav-center>
              <f7-nav-right>
                <f7-link @click="getView('perfil')">
                  <f7-icon material="person_outline"></f7-icon>
                </f7-link>
              </f7-nav-right>
            </f7-navbar>

            <!-- Botonera 1 -->
            <f7-block>
              <f7-grid>
                <f7-col width="50">
                  <f7-link class="home-boton-button button" @click="getView('vehiculos')">
                    <div class="row home-boton-row">
                      <div class="col-35">
                        <img src="static/img/vehiculo.svg" class="home-boton-img" />
                      </div>
                      <div class="col-65 home-boton-div">
                        <span>Mis</span><br>VEHÍCULOS
                      </div>
                    </div>
                  </f7-link>
                </f7-col>
                <f7-col width="50">
                  <f7-button class="home-boton-button button" @click="getView('polizas')">
                    <div class="row home-boton-row">
                      <div class="col-35">
                        <img src="static/img/poliza.svg" class="home-boton-img" />
                      </div>
                      <div class="col-65 home-boton-div">
                        <span>Mis</span><br>PÓLIZAS
                      </div>
                    </div>
                  </f7-button>
                </f7-col>
              </f7-grid>
            </f7-block>

            <!-- Botonera 2 -->
            <f7-block>
              <f7-grid>
                <f7-col width="50">
                  <f7-button class="home-boton-button button" @click="getView('siniestro')">
                    <div class="row home-boton-row">
                      <div class="col-35">
                        <img src="static/img/siniestro.svg" class="home-boton-img" />
                      </div>
                      <div class="col-65 home-boton-div">
                        <span>Informar un </span><br>SINIESTRO
                      </div>
                    </div>
                  </f7-button>
                </f7-col>
                <f7-col width="50">
                  <f7-button class="home-boton-button button" @click="getView('grua')">
                    <div class="row home-boton-row">
                      <div class="col-35">
                        <img src="static/img/grua.svg" class="home-boton-img" />
                      </div>
                      <div class="col-65 home-boton-div">
                        <span>Solicitar</span><br>GRUA
                      </div>
                    </div>
                  </f7-button>
                </f7-col>
              </f7-grid>
            </f7-block>

            <!-- Mas Info -->
            <f7-card class="home-card-custom" title="Datos Útiles" center>
              <f7-card-content :padding="true">
                <f7-list medial-list>

                  <f7-list-item
                    title="Qué hacer en caso de siniestro"
                    link="#"
                    @click="irWeb('siniestros')"
                  >
                    <img slot="media" src="static/img/info.svg" width="50"/>
                  </f7-list-item>

                  <f7-list-item
                    title="Opciones y Lugares de pago"
                    link="#"
                    @click="irWeb('medios')"
                  >
                    <img slot="media" src="static/img/medios.svg" width="50"/>
                  </f7-list-item>

                  <f7-list-item
                    title="Nuestros agentes"
                    link="#"
                    @click="irWeb('agentes')"
                  >
                    <img slot="media" src="static/img/prod.svg" width="50"/>
                  </f7-list-item>

                  <f7-list-item
                    title="¿Qué funciones tiene <br>esta App?"
                    link="#"
                    @click="irWeb('app')"
                  >
                    <img slot="media" src="static/img/infoapp.svg" width="50"/>
                  </f7-list-item>

                </f7-list>
              </f7-card-content>
            </f7-card>

            <!-- Contacto -->
            <Contacto />

          </f7-page>
        </f7-pages>

      </f7-view>
    </f7-views>

    <!-- Login Screen -->
    <f7-login-screen id="login-screen"  :opened="modal.login">
      <f7-view>
        <f7-pages>
          <f7-page login-screen>
            <f7-login-screen-title>
              <f7-navbar>
                <f7-nav-center sliding class="home-navbar">
                  <img src="static/img/logo.png" class="home-navbar-img"/>
                </f7-nav-center>
              </f7-navbar>
            </f7-login-screen-title>
            <f7-list form>
              <f7-card class="home-card-custom" title="INICIAR SESIÓN" center>
                <f7-card-content :padding="true">
                    <f7-input v-model="loginForm.user" placeholder="DNI / CUIT / USUARIO" type="text" class="login-form-control"></f7-input>

                    <div class="item-input login-form-control custom-input item-input-field">
                      <input class="input-pass-visible" v-model="loginForm.pass" placeholder="CONTRASEÑA" :type="formPass.type4" required>
                      <a class="button-fill button button-pass-visible" @click="visiblePass(4)">
                        <i class="icon material-icons">{{formPass.icon4}}</i>
                      </a>
                    </div>

                    <f7-link @click="abrirRecuperar()">Recuperar Contraseña</f7-link>
                </f7-card-content>

                <Preloader v-if="preloader" />
                <f7-card-footer v-else>
                  <div></div>
                  <f7-button fill @click="iniciar()">
                    <f7-icon material="lock_open"></f7-icon>
                    Iniciar
                  </f7-button>
                </f7-card-footer>

              </f7-card>

              <f7-card class="home-card-custom" center>
                <f7-card-content :padding="true">
                  <p class="login-crearusuario">
                    Si todavía no gestionó un acceso, siga los siguientes pasos<br>
                    <f7-link @click="abrirCrear()">Crear Acceso</f7-link>
                  </p>
                </f7-card-content>
              </f7-card>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-login-screen>

    <!-- Crear Screen -->
    <f7-login-screen id="crear-screen"  :opened="modal.crear">
      <f7-view>
        <f7-pages>
          <f7-page login-screen>
            <f7-login-screen-title>
              <f7-navbar>
                <f7-nav-center sliding class="home-navbar">
                  <img src="static/img/logo.png" class="home-navbar-img"/>
                </f7-nav-center>
              </f7-navbar>
            </f7-login-screen-title>
            <f7-list form>
              <f7-card class="home-card-custom" title="CREAR ACCESO" center>
                <f7-card-content :padding="true">
                  <f7-input v-model="altaForm.nrodoc" placeholder="Nro Documento" type="number" class="login-form-control"></f7-input>
                  <f7-input v-model="altaForm.nropoli" placeholder="Nro Póliza" type="number" class="login-form-control"></f7-input>
                  <f7-input v-model="altaForm.email" placeholder="Email" type="email" class="login-form-control"></f7-input>
                  <f7-input v-model="altaForm.telefono" placeholder="Teléfono (Ej: 3416909987)" type="number" class="login-form-control"></f7-input>

                  <f7-link @click="abrirLogin()">Iniciar Sesión</f7-link>
                </f7-card-content>

                <Preloader v-if="preloader" />
                <f7-card-footer v-else>
                  <div></div>
                  <f7-button fill @click="crear()">
                    <f7-icon material="person"></f7-icon>
                    Crear
                  </f7-button>
                </f7-card-footer>
              </f7-card>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-login-screen>

    <!-- Recuperar Screen -->
    <f7-login-screen id="recuperar-screen"  :opened="modal.recuperar">
      <f7-view>
        <f7-pages>
          <f7-page login-screen>
            <f7-login-screen-title>
              <f7-navbar>
                <f7-nav-center sliding class="home-navbar">
                  <img src="static/img/logo.png" class="home-navbar-img"/>
                </f7-nav-center>
              </f7-navbar>
            </f7-login-screen-title>
            <f7-list form>
              <f7-card class="home-card-custom" title="RECUPERAR ACCESO" center>
                <f7-card-content :padding="true">
                    <f7-input v-model="recoveryForm.user" placeholder="DNI / CUIT / USUARIO" type="text" class="login-form-control" required></f7-input>

                    <f7-link @click="abrirLogin()">Iniciar Sesión</f7-link>
                </f7-card-content>

                <Preloader v-if="preloader" />
                <f7-card-footer v-else>
                  <div></div>
                  <f7-button fill @click="recuperar()">
                    <f7-icon material="send"></f7-icon>
                    Recuperar
                  </f7-button>
                </f7-card-footer>
              </f7-card>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-login-screen>

    <!-- Cambiar Clave Screen -->
    <f7-login-screen id="cambiar-screen"  :opened="modal.cambiar">
      <f7-view>
        <f7-pages>
          <f7-page login-screen>
            <f7-login-screen-title>
              <f7-navbar>
                <f7-nav-center sliding class="home-navbar">
                  <img src="static/img/logo.png" class="home-navbar-img"/>
                </f7-nav-center>
              </f7-navbar>
            </f7-login-screen-title>
            <f7-list form>
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
                  <div></div>
                  <f7-button fill @click="cambiar()">
                    <f7-icon material="autorenew"></f7-icon>
                    Cambiar
                  </f7-button>
                </f7-card-footer>
              </f7-card>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-login-screen>
  </div>

</template>

<script>
import Vue from 'vue'
import Contacto from './components/inc/contacto'
import Auth from './components/helper/auth'
import Preloader from './components/inc/preloader'

export default {
  components: {
    Contacto,
    Preloader
  },
  data () {
    return {
      cordova: Vue.cordova,
      preloader: false,
      modal: {
        login: false,
        crear: false,
        recuperar: false,
        cambiar: false
      },
      loginForm: {
        user: '',
        pass: ''
      },
      altaForm: {
        nrodoc: '',
        nropoli: '',
        email: '',
        telefono: ''
      },
      recoveryForm: {
        // email: '',
        user: ''
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
        icon3: 'visibility',
        type4: 'password',
        icon4: 'visibility'
      }
    }
  },
  mounted () {
    this.cordova.on('backbutton', () => {
      if (this.modal.login === false && this.modal.crear === false && this.modal.recuperar === false && this.modal.cambiar === false) {
        if (this.$f7.mainView.url === '#null') {
          this.$f7.confirm('¿Quiere salir de la aplicación?', 'Salir', () => {
            navigator.app.exitApp()
          })
        }
      } else {
        if (this.checkLogin()) {
          this.modal.login = false
          this.modal.crear = false
          this.modal.recuperar = false
          this.modal.cambiar = false
        } else {
          if (this.$f7.mainView.url === '#null') {
            this.$f7.confirm('¿Quiere salir de la aplicación?', 'Salir', () => {
              navigator.app.exitApp()
            })
          }
        }
      }
    })

    if (this.checkLogin()) {
      this.$f7.mainView.router.load({url: '/'})
    } else {
      this.modal.login = true
    }
  },
  methods: {
    irWeb (destino) {
      /* eslint-disable */
      if (destino === 'medios') {
        cordova.InAppBrowser.open('https://www.segurometal.com/opciones-y-lugares-de-pago', '_self', 'location=no,zoom=no')
      }

      if (destino === 'siniestros') {
        cordova.InAppBrowser.open('https://www.segurometal.com/que-hacer', '_self', 'location=no,zoom=no')
      }

      if (destino === 'agentes') {
        cordova.InAppBrowser.open('https://www.segurometal.com/#agentes', '_self', 'location=no,zoom=no')
      }

      if (destino === 'app') {
        cordova.InAppBrowser.open('https://www.segurometal.com/aplicacion-movil', '_self', 'location=no,zoom=no')
      }
      /* eslint-enable */
    },
    getView (vista) {
      if (vista === 'perfil') {
        if (this.checkLogin()) {
          this.$f7.mainView.router.load({url: '/perfil/'})
        } else {
          this.modal.login = true
        }
      }

      if (vista === 'vehiculos') {
        if (this.checkLogin()) {
          this.$f7.mainView.router.load({url: '/vehiculos/'})
        } else {
          this.modal.login = true
        }
      }

      if (vista === 'polizas') {
        if (this.checkLogin()) {
          this.$f7.mainView.router.load({url: '/polizas/'})
        } else {
          this.modal.login = true
        }
      }

      if (vista === 'siniestro') {
        if (this.checkLogin()) {
          this.$f7.mainView.router.load({url: '/siniestro/'})
        } else {
          this.modal.login = true
        }
      }

      if (vista === 'grua') {
        if (this.checkLogin()) {
          this.$f7.mainView.router.load({url: '/grua/'})
        } else {
          this.modal.login = true
        }
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
    cerrarModal (modal) {
      if (modal === 'login') {
        this.modal.login = false
      }

      if (modal === 'crear') {
        this.modal.crear = false
      }

      if (modal === 'recuperar') {
        this.modal.recuperar = false
      }

      if (modal === 'cambiar') {
        this.modal.cambiar = false
      }
    },
    abrirLogin () {
      this.modal.login = true
      this.modal.recuperar = false
      this.modal.cambiar = false
      this.modal.crear = false
    },
    abrirCrear () {
      this.modal.login = false
      this.modal.recuperar = false
      this.modal.cambiar = false
      this.modal.crear = true
    },
    abrirRecuperar () {
      this.modal.login = false
      this.modal.crear = false
      this.modal.cambiar = false
      this.modal.recuperar = true
    },
    iniciar () {
      this.preloader = true

      let usuario = ''
      if (!isNaN(parseInt(this.loginForm.user))) {
        if (this.loginForm.user.length === 8) {
          usuario = 'DNI' + this.loginForm.user
        } else {
          if (this.loginForm.user.length === 11) {
            usuario = 'CUIT' + this.loginForm.user
          } else {
            this.$toasted.show('No coinciden la cantidad de caracteres con un CUIT o DNI', {icon: 'error'})
            this.preloader = false
            return false
          }
        }
      } else {
        usuario = this.loginForm.user
      }

      var result = Auth.login(usuario, this.loginForm.pass)

      result.then((response) => {
        let data = JSON.parse(response.data.Infousuario)

        if (data.Errorcod === 200) {
          Auth.setSession(data.Token)
          Auth.setInfoPersonalAsegurado(data.Nombre, data.Tipodocumento, data.Numerodocumento, data.Mail, data.Fechanacimiento, data.Telefono)
          this.modal.login = false
          this.modal.crear = false
          this.modal.recuperar = false
          this.modal.cambiar = false
        } else if (data.Errorcod === 202) {
          Auth.setSession(data.Token)
          Auth.setInfoPersonalAsegurado(data.Nombre, data.Tipodocumento, data.Numerodocumento, data.Mail, data.Fechanacimiento, data.Telefono)
          this.modal.login = false
          this.modal.crear = false
          this.modal.recuperar = false
          this.modal.cambiar = true
        } else {
          this.$toasted.show(data.Errormsg, {icon: 'error'})
        }
        this.preloader = false
      })
      .catch(() => {
        this.$toasted.show('Error desconocido', {icon: 'error'})
        this.preloader = false
      })
    },
    recuperar () {
      this.preloader = true

      let usuario = ''
      if (!isNaN(parseInt(this.recoveryForm.user))) {
        if (this.recoveryForm.user.length === 8) {
          usuario = 'DNI' + this.recoveryForm.user
        } else {
          if (this.recoveryForm.user.length === 11) {
            usuario = 'CUIT' + this.recoveryForm.user
          } else {
            this.$toasted.show('No coinciden la cantidad de caracteres con un CUIT o DNI', {icon: 'error'})
            this.preloader = false
            return false
          }
        }
      } else {
        usuario = this.recoveryForm.user
      }

      var result = Auth.recuperarByUsuario(usuario)

      result.then((response) => {
        let data = JSON.parse(response.data.olvidemiclavexusuout)
        this.$toasted.show(data.OlvideMiClaveDescripcion, {icon: 'info'})
        this.modal.login = true
        this.modal.crear = false
        this.modal.recuperar = false
        this.modal.cambiar = false
        this.preloader = false
      })
      .catch(() => {
        this.$toasted.show('Error desconocido', {icon: 'error'})
        this.preloader = false
      })
    },
    crear () {
      this.preloader = true

      /* eslint-disable */
      var expreg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
      if (!expreg.test(this.altaForm.email)) {
        this.$toasted.show('El email no posee un formato correcto', {icon: 'error'})
        this.preloader = false
        return false
      }
      /*eslint-enable */

      if (this.altaForm.nrodoc.length < 8) {
        this.$toasted.show('El nro de documento no posee un formato correcto', {icon: 'error'})
        this.preloader = false
        return false
      }
      if (this.altaForm.nropoli.length < 3) {
        this.$toasted.show('El nro de poliza no posee un formato correcto', {icon: 'error'})
        this.preloader = false
        return false
      }

      var result = Auth.crear(this.altaForm.nrodoc, this.altaForm.nropoli, this.altaForm.email, this.altaForm.telefono)

      result.then((response) => {
        this.$toasted.show(response.data.Errormsg, {icon: 'info'})
        this.modal.login = true
        this.modal.crear = false
        this.modal.recuperar = false
        this.modal.cambiar = false
        this.preloader = false
      })
      .catch(() => {
        this.$toasted.show('Error desconocido', {icon: 'error'})
        this.preloader = false
      })
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
            Auth.removeSession()
            this.modal.cambiar = false
            this.modal.login = true
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

      if (item === 4) {
        if (this.formPass.type4 === 'password') {
          this.formPass.type4 = 'text'
          this.formPass.icon4 = 'visibility_off'
        } else {
          this.formPass.type4 = 'password'
          this.formPass.icon4 = 'visibility'
        }
      }
    }
  }
}
</script>
<style>
  .input-pass-visible {
    width: 90% !important;
    float: left !important;
  }
  .button-pass-visible {
    width: 10% !important;
    min-width: auto !important;
    margin-bottom: 10px !important;
  }
</style>
