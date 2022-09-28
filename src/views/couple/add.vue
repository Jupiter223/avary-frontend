<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      style="display: inline-block"
    >
      <el-form-item label="脚环号">
        <el-input v-model="form.ring" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="form.location" />
      </el-form-item>
      <el-form-item label="品种">
        <el-select v-model="form.specie" placeholder="选择品种">
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
      <el-form-item label="出生日期">
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

      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="选择性别">
          <el-option label="公" value="male" />
          <el-option label="母" value="female" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否死亡">
        <el-select v-model="form.isDead" placeholder="选择生存情况">
          <el-option label="生存" value="false" />
          <el-option label="死亡" value="true" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否离场">
        <el-select v-model="form.isOut" placeholder="选择离场情况">
          <el-option label="在场" value="false" />
          <el-option label="离场" value="true" />
        </el-select>
      </el-form-item>
      <template>
        <el-form-item label="卡片照片">
          <div class="demo-image__preview" style="display: inline-block">
            <el-image
              style="width: 350px"
              :src="form.cardPic"
              :preview-src-list="[form.cardPic]"
            >
              <div slot="error" class="image-slot" style="padding-top: 15px">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <el-upload
            class="upload-demo"
            drag
            action="http://192.168.50.130:8081/fileoss"
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
        <el-form-item label="鸟照片">
          <div class="demo-image__preview" style="display: inline-block">
            <el-image
              style="width: 350px"
              :src="form.avaryPic"
              :preview-src-list="[form.avaryPic]"
            >
              <div slot="error" class="image-slot" style="padding-top: 15px">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <el-upload
            class="upload-demo"
            drag
            action="http://192.168.50.130:8081/fileoss"
            :on-success="handleSucessAvary"
            multiple
            style="
              display: inline-block;
              padding-left: 50px;
              vertical-align: baseline;
            "
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              修改鸟照片，将文件拖到此处，或<em>点击上传</em>
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

    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      style="display: inline-block"
    >
      <el-form-item label="脚环号">
        <el-input v-model="form.ring" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="form.location" />
      </el-form-item>
      <el-form-item label="品种">
        <el-select v-model="form.specie" placeholder="选择品种">
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
      <el-form-item label="出生日期">
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

      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="选择性别">
          <el-option label="公" value="male" />
          <el-option label="母" value="female" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否死亡">
        <el-select v-model="form.isDead" placeholder="选择生存情况">
          <el-option label="生存" value="false" />
          <el-option label="死亡" value="true" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否离场">
        <el-select v-model="form.isOut" placeholder="选择离场情况">
          <el-option label="在场" value="false" />
          <el-option label="离场" value="true" />
        </el-select>
      </el-form-item>
      <template>
        <el-form-item label="卡片照片">
          <div class="demo-image__preview" style="display: inline-block">
            <el-image
              style="width: 350px"
              :src="form.cardPic"
              :preview-src-list="[form.cardPic]"
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
        <el-form-item label="鸟照片">
          <div class="demo-image__preview" style="display: inline-block">
            <el-image
              style="width: 350px"
              :src="form.avaryPic"
              :preview-src-list="[form.avaryPic]"
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
            :on-success="handleSucessAvary"
            multiple
            style="
              display: inline-block;
              padding-left: 50px;
              vertical-align: baseline;
            "
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              修改鸟照片，将文件拖到此处，或<em>点击上传</em>
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
import avaryInfo from "@/api/avaryInfo";
export default {
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "fileoss",
      form: {
        id: "",
        ring: "",
        nickname: "",
        location: "",
        specie: "",
        birthday: "",
        isDead: false,
        isOut: false,
        gender: "",
        otherInfo: "",
        cardPic: "",
        avaryPic: "",
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
      avaryInfo.getById(id).then((res) => {
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
      avaryInfo
        .updateInfo(this.form)
        .then((res) => {
          this.$message({
            type: "success",
            message: "编辑成功!",
          });
          this.$router.push({ path: "/avary/avaryInfo" });
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: "保存失败",
          });
        });
    },
    add() {
      avaryInfo
        .add(this.form)
        .then((res) => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.$router.push({ path: "/avary/avaryInfo" });
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

