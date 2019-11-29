<template>
  <div class="user-info-main">
    <h2>User Info</h2>
    <main style="position: relative;">
      <el-form ref="form" :model="form" label-width="160px" style="width: 300px;">
        <el-form-item label="User Name">
          <el-input v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="Position">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
        <el-form-item label="City">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item label="Self Introduction">
          <el-input v-model="form.self_introduction" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submit">submit</el-button>
        </el-form-item>
      </el-form>
      <!-- 设置头像 -->
      <div class="set-avatar">
        <span >Avatar</span>
        <my-upload
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="show"
          field="file"
          :width="300"
          :height="300"
          :headers="headers"
          url="http://localhost:3010/api/upload"
          img-format="jpg"
        >
        </my-upload>
        <div v-if="form.avatar" class="avatar">
          <img :src="form.avatar" >
        </div>
        <div v-else class="avatar">
        </div>
        <el-button @click="toggleShow" size="mini" style="width: 150px;" icon="el-icon-upload2">Change Avatar</el-button>
      </div>
    </main>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import 'babel-polyfill'
import myUpload from 'vue-image-crop-upload'
export default {
  components: {
    myUpload
  },
  data() {
    return {
      form: {
        user_name: '',
        position: '',
        city: '',
        self_introduction: '',
        avatar: ''
      },
      headers: {
        Authorization: 'Bearer ' + getToken(),
        Accept: 'application/json, text/plain, */*'
      },
      show: false
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------', field)
      this.form.avatar = imgDataUrl
    },
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
    },
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    },
    // 获取个人资料
    getUserInfo() {
      this.$http.get('api/userInfo').then(res => {
        this.form = res.data
      }).catch(e => {
        console.log('err', e)
      })
    },
    // 提交个人资料
    submit() {
      this.$http.post('api/userInfo', this.form).then(res => {
        console.log(res)
      })
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .user-info-main {
    .el-form-item__label {
      float: none;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user-info-main {
    background-color: #fff;
    padding: 20px;
  }
  .set-avatar {
    position: absolute;
    left: 450px;
    top: 20px;
    span {
      font-size: 14px;
      color: #606266;
      font-weight: 700;
    }
  }
  .avatar {
    margin: 32px 0;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: rgba(0,0,0,0.1);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>

