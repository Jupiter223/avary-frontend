<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="脚环号">
        <el-input v-model="form.ring" />
      </el-form-item>

      <template>
        <el-form-item label="卡片照片">
          <div class="demo-image__preview" style="display: inline-block">
            <el-image
              style="width: 350px"
              :src="form.url"
              :preview-src-list="[form.url]"
            >
              <div slot="error" class="image-slot" style="padding-top: 15px">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <el-upload
            class="upload-demo"
            drag
            action="http://localhost:8081/fileoss"
            multiple
            :on-preview="handlePreview"
            :on-success="handleSucessCard"
            style="
              display: inline-block;
              padding-left: 50px;
              vertical-align: baseline;
            "
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              修改卡片照片，将文件拖到此处，或<em>点击上传</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div> -->
          </el-upload>
        </el-form-item>
      </template>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import card from "@/api/card";
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
      card.getById(id).then((res) => {
        this.form = res.data.info;
        console.log("up" + this.uploadUrl);
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
      card
        .updateInfo(this.form)
        .then((res) => {
          this.$message({
            type: "success",
            message: "编辑成功!",
          });
          this.$router.push({ path: "/card/Info" });
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: "保存失败",
          });
        });
    },
    add() {
      card
        .add(this.form)
        .then((res) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.$router.push({ path: "/card/Info" });
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

    handlePreview(file) {
      console.log(file);
    },
    handleSucessCard(res, file) {
      console.log(res);
      console.log(file);
      this.form.url = res.data.url;
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

