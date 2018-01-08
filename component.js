var Main=Vue.component("Main",{

    template:`
         <div class="body">
         <div class="content">
          <div class="left">
             <router-view name="left"></router-view>
         </div>
         <div class="right">
             <router-view name="right"></router-view>
         </div>
</div>
        
</div>
     `
})
var left=Vue.component("left",{
    data(){
        return {
            menu: [],
        }
    },
    template:`<div>
            <ul >
             <li v-for="v in params"><router-link :to="'#'+v.id">{{v.content}}</router-link>
                <ul><li v-for="t in v.child" ><router-link :to="'#'+t.id">{{t.content}}</router-link></li></ul>
             </li>
            </ul>
        </div>`,
    computed:{
        params(){
            var arr = []
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    var obj=this.menu[i]
                    arr.push(obj)
                }else{
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i])
                            }else{
                                arr[j].child=[]
                                arr[j].child.push(this.menu[i])
                            }
                        }
                    }
                }
            }
            return arr;
        }
    },
    watch:{
        $route(){
            var num=this.$route.hash.slice(1);
            var pos=document.querySelector(".a"+num).offsetTop-70;
            console.log(num,pos)
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({number: document.querySelector('.right').scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.number.toFixed(0)
                })
                .start()
            animate()
        }
    },
    mounted(){
        fetch("./demo.txt").then(function (e) {
            return e.json()
        }).then((e)=>{
            this.menu=e;
        })
    },
})
var right=Vue.component("right",{
    data(){
        return {
            txt:'',
        }
    },
    template:`<div v-html="txt"></div>`,
    mounted(){
        fetch('./content.html').then(function (e) {
            return e.text()
        }).then((e)=>{
            this.txt=e;
        })
    }
})
var Quick=Vue.component('Quick',{
    template:`
     <div class="quick">
       Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。
       与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。
       Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。
       另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动.
     </div>
    `
})