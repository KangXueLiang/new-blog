<template>
  <div v-loading="loading">
    <Editor v-model="tinymceHtml" :init="editorInit"></Editor>
  </div>
</template>
<script>
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/modern/theme'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/preview'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/help'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/advlist'
  import 'tinymce/plugins/insertdatetime'

  export default {
    name: 'home',
    components: {
      Editor
    },
    props: {
      defaultText: {
        type: String,
        default: '请输入内容'
      },
    },
    // watch: {
    //   defaultText(val) {
    //     this.tinymceHtml = val
    //   }
    // },
    mounted() {
      tinymce.init({})
      setTimeout(() => {
        this.loading = false
      }, 800)
    },
    data() {
      return {
        loading: true,
        // 编辑器内容
        tinymceHtml: this.defaultText,
        // 编辑器配置
        editorInit: {
          height: 300,
          branding: false,
          skin_url: '/static/tinymce/skins/lightgray',
          language_url: '/static/tinymce/zh_CN.js',
          language: 'zh_CN',
          fontsize_formats: "12px 14px 16px 18px 20px 24px 28px 30px", // 替换默认的字体大小
          plugins: 'link image preview table help lists colorpicker textcolor wordcount contextmenu advlist insertdatetime ',
          toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          /**
           * 上传
           * blobinfo 包含上传文件的信息,
           * success 和 failure 是函数，上传成功的时候向 success 传入一个图片地址，失败的时候向 failure 传入报错信息
           */
          images_upload_handler: (blobInfo, success, failure) => {
            // console.log('blobInfo', blobInfo, 'failure', failure)
            let formData = new FormData()
            formData.append('file', blobInfo.blob())
            let headers = {'Content-Type': 'multipart/form-data'}
            this.$http.post('api/upload', formData, headers)
              .then(res => {
                if (res.code === 0) {
                  success(res.data.url)
                }
              })
              .catch(error => {
                console.error(error)
                failure('上传失败，请重试')
              })
          }
        }
      }
    },
    methods: {
      // 设置编辑器内容
      setText(val) {
        // console.log(val)
        this.tinymceHtml = val
      },
      // 获取编辑器内容
      getEditText() {
        return this.tinymceHtml
      }
    }
  }
</script>
