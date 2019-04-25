### 组件引入
import Tabs from '@/components/Tabs/'
### 组件注册
components: { Tabs }
### 组件使用
```js
  <tabs :lists="tabLists" // 为上方Array结构
  :defaultTabIndex="defaultTabIndex" // 默认选中项
  @select="tabSelectChange" // tab点击后事件
  ></tabs>
```
### Props
属性 | 类型 | 说明 | 默认值
:- | :- | :- | :-
lists | Array | tab配置数组，每个值是一个对象，内有name和id两个字段 | -
defaultTabIndex | String | 默认tab的index | 0

### 组件方法
方法名 | 说明
:- | :-
无

### 组件事件
方法名 | 说明
:- | :-
select | 选中tab回调



