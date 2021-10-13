<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 ml-auto mr-auto">
                <div class="brand">
                <div class="card">
                    <div class="card-header card-header-text card-header-primary">
                        <div class="card-text">
                            <h4 class="card-title">
                                <i class="fa fa-search"></i> &nbsp; Search for a Venue
                            </h4>
                        </div>
                    </div>
                    <div class="card-body card-search">
                        <form @submit.prevent="SearchVenues" class="form">                                        
                            <div class="input-group">
                                <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-sort-numeric-down"></i>
                                </span>
                                </div>
                                <input v-model="limit" type="number" class="form-control" placeholder="Response Limit Size, default is 10">
                            </div>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-map-marker-alt"></i>
                                </span>
                                </div>
                                <input v-model="this.$root.venue" required type="text" class="form-control" placeholder="Search for a Venue. Powered by Foursquare">
                                
                            </div>
                            <div class="form-group mt-4 center-content">
                                <button v-if="isLoading" type="button" class="btn btn-primary btn-round" disabled>Loading ...</button>
                                <button v-else type="submit" class="btn btn-primary btn-round">Search <span class="fa fa-search"></span></button>
                            </div>

                            <div v-if="errorMessage" class="alert alert-danger">
                                <div class="container">
                                <div class="alert-icon">
                                    <i class="material-icons">error_outline</i>
                                </div>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true"><i class="material-icons">clear</i></span>
                                </button>
                                <b>Error:</b> {{errorMessage}}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import axios from "axios"

export default {
  name: 'Search',
  data(){
      return{
          limit: '',
          venues: [],
          isLoading: false,
          errorMessage: ''
      }
  },
  methods: {
      async SearchVenues(){
          this.isLoading = true;
        this.errorMessage = '';
        this.$root.venues = [];        
        var responseLimit = this.limit === '' ? 10 : this.limit;
        let vueApp = this;
        await axios.get(`https://localhost:44305/api/Venue?venue=${this.$root.venue}&limit=${responseLimit}`)
        .then(function (response) {
            vueApp.$root.venues = response.data;
            vueApp.isLoading = false;
            vueApp.$root.showVenues = true;
        })
        .catch(function () {
            vueApp.isLoading = false;
            vueApp.errorMessage = 'An error occurred while searching for a venue';
        });
    }
  }
}
</script>