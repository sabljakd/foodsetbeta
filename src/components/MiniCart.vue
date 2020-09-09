<template>
  <div class="mini-cart">

        <!-- Modal -->
        <div class="modal fade" id="miniCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Moja Kosarica</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <ul>
                    <li v-for="item in this.$store.state.cart" :key="item.id" class="media">
                      <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt="">
                      <div class="media-body">
                        <h5 class="mt-0">{{item.productName}}

                          <span class='float-right' @click="$store.commit('removeFromCart',item)"><i class="far fa-trash-alt"></i></span>
                        </h5>
                        <p class="mt-0">{{item.productPrice}} HRK</p> 
                        <p class="mt-0">Kolicina : {{item.productQuantity }}</p>
                        <span class="input-group-btn">
                      <button
                        type="button"
                        class="btn btn-dark btn-sm"
                        @click="decreaseQty(item.productId)"
                      >
                        <i class="fa fa-minus"></i>
                      </button>
                    </span>
                   
                   
                    <!-- <input type="text" :value="item.productQuantity"  style="margin-left:2px; margin-right:2px" class="form-control input-number"> -->
                  
                   
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-dark btn-sm" @click="increaseQty(item.productId)">
                        <i class="fa fa-plus"></i>
                      </button>
                      
                    </span>
                      </div>
                      
                    </li>

                  </ul>
                  <div><input v-model="unesikolicinu" type="text" placeholder="unesi kolicinu"></div> <br> 
                   
                  <div> <a style="border-style: inset; border-color:red">Ukupna cijena : {{ this.$store.getters.totalPrice | currency('HRK ') }}</a>
             </div>  </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Nastavi s narudzbom</button>
                <button type="button" class="btn btn-primary" @click="checkout">Placanje</button>
              </div>
            </div>
          </div>
        </div>


  </div>
</template>

<script>
import db from '../firebase'
export default {
  name: "MiniCart",
  props: {
    msg: String
  },
  data(){
    return{
      unesikolicinu: ""
    }
  },
  methods:{
    checkout(){
      $('#miniCart').modal('hide')
      this.$router.push('/checkout')  
    },
    increaseQty(id) {  
          
        this.$store.commit('increment', {id, "unesikolicinu":this.unesikolicinu})
    },
    decreaseQty(id) {
        this.$store.commit('decrement', {id, "unesikolicinu":this.unesikolicinu})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>