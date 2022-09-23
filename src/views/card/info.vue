<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="脚环号">
        <el-input v-model="formInline.ring" placeholder="脚环号"></el-input>
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
    >
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

      <el-table-column label="卡片图" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="400"
            trigger="click"
            v-if="scope.row.url"
          >
            <el-image :src="scope.row.url"></el-image>
            <el-button slot="reference" size="mini">查看</el-button>
          </el-popover>

          <!-- <div class="demo-image__preview">
            <el-image
              style="width: 250px; height: 250px"
              :src="scope.row.url"
              :preview-src-list="[scope.row.url]"
            >
              <div slot="error" class="image-slot" style="padding-top: 15px">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div> -->
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="showButton"
            type="warning"
            size="mini"
            plain
            @click="jumpToAddCard(scope.row)"
            >选中卡片并返回</el-button
          >
          <router-link :to="'/card/edit/' + scope.row.id">
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
import card from "@/api/card";
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
      showButton: false,
      add: false,
      edit: false,
      formInline: {
        ring: "",
      },
    };
  },
  created() {
    this.fetchData();

    console.log(this.$route.params);
    if (this.$route.params) {
      if (this.$route.params.path == "/avary/add") {
        this.showButton = true;
        this.add = true;
      } else {
        this.showButton = true;
        this.edit = true;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "avaryAdd" || to.name == "avaryEdit") {
      console.log(to);
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  },
  methods: {
    fetchData() {
      let page = this.page;
      let limit = this.limit;
      console.log(limit);
      this.listLoading = true;
      card.getList(page, limit).then((response) => {
        this.list = response.data.rows;
        console.log(this.list);
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    onSubmit() {
      console.log(this.formInline);
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
      this.$confirm("此操作将永久删除该卡片信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        card
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
    jumpToAddCard(row) {
      this.select = row;
      // this.$router.push({
      //   path: "/egg/info",
      //   name: "Result",
      //   params: {
      //     list: {
      //       parentNickname,
      //       parentLocation,
      //     },
      //   },
      // });
      this.$router.go(-1);
    },
  },
};
</script>
