<template>
    <div class="card" @click="goPerson">
        <div>
            <span>姓名:</span>
            <span>{{data.name}}</span>
        </div>
        <div>
            <span>邮箱:</span>
            <span>{{data.email}}</span>
        </div>
        <div>
            <span>组别:</span>
            <span>{{data.group}}</span>
        </div>
        <div  v-if="isAdmin" @click.stop="handleRemove">
            <span>删除</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        goPerson() {
            let email = this.data.email;
            this.$router.push('/person/'+email);
        },
        handleRemove() {
            //alert('点击删除');
            this.$store.dispatch('removeMess',this.data.email);
        }
    }
}
</script>

<style scoped>
    .card{
        padding: 10px 50px;
        margin-top:20px; 
        border: 1px solid yellow;
    }
    .card div{
        border-bottom:1px solid red; 
        
    }
</style>
