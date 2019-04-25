### Props
属性 | 类型 | 说明 | 默认值
:- | :-: | :-: | -:
defaultText | String | 编辑器默认文本（初始时可使用props传入默认内容，其他情况下使用setText） | 请输入内容

### 组件方法（以$refs.xxx.methodName调用）
方法名 | 说明
:- | -:
setText | 设置编辑器的内容，参数为要设置的内容
getEditText | 获取编辑器的文本内容

### 注意
如果是弹窗中使用，需加上v-if，弹窗关闭后，使其可以被正确的卸载，否则有Bug。
