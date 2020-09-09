<template>
  <div class="hello">
   <nav class="navbar custom-nav  navbar-expand-lg navbar-light " style="background-color: #6d6c96;">
     <div class="container">
        <router-link class="navbar-brand" to="/">FOODSET</router-link>
        <router-link class="navbar-brand" to="/About">O nama</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <ul class="navbar-nav mr-auto">
          </ul>

          <form class="form-inline my-2 my-lg-0">
            
            <a class="btn btn-outline-success btn-lg" style="margin: 20px; color:azure" data-toggle="modal" data-target="#login">Prijava <i class="fas fa-door-open"></i></a>
            <a class="btn3 btn-outline-danger btn-lg" style="color:azure" data-toggle="modal" data-target="#miniCart"><i class="fas fa-shopping-cart"></i></a>

          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  components:{}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (min-width: 992px) { 
    
    .navbar.custom-nav{
      padding-top:16px;
      padding-bottom:16px;
      background: #6d6c96 !important;
    }
    .navbar-brand{
      color:azure;
    }
   }

.btn3:hover{
  transform: rotate(360deg);
      transition-duration: 1s;
}
</style>