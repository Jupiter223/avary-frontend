<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="亲鸟笼编号">
        <el-input
          v-model="formInline.parentLocation"
          placeholder="亲鸟笼编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="亲鸟别名">
        <el-input
          v-model="formInline.parentNickname"
          placeholder="亲鸟别名"
        ></el-input>
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

      <el-form-item label="生蛋日期">
        <el-col :span="11">
          <el-date-picker
            v-model="formInline.birthday"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择出生日期"
            style="width: 150px"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="出生年份">
        <el-input v-model="formInline.year" placeholder="2022"></el-input>
      </el-form-item>

      <el-form-item label="是否受精">
        <el-select v-model="formInline.fertilization" placeholder="是否受精">
          <el-option label="受精" value="1"></el-option>
          <el-option label="未受精" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否出壳">
        <el-select v-model="formInline.hatch" placeholder="是否出壳">
          <el-option label="出壳" value="1"></el-option>
          <el-option label="未出壳" value="0"></el-option>
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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="亲鸟笼编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.parentLocation }}
        </template>
      </el-table-column>
      <el-table-column label="亲鸟别名" align="center">
        <template slot-scope="scope">
          {{ scope.row.parentNickname }}
        </template>
      </el-table-column>
      <el-table-column label="品种" align="center">
        <template slot-scope="scope">
          {{ scope.row.species }}
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
          <div class="demo-image__preview">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.pic"
              :preview-src-list="[scope.row.pic]"
            >
              <div slot="error" class="image-slot" style="padding-top: 15px">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
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

    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([list[1], list[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="coupling(rows)">配对</el-button>

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
      list: null,
      listLoading: true,
      currentPage: 1,
      page: 1,
      limit: 20,
      total: 1,
      input1: "",

      multipleSelection: [],
      formInline: {
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
      breeder.getEggList(page, limit).then((response) => {
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
      this.multipleSelection = val;
    },
    coupling(rows) {},
    egg() {
      console.log("生蛋");
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
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 调用删除api
        breeder
          .removeEgg(row.id)
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
