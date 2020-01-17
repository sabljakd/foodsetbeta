<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-5">Nasa Ponuda</h1>
          <div class="row">

              <div class="col-md-4" v-for="product in products">
                  <div class="card product-item" style="margin: 2px">
                    
                        <div class="card-body" >
                            <div class="d-flex justify-content-between">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <h5 class="card-priceS">{{ product.price | currency(' HRK', 2, { symbolOnLeft: false }) }}</h5>

                          </div>
                            <p class="card-text">
                                {{ product.description }}

                            </p>
                            <add-to-cart 
                                :image="getImage(product.images)"
                                :p-id="product.id"
                                :price="product.price"
                                :name="product.name">
                            </add-to-cart>
                        </div>
                    </div>
              </div>

          </div>
      </div>

  </div>
</template>

<script>
import {db} from '../firebase';
export default {
  name: "Products-list",
  props: {
    msg: String
  },
data(){
    return {
        products: [],
     
    }
  },
  methods:{

    getImage(image){
      return image;
    }
    
  },
  firestore(){
      return {
        products: db.collection('products'),
      }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>