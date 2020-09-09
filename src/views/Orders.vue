<template>
  <div class="products">
      <div class="container">          <!-- povlacimo podatke iz checkouta -->
        <div id="border" style="margin-top:10px" v-for=" order in filteredOrders" :key="order.id">
          <b>Ime gosta: </b>{{order.imeGosta}}
          <b>Prezime gosta: </b>{{order.prezimeGosta}}
          <b>Broj stola: </b>{{order.brojStola}}

            <div v-for="product in order.narudzba" :key="product.id"> <!-- ispisat ce nam sve nrudzbe iz kosarice/checkouta -->
              <b>Ime menija: </b>{{product.productName}} <br>
              <b>Napomena: </b>{{product.napomena}}
            <br>  <b>Kolicina: </b>{{product.productQuantity}}
            </div>
        
            <div>
            <b>Placanje: </b>{{order.placanjeGot}}
            </div>
            <button @click="check(order.id)" style="margin-bottom:20px">Narudzba je spremna!</button>
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
    
    check(id){
      db.collection('narudzbe').doc(id).update({
        checked: true
      })
      
      
      Toast.fire({
            icon: 'success',
            title: 'Narudzba spremna!'
          })
      $('#product').modal('hide');
    
    }
  },
  computed: { 
    filteredOrders(){
      return this.orders.filter(order => order.checked!==true);
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
#border{
border-bottom: 5px solid #1C6EA4;
border-radius: 13px;
}
</style>
