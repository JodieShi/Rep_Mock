<template>
  <div class="page-layout">
    <page-header
      ref="pageHeader"
      :style="`margin-top: ${multiPage ? 0 : -24}px`"
      :breadcrumb="breadcrumb"
      :title="pageTitle"
      :logo="logo"
      :avatar="avatar"
    >
      <slot name="action" slot="action"></slot>
      <slot name="content" slot="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p>{{ desc }}</p>
        <div v-if="this.linkList" class="link">
          <template v-for="(link, index) in linkList">
            <a :key="index" :href="link.href">
              <a-icon :type="link.icon" />
              {{ link.title }}
            </a>
          </template>
        </div>
      </div>
      <slot v-if="this.$slots.extra" slot="extra" name="extra"></slot>
    </page-header>
    <div ref="page" :class="['page-content', layout, pageWidth]"><slot></slot></div>
  </div>
</template>

<script>
import PageHeader from '@/components/page/header/PageHeader'
// import { mapState, mapMutations } from 'vuex'
// import { getI18nKey } from '@/utils/routerUtil'
export default {
  name: 'PageLayout',
  components: { PageHeader }
}
</script>

<style>

</style>