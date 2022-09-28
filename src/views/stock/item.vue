<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="品牌">
        <el-input v-model="formInline.brand" placeholder="品牌"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="formInline.name" placeholder="名称"></el-input>
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
      <el-table-column label="品牌" align="center">
        <template slot-scope="scope">
          {{ scope.row.brand }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="规格" align="center">
        <template slot-scope="scope">
          {{ scope.row.weight }} {{ scope.row.unit }}
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click="editStock(scope.row)"
            type="warning"
            plain
            size="mini"
            >入库</el-button
          >

          <router-link :to="'/stock/edit/' + scope.row.id">
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
    <router-link :to="'/stock/add/'">
      <el-button @click="onSubmitStock()" type="warning"
        >添加粮食种类</el-button
      ></router-link
    >
  </div>
</template>

<script>
import stock from "@/api/stock";
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
      num: 1,
      formInline: {
        brand: "",
        name: "",
      },
      stock: {},
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
      stock.getItemList(page, limit).then((response) => {
        this.list = response.data.rows;
        console.log(this.list);
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    onSubmit() {
      console.log(this.formInline);
      stock
        .serchByCondition(this.formInline)
        .then((res) => {
          console.log(res);
          this.list = res.data.info;
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: "未搜到相应信息",
          });
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
    editStock(row) {
      console.log(row.id);
      this.$prompt("请输入入库数量", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.stock.itemId = row.id;
          this.stock.stockNumber = value;
          stock
            .addStock(this.stock)
            .then((res) => {
              this.$message({
                type: "success",
                message: "入库成功",
              });
              this.$router.push({
                path: "/stock/info",
              });
            })
            .catch((res) => {
              this.$message({
                type: "error",
                message: "入库失败!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },

    edit() {},

    del(row) {
      console.log(row.id);
      this.$confirm("此操作将永久删除该粮食信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        stock
          .removeItem(row.id)
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
    handleChange(value) {},
    onSubmitStock() {
      console.log(this.list);
    },
  },
};
</script>
