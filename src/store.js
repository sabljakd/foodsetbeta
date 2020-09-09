import Vue from 'vue'
import Vuex from 'vuex'                 // vuex koristimo kako bi spremili dodatne podatke // u nasem slucaju podatke iz kosarice 
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart');

export default new Vuex.Store({
    state: {             //  isto ko i data
        cart: cart ? JSON.parse(cart) : [],       // spremamo nase podatke (podatke kosarice) // koristimo da zapamti podatke u kosarici nakon refreshanja 
    },

    getters: {           // isto sto i computed
        totalPrice: state => {
          let total = 0;
          state.cart.filter((item) => {
              total += (item.productPrice * item.productQuantity);
          });
  
          return total;
        }
      },

    mutations:{           // isto sto i methods 
        addToCart(state, item){  // prima 2 parametra state i item
          let found = state.cart.find(product => product.productId == item.productId );
          if(found){
            found.productQuantity++;
          }else{
            state.cart.push(item);
  
          }
  
          this.commit('saveData');
  
        },
  
        saveData(state){
          window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        removeFromCart(state, item){
  
            let index = state.cart.indexOf(item);
            state.cart.splice(index,1);
  
          this.commit('saveData');
  
        },

        increment(state, {id, unesikolicinu}){

            let found = state.cart.find(product => product.productId == id );
    
            if(found){
              found.productQuantity=found.productQuantity + unesikolicinu*1;
            }else{
              state.cart.push(item);
    
            }
    
            this.commit('saveData');
    
          },
          increment2(state, id){

            let found = state.cart.find(product => product.productId == id );
    
            if(found){
              found.productQuantity++;
            }else{
              state.cart.push(item);
    
            }
    
            this.commit('saveData');
    
          },
    
          decrement(state, {id, unesikolicinu}){
    
            let found = state.cart.find(product => product.productId == id );
    
            if(found){
              found.productQuantity= found.productQuantity - unesikolicinu;
            }
            if (found.productQuantity <= 0) {
              found.productQuantity=1;          
            }
            this.commit('saveData');
    
          },
          isprazniKosaricu(state,item){
            state.cart=item    },

           
  
  
  
  
      }
      
    })
