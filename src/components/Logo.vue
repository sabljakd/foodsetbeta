<template>
    <div class="logo">
        <div class="container h-100">
            
            <div class="col-md-7">
                
                    <img src="../logo.png" alt="">
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Logo",
  props: {
    msg: String
  }
};
</script>


<style scoped lang="scss">
  .logo{
    padding-top: 7rem;
    width: 100%;
    height: 500px;
    text-align: left;
  }
</style>