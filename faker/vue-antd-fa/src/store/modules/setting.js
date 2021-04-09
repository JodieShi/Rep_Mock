import config from '@/config'
import { ADMIN } from '@/config/default'
import { formatFullPath } from '@/utils/i18n'
import { filterMenu } from '@/utils/authority-utils'
import { getLocalSetting } from '@/utils/themeUtil'
import deepClone from 'lodash.clonedeep'

export default {
  namespaced: true, 
  state: {
    isMobile: false
  }
}