<template>
  <div class="products">
      <div class="container">

        <div class="intro h-100">
            <div class="row h-100 align-items-center">
              <div class="col-md-6 ml-3">
                    <h3>Postavke Profila</h3>
                 <p>
                   Ovdje promjeni svoje postavke profila.
                 </p>
              </div>
              
            </div>
          </div>
          <hr>


          <div class="profile-content">

              <ul class="nav nav-pills ml-3" id="myTab" role="tablist">

          

            <li class="nav-item">
              <a class="nav-link"  id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="false">Promjena lozinke</a>
            </li>

          </ul>

            

          <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
                  <div class="container">
                      <div class="row">

  
                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="button" @click="resetPassword" value="Posalji na mail" class="btn btn-success w-100">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

</template>

<script>

import db from '../firebase';
import fb from 'firebase';

export default {
  name: "profile",
  
  props: {
    msg: String
  },

  data(){
    return {
        
        account:{
            name:null,
            email:null,
            photoUrl:null,
            emailVerified:null,
            password:null,
            confirmPassword:null,
            uid:null
        } 
    }
  },
  
  methods:{
      resetPassword(){
          const auth = fb.auth();          
          auth.sendPasswordResetEmail(auth.currentUser.email).then(() =>  {
               Toast.fire({
                title: 'Email sent'
              })
          }).catch((error) =>  {
              console.log(error);
          });
      },
      updateProfile(){
          this.$firestore.profile.update(this.profile);
      },
      
  },
  
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>