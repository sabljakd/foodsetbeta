<template>
<div class="addemploye">
  <div class="container">
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Lozinka</label>
    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <button @click.prevent="register" class="btn btn-primary">Potvrdi</button><br><br>
<a>Obrisi koriniska</a>
   <input v-model="deleteUser" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" > 
   <button class="btn btn-danger" style="margin-top:5px;" @click.prevent=" deleteuser()"> Obrisi </button> <!-- prevent ne refresha stranicu -->
</form>
  </div>
</div>
</template>

<script>
import db from '../firebase'// poziva iz firebase.js
import fb from 'firebase' // iz paketa firebase

export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
      return {
          email:null,
          password:null,
          deleteUser:null
      }
  },
  methods:{
      
      register(){
           var createUser = fb.functions().httpsCallable('createUser');  // poziva gotovu funkciju koju smo instalirali kroz npm 
              createUser({email: this.email, password: this.password})
              .then(()=>{
                this.$router.go(-1)
              })
      },
      deleteuser(){
        var deleteUser = fb.functions().httpsCallable('deleteUser');  
              deleteUser({email: this.deleteUser})
              .then(()=>{
                /* this.$router.go(-1) */
              })
      }
  }
};
</script>
