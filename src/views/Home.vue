<template>
  <div class="home">
    <Navbar></Navbar>
      <Logo/>
      <products-list></products-list>

      
      <login></login>

      <mini-cart></mini-cart>

  </div>
</template>

<script>
// @ is an alias to /src
import Logo from "@/components/Logo.vue";
import Login from "@/components/Login.vue";

export default {
  name: 'home',
  components: {
    Logo,Login

  }
}
</script>
<style>

</style>
