<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="父母昵称">
        <el-input v-model="form.parentNickname" />
      </el-form-item>

      <el-form-item label="品种">
        <el-select v-model="form.species" placeholder="选择品种">
          <el-option label="金凯" value="金凯" />
          <el-option label="黑凯" value="黑凯" />
          <el-option label="折衷" value="折衷" />
          <el-option label="小黄帽" value="双黄" />
          <el-option label="吸蜜" value="吸蜜" />
          <el-option label="粉巴" value="粉巴" />
          <el-option label="好望角" value="好望角" />
          <el-option label="蓝眼巴丹" value="蓝眼巴丹" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>

      <el-form-item label="第几窝">
        <el-select v-model="form.nest" placeholder="选择第几窝">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="4" value="4" />
          <el-option label="5" value="5" />
          <el-option label="6" value="6" />
          <el-option label="7" value="7" />
          <el-option label="8" value="8" />
        </el-select>
      </el-form-item>

      <el-form-item label="第几个">
        <el-select v-model="form.count" placeholder="选择第几个">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="4" value="4" />
          <el-option label="5" value="5" />
          <el-option label="6" value="6" />
          <el-option label="7" value="7" />
          <el-option label="8" value="9" />
          <el-option label="9" value="9" />
          <el-option label="10" value="10" />
          <el-option label="11" value="11" />
          <el-option label="12" value="12" />
          <el-option label="13" value="13" />
          <el-option label="14" value="14" />
          <el-option label="15" value="15" />
          <el-option label="16" value="16" />
          <el-option label="17" value="17" />
          <el-option label="18" value="18" />
          <el-option label="19" value="19" />
          <el-option label="20" value="20" />
        </el-select>
      </el-form-item>
      <el-form-item label="出壳日期">
        <el-col :span="11">
          <el-date-picker
            v-model="form.birthday"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择出生日期"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>

      <el-form-item label="是否死亡">
        <el-select v-model="form.isDead" placeholder="选择受精情况">
          <el-option label="死亡" value="1" />
          <el-option label="生存" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="脚环">
        <el-input v-model="form.ring" placeholder="输入脚环" />
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="选择性别">
          <el-option label="公" value="male" />
          <el-option label="母" value="female" />
        </el-select>
      </el-form-item>

      <el-form-item label="是否离场">
        <el-select v-model="form.isOut" placeholder="选择出壳情况">
          <el-option label="离场" value="1" />
          <el-option label="在场" value="0" />
        </el-select>
      </el-form-item>

      <template>
        <el-form-item label="照片">
          <div class="demo-image__preview" style="display: inline-block">
            <el-image
              style="width: 350px"
              :src="form.pic"
              :preview-src-list="[form.pic]"
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

      <el-form-item label="备注">
        <el-input v-model="form.otherInfo" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import breeder from "@/api/breeder";
export default {
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "fileoss",
      form: {
        id: "",
        parentLocation: "",
        parentNickname: "",
        nest: "",
        count: "",
        birthday: "",
        fertilization: "",
        hatch: "",
        hatchDate: "",
        otherInfo: "",
        pic: "",
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
      breeder.getNestlingById(id).then((res) => {
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
      breeder
        .updateNestling(this.form)
        .then((res) => {
          this.$message({
            type: "success",
            message: "编辑成功!",
          });
          this.$router.go(-1);
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: "保存失败",
          });
        });
    },
    add() {
      breeder
        .add(this.form)
        .then((res) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.$router.go(-1);
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
      this.form.cardPic = res.data.url;
    },
    handleSucessAvary(res, flie) {
      console.log(res);
      this.form.avaryPic = res.data.url;
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

