<template>
  <div class="login">
        <!-- Modal -->
        <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
             <div class="modal-content">

                <div class="modal-body">

                    

                        <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">

                            <h5 class="text-center" style="color:azure">Prijavite se</h5>
                            <div class="form-group">
                                <label for="exampleInputEmail1" style="color:azure">Email adresa</label>
                                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Upisite email">
                                
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1" style="color:azure">Lozinka</label>
                                <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Upisite lozinku">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary" @click="login" style="color:azure">Prijavite se</button>
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
import db from '../firebase'
import fb from 'firebase'

export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
      return {
          name:null,
          email:null,
          password:null
      }
  },
  methods:{
      login(){
          fb.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(() => {
                        $('#login').modal('hide')
                          this.$router.push('/admin/orders');  
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode === 'auth/wrong-password') {
                                alert('Wrong password.');
                            } else {
                                alert(errorMessage);
                            }
                            console.log(error);
                    });
      },
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .modal-body{
    background: #6d6c96;
    border-radius: 75px 10px 75px 10px;
    }
    .modal-content{
    border-radius: 750px 100px 750px 100px;
    }
    
    

</style>