<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="脚环号">
        <el-input v-model="formInline.ring" placeholder="脚环号"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="笼编号">
        <el-input v-model="formInline.location" placeholder="笼编号"></el-input>
      </el-form-item>
      <el-form-item label="品种">
        <el-select v-model="formInline.species" placeholder="选择品种">
          <el-option label="金凯" value="金凯" />
          <el-option label="黑凯" value="黑凯" />
          <el-option label="折衷" value="折衷" />
          <el-option label="小黄帽" value="双黄" />
          <el-option label="吸蜜" value="吸蜜" />
          <el-option label="粉巴" value="粉巴" />
          <el-option label="好望角" value="好望角" />
          <el-option label="蓝眼巴丹" value="蓝眼巴丹" />
          <el-option label="黄颈" value="黄颈" />
          <el-option label="双黄" value="双黄" />
          <el-option label="和尚" value="和尚" />
          <el-option label="小太阳" value="小太阳" />
          <el-option label="金刚" value="金刚" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formInline.gender" placeholder="性别">
          <el-option label="公" value="male"></el-option>
          <el-option label="母" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生年份">
        <el-input v-model="formInline.year" placeholder="2022"></el-input>
      </el-form-item>

      <el-form-item label="是否死亡">
        <el-select v-model="formInline.death" placeholder="是否死亡">
          <el-option label="存活" value="0"></el-option>
          <el-option label="死亡" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否离场">
        <el-select v-model="formInline.outStatus" placeholder="是否离场">
          <el-option label="离场" value="1"></el-option>
          <el-option label="在场" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

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
      <el-table-column fixed align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column fixed label="脚环号" align="center">
        <template slot-scope="scope">
          {{ scope.row.ring }}
        </template>
      </el-table-column>
      <el-table-column fixed label="昵称" align="center">
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
      <el-table-column label="配对情况" align="center">
        <template slot-scope="scope">
          {{ scope.row.coupleId ? "" : "未配对" }}
          <router-link :to="'/couple/info/' + scope.row.coupleId">
            <el-button v-if="scope.row.coupleId" type="info" size="mini"
              >配对详情</el-button
            ></router-link
          >
        </template>
      </el-table-column>
      <el-table-column label="是否死亡" align="center">
        <template slot-scope="scope">
          {{ scope.row.death ? "死亡" : "存活" }}
        </template>
      </el-table-column>
      <el-table-column label="是否离场" align="center">
        <template slot-scope="scope">
          {{ scope.row.outStatus ? "是" : "否" }}
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
          <!-- <div class="demo-image__preview">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.cardPic"
              :preview-src-list="[scope.row.cardPic]"
            >
              <div slot="error" class="image-slot" style="padding-top: 15px">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div> -->
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

          <!-- <div class="demo-image__preview">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.avaryPic"
              :preview-src-list="[scope.row.avaryPic]"
            >
              <div slot="error" class="image-slot" style="padding-top: 15px">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div> -->
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
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

    <div style="margin-top: 20px">
      <!-- <el-button @click="toggleSelection([list[1], list[2]])"
        >切换第二、第三行的选中状态</el-button
      > -->
      <el-button @click="coupling()">配对</el-button>

      <el-button @click="egg()">生蛋</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>

    <div class="block" style="padding-left: 38%">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[20, 50]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import avaryInfo from "@/api/avaryInfo";
import couple from "@/api/couple";

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
      list: null,
      listLoading: true,
      currentPage: 1,
      page: 1,
      limit: 20,
      total: 1,
      input1: "",

      multipleSelection: [],
      formInline: {
        ring: "",
        nickname: "",
        location: "",
        gender: "",
        species: "",
        year: "",
        death: "",
        outStatus: "",
      },
      message: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let page = this.page;
      let limit = this.limit;
      console.log(limit);
      this.listLoading = true;
      avaryInfo.getList(page, limit).then((response) => {
        this.list = response.data.rows;
        console.log(this.list);
        this.total = response.data.total;
        this.listLoading = false;
      });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    coupling() {
      if (this.multipleSelection.length != 2) {
        this.$message({
          type: "error",
          message: "需选中两项!",
        });
      } else if (
        this.multipleSelection[0].gender == this.multipleSelection[1].gender
      ) {
        this.$message({
          type: "error",
          message: "性别不能相同!",
        });
      } else {
        couple.addByList(this.multipleSelection).then((res) => {
          this.$message({
            type: "success",
            message: "配对成功",
          });
          this.$router.push({ path: "/couple/Info" });
        });
      }
    },
    egg() {
      console.log("生蛋");
    },

    onSubmit() {
      console.log(this.formInline);
      if (
        (this.formInline.ring.trim() == null ||
          this.formInline.ring.trim() == "") &&
        (this.formInline.nickname.trim() == null ||
          this.formInline.nickname.trim() == "") &&
        (this.formInline.location.trim() == null ||
          this.formInline.location.trim() == "") &&
        (this.formInline.species.trim() == null ||
          this.formInline.species.trim() == "") &&
        (this.formInline.year.trim() == null ||
          this.formInline.year.trim() == "") &&
        (this.formInline.gender.trim() == null ||
          this.formInline.gender.trim() == "") &&
        (this.formInline.death.trim() == null ||
          this.formInline.death.trim() == "") &&
        (this.formInline.outStatus.trim() == null ||
          this.formInline.outStatus.trim() == "")
      ) {
        this.$message({
          type: "error",
          message: "请输入查询条件",
        });
        return;
      }
      avaryInfo.serchByCondition(this.formInline).then((res) => {
        console.log(res);
        this.list = res.data.info;
        this.formInline = {
          ring: "",
          nickname: "",
          location: "",
          gender: "",
          species: "",
          year: "",
          death: "",
          outStatus: "",
        };
      });
    },

    handleSizeChange(val) {
      this.limit = val;

      this.fetchData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.fetchData();
    },
    edit(row) {
      console.log(row.id);
    },
    del(row) {
      console.log(row.id);
      this.$confirm("此操作将永久删除该鸟资料, 是否继续?", "提示", {
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
  },
};
</script>
