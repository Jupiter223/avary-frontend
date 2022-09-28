<template>
  <div class="app-container">
    <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="品牌">
        <el-input v-model="formInline.ring" placeholder="脚环号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
     
    </el-form> -->

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
      <el-table-column label="库存" align="center">
        <template slot-scope="scope">
          {{ scope.row.stockNumber }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="盘点库存" align="center">
        <template slot-scope="scope">
          <div>
            <el-input-number
              v-model="scope.row.stockNumber"
              @change="handleChange(scope.row)"
              :min="0"
              :max="100"
              label="库存"
            ></el-input-number>
          </div>
          <el-button type="info" size="mini" @click="confirm(scope.row)"
            >确认</el-button
          >
        </template>
      </el-table-column> -->

      <el-table-column label="盘点时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click="updateStockNumber(scope.row)"
            type="warning"
            plain
            size="mini"
            >盘点库存</el-button
          >
          <el-button
            @click="addStock(scope.row)"
            type="warning"
            plain
            size="mini"
            >入库</el-button
          >
          <el-button
            @click="reduceStock(scope.row)"
            type="warning"
            plain
            size="mini"
            >出库</el-button
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
      showEditNumber: false,
      currentPage: 1,
      page: 1,
      limit: 20,
      total: 1,
      input1: "",
      num: 1,
      stock: {},
      // formInline: {
      //   ring: "",
      // },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let page = this.page;
      let limit = this.limit;

      this.listLoading = true;
      stock.getList(page, limit).then((response) => {
        this.list = response.data.infos;

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
    edit() {
      this.showEditNumber = true;
    },
    addStock(row) {
      console.log(row.id);
      this.$prompt("请输入入库数量", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.stock.itemId = row.itemId;
          this.stock.stockNumber = value;
          stock
            .addStock(this.stock)
            .then((res) => {
              this.$message({
                type: "success",
                message: "入库成功",
              });
              // this.$router.push({
              //   path: "/stock/info",
              // });
              this.fetchData();
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
    reduceStock(row) {
      console.log(row.id);
      this.$prompt("请输入出库/消耗数量", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.stock.itemId = row.itemId;
          this.stock.stockNumber = value;
          stock
            .reduceStock(this.stock)
            .then((res) => {
              this.$message({
                type: "success",
                message: "出库成功",
              });
              // this.$router.push({
              //   path: "/stock/info",
              // });
              this.fetchData();
            })
            .catch((res) => {
              this.$message({
                type: "error",
                message: "出库失败!",
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
    del(row) {
      console.log(row.id);
      this.$confirm("此操作将永久删除该库存信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        stock
          .removeStock(row.id)
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
    updateStockNumber(row) {
      console.log(row);
      this.$prompt(
        "请输入" + row.brand + row.name + row.weight + row.unit + "的目前数量",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      )
        .then(({ value }) => {
          row.stockNumber = value;
          stock
            .updateStockNumber(row)
            .then((res) => {
              this.$message({
                type: "success",
                message: "更新在库成功",
              });
              // this.$router.push({
              //   path: "/stock/info",
              // });
              this.fetchData();
            })
            .catch((res) => {
              this.$message({
                type: "error",
                message: "更新在库失败失败!",
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
    handleChange(value) {},
    onSubmitStock() {
      console.log(this.list);
    },
  },
};
</script>
