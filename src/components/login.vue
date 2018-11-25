<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/logo.png"/>
        </div>
        <h3 class="title">Welcome to feidian</h3>
        <div class="user-info">
            <div class="login-message">
                <input type="text" v-model="email" placeholder="请输入邮箱" class="login-name" :class="{error:this.errorEmail}"/>
                <span>*</span>
                <p v-if="errorEmail">内容不能为空</p>
            </div>
            <div class="login-message">
                <input type="password" v-model="password" placeholder="请输入密码" class="login-password" :class="{error:this.errorPassWord}"/>
                <span>*</span>
                <p v-if="errorPassWord">内容不能为空</p>
            </div>
            
        </div>
        <div class="checkbox">
            <input type="checkbox" v-model="checked"/>
            <span>记住密码  </span>
        </div>
        
        <a class="button" @click="handleLogin">登 录</a>
        <div class="goToReg">
            <span>还没有沸点账号？</span>
            <router-link to="/register" >立即注册</router-link>
        </div>
        <!-- <Alert :closed="tip.closed" :type="tip.type">
            <span>{{tip.message}}</span>
        </Alert> -->
    </div>
</template>

<script>
import $ from '../libs/util.js'
import Alert from './common/alert.vue'
export default {
    data () {
        return {
            email:'',
            password:'',
            errorEmail:false,
            errorPassWord:false,
            checked:false,
        }
    },
    components:{
        Alert
    },
    computed:{
        form:function() {
            return {
                email:this.email,
                password:this.password
            }
        }
    },
    methods:{
        handleLogin () {
            if(this.email === '' || this.password === ''){
                if(this.email === '') this.errorEmail = true;
                if(this.password === '') this.errorPassWord = true;
            }else{
                this.errorEmail = false;
                this.errorPassWord = false;
                $.ajax.post('/login',this.$qs.stringify(this.form)).then((res) => {
                    if(res.status === 200 && res.data.status === 1){
                        //localStorage.setItem('form',JSON.stringify(this.form));
                        this.$store.dispatch('getLoginMess',this.form.email);
                        //console.log(JSON.parse(localStorage.getItem('form')));
                        this.$router.push({path:'/index',query:{email:this.email}});
                    }else{
                        this.$message.error(res.data.error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            //console.log(this.tip);
        },
        setChecked() {
            this.checked = document.cookie.length > 0
        },
        setCookie(c_name, c_pwd, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        },
        getCookie: function() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == 'userName') {
                        this.email = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == 'userPwd') {
                        this.password = arr2[1];
                    }
                }
            }
        },
        clearCookie: function() {
            this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        }
    },
    watch:{
        checked(val){
            if(val){
                this.setCookie(this.email, this.password, 7);
            }else{
                this.clearCookie();
            }
            //console.log(val);
        },
    }, 
    mounted (){
        this.setChecked();
        this.getCookie();
    }
    
}
</script>

<style scoped>
    *{
        margin-top: 10px;
    }
    .login {
        width: 280px;
        height: 380px;
        font-size: 14px;
        margin: 80px auto;
        padding-top: 10px;
        text-align: center;
        border-radius: 6px;
        background:#ffffff;
    }
    .login .logo img{
        width: 60px;
        padding-left: 30px;
    }
    .user-info .login-message{
        padding: 0px 10px;
    }
    .login .title{
        font-weight: 600;
        font-size: 20px;
    }
    .login-password,.login-name {
        width: 200px;
        height: 32px;
        padding: 0 10px;
        border: 1px solid #d7dde4;
        border-radius: 4px;
        color: #657180;
        outline: none;
    }
    .login-message p{
        font-size: 12px;
        margin-top: 0; 
    }
    input:focus {
        border: 1px solid #3399ff;
    }
    .user-info span,.user-info p{
        
        color: red; 
    }
    .checkbox{
        float: left;
        margin-left: 25px;
        color: #17233d;
    }
    .button {
        display: inline-block;
        cursor: pointer;
        border-radius: 4px;
        color: #fff;
        background: #2d8cf0;
        margin: 15px 0;
        padding: 8px 95px;
    }
    .button:hover{
        background:#5cadff;
    }
    .goToReg {
        padding-right: 30px;
        text-align: right;
        color: #9ea7b4;
        font-size: 12px;
    }
    .goToReg a:hover{
        color: #027efad8;
        text-decoration: underline;
    }
    .error{
        border: 1px solid red;
    }
</style>
