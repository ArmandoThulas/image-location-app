<template>
  <Home />
</template>

<script>
import Home from '@/components/Home.vue'

export default {
  name: 'App',
  data(){
    return {
      venues: [],
        showVenues: false,
        venue: ''
    }
  },
  components: {
    Home,
  }
}
</script>