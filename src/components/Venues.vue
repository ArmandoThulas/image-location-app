<template>  
    <div class="container pt-5 mt-5">
        <div class="row">
            <div class="col-md-8 ml-auto mr-auto">
                    <div class="card">
                        <div class="card-header card-header-text card-header-primary">
                            <div class="card-text">
                                <h4 class="card-title">
                                    <i class="fa fa-search"></i> &nbsp; Results for {{this.$root.venue}}                                   
                                </h4>
                            </div>
                            
                        </div>
                        <div class="card-body">
                            <div v-for="(venue, index) in this.$root.venues" class="card pt-3" :key="venue.id">
                                <div class="card-header card-header-text card-header-info">
                                    <strong class="venue-name">{{index + 1}}. {{venue.name}}</strong>
                                </div>
                                <div class="card-body">
                                <div class="row">
                                    <div v-if="venue.images !== null" class="row">
                                        <div v-for="image in venue.images" :key="image.id" class="col-sm-4 p-1">
                                            <img @click="showImageData(image.id)" v-if="image" :src="image.prefix + image.width + 'x' + image.height + image.suffix" alt="Image" 
                                            class="rounded img-fluid pointer-cursor" height="150" data-toggle="tooltip" data-placement="top" title="Show image data">
                                            <img v-else src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png" alt="image not Image" class="rounded img-fluid" height="150">
                                        </div>
                                    </div>                                    
                                    <div v-if="venue.images === null" class="col-sm-4 p-1">
                                        <img src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png" alt="image not Image" 
                                        class="rounded img-fluid" height="150">
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <p class="venue-category">{{venue.categories[0].name}}</p>
                                                <p><strong>Address: </strong> {{venue.location.address}}</p>
                                                <p><strong>City: </strong>{{venue.location.city}}</p>
                                                <p><strong>State: </strong>{{venue.location.state}}</p>
                                            </div>
                                            <div class="col-md-6">
                                                <p class="venue-category">{{venue.location.country}}</p>
                                                <p><strong>lat: </strong>{{venue.location.lat}}</p>
                                                <p><strong>lng: </strong>{{venue.location.lng}}</p>
                                                <p><strong>Postal Code: </strong>{{venue.location.postalCode}}</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div v-if="this.$root.venues.length < 1" class="alert alert-warning">
                                <div class="container">
                                <div class="alert-icon">
                                    <i class="material-icons">warning</i>
                                </div>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true"><i class="material-icons">clear</i></span>
                                </button>
                                    No results found for {{this.$root.venue}}
                                </div>
                            </div>                         
                        </div>
                    </div>
            </div>
        </div>
    </div>

<div id="imageDataModal" class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog" modal-lg>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Image Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="imageData.id">
            <p><strong>createdAt:</strong> {{FormatDate(imageData.createdAt)}}</p>
            <p><strong>source name: </strong> {{imageData.source.name}}</p>
            <p><strong>source url: </strong> {{imageData.source.url}}</p>
            <p><strong>prefix: </strong> {{imageData.prefix}}</p>
            <p><strong>suffix: </strong> {{imageData.suffix}}</p>
            <p><strong>width: </strong> {{imageData.width}}</p>
            <p><strong>height: </strong> {{imageData.height}}</p>
            <p><strong>visibility: </strong> {{imageData.visibility}}</p>
        </div>
        <div v-else>
            <p>No Image Data Found</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios"
export default {
  name: 'Venues',
  data(){
      return {
          imageData: {}
      }
  },
  mounted() {
      this.populateImages();
  },
  methods: {
       async getVenueImages(venue){
        await axios.get(`https://localhost:44305/api/Venue/Images/${venue.id}`)
        .then(function (response) {
            if(response.data.length > 0)
                venue.images = response.data;
        })
      },
      async populateImages(){
          const vueApp = this;
          if(this.$root.venues.length === 0)
            return;
          this.$root.venues.forEach(function(venue){
              vueApp.getVenueImages(venue)
              window.$('[data-toggle="tooltip"]').tooltip();
          });
      },
      showImageData(id){
          const vueApp = this;
          axios.get(`https://localhost:44305/api/Image/${id}`)
        .then(function (response) {
            if(response.data.id)           
            {
                vueApp.imageData = response.data;
                window.$('#imageDataModal').modal('show');
            }
        })
      },
      FormatDate: function (date) {
        if (date !== null && date !== undefined) {
            var d = window.moment(date);
            return d.format('D/MM/YYYY hh:mm a');
        } else {
            return "";
        }
    }
  },
}

</script>