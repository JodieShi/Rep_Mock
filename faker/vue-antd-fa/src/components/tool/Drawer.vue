<template>
  <div>
    <div :class="['mask', visible ? 'open' : 'close']" @click="close"></div>
    <div :class="['drawer', placement, visible ? 'open' : 'close']">
      <div ref="drawer" class="content beauty-scroll">
        <slot></slot>
      </div>
      <div
        v-if="showHandler"
        :class="['handler-container', placement, visible ? 'open' : 'close']"
        ref="handler"
        @click="toggle"
      >
        <slot v-if="$slots.handler" name="handler"></slot>
        <div v-else class="handler">
          <a-icon :type="visible ? 'close' : 'bars'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drawer'
}
</script>

<style>

</style>