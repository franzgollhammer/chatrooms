import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../components/HomeComponent'
import ChatComponent from '../components/ChatComponent'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatComponent
  }
]

const router = new VueRouter({
  routes
})

export default router
