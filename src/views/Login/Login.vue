<template>
    <div class="login">
        <LayoutHeader>
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="left" label-width="0px" slot="container">
                <div class="title">
                    <h3>账号密码登录</h3>
                </div>
                <!-- username -->
                <el-form-item prop="username">
                    <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
                        <i slot="prefix" class="fa fa-user-o"></i>
                    </el-input>
                </el-form-item>
                <!-- password -->
                <el-form-item prop="pwd">
                    <el-input type="text" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
                        <i slot="prefix" class="fa fa-lock"></i>
                    </el-input>
                </el-form-item>
                <!-- 登录button -->
                <el-form-item>
                    <el-button :loading="isLogin" @click.native.prevent="handleSubmit" type="primary" style="width:100%;">登录</el-button>
                </el-form-item>
                <!-- 七天登录和忘记密码 -->
                <el-form-item>
                    <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">7天内自动登录</el-checkbox>
                    <el-button @click="$router.push('/password')" type="text" class="forget">忘记密码？</el-button>
                </el-form-item>
            </el-form>
        </LayoutHeader>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import LayoutHeader from "./LoginHeader.vue";

@Component({
    components:{
        LayoutHeader,
    }
})

export default class Login extends Vue{
    // 存储用户信息
    @Action("setUser") setUser: any;
    @Provide() isLogin: boolean = false;
    @Provide() ruleForm: {
        username: String;
        pwd: String;
        autoLogin: Boolean;
    } = {
        username: '',
        pwd: '',
        autoLogin: true,
    };

    @Provide() rules = {
        username: [
            {required: true, message: "请输入账号", trigger: "blur"}
        ],
        pwd: [
            {required: true, message: "请输入密码", trigger: "blur"}
        ]
    };

    handleSubmit(): void{
        (this.$refs["ruleForm"] as any).validate((valid:boolean) => {
            if (valid) {
                this.isLogin = true;
                // console.log('校验通过');
                // 校验通过，发送ajax请求
                (this as any).$axios.post('/api/users/login', this.ruleForm)
                .then((res: any) => {
                    this.isLogin = false;
                    // console.log('res.data>>>>>>>>>>>>>>>>>>>>', res.data);
                    // 将token保存至本地
                    localStorage.setItem('tsToken', res.data.token);
                    // 存储到vuex中
                    this.setUser(res.data.token);
                }).catch(() => {
                    this.isLogin = false;
                })
            } else {
                console.log('校验未通过');
            }

        })
    }
};

</script>

<style lang="scss" scoped>
.title{
    margin: 0px auto 40px;
    text-align: center;
    color: #505458;
}
i {
    font-size: 14px;
    margin-left: 8px;
}
.forget {
    float: right;
}
</style>