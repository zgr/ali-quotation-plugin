<template>
  <div :class="prefixCls">
    <el-dialog
      title="新增"
      width="700px"
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="isShowAddDialog"
      v-if="isShowAddDialog"
      @close="handlerCancel"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="url">
          <el-input v-model="form.url" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="语言" prop="type">
          <el-select v-model="form.type" placeholder="请选择语言">
            <el-option label="英文" value="en"></el-option>
            <el-option label="中文" value="cn"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">新增</el-button>
          <el-button @click="handlerCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      prefixCls: "views-about-edit",
      isShowAddDialog: true,
      form: {
        name: "",
        url: "",
        type: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        url: [
          { required: true, message: "请输入地址", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    handlerCancel() {
      this.$emit("on-close");
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          axios({
            method: "post",
            url: "/api/insertItem",
            data: {
              name: this.form.name,
              url: this.form.url,
              type: this.form.type,
            },
          }).then((res) => {
            if (res.data && res.data.code == 200) {
              this.$message({
                showClose: true,
                message: "新增成功",
                type: "success",
              });
              this.$emit("on-submit");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>