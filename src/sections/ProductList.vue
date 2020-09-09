<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-5" style="color:azure">Nasa Ponuda</h1>
          <div class="odabir row">
            <div class="dropdown">
              <button class="btn btn-light dropdown-toggle" style="margin:5px" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Odaberi:
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" @click.prevent="postaviKategoriju('Jelo')">Jelo</a>
                <a class="dropdown-item" @click.prevent="postaviKategoriju('Piće')">Piće</a>
              </div>
            </div>
          </div>
          
            

              <div v-for="product in filteredProducts" :key="product.id">    <!-- :key vue mora razlikovati svaku komponenttu u slucaju promjene podataka -->
                  
                    
                        <div class="card" style="text-align: center; margin-bottom: 5px;">
                            
                            <img style="margin-left: auto; margin-right: auto;" width="100px" height="100px" :src="product.images" alt="Card image cap">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <h5 class="card-title">{{ product.tag }}</h5>
                            <h5 class="card-priceS">{{ product.price | currency(' HRK', 2, { symbolOnLeft: false }) }}</h5>

                          
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
</template>

<script>
import db from '@/firebase';
export default {
  name: "Products-list",
  props: {
    msg: String
  },
data(){
    return {
        products: [],
        search:''
     
    }
  },
  methods:{

    getImage(image){
      return image;
    },
    postaviKategoriju(vrsta){
      this.search = vrsta
    } 
    
  },
  created(){
     //slušamo tablicu products
      db.collection('products')                    // isto kao i select * from products
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {

          //u slučaju da je element dodan renderamo ga na stranici
          if (change.type === "added"){
            let doc = change.doc
            let product = doc.data()
            product.id = doc.id
            this.products.push(product)
          }

          //u slučaju da je izbrisan brišemo ga stranice
          else if(change.type === "removed"){
            this.products = this.products.filter(products => {
              return products.id != change.doc.id
            })
          } 
        });
      })
  },
  computed: {
    filteredProducts(){
      return this.products.filter(product => product.kategorijaMenija.includes(this.search))
    } 
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #6d6c96;
        padding-bottom: 3rem;
        
    }

    .odabir{
      display: flex;
  justify-content: center;
    }
</style>
