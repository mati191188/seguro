<template>
  <f7-fab-speed-dial>
    <f7-fab-actions class="inc-button-contacto-items">
      <f7-fab-action class="home-icon-fb-contacto" @click="irContacto('fb')">
        <i class="fab fa-facebook"></i>
      </f7-fab-action>
      <f7-fab-action class="home-icon-in-contacto" @click="irContacto('in')">
        <i class="fab fa-instagram"></i>
      </f7-fab-action>
      <f7-fab-action class="home-icon-mail-contacto" @click="irContacto('mail')">
        <i class="fas fa-envelope-open-text"></i>
      </f7-fab-action>
      <f7-fab-action class="home-icon-phone-contacto" @click="irContacto('phone')">
        <i class="fas fa-mobile-alt"></i>
      </f7-fab-action>
    </f7-fab-actions>
    <f7-fab class="inc-button-contacto">
      <f7-icon material="question_answer"></f7-icon>
      <f7-icon material="close"></f7-icon>
    </f7-fab>
  </f7-fab-speed-dial>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    irContacto (destino) {
      if (destino === 'mail') {
        window.location.href = 'mailto:contacto@segurometal.com'
      }

      if (destino === 'phone') {
        window.location.href = 'tel:03414229100'
      }

      if (destino === 'fb') {
        window.location.href = 'https://www.facebook.com/Segurometal/'
      }

      if (destino === 'in') {
        window.location.href = 'https://www.instagram.com/segurometal/'
      }
    }
  }
}
</script>
