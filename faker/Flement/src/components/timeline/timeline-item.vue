<template>
  <!-- 时间轴内容节点 -->
  <li class="fa-timeline-item">
    <!-- 节点尾, 体现为节点间连接线, 最后一个节点不显示 -->
    <div class="fa-timeline-item__tail"></div>

    <!-- 节点图标, 若未自定义节点dot插槽, 显示默认样式或指定icon, 否则显示dot插槽内容 -->
    <div
      v-if="!$slots.dot"
      class="fa-timeline-item__node"
      :class="[
        `fa-timeline-item__node--${size || ''}`,
        `fa-timeline-item__node--${type || ''}`
      ]"
      :style="{
        backgroundColor: color
      }"
    >
      <i v-if="icon" class="fa-timeline-item__icon" :class="icon"></i>
    </div>
    <div v-if="$slots.dot" class="fa-timeline-item__dot">
      <slot name="dot"></slot>
    </div>

    <!-- 节点内容 -->
    <div class="fa-timeline-item__wrapper">
      <!-- 时间戳, 可通过hideTimeStamp属性隐藏, 通过placement属性指定位置 -->
      <div
        v-if="!hideTimestamp && placement === 'top'"
        class="fa-element-item__timestamp is-top"
      >
        {{ timestamp }}
      </div>
      <!-- 内容, 通过插槽呈现 -->
      <div class="fa-timeline-item__content">
        <slot></slot>
      </div>
      <div
        v-if="!hideTimestamp && placement === 'bottom'"
        class="fa-element-item__timestamp is-bottom"
      >
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "FaTimelineItem",
  inject: ["timeline"],
  props: {
    timestamp: String, // 时间戳字符串
    hideTimestamp: {
      // 是否隐藏时间戳
      type: Boolean,
      default: false
    },
    placement: {
      // 时间戳位置, 默认取值bottom
      type: String,
      default: "bottom"
    },
    type: String, // 节点类型
    color: String, // 节点背景颜色
    size: {
      // 节点大小, 默认取值normal
      type: String,
      default: "normal"
    },
    icon: String // 自定义节点图标
  }
};
</script>

<style lang="scss">
@import "../theme/common/var";
@import "../theme/mixins/mixins";

@include b(timeline-item) {
  position: relative;
  float: left;
  padding-left: 20px;

  @include e(node) {
    position: absolute;
    background-color: $--timeline-node-color;
    border-radius: 50%;

    @include m(normal) {
      width: $--timeline-node-size-normal;
      height: $--timeline-node-size-normal;
    }
  }

  @include e(tail) {
    position: absolute;
    width: 100%;
    top: 4px;
    border-top: 5px solid bisque;
  }
}
</style>
