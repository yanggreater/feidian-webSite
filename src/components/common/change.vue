<template>
    <div class="change">
        <h1>修改资料</h1>
        <div class="avatar">
            <img :src="message.avatar">
            <a @click="showModel = true">修改头像</a>
        </div>
        <Model v-if="showModel" @close="showModel = false" @confirm="updateAvatar">
            <span slot="header">上传头像</span>
            <input type="file" @change="saveFile($event)" accept="image/*"  enctype="multipart/form-data" slot="body">
        </Model>
        <div class="allMessae">
            <tabs v-model="activeKey">
            <pane label="基本信息" name="0">
                <div>
                    <span>姓名</span>
                    <input type="text" v-model="message.name"/>
                </div>
                <div>
                    <span>昵称：</span>
                    <input type="text" v-model="message.nickname">
                </div>
                <div>
                    <span>性别:</span>
                    <input type="radio" id="one" value="男" v-model="message.sex">
                    <label for="one">男</label>
                    <input type="radio" id="two" value="女" v-model="message.sex">
                    <label for="two">女</label>
                </div>
                <div>
                    <span>出生日期:</span>
                    <input type="text" v-model="message.birthday" placeholder="输入格式1998-05-12">
                </div>
                <div>
                    <span>籍贯：</span>
                    <input type="text" v-model="message.homeTown">
                </div>
                <div>
                    <span>专业班级</span>
                    <input type="text" v-model="message.className">
                </div>
                <div>
                    <span>学号</span>
                    <input type="text" v-model="message.id" disabled>
                </div>
                <div>
                    <span>组别</span>
                    <input type="text" v-model="message.group">
                </div>
                <div>
                    <span>所属院系</span>
                    <input type="text" v-model="message.college">
                </div>
                <div>
                    <span>入学年份</span>
                    <input type="text" v-model="message.grade">
                </div>
            </pane>
            <pane label="就业信息" name="１">
                <p>这是标题二的内容</p>
                <div>
                    <span>工作地点:</span>
                    <input type="text" v-model="message.workPlace">
                </div>
                <div>
                    <span>工作单位:</span>
                    <input type="text" v-model="message.company">
                </div>
                <div>
                    <span>研究方向</span>
                    <input type="text" v-model="message.job">
                </div>
                <div>
                    <span>就读高校</span>
                    <input type="text" v-model="message.school">
                </div>
            </pane>
            <pane label="联系方式" name="2">
                <div>
                    <span>QQ:</span>
                    <input type="text" v-model="message.qq">
                </div>
                <div>
                    <span>微信:</span>
                    <input type="text" v-model="message.weChat">
                </div>
                <div>
                    <span>电话:</span>
                    <input type="text" v-model="message.phone"/>
                </div>
                <div>
                    <span>邮箱:</span>
                    <input type="text" v-model="message.email" disabled>
                </div>
            </pane>
        </tabs>
        </div>
        <a @click="save" class="save">保存</a>
        <!-- <button @click="aaa">点击上传</button> -->
    </div>
</template>

<script>
import $ from '../../libs/util.js'
import tabs from '../UI/tabs/tabs.vue'
import pane from '../UI/tabs/pane.vue'
import Model from '../UI/model.vue'
export default {
    data(){
        return{
            email:this.$route.params.email,
            message:{},
            activeKey:'0',
            avatar:'',
            showModel:false
        }
    },
    components:{
        tabs,
        pane,
        Model
    },
    filters:{
        time(value) {
            var date = new Date(value);
            var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return date.getFullYear() + '-' + month + "-" + day;
        }
    },
    methods:{
        
        getMessage(){
            $.ajax.get('/byemail?email='+this.email).then((res) => {
                if(res.status === 200 && res.data.status === 1){
                    this.message = res.data.result;
                    this.transformTime();
                }
                else{
                    alert(res.data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },
        transformTime(){
            this.message.inTime = $.getLastDate(this.message.inTime);
            this.message.birthday = $.getLastDate(this.message.birthday);
        },
        saveFile(e){
            this.avatar = e.target.files[0];
        },
        updateAvatar(){
            if(this.avatar === ''){
                this.showModel = false;
                this.$message.warning('请选择图片文件!');
            }     
            else{
                this.showModel = false;
                var formData = new FormData();
                formData.append('file',this.avatar);
                //console.log(this.avatar);
                $.ajax.post('/upload/avatar',formData,{
                    headers:{'Content-Type':'multipart/form-data'}
                }).then((res) => {
                    if(res.status === 200)
                        //返回服务器上的图片路径
                        console.log(res);
                        this.message.avatar = res.data.result;
                })
                .catch((error)=>{
                    console.log(error);
                });
            }
            
        },
        save(){
            $.ajax.post('/change',this.$qs.stringify(this.message)).then((res) => {
                if(res.status === 200)
                this.$message.success('修改成功!');
            })
            .catch((error) => {
                console.log(error);
            });
            console.log(this.message);
            //console.log(this.message.avatar);
        }
    },
    mounted() {
        this.getMessage();
    },
}
</script>

<style scoped>
    .change{
        position: relative;
        width: 45%;
        margin: 50px auto;
    }
    .change h1{
        padding-left: 10px; 
        border-left: 4px solid #4386dd;
        margin-bottom: 20px;
        font-weight: 100;
    }
    .change .avatar{
        float: left;
        width: 35%;
        height: 400px;
        border-right: 1px solid rgb(155, 155, 155) ;
        text-align: center;
    }
    .change .avatar img{
        display: block;
        margin: 20px auto;
        width: 100px;
        border-radius: 50%;
    }
    .avatar a{
        display: inline-block;
        margin-top: 20px;
    }
    .avatar a,.save{
        color: #ffffff;
        border-radius: 4px;
        cursor: pointer;
        padding: 5px 14px;
        background: #2d8cf0;
    }
    .allMessae{
        float: left;
        margin-left: 30px;
    }
    .save{
        position: absolute;
        bottom: 5px;
        right: 0;  
    }
</style>
