<template>
  <div class="columns is-mobile is-centered">
    <div class="column is-half">
      <Pomodoro />
    </div>
  </div>
</template>

<script>
import Pomodoro from '../components/Pomodoro.vue'

export default {
  name: 'home',
  components: {
    Pomodoro
  }
}
</script>


