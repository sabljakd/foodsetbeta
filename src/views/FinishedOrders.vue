<template>
  <div class="products">
    <div><b>UKUPNO NARUDŽBI  POSLUZENO : </b>    {{count}}</div>
      <div class="container">
        <div id="border" style="margin-top:10px" v-for=" order in filteredOrders" :key="order.id">
          <b>Ime gosta: </b>{{order.imeGosta}}
          <b>Prezime gosta: </b>{{order.prezimeGosta}}
          <b>Broj stola: </b>{{order.brojStola}}

            <div v-for="product in order.narudzba" :key="product.id">
              <b>Ime menija: </b>{{product.productName}}
              <b>Napomena: </b>{{product.napomena}}
            </div>
            
            <div>
            <b>Placanje: </b>{{order.placanjeGot}}  <!-- 1 gost jedno placanje -->
            </div>
            
            <button id="primary"  @click="doznaka" style="margin-bottom:20px">Uspjesno posluzeno</button>
           <button class="botun" @click="posluzeno(order.id)">X</button>
           
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
        count:0
    }
  },
  firestore(){
      return {
        orders: db.collection('narudzbe'),
      }
  },
  methods: {
    doznaka(){
      this.count++;
      Toast.fire({
            icon: 'success',
            title: 'Uspjesno posluzeno!'
          })
      $('#product').modal('hide');
      
    },
    
    posluzeno(id){
      db.collection("narudzbe").doc(id).delete()
    }
  },
  computed: {  // korisitmo kada zelimo prikazati neku modifikacijuu
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
.botun{
  float:right;
}
#border{
border-bottom: 5px solid #1C6EA4;
border-radius: 13px;
}
</style>
