<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
            :hide-timestamp="hideTimestamp"
          >
            <!-- <template slot="dot"><div></div></template> -->
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <fa-timeline :reverse="reverse">
          <fa-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
            :hide-timestamp="hideTimestamp"
          >
            {{ activity.content }}
          </fa-timeline-item>
        </fa-timeline>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FaTimeline from "./Timeline.vue";
import FaTimelineItem from "./timeline-item.vue";
export default {
  name: "timelineDemo",
  components: {
    FaTimeline,
    FaTimelineItem
  },
  data() {
    return {
      reverse: false,
      hideTimestamp: false,
      activities: [
        {
          content: "周一",
          timestamp: "2020-12-21"
        },
        {
          content: "周二",
          timestamp: "2020-12-22"
        },
        {
          content: "周三",
          timestamp: "2020-12-23"
        },
        {
          content: "周四",
          timestamp: "2020-12-24"
        },
        {
          content: "周五",
          timestamp: "2020-12-25"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
/* .el-timeline-item {
  float: left;
} */
</style>
