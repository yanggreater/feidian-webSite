import Vue from 'vue'
import Vuex from 'vuex'
import $ from '../libs/util.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        allMessage:[],
        LoginMess:JSON.parse(localStorage.getItem('loginMess'))
    },
    getters:{
       
    },
    mutations:{
        setAllMess (state,arr){
            // let index = arr.indexOf(state.LoginMess);
            // alert(index);
            // arr.splice(index,1);
            state.allMessage = arr;
        },
        setLoginMess (state){
            state.LoginMess = JSON.parse(localStorage.getItem('loginMess'));
        },
        updateAllMess(state,arr){
            state.allMessage = arr;
        }
    },
    actions:{
        getLoginMess(context,email){
            
            $.ajax.get('/byemail?email='+email).then((res) => {
                localStorage.setItem('loginMess',JSON.stringify(res.data.result));
                context.commit('setLoginMess');
            })
            .then((error) => {
                console.log(error)
            })
        },
        getAllMessage (context){
            $.ajax.post('/all').then((res) => {
                if(res.status === 200)
                    context.commit('setAllMess',res.data.result);
                    console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        },
        removeMess (context,str){
            alert(str);
            $.ajax.post('/delete',qs.stringify({email:str})).then((res) => {
                if(res.status === 200)
                    context.commit('updateAllMess',res.data.result);
            })
        },
        
    }
});
export default store;