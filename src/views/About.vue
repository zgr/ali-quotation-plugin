<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button>2332</el-button>
    <ul>
      <li v-for="item in list" :key="item._id">{{item.name}}</li>
    </ul>
  </div>

</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        list: []
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        // 发送 POST 请求
        axios.get('/api/getItems', {
            params: {
              type: "cn"
            }
          })
          .then((res)=> {
            this.list = res.data;
          })
          .catch((error)=> {
            console.log(error);
          });
      }
    }
  }
</script>