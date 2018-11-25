<template>
    <div class="index">
        <div class="index-introduce" :style="{height}">
            <img src="../assets/logo.png"/>
            <h2>Welcome to Feidian</h2>
            <p>哥大法官的非官方的还让他让他一人同意让他一人同哥大法官的非官方的还让他让他一人同意让他一人同哥大法官的非官方的还让他让他一人同意让他一人同哥大法官的非官方的还让他让他一人同意让他一人同</p>
            <a @click="personalCenter">个人中心</a>
            <p>沸点账号中心</p>
            <!-- {{LoginMessa}} -->
        </div>
        <div class="index-content">
            <div class="search">
                <input type="text" placeholder="输入搜索内容" v-model="search"/>
                <a href="#">搜索</a>
            </div>
            <div class="main-text">
                <h4>关 键 词</h4>
                <div class="icon">
                    <span
                        v-for="(item,index) in keyCode"
                        :key="index"
                        @click="handleFilterByKey(item)">
                        {{item}}
                    </span>
                </div>
            </div>
            <div class="person-message">
                <h4>成员档案</h4>
                <div class="person-message-content">
                    <div v-for="data in pageData" :key="data.id">
                        <Card :data="data" :is-admin="LoginMessage.admin"></Card>
                    </div>
                </div>
                <Page :total-data="filterData" :current="current" @handleCurrent="changeCurrent"></Page>
            </div>
        </div>
    </div>
</template>

<script>
// import $ from '../libs/util.js'
import Card from './common/card.vue'
import Page from './common/page.vue'
export default {
    data(){
        return{
            search:'',
            keyCode:[
                '大前端',
                '安卓',
                'ios',
                '信息安全'
            ],
            searchCode:'',
            current:1,
            email:this.$route.query.email
        }
    },
    components:{
        Card,
        Page
    },
    computed :{
        filterData:function(){
            let arr = [...this.datas];
            if(this.searchCode != ''){
                arr = arr.filter((item) => item.group === this.searchCode);
            }
            return arr;
        },
        height:function(){
            return window.innerHeight+'px';
        },
        datas:function() {
            return this.$store.state.allMessage;
        },
        pageData:function(){
            let arr = [...this.filterData];
            let pageArr = arr.slice((this.current-1)*3,this.current*3);
            return pageArr; 
        },
        LoginMessage:function(){
           return this.$store.state.LoginMess;
            // return $.filterData(this.datas,mess);
        }
    },
    methods:{
        handleFilterByKey(keyCode){
             this.searchCode = keyCode;
        },
        changeCurrent(val){
            this.current = val;
        },
        personalCenter(){
            console.log(this.LoginMessage);
            this.$router.push('/person/'+this.LoginMessage.email);
        } 
    },
    watch:{
        searchCode(){
            this.current = 1;
        }
    },
    mounted(){
        this.$store.dispatch('getAllMessage');
        //console.log(this.LoginMessage);
    }
}
</script>

<style scoped>
    .index{
        position: relative;
    }
    .index-introduce{
        background:#2db7f5;
        color: #fff;
        text-align: center;
        font-family: Cursive ;
        float: left;
        width: 35%;
        padding: 0 40px;
    }
    .index-introduce img{
        background: #ffffff;
        margin: 70px auto 45px auto;
        display: block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .index-introduce h2{
        font-weight: 300;
        padding-bottom: 40px;
    }
    .index-introduce p{
        padding: 0 0 70px 12px;
        font-size: 16px;
        text-indent: 33px;
    }
    .index-introduce a {
        display: inline-block;
        color: #fff;
        padding: 8px 16px;
        background: #2db7f5;
        border-radius: 5%;
        border:1px solid #fff;
    }
    .index-content{
        position: absolute;
        right: 0px;
        float: left;
        width: 55%;
        top: 70px;
    }
    .index-content h4{
        padding-left: 5px;
        margin-top: 20px;
        margin-bottom: 15px;
        font-weight: 200;
        color: #17233d;
        border-left: 3px solid #0677f0;
    }
    .index-content .search input{
        width: 70%;
        height: 40px;
        padding: 0 10px;    
        border: 1px solid #d7dde4;
        border-radius: 4px;
        color: #657180;
        outline: none;
    }
    .index-content .search a{
        padding: 12px;
        color: #ffffff;
        background: #277fdd;
    }
    .index-content .main-text .icon{
        margin: 0 0 15px 10px;
    }
    .index-content .main-text .icon span{
        padding:10px 20px;
        margin-right: 10px;
        background: rgba(121, 120, 120, 0.966);
        color: #ffffff; 
    }
    .index-content .person-message .person-message-content{
        overflow: auto;
        height: 350px;
    }
</style>
