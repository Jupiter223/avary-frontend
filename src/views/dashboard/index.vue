<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{ date, data }">
        <div style="height: auto">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split("-").slice(1).join("-") }}
            {{ data.isSelected ? "添加" : "" }}
            {{ data }}
          </p>
          <div v-for="item in calendarList" :key="item.index">
            <div style="width: 100%" :class="item.type">
              <span v-if="item.date == data.day">
                {{ item.content }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>
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
    const date = moment(this.value).format("yyyy-MM-DD");

    this.calendar = {
      date,
    };

    calendar.getEvent(this.calendar).then((res) => {
      this.calendarList = res.data.events;
      console.log(this.calendarList);
    });
  },
  data() {
    return {
      value: new Date(),
      calendar: {},
      calendarList: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.is-selected {
  color: #1989fa;
}
.bird {
  background-color: #caddf3;
}
.egg {
  background-color: #fef7bd;
}
.nestling {
  background-color: #969395;
}
</style>
