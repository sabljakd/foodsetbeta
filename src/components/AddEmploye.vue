<template>
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <button @click.prevent="register" class="btn btn-primary">Submit</button>
</form>
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
          email:null,
          password:null
      }
  },
  methods:{
      
      register(){
           var createUser = fb.functions().httpsCallable('createUser');
              createUser({email: this.email, password: this.password})
              .then(()=>{
                this.$router.go(-1)
              })
      }
  }
};
</script>
