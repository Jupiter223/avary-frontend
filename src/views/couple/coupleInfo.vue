<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="繁殖年份">
        <el-input
          v-model="formInline.year"
          placeholder="年份 如2022"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onFindAll">查询历年所有</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="backToBefore">back</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      ref="multipleTable"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="脚环号" align="center">
        <template slot-scope="scope">
          {{ scope.row.ring }}
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="笼编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品种" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.species }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.gender == "male" ? "公" : "母" }}
        </template>
      </el-table-column>
      <el-table-column label="生日" align="center">
        <template slot-scope="scope">
          {{ scope.row.birthday }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.otherInfo }}
        </template>
      </el-table-column>

      <el-table-column label="是否死亡" align="center">
        <template slot-scope="scope">
          {{ scope.row.dead ? "死亡" : "存活" }}
        </template>
      </el-table-column>
      <el-table-column label="是否离场" align="center">
        <template slot-scope="scope">
          {{ scope.row.out ? "是" : "否" }}
        </template>
      </el-table-column>

      <el-table-column label="卡片图" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="400"
            trigger="click"
            v-if="scope.row.cardPic"
          >
            <el-image :src="scope.row.cardPic"></el-image>
            <el-button slot="reference" size="mini">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="鸟图" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="400"
            trigger="click"
            v-if="scope.row.avaryPic"
          >
            <el-image :src="scope.row.avaryPic"></el-image>
            <el-button slot="reference" size="mini">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/avary/edit/' + scope.row.id">
            <el-button @click="edit(scope.row)" type="warning" size="mini"
              >编辑</el-button
            ></router-link
          >

          <el-button type="info" size="mini" @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="table-container">
      <el-table
        class="table-inline"
        v-loading="listLoading1"
        :data="eggList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="第几窝" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.nest }}</span>
          </template>
        </el-table-column>
        <el-table-column label="第几个" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下蛋日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.birthday }}
          </template>
        </el-table-column>
        <el-table-column label="是否受精" align="center">
          <template slot-scope="scope">
            {{ scope.row.fertilization ? "受精" : "未受精" }}
          </template>
        </el-table-column>
        <el-table-column label="是否出壳" align="center">
          <template slot-scope="scope">
            {{ scope.row.hatch ? "出壳" : "未出壳" }}
          </template>
        </el-table-column>

        <el-table-column label="出壳日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.hatchDate }}
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            {{ scope.row.otherInfo }}
          </template>
        </el-table-column>

        <el-table-column label="照片" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              width="400"
              trigger="click"
              v-if="scope.row.pic"
            >
              <el-image :src="scope.row.pic"></el-image>
              <el-button slot="reference" size="mini">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="'/egg/edit/' + scope.row.id">
              <el-button @click="edit(scope.row)" type="warning" size="mini"
                >编辑</el-button
              ></router-link
            >

            <el-button type="info" size="mini" @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-table
        class="table-inline"
        v-loading="listLoading2"
        :data="nestlingList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="第几窝" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.nest }}</span>
          </template>
        </el-table-column>
        <el-table-column label="第几个" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出壳日期" align="center">
          <template slot-scope="scope">
            {{ scope.row.birthday }}
          </template>
        </el-table-column>
        <el-table-column label="脚环" align="center">
          <template slot-scope="scope">
            {{ scope.row.ring }}
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            {{ scope.row.gender }}
          </template>
        </el-table-column>
        <el-table-column label="是否死亡" align="center">
          <template slot-scope="scope">
            {{ scope.row.isDead ? "死亡" : "存活" }}
          </template>
        </el-table-column>
        <el-table-column label="是否离场" align="center">
          <template slot-scope="scope">
            {{ scope.row.isOut ? "离场" : "未离场" }}
          </template>
        </el-table-column>
        <el-table-column label="资料库" align="center">
          <template slot-scope="scope">
            {{ scope.row.isTransfer ? "已添加" : "未添加" }}
          </template>
        </el-table-column>

        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            {{ scope.row.otherInfo }}
          </template>
        </el-table-column>

        <el-table-column label="照片" align="center">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-popover
                placement="right"
                width="400"
                trigger="click"
                v-if="scope.row.pic"
              >
                <el-image :src="scope.row.pic"></el-image>
                <el-button slot="reference" size="mini">查看</el-button>
              </el-popover>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="'/nestling/edit/' + scope.row.id">
              <el-button @click="edit(scope.row)" type="warning" size="mini"
                >编辑</el-button
              ></router-link
            >

            <el-button type="info" size="mini" @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="info" size="mini" @click="addNewEgg()"
      >添加蛋确认</el-button
    >
    <el-button type="info" size="mini" @click="del(scope.row)">出壳</el-button>
  </div>
</template>

<script>
import couple from "@/api/couple";
import avary from "@/api/avaryInfo";
import breeder from "@/api/breeder";
var moment = require("moment");
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      parentId: "",
      parentNickname: "",
      parentLocation: "",
      list: [],
      listLoading: true,
      listLoading1: true,
      listLoading2: true,
      currentPage: 1,
      page: 1,
      limit: 20,
      total: 1,
      input1: "",
      formInline: {
        id: "",
        parentList: [],
        eggTotal: "",
        eggThisYear: "",
        nestlingTotal: "",
        nestlingThisYear: "",
        otherInfo: "",
      },
      coupleInfo: {
        id: "",
        otherInfo: "",
      },
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.parentId = id;
      this.fetchData(id);
      // this.fetchEggData(id);
    }
  },
  methods: {
    backToBefore() {
      this.$router.go(-1);
    },
    fetchData(id) {
      this.listLoading = true;
      avary.getByCoupleId(id).then((response) => {
        this.list = response.data.info;

        this.parentLocation = this.list[0].location;
        this.parentNickname = this.list[0].nickname;
        this.listLoading = false;
      });
      this.listLoading1 = true;
      breeder.getEggsThisYearByParentId(id).then((res) => {
        console.log(res);
        this.eggList = res.data.info;
        this.listLoading1 = false;
      });
      this.listLoading2 = true;
      breeder.getNestlingsThisYearByParentId(id).then((res) => {
        console.log(res);
        this.nestlingList = res.data.info;
        this.listLoading2 = false;
      });
    },
    fetchEggData(id) {},
    onSubmit() {
      this.listLoading1 = true;
      this.listLoading2 = true;
      const year = this.formInline.year;
      console.log(year);
      breeder.getEggsByYearByParentId(this.parentId, year).then((res) => {
        this.eggList = res.data.info;
        this.listLoading1 = false;
      });
      breeder.getNestlingsByYearByParentId(this.parentId, year).then((res) => {
        this.nestlingList = res.data.info;
        this.listLoading2 = false;
      });
    },
    onFindAll() {
      this.listLoading1 = true;
      this.listLoading2 = true;
      breeder.getEggsByParentId(this.parentId).then((res) => {
        this.eggList = res.data.info;
        this.listLoading1 = false;
        console.log(res);
      });
      breeder.getNestlingsByParentId(this.parentId).then((res) => {
        this.nestlingList = res.data.info;
        this.listLoading2 = false;
      });
    },

    // handleSizeChange(val) {
    //   this.limit = val;

    //   this.fetchData();
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    //   this.page = val;
    //   this.fetchData();
    // },
    jumpToEgg() {
      this.$router.push({
        path: "/egg/info",
        name: "Result",
        params: {
          list: {
            parentNickname,
            parentLocation,
          },
        },
      });
    },
    edit(row) {
      console.log(row.id);
    },
    del(row) {
      console.log(row.id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 调用删除api
        avaryInfo
          .remove(row.id)
          .then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.fetchData();
          })
          .catch((res) => {
            this.$message({
              type: "error",
              message: "删除失败!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
    },
    addNewEgg() {
      this.$router.push({
        path: "/egg/add",
        name: "eggAdd",
        params: {
          parentId: this.parentId,
          parentLocation: this.parentLocation,
          parentNickname: this.parentNickname,
        }, //传品种和位置和昵称
      });
    },
  },
};
</script>
<style scoped>
.count {
  color: tomato;
  font-weight: 700;
}
.table-container {
  padding-top: 20px;
  display: flex;
}
.table-inline {
  display: inline-block;
}
</style>
