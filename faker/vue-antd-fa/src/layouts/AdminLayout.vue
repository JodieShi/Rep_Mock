<template>
  <a-layout :class="['admin-layout', 'beauty-scroll']">
    <drawer>
      <side-menu></side-menu>
    </drawer>
    <side-menu></side-menu>
    <div class="virtual-side"></div>
    <drawer>
      <div class="setting">
        <a-icon></a-icon>
      </div>
      <setting />
    </drawer>
    <a-layout class="admin-layout-main beauty-scroll">
      <admin-header></admin-header>
      <a-layout-header></a-layout-header>
      <a-layout-content>
        <div>
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <page-footer></page-footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import AdminHeader from './header/AdminHeader'
import PageFooter from './footer/PageFooter'
import Drawer from '../components/tool/Drawer'
import SideMenu from '../components/menu/SideMenu'
import Setting from '../components/setting/Setting'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  components: { Drawer },
  name: 'AdminLayout',
  components: { Setting, AdminHeader, PageFooter, Drawer, SideMenu },
  data() {
    return {
      minHeight: window.innerHeight - 64 - 122
    }
  }
}
</script>

<style lang="less" scoped>

</style>
