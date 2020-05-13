<template>
    <div class="login">
        <LayoutHeader>
            <el-form slot="container">
                <div class="title">
                    <h3>账号密码登录</h3>
                </div>
            </el-form>
        </LayoutHeader>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import LayoutHeader from "./LoginHeader.vue";

@Component({
    components:{
        LayoutHeader,
    }
})

export default class Login extends Vue{};

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