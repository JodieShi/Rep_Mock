<script>
export default {
  name: "FaTimeline",
  props: {
    reverse: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      timeline: this
    };
  },
  render() {
    const reverse = this.reverse;
    const classes = {
      "fa-timeline": true,
      "is-reverse": reverse
    };
    let slots = this.$slots.default || [];
    if (reverse) {
      slots = slots.reverse();
    }
    return <ul class={classes}>{slots}</ul>;
  }
};
</script>

<style lang="scss">
@import "../theme/mixins/mixins";
@import "../theme/common/var";

.fa-timeline {
  margin: 0;
  height: 80px;
  background-image: linear-gradient(to bottom right, white, blue);
  font-size: $--font-size-base;
  list-style: none;

  & .fa-timeline-item:nth-child(odd) {
    & .fa-timeline-item__wrapper {
      transform: translateY(50%);
    }
  }
  & .fa-timeline-item:nth-child(even) {
    & .fa-timeline-item__wrapper {
      transform: translateY(-100%);
    }
  }

  & .fa-timeline-item:last-child {
    & .fa-timeline-item__tail {
      display: none;
    }
  }
}
</style>
