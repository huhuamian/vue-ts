<template>
    <div class="password">
        <LayoutHeader>
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" slot="container">
                <div class="title">
                    <h3>找回密码</h3>
                </div>
                <!-- username -->
                <el-form-item prop="username">
                    <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号" >
                        <i slot="prefix" class="fa fa-user-o"></i>
                    </el-input>
                </el-form-item>
                <!-- email -->
                <el-form-item prop="email">
                    <el-input type="text" v-model="ruleForm.email" aria-autocomplete="off" placeholder="邮箱">
                        <i slot="prefix" class="fa fa-envelope-o"></i>
                    </el-input>
                </el-form-item>
                <!-- 确定 -->
                <el-form-item>
                    <el-button :loading="loading" @click.native.prevent="handleSubmit" type="primary" style="width:100%;">确定</el-button>
                </el-form-item>
            </el-form>
        </LayoutHeader>
    </div>
    
</template>

<script lang="ts">
import {Component, Vue, Provide} from "vue-property-decorator";
import LayoutHeader from "./LoginHeader.vue";

@Component({
    components:{
        LayoutHeader,
    }
})

export default class Password extends Vue{
    @Provide() loading:boolean = false; // 是否发起网络请求

    @Provide() ruleForm: {
        username: String,
        email: String,
    } = {
        username: '',
        email: '',
    }

    @Provide() rules = {
        username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'},
        ]
    }

    // 提交信息的方法
    handleSubmit(): void{
        (this.$refs["ruleForm"] as any).validate((valid: Boolean) => {
            if (valid) {
                // 校验通过
                this.loading = true;

                // 发送ajax请求
                (this as any).$axios.post('/api/users/findPwd', this.ruleForm)
                .then((res: any) => {
                    this.loading = false;
                    // console.log('res.data>>>>>>>', res.data);
                    this.$message({
                        message: res.data.msg,
                        type: "success"
                    });
                    // 跳转登录页面
                    this.$router.push('/login');
                }).catch((err: any) => {
                    this.loading = false;
                })
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
</style>