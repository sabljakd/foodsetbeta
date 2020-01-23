<template>
  <div class="chekout">
       <Navbar></Navbar>
<div class="container mt-5 pt-5">
  <div class="row">
    <div class="col">
                <div class="row">
                    <div class="col-sm">
                        <input v-model="ime" type="text" class="form-control" placeholder="Ime">
                    </div>
                    <div class="col-sm">
                        <input v-model="prezime" type="text" class="form-control" placeholder="Prezime">
                    </div>
                    <div class="col-sm">
                        <input v-model="brojKartice" type="number" class="form-control" placeholder="Broj kartice">
                    </div>
                </div>

                
                <div class="row" style="margin-top: 10px; margin-bottom:10px">
                    <div class="col-sm">
                        <select v-model="brojStola" class="custom-select">
                          <option value="" disabled >Odaberite stol</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                    </div>
                </div>
            </div>
  </div>
      <div class="row">
        
                <a style="border-style: inset; border-color:red">Ukupna cijena : {{ this.$store.getters.totalPrice | currency('HRK ') }}</a>

      </div>
      <div class="row">

                    <button @click="nastaviPlacanje()" class="btn btn-primary mt-4">
                        
                            Nastavi na placanje

                    </button>
                

            <table class="table table-borderless">
          <thead>
            <tr>
              <th>#</th>
              <th scope="col">Stavke</th>
              <th scope="col">Kolicina</th>
              <th scope="col">Cijena</th>
              <th scope="col">Napomena</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.$store.state.cart" :key="item.id">
              <td>
                <span @click="$store.commit('removeFromCart',item)" class="remove-item"><i class="far fa-trash-alt"></i></span>
              </td>
              <td>
                <img :src="item.productImage" alt style="width:100px">
                {{item.productName}}
              </td>
              <td>
                <div class="center">
                  <div class="input-group">
                    <span class="input-group-btn">
                      <button
                        type="button"
                        class="btn btn-dark btn-sm"
                        @click="decreaseQty(item.productId)"
                      >
                        <i class="fa fa-minus"></i>
                      </button>
                    </span>
                    <input type="text" :value="item.productQuantity"  style="margin-left:2px; margin-right:2px" class="form-control input-number">
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-dark btn-sm" @click="increaseQty(item.productId)">
                        <i class="fa fa-plus"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </td>
              <td>{{item.productPrice}}
              </td>
              <td>
                <input v-model="item.napomena" type="text" name="FirstName" value="Napomena">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>
<script>

import db from '../firebase'
export default {
  name: "checkout",
  props: {
  },
  data(){
      return {
        ime:'',
        prezime:'',
        brojKartice:'',
        brojStola:''
      }
  },
  methods: {
    increaseQty(id) {        
        this.$store.commit('increment', id)
    },
    decreaseQty(id) {
        this.$store.commit('decrement', id)
    },
    nastaviPlacanje(){
      db.collection('narudzbe').add({
        narudzba: this.$store.state.cart,
        imeGosta: this.ime,
        prezimeGosta: this.prezime,
        brojKartice: this.brojKartice,
        brojStola: this.brojStola,
        ukupnaNarudzba: this.$store.getters.totalPrice+' kn'
      })
        .then(() =>{
          this.$store.commit("isprazniKosaricu", []);
          this.ime='',
          this.prezime='',
          this.brojKartice='',
          this.brojStola='',
          this.$router.push({path: '/'})
        })
    }
  },
  created() {}
};
</script>
<style scoped lang="scss">
.center {
  width: 25%;
  margin: 40px auto;
}

</style>