### 组件引入
import Alert from '@/components/Alert/'
### 组件注册
components: { Alert }
### 组件使用
```js
<Alert :alert.sync="alert" @close="closeAlert()">
</Alert>
```
### Props
属性 | 类型 | 说明 | 默认值
:- | :- | :- | :-
alert | Object | 弹窗配置对象 | -

##### 弹窗配置对象
属性 | 类型 | 说明 | 默认值
:- | :- | :- | :-
title | String | dialog的标题 | -
footer | Boolean | 是否显示底部） | false
width | Number | 组件宽度，默认600px，为了响应式, max-width 为90% 非必传| 600
showalert | Boolean | 是否打开弹窗（必传） | -

### 组件方法
方法名 | 说明
:- | :-
无

### 组件事件
方法名 | 说明
:- | :-
close | 关闭弹窗回调
confirm | 确认回调

### 组件slot
组件默认没有内容，若需添加内容需以slot形式自行添加。


