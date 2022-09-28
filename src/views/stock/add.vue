<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" style="width: 20%">
      <el-form-item label="品牌">
        <el-input v-model="form.brand" />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="规格">
        <el-input
          v-model="form.weight"
          placeholder="填写数字"
          style="width: 110px; margin-right: 10px"
        />
        <el-select v-model="form.unit" placeholder="选择单位">
          <el-option label="千克" value="kg" />
          <el-option label="磅" value="lbs" />
          <el-option label="克" value="g" />
        </el-select>
      </el-form-item>

      <el-form-item label="单价">
        <el-input v-model="form.price" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import stock from "@/api/stock";
export default {
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "fileoss",
      form: {
        id: "",
        ring: "",
        url: "",
      },
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;

      this.getInfo(id);
    }
  },
  methods: {
    getInfo(id) {
      stock.getItemById(id).then((res) => {
        this.form = res.data.info;
      });
    },

    onSubmit() {
      console.log(this.form);
      if (this.form.id) {
        this.update();
      } else {
        this.add();
      }
    },

    update() {
      stock
        .updateItem(this.form)
        .then((res) => {
          this.$message({
            type: "success",
            message: "编辑成功!",
          });
          this.$router.push({ path: "/stock/item" });
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: "保存失败",
          });
        });
    },
    add() {
      stock
        .addItem(this.form)
        .then((res) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.$router.push({ path: "/stock/item" });
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: "保存失败",
          });
        });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

