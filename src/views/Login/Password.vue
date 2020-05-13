<template>
    <div class="password">
        <LayoutHeader>
            <el-form slot="container">
                <div class="title">
                    <h3>找回密码</h3>
                </div>
            </el-form>
        </LayoutHeader>
    </div>
    
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LayoutHeader from "./LoginHeader.vue";

@Component({
    components:{
        LayoutHeader,
    }
})

export default class Password extends Vue{};

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