<template>
  <div class="products">
      <div class="container">
        <div class="border" v-for=" order in filteredOrders" :key="order.id">
          <b>Ime gosta: </b>{{order.imeGosta}}
          <b>Prezime gosta: </b>{{order.prezimeGosta}}
          <b>Broj stola: </b>{{order.brojStola}}

            <div v-for="product in order.narudzba" :key="product.id">
              <b>Ime menija: </b>{{product.productName}}
              <b>Napomena: </b>{{product.napomena}}
            </div>
            <button @click="posluzeno(order.id)">Posluženo</button>
        </div>
      </div>     
  </div>
</template>

<script>
import db from '../firebase';
import fb from 'firebase';

export default {
  name: "Products",
  data(){
    return{

    }
  },
  firestore(){
      return {
        orders: db.collection('narudzbe'),
      }
  },
  methods: {
    posluzeno(id){
      db.collection("narudzbe").doc(id).delete()
    }
  },
  computed: {
    filteredOrders(){
      return this.orders.filter(order => order.checked==true);
    } 
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}
</style>