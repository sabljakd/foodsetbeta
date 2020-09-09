<template>
  <div class="products">
      <div class="container">

        


          <div class="product-test">

            <h3 class="d-inline-block">Jelovnik</h3>
            <button @click="addNew" class="btn btn-primary float-right">Dodaj novi meni</button>

            <div class="table-responsive">

                <table class="table">
                  <thead>
                    <tr>
                      <th>Naziv</th>
                      <th>Cijena</th>
                      <th>Uredi</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr v-for="product in products" :key="product.id">
                        <td>
                          {{product.name}}
                        </td>
                        <td>
                          {{product.price}}
                        </td>

                        <td>

                          <button class="btn btn-primary" @click="editProduct(product)">Uredi</button>
                          <button class="btn btn-danger" @click="deleteProduct(product)">Obrisi</button>
                        </td>
                      </tr>


                  </tbody>
                </table>
            </div>



          </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Meni</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Naziv menija" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" placeholder="Opis priprave menia" v-model="product.description" class="form-control">
                    </div>
                  </div>
                  
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Detalji menija</h4>
                    <hr>

                    <div class="form-group">
                      <select v-model="product.kategorijaMenija" class="custom-select">
                          <option value="" disabled >Odaberite vrstu jela</option>
                          <option value="Piće">Piće</option>
                          <option value="Jelo">Jelo</option>
                        </select>
                    </div>
                    <div class="form-group">
                      <input type="text" placeholder="Cijena menija" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" placeholder="Namirnice menija" v-model="product.tag" class="form-control">

                    </div>

                    <div class="form-group">
                      <label for="product_image">Slike menija</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    
                    

                  </div>
                </div>

                

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvori</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Spremi meni</button> 
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Spremi Promjene</button>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>

import db from '../firebase';
import fb from 'firebase';

export default {
  name: "Products",
  
  props: {
    msg: String
  },

  data(){
    return {
        products: [],   // podatci se spremaju 
        product: {
          name:null,
          description:null,
          price:null,
          kategorijaMenija:''
        },
        activeItem:null,
        modal: '',       // sprema edit ili new
        tag: null
    }
  },
 firestore(){
      return {
        products: db.collection('products'),    // povezivanje s bazom // read data from firestore  
      }
      },
  

 


  methods: {
      

      addNew(){
        this.modal = 'new';
        this.reset();
        $('#product').modal('show');
      },

      uploadImage(e){
      
      let file = e.target.files[0];
      var storageRef = fb.storage().ref('products/'+ file.name);
      let uploadTask  = storageRef.put(file);
      uploadTask.on('state_changed', (snapshot) => {
        
      }, (error) => {
        // Handle unsuccessful uploads
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

          this.product.images = downloadURL;
          
        });
      });

    },

      updateProduct(){
        this.$firestore.products.doc(this.product.id).update(this.product);
          Toast.fire({
            icon: 'success',
            title: 'Uspjesno Azurirano'
          })
           $('#product').modal('hide');
    },

    editProduct(product){
        this.modal = 'edit';
      this.product = product;
      $('#product').modal('show');
    },

      deleteProduct(doc){
                Swal.fire({
          title: 'Jeste li sigurni?',
          text: "Obrisano se ne moze vratiti!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Da, Obrisi!'
        }).then((result) => {
          if (result.value) {

            this.$firestore.products.doc(doc['id']).delete();

            Swal.fire(
              'Obrisano!',
              'Vas dokument je obrisan.',
              'success'
            )
          }
        })
    },
  

   

    
    addProduct(){
      
      this.$firestore.products.add(this.product);
      Toast.fire({
            icon: 'success',
            title: 'Proizvod kreiran!'
          })
      $('#product').modal('hide');
    },
    reset(){
      this.product = {
          name:null,
          description:null,
          price:null,
          
          
      }
      
    },
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
