<template>
  <div :class="prefixCls">
    <div class="btn-list">
      <el-button type="primary" @click="editData(0,null)">新增</el-button>
    </div>
    <div class="page-table" v-loading="isLoading" v-if="isLoading || tableData.length > 0">
      <el-table :data="tableData" border v-if="tableData.length>0 && !isLoading">
        <el-table-column type="selection" width="60"></el-table-column>
        <!-- <el-table-column prop="iIndex" label="序号" width="60"></el-table-column> -->
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="url" label="地址"></el-table-column>
        <!-- <el-table-column prop="_id" label="id" ></el-table-column> -->
        <el-table-column label="类型" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 'cn'">中文</span>
            <span v-else-if="scope.row.type == 'en'">英文</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="deleteData(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click="editData(1,scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <edit v-if="isShowEdit" @on-close="isShowEdit = false" :type="editType" :data="currentData"
      @on-submit="afterSubmit"></edit>
  </div>

</template>
<script>
  import axios from 'axios'
  import Edit from './components/edit'
  import {
    getItems,
    removeItem,
    updateItem
  } from '@/service'
  export default {
    nanme: "about",
    data() {
      return {
        prefixCls: 'views-about',
        isLoading: true,
        tableData: [],
        isShowEdit: false,
        currentData: null
      }
    },
    components: {
      Edit
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        // 发送 POST 请求
        getItems({

          }).then((res) => {
            this.isLoading = false;
            this.tableData = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },

      afterSubmit() {
        this.isShowEdit = false;
        this.getList()
      },

      deleteData(data) {
        console.log(data)
        removeItem({
          uuid: data.uuid
        }).then((res) => {
          if (res.resCode == 200) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
            this.getList();
          }
        });
      },

      editData(type, data) {
        this.isShowEdit = true;
        this.editType = type; //0 新增 1.修改
        this.currentData = data;
      }
    }
  }
</script>
<style lang="scss" scoped>
  $prefixCls: "views-about";

  .#{$prefixCls} {
    padding: 10px;

    .btn-list {
      margin: 10px 0;
      text-align: left;
    }
  }
</style>