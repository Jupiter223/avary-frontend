<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="脚环号">
        <el-input v-model="formInline.ring" placeholder="脚环号"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="位置">
        <el-input v-model="formInline.location" placeholder="位置"></el-input>
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
      <el-table-column fixed align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column fixed label="公脚环号" align="center">
        <template slot-scope="scope">
          {{ scope.row.parentList[0].ring }}
        </template>
      </el-table-column>
      <el-table-column fixed label="母脚环号" align="center">
        <template slot-scope="scope">
          {{ scope.row.parentList[1].ring }}
        </template>
      </el-table-column>
      <el-table-column fixed label="昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.parentList[0].nickname }}
        </template>
      </el-table-column>
      <el-table-column label="位置" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parentList[0].location }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品种" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parentList[0].species }}</span>
        </template>
      </el-table-column>

      <el-table-column label="公生日" align="center">
        <template slot-scope="scope">
          {{ scope.row.parentList[0].birthday }}
        </template>
      </el-table-column>

      <el-table-column label="母生日" align="center">
        <template slot-scope="scope">
          {{ scope.row.parentList[1].birthday }}
        </template>
      </el-table-column>

      <el-table-column label="蛋数量" align="center">
        <template slot-scope="scope">
          今年:
          <span class="count" style="padding-right: 2%">{{
            scope.row.eggThisYear
          }}</span>
          总计:
          <span class="count">{{ scope.row.eggTotal }} </span>
        </template>
      </el-table-column>

      <el-table-column label="雏鸟数量" align="center">
        <template slot-scope="scope">
          今年:<span class="count" style="padding-right: 2%">{{
            scope.row.nestlingThisYear
          }}</span>
          总计:<span class="count">{{ scope.row.nestlingTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="查看繁殖详情" align="center">
        <template slot-scope="scope">
          <router-link :to="'/couple/info/' + scope.row.id">
            <el-button icon="el-icon-right" circle></el-button></router-link
        ></template>
      </el-table-column>

      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.otherInfo }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="warning" size="mini"
            >备注</el-button
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
import couple from "@/api/couple";
var moment = require("moment");
export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: "success",
  //       draft: "gray",
  //       deleted: "danger",
  //     };
  //     return statusMap[status];
  //   },
  // },
  data() {
    return {
      list: null,
      listLoading: true,
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
    this.fetchData();
  },
  methods: {
    fetchData() {
      let page = this.page;
      let limit = this.limit;

      this.listLoading = true;
      couple.getList(page, limit).then((response) => {
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
    jumpToEgg() {
      this.$router.push({
        path: "/egg/info",
        name: "Result",
        params: { list: "list" },
      });
    },
    edit(row) {
      console.log(row.id);
      this.$prompt("请输入备注", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          // this.$message({
          //   type: 'success',
          //   message: '备注: ' + value

          // });

          this.coupleInfo.id = row.id;
          this.coupleInfo.otherInfo = value;
          couple
            .updateOtherInfo(this.coupleInfo)
            .then((res) => {
              this.$message({
                type: "success",
                message: "更新成功",
              });
              this.fetchData();
            })
            .catch((res) => {
              this.$message({
                type: "error",
                message: "更新失败!",
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
      this.$confirm(
        "此操作将永久删除该种对及该种对相关蛋、雏鸟信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        // 调用删除api
        couple
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
<style scoped>
.count {
  color: tomato;
  font-weight: 700;
}
</style>
