<template>
  <nav class="navbar fixed-top navbar-expand-lg"  v-bind:class="{'navbar-transparent navbar-color-on-scroll': !this.$root.showVenues }" color-on-scroll="100" id="sectionsNav">
    <div class="container">
      <div class="navbar-translate">
        <a class="navbar-brand" href="./">
          Image Location App </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="sr-only">Toggle navigation</span>
          <span class="navbar-toggler-icon"></span>
          <span class="navbar-toggler-icon"></span>
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
            <li v-if="this.$root.showVenues" class="nav-item">
                <a @click="toggleSearch" class="nav-link" rel="tooltip" title="" data-placement="bottom" href="#" data-original-title="Search for a venue" >
                <i class="fa fa-search"></i>
                </a>
            </li>
        </ul>
      </div>
    </div>
  </nav>
  <div v-if="!this.$root.showVenues" class="page-header header-filter clear-filter purple-filter" data-parallax="true" style="background-image: url('./assets/img/bg2.jpg');">
    <Search />
    
  </div>
  <Venues v-if="this.$root.showVenues"/>
  
</template>

<script>
import Search from "@/components/Search.vue"
import Venues from "@/components/Venues.vue"
export default {
  name: 'Home',
  components:{
      Search,
      Venues
  },
  methods:{
      toggleSearch(){
          window.$('div.tooltip.show').remove();
          this.$root.showVenues = false;
      }
  }
}

</script>