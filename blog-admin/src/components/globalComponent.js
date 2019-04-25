import Vue from 'vue'
import PaginationBase from '@/components/Pagination/'
import Alert from '@/components/Alert/'

// 全局注册分页组件
Vue.component(PaginationBase.name, PaginationBase)
Vue.component(Alert.name, Alert)
