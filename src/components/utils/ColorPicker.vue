<template>
  <colorPicker v-model="color" />
</template>

<script>
import vcolorpicker from 'vcolorpicker'
 export default {
    data () {
      return {
        name: "colorPicker",
        color: '#ff0000'
      }
    }
  }
</script>

<style>

</style>