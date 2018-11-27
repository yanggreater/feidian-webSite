<template>
    <div class="register">
        <div class="register-img">
            <img src="../assets/bg.jpg" />
        </div>
        <div class="registerNav">
            <a href="http://www.52feidian.com"><img src="../assets/logo.png"/>沸点官网</a>
            <img src="../assets/qq.png" class="qq" ref="qq"/>
            <span @mouseover="handleDisplay" @mouseout="handleMiss"><img src="../assets/qq.png"/>沸点交流群</span>
            <a href="http://wiki.52feidian.com">wiki账户</a>
            <span><router-link to="/login">登录</router-link></span>
        </div>
        <div class="register-message">
            <h1>欢迎加入沸点</h1>
            <h3>每一天,都要进步!</h3>
            <div class="form">
                <div>
                    <input 
                        type="text" 
                        class="form-input" 
                        placeholder="邮箱" 
                        :class="{error:error.email}"
                        @blur="handleError('email')"
                        v-model="registerForm.email"/>
                    <transition name="display">
                        <i v-show="error.email"><span class="icon">!</span>邮箱不能为空</i>
                    </transition>
                </div>
                <div>
                    <input 
                        type="password" 
                        class="form-input" 
                        placeholder="密码"
                        :class="{error:error.password}"
                        @blur="handleError('password')"
                        v-model="registerForm.password"/>
                    <transition name="display">
                        <i v-show="error.password"><span class="icon">!</span>密码不能为空</i>
                    </transition>
                </div>
                <div>
                    <input 
                        type="password" 
                        class="form-input" 
                        :class="{error:confirmPassError}"
                        placeholder="确认密码" 
                       
                        v-model="registerForm.confirmPass"/>
                    <transition name="display">    
                        <i v-show="confirmPassError"><span class="icon">!</span>密码不匹配</i>
                    </transition>
                </div>
                <div>
                    <input 
                        type="text" 
                        class="form-input"
                        :class="{error:error.name}"
                        placeholder="姓名"
                        v-model="registerForm.name"
                        @blur="handleError('name')"/>
                    <transition name="display">
                        <i v-show="error.name"><span class="icon">!</span>姓名不能为空</i>
                    </transition>
                </div>
                <div>
                    <input 
                        type="text" 
                        class="form-input"
                        :class="{error:error.id}"
                        placeholder="学号"
                        v-model="registerForm.id"
                        @blur="handleError('id')"/>
                    <transition name="display">
                        <i v-show="error.id"><span class="icon">!</span>学号不能为空</i>
                    </transition>
                </div>
                <div>
                    <select name="select" class="select" v-model="registerForm.group">
                        <option value="大前端">大前端</option>
                        <option value="安卓">安卓</option>
                        <option value="ios">ios</option>
                        <option value="信息安全">信息安全</option>
                    </select>
                </div>
               
            </div>
            <a href="#" @click="handleReg">立即注册</a>
        </div>
        
    </div>
</template>

<script>
import $ from '../libs/util.js'
export default {
    data() {
        return{
            registerForm:{
                email:'',
                password:'',
                confirmPass:'',
                name:'',
                id:'',
                group:'大前端',
            },
            error:{
                email:false,
                password:false,
                name:false,
                id:false,
                group:false
            },
            height:window.innerHeight+'px',
        }
    },
    computed:{
        confirmPassError:function() {
            return this.registerForm.password != this.registerForm.confirmPass;
        },
    },
    methods:{
        handleError (value) {
            if(this.registerForm[value] === '') this.error[value] = true;
            else this.error[value] = false;
        },
        handleReg () {
            
            if(this.registerForm.email ==='' || this.registerForm.password === '' || this.registerForm.confirmPass === ''|| this.registerForm.name === ''|| this.registerForm.group === ''){

                this.$message.warning('请完善您的基本信息!')
            }
            else if(this.registerForm.password != this.registerForm.confirmPass){
                this.$message.warning('请确认密码是否一致!');
            }
            else{
                $.ajax.post('/register',this.$qs.stringify(this.registerForm)).then((res) =>{
                    if(res.status === 200  && res.data.status ===1){
                        //alert('注册成功，请登录！');
                        this.$message.success('注册成功,请登录!')
                        
                    }else{
                        //alert(res.data.error);
                        this.$message.error(res.data.error);
                    }
                    
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        },
        handleDisplay () {
            this.$refs.qq.style.display = 'inline';
        },
        handleMiss () {
            this.$refs.qq.style.display = 'none';
        },
    },
        
}
</script>

<style scoped>
    .register-img img{
        width: 40%; 
        height: 678px;
        display: block;
        float: left;   
    }
    .registerNav {
        float: right;
        margin-top: 25px;
    }
    .registerNav span,.registerNav a{
        font-size:17px; 
        font-weight:100px; 
        padding-right: 25px;
        color: rgb(116, 107, 107);
        cursor: pointer;
    }
    .registerNav span:hover,.registerNav a:hover{
        color: black;
    }
    .registerNav img {
        vertical-align: middle;
        width: 20px;
        padding-right: 5px;
    }
    .registerNav .qq{
        position: absolute;
        top:60px;
        width: 150px;
        display: none;
    }
    .register-message{
        float: right;
        padding: 30px 120px 0px 0px;
        width: 40%;
        overflow: scroll;
    }
    .register-message h3,.register-message h1{
        padding: 10px 0 0 10px;
        font-weight: 100;
    }
    .register-message div{
        padding-top:20px;
    }
    .register-message .select{
        width: 200px;
        height: 45px;
        background: #fff;
        border: 1px solid #d7dde4;
        border-radius: 4px;
        -moz-appearance: none;
        padding-left: 10px;
        outline: none;
        color: #657180;
        font-size: 16px;
    }
    .register-message div i{
        display: block;
        color: red; 
        font-size: 14px;
        padding: 5px 0 0 5px;
    }
    .form-input{
        width: 85%;
        height: 45px;
        font-size: 16px;
        padding: 0 10px;
        border: 1px solid #d7dde4;
        border-radius: 4px;
        color: #657180;
        outline: none;
        background: #fff;
    }
    .form-input:focus {
        border: 1px solid #3399ff;
    }
    .register-message a{
        display: inline-block;
        padding: 10px 36%;
        margin-top: 20px;
        margin-bottom: 50px;
        cursor: pointer;
        border-radius: 4px;
        font-size: 22px;
        color: #fff;
        background: #2d8cf0;
        transition: background .3s ease;
    }
    .register-message a:hover{
        background:#1a7fec;
    }
    .error{
        border: 1px solid #ff5500;
    }
    .icon{
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 50%;
        background: #ff5500;
        color: #fff;
        font-size: 16px;
        margin-right: 5px;
    }
    .display-enter-active{
        animation: display-in .3s;
    }
    .display-leave-active{
        animation: display-in .3s reverse;
    }
    @keyframes display-in{
        0%{
            height: 0;
        }
        25%{
            height: 5px;
        }
        50%{
            height: 10px;
        }
        75%{
            height: 15px;
        }
        100%{
            height: 20px;
        }
    }
</style>
