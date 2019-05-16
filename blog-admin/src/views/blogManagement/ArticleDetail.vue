<template>
  <div class="article-alert-wrap">
    <alert
      :alert.sync="alert"
      @close="closeAlert()">
      <div class="alert-content">
        <el-form :model="ruleForm" status-icon :label-position="'left'" ref="ruleForm" label-width="120px">
          <el-form-item label="文章标题：" prop="title">
            <el-input
              v-model.number="ruleForm.title"
              placeholder="请输入文章标题">
            </el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择">
              <el-option
                v-for="item in categoryList"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="封面图：" prop="header_cover">
            <upload-img
                :type="'header_cover'"
                url="api/upload"
                @uploadResponse="imgUploadSuccess"
                @uploadFail="imgUploadFail">
                <div class="upload-slot-text" v-if="!ruleForm.header_cover">
                  选择图片
                </div>
                <img v-else :src="ruleForm.header_cover" alt="封面图片">
            </upload-img>
          </el-form-item>
          <el-form-item label="文章摘要：" prop="summary">
            <el-input
              type="textarea"
              v-model="ruleForm.summary"
              placeholder="请输入文章摘要"
              >
            </el-input>
          </el-form-item>
          <el-form-item label="文章内容：">
            <mark-down  @on-save="save" theme="OneDark" :initialValue="ruleForm.contentMarkdown"></mark-down>
          </el-form-item>
          <el-form-item label="文章标签：">
            <el-tag
              :key="tag"
              v-for="tag in ruleForm.tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="tagVisible"
              v-model="tagValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-form-item>
          <el-form-item label="文章状态：">
            <el-switch
              v-model="ruleForm.status"
              active-text="现在发布"
              inactive-text="存为草稿">
            </el-switch>
          </el-form-item>
        </el-form>
        <div class="modal-container-footer">
          <div class="modal-container-center">
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="closeAlert()">取消</el-button>
          </div>
        </div>
      </div>
    </alert>
  </div>
</template>
<script>
  import MarkDown from 'vue-meditor'
  import UploadImg from '@/components/UploadImg'
  export default {
    components: {
      MarkDown,
      UploadImg
    },
    props: ['article', 'alert'],
    data() {
      return {
        categoryList: [], // 分类列表
        // 表单数据
        ruleForm: {
          category: '',
          contentHtml: '',
          contentMarkdown: '',
          title: '',
          summary: '', // 文章描述
          header_cover: '', // 封面图片
          tags: [], // 标签
          status: true // 文章状态
        },
        content: '', 
        tagVisible: '', // 新标签是否显示
        tagValue: '' // 新标签内
      }
    },
    watch: {
      'alert.showalert' (val) {
        if (this.article && val) {
          this.ruleForm = {
            category: this.article.category,
            title: this.article.title,
            summary: this.article.summary,
            header_cover: this.article.header_cover,
            tags: this.article.tags,
            status: this.article.status,
            contentHtml: this.article.contentHtml,
            contentMarkdown: this.article.contentMarkdown,
          }
          this.content = {
            theme: 'OneDark',
            htmlValue: this.article.contentHtml,
            markdownValue: this.article.contentMarkdown
          }
        } else {
          this.ruleForm = {
            category: '',
            contentHtml: '',
            contentMarkdown: '',
            title: '',
            summary: '', // 文章描述
            header_cover: '', // 封面图片
            tags: [], // 标签
            status: true // 文章状态
          }
          this.content = {
            theme: 'OneDark'
          }
        }
      }
    },
    methods: {
      // 获取文章分类列表
      getCategoryList() {
        this.$http.get('api/category/list', {
          keywords: this.keywords
        }).then(res => {
          this.categoryList = res.data
        }).catch(e => {
          this.$message.error(e || '获取文章列表失败')
        })
      },
      restore() {
      },
      save(res) {
        this.content = res
      },
      // 主图上传
      imgUploadSuccess(res) {
        console.log('图片上传回调', res)
        const that = this
        const img =  new Image()
        img.src = res.url
        img.onload = function() {
          that.ruleForm.header_cover = res.url
        }
      },
      imgUploadFail() {
        this.$message({ type: 'error', message: '图片上传出错' })
      },
      // 关闭弹窗
      closeAlert() {
        this.$refs.ruleForm.resetFields()
        this.restore()
        this.$emit('close')
      },
      // 确认
      submitForm() {
        let _data = {
          title: this.ruleForm.title,
          summary: this.ruleForm.summary, // 文章描述
          header_cover: this.ruleForm.header_cover, // 封面图片
          contentHtml: this.content.htmlValue,
          contentMarkdown: this.content.markdownValue,
          tags: this.ruleForm.tags, // 标签
          status: this.ruleForm.status,
          category: this.ruleForm.category
        }
        let url = ''
        if (this.article) {
          _data.id = this.article._id
          url = 'api/articles/modify'
        } else {
          url = 'api/articles/add'
        }
        this.$http.post(url, _data).then(() => {
          if (this.article) {
            this.$message.success('编辑文章成功')
          } else {
            this.$message.success('新增文章成功')
          }
          this.restore()
          this.$emit('submit')
        }).catch(err => {
          console.log('错误信息', err)
        })
      },
      // 删除一个标签
      handleClose(tag) {
        this.ruleForm.tags.splice(this.ruleForm.tags.indexOf(tag), 1)
      },
      // 展示标签输入框
      showInput() {
        this.tagVisible = true
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      // 确认添加标签
      handleInputConfirm() {
        let tagValue = this.tagValue
        if (tagValue) {
          this.ruleForm.tags.push(tagValue)
        }
        this.tagVisible = false
        this.tagValue = ''
      }
    },
    created() {
      this.getCategoryList()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .alert-content {
    padding: 20px;
    .el-form-item__label {
      text-align: right;
      padding-right: 10px;
    }
    .el-select {
      width: 100%;
    }
    .modal-container-center {
      text-align: center;
      button {
        margin-top: 20px;
        width: 100px;
      }
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: middle;
  }
</style>
