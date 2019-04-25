### 说明
组件默认只有input区域，slot为必填项，用slot的宽高撑起整个组件，input[type='file']默认宽高100%，opacity: 0;

### Props
属性 | 类型 | 说明 | 默认值
:- | :-: | :-: | -:
type | String | 页面内多处上传时区分用 | -
index | Number | 循环多个上传时区分用 | -
url | String | 上传接口url | -
size | Number | 文件大小限制（单位M）| 2
fileType | Array | 文件格式限制，例如：['image/jpge', 'image/png'] | ['image/jpge', 'image/png', 'jpg', 'png']

### 组件事件
方法名 | 说明
:- | -:
uploadBegin | 开始上传时触发
uploadResponse | 成功上传后触发，将接口返回值直接作为参数传入，需在Page中自行处理返回结果
uploadFail | 上传失败触发，将接口返回值直接作为参数传入

### 组件slot
```
    <upload-img 
      ref="upload"
      :size="5" 
      :url="kpcUploadURL" 
      @uploadResponse="uploadResponse">
      <!-- slot内容 -->
      <div>
        <div>点击上传</div>
      </div>
    </upload-img>
```


