<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{title}}</p>
    <button @click="save">点击</button>
  </div>
</template>
<script>
import log from 'z-daydao-ui';
export default {
  data() {
    return {
      title:'about'
    }
  },

  created(){
    console.log(111);
    log.log(2323)

  },

  mounted(){
    this.warn('2233')
  },
  
  methods:{
    save(){
      this.util.warn('23232')
    }
  }


}
</script>

