<template>
  <div class="add-to-cart">

        <button class="btn btn-primary" @click="addToCart"> Dodaj u Kosaricu </button>

  </div>
</template>

<script>
export default {
  name: "add-to-cart",
  props: {        // prihvaca ima,sliku,cijenu,id   iz product liste
    name: String,
    image: String,
    price: String,
    pId: String
  },
  data(){
      return {
          item: {
            productName: this.name,             // uzima name iz propsa i stavlja ga u this.name i sprema kao productName
            productImage: this.image,
            productPrice: this.price,
            productId: this.pId,
            productQuantity: 1,
          }
      }
      },
  methods:{
    addToCart(){
        $('#miniCart').modal('show');
      this.$store.commit('addToCart', this.item)
    }
  }
};
</script>

<style scoped lang="scss">
</style>
