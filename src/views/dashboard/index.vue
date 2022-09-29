<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{ date, data }" class="calItem">
        <div class="cell" @click="clickCell(data.day)">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split("-").slice(2).join("-") }}
            {{ data.isSelected ? data.day : "" }}
          </p>
        </div>
        <div
          v-for="item in calendarList"
          :key="item.index"
          style="overflow: hidden"
        >
          <div style="overflow: hidden" :class="item.type">
            <span v-if="item.date == data.day">
              {{ item.content }}
            </span>
          </div>
        </div>
      </template>
    </el-calendar>
    <el-card class="box-card" style="margin: auto; margin-bottom: 1%">
      <div slot="header" class="clearfix">
        <span>{{ selectedDay }}当日事件</span>
      </div>
      <div v-for="item in calendarList" :key="item.index">
        <div :class="item.type">
          <span v-if="item.date == selectedDay">
            {{ item.content }}

            <el-button
              style="float: right; padding: 2px"
              icon="el-icon-edit"
              @click="clickEdit(item)"
              circle
            ></el-button>

            <el-button
              icon="el-icon-delete"
              style="float: right; padding: 2px"
              @click="clickDelete(item)"
              circle
            ></el-button>
          </span>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" style="margin: auto">
      <div slot="header" class="clearfix">
        <span>事件</span>
      </div>

      <el-form label="日期" :label-width="formLabelWidth">
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-date-picker
            v-model="value"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width: 60%"
          />
        </el-form-item>

        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择类别">
            <el-option label="蛋" value="egg"></el-option>
            <el-option label="雏鸟" value="nestling"></el-option>
            <el-option label="成鸟" value="bird"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin: auto">
          <el-button type="primary" @click="submitform()">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import calendar from "@/api/calendar";
import moment from "moment";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    var date = moment(this.value).format("yyyy-MM-DD");
    console.log(date);
    this.getEvents(date),
      this.$nextTick(() => {
        // 点击上个月
        let prevBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(1)"
        );
        prevBtn.addEventListener("click", () => {
          // this.value = this.moment(this.value).format("YYYY-MM");
          // console.info(this.value);
          // this.handleSchedule();
          date = moment(this.value).format("yyyy-MM-DD");
          this.getEvents(date);
        });
        // 点击今天
        let currBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(2)"
        );
        currBtn.addEventListener("click", () => {
          // this.value = this.moment(this.value).format("YYYY-MM");
          // console.info(this.value);
          // this.handleSchedule();
          console.log(this.value);
          date = moment(this.value).format("yyyy-MM-DD");
          this.getEvents(date);
        });
        // 点击下个月
        let nextBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(3)"
        );
        nextBtn.addEventListener("click", () => {
          // this.value = this.moment(this.value).format("YYYY-MM");
          // console.info(this.value);
          // this.handleSchedule();
          console.log(this.value);
          date = moment(this.value).format("yyyy-MM-DD");
          this.getEvents(date);
        });
      });
  },
  data() {
    return {
      calendar: {},
      value: new Date(),
      format: moment(this.value).format("yyyy-MM-DD"),
      calendarList: [],
      cardVisible: false,
      editButtonVisible: false,
      form: {},
      formLabelWidth: "120px",
      selectedDay: "",
    };
  },
  methods: {
    getEvents(date) {
      this.calendar = {
        date,
      };

      calendar.getEvent(this.calendar).then((res) => {
        this.calendarList = res.data.events;
      });
    },
    addNewEvent(data) {
      this.cardVisible = true;
    },
    submitform() {
      if (this.form.id != null) {
        this.editEvent();
      } else {
        this.addEvent();
      }
    },
    addEvent() {
      console.log(this.form);
      console.log(this.value);
      this.form.date = this.value;
      console.log(this.form);
      calendar
        .addEvent(this.form)
        .then((res) => {
          console.log(res.data.date);
          var date = moment(res.data.date).format("yyyy-MM-DD");
          this.getEvents(date);
          this.form = {};
          this.$message({
            type: "success",
            message: "添加日历成功!",
          });
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: "添加日历失败",
          });
        });
    },
    editEvent() {
      calendar
        .updateEvent(this.form)
        .then((res) => {
          console.log(res.data.date);
          var date = moment(res.data.date).format("yyyy-MM-DD");
          this.getEvents(date);
          this.form = {};
          this.$message({
            type: "success",
            message: "修改日历成功!",
          });
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: "修改日历失败",
          });
        });
    },
    clickCell(day) {
      this.selectedDay = day;
    },
    clickEdit(item) {
      console.log(item);
      this.form = item;
    },
    clickDelete(item) {
      this.$confirm("此操作将永久删除该日程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        calendar
          .remove(item.id)
          .then((res) => {
            console.log(res.data.date);
            var date = moment(res.data.date).format("yyyy-MM-DD");
            this.getEvents(date);
            this.form = {};
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch((res) => {
            this.$message({
              type: "error",
              message: "删除失败",
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

<style lang="scss" scoped>
.el-calendar-table thead th:before {
  content: "星期";
}

.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    // font-size: 30px;
    // line-height: 46px;
  }
}
.cell {
  font-weight: 700;
}
.calItem {
  line-height: 30px;

  overflow: hidden;
}

.el-backtop,
.el-calendar-table td.is-today {
  color: #7000bd;
}

.dashboard-container.el-calendar .el-calendar__header {
  color: blue;
}
.main-container.app-main.dashboard-container.el-calendar.el-calendar__body.el-calendar-table.el-calendar-table__row.el-calendar-day {
  overflow: hidden !important;
}

.is-selected {
  color: #9292cc;
}

.bird {
  margin: 2px;
  color: rgb(246, 238, 238);
  padding: 0 5px;
  background-color: #94a5b8;
  border-radius: 8px;
  overflow: hidden;
}
.egg {
  margin: 2px;
  padding: 0 5px;
  color: rgb(251, 248, 248);
  background-color: #bc6161;
  border-radius: 8px;
  overflow: hidden;
}
.nestling {
  margin: 2px;
  padding: 0 5px;
  color: rgb(254, 253, 253);
  background-color: #f6863b;
  border-radius: 8px;
  overflow: hidden;
}
.other {
  margin: 2px;
  padding: 0 5px;
  color: rgb(247, 245, 245);
  background-color: #58966b;
  border-radius: 8px;
  overflow: hidden;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
