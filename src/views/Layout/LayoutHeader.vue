<template>
    <div class="layout-header">
        <el-row>
            <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
                <div class="system-info">
                    <img class="logo" src="@/assets/logo.png" alt="logo">
                    <span class="title">善中在线</span>
                </div>
            </el-col>
            <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
                <el-dropdown @command="userCommand" class="system-user">
                    <span class="userinfo-inner">
                        <img :src="require('@/assets/' + getUser.key + '.jpg')" alt="用户头像">
                        {{getUser.username}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation, Getter, Action } from "vuex-class";

@Component({
    components:{}
})

export default class LayoutHeader extends Vue{
    @Getter("user") getUser;

    created(){
        console.log('user>>>>>>>>>', this.getUser);
    }

    userCommand(command){
        // debugger;
        if (command === 'logout'){
            // 说明惦记得失注销登录
            localStorage.removeItem('tsToken');
            this.$router.push('/login');
        } else if(command === 'userCenter'){
            // console.log('个人中心');
            // 跳转个人中心
            this.$router.push('/user');
        }


    }
}
</script>

<style lang="scss" scoped>
.layout-header {
  background: #495060;
  line-height: 64px;
  height: 64px;
}

.system-info {
  text-align: left;
  .logo {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    margin-top: 12px;
    margin-left: 20px;
    margin-right: 10px;
    float: left;
    position: relative;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    color: azure;
    line-height: 64px;
  }
}
.system-user {
  text-align: right;
  float: right;
  padding-right: 16px;
  .userinfo-inner {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }
}
</style>