<template>
  <div class="admin">
<div class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
            <i class="fas fa-bars"></i>
        </a>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">Foodset</a>
                    <div id="close-sidebar" @click="closeMenu">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header">
                  
                    <div class="user-info">
                        <span class="user-name">Prijavljeni ste kao {{name}}
                            
                        </span>
                        <span class="user-role"> {{email}} </span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                        
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-item sidebar-search">
                   
                </div>
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>
                        <!--
                        <li>
                            <router-link to="/admin/overview">
                                <i class="fa fa-chart-line"></i>
                                <span>Overview</span>
                            </router-link>
                            
                        </li> -->
                        <li>
                            <router-link to="/admin/products">
                                
                                <span>Jelovnik</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/orders">
                                
                                <span>Narudzbe</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/profile">
                                
                                <span>Profil</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#" @click="logout()">
                               
                                <span>Odjavi se</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>

        </nav>
        <!-- sidebar-content  -->
        <main class="page-content">
            <router-view/>
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->




  </div>
</template>

<script>
// @ is an alias to /src
import Logo from "@/components/Logo.vue";
import {fb} from '../firebase';

export default {
  name: "admin",
  data(){
      return{
          name:null,
          email:null,
      }
  },
  components: {
    Logo
  },
  methods:{
      closeMenu(){
        $(".page-wrapper").toggleClass("toggled");
        },
      logout(){
          fb.auth().signOut()
          .then(() => {
              this.$router.replace('/');
          })
          .catch((err) =>{
              console.log(err);
          });
      }
      },
  created(){
      let user = fb.auth().currentUser;
      this.email = user.email;
  }
};
</script>

<style>
</style>