<template>
  
  <Nav v-if="authenticated"/>
  <router-view/>
</template>
<script>
import Nav from "@/components/Nav.vue"

export default{
  components:{
    Nav
  },
  data(){
    return{
      authenticated: false
    };
  },
  watch:{
    $route(to){
    this.authenticated = to.name !== 'login'
  },
},
make(){
this.authenticated = this.$route.name !== 'login'
}
}
  


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color:darkgray;
}
</style>
