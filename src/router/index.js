import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Admin from "../views/Admin.vue";
import Products from "../views/Products.vue";
import AddEmploye from "../components/AddEmploye.vue";
import FinishedOrders from "../views/FinishedOrders.vue";
import Orders from "../views/Orders.vue";
import fb from 'firebase'
import Profile from "../views/Profile.vue";

Vue.use(Router)

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { requiresAuth: true },
      children:[
        
        {
          path: "products",
          name: "products",
          component: Products
        },
        {
          path: "profile",
          name: "profile",
          component: Profile
        },
        {
          path: "orders",
          name: "orders",
          component: Orders
        },
        {
          path: "add-employe",
          name: "add-employe",
          component: AddEmploye
        },
        {
          path: "finished-orders",
          name: "finished-orders",
          component: FinishedOrders
        }
      ]
    },
    {
      path: "/checkout",
      name: "checkout",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Checkout.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router; 