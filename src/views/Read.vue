<template>
  <div class="read noselect">
    <div class="hidebox d-none d-lg-flex d-xl-flex d-md-flex">
      <div class="hidehead" @mouseenter="enter" @mouseleave="leave" :style="show?'opacity: 1;':'opacity: 0;'">
        <div class="showbox">
          <div class="headbox">
            <div class="headlogo"><img src="@/assets/img/logo_min1.png"  alt=""></div>
            <div class="headabout"><span @click="gotohome">home</span><font>></font><span @click="gotoup">{{manhuaname}}</span><font>>第{{now}}话</font></div>
            <div class="lishi"></div>
          </div>
        </div>
      </div>
      <div class="leftbox" :style="'cursor:url('+leftimg+'),auto;'" @click="preimg"></div>
      <div class="rightbox" :style="'cursor:url('+rightimg+'),auto;'" @click="nextimg"></div>
      <div class="hidefoot" @mouseenter="enter" @mouseleave="leave" :style="show?'opacity: 1;':'opacity: 0;'">
        <div class="showbox">
          <div class="footbox">
            <div class="wcss">
              <div class="iconcut" @click="cut">-</div>
              <span class="mauto">{{w100}}%</span>
              <div class="iconadd" @click="add">+</div>
            </div>
            <div class="slider" v-if="okif">
              <div class="text">{{page+1}}/{{max+1}}</div>
              <el-slider class="elslider" v-model="page" :show-tooltip="false" :max='max'></el-slider>
              <!-- <v-slider
                v-model="page"
                :max='max'
              ></v-slider> -->
            </div>
            <div class="caozuo">
              <div class="syihua" @click="premulus">上一话</div>
              <div class="xyihua" @click="nextmulus">下一话</div>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
    <!-- 头部start -->
    <v-overlay :value="infoshow">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="imgbox d-none d-lg-flex d-xl-flex d-md-flex" :style="'width: '+w+'vw;'" >
      <!-- <img 
        class="imgcss"
        src="planb"
        alt="">
      /> -->
      <v-img 
        v-if="okif"
        class="imgcss"
        :src="mangaimg[page][1]?'https://cdn.mangaeden.com/mangasimg/'+mangaimg[page][1]:planb"
        lazy-src="@/assets/img/loading2.gif"
        alt="">
      />
      </v-img>
    </div>
    <v-snackbar
      top
      color="cyan darken-2"
      label="cyan darken-2"
      value="cyan darken-2"
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <!-- 头部end -->
    <!-- 手机端显示 -->
    <div class="sj d-lg-none d-xl-none d-md-none d-sm-flex">
      <div class="leftclick" @click="preimg"></div>
      <div class="centclick" @click="sjheaderclick"></div>
      <div class="rightclick" @click="nextimg"></div>
      <div class="sjheader" v-if="sjheadershow">

          <v-btn icon fab light dark>
            <v-icon style="color:#fff" @click="gotoup">mdi-arrow-left</v-icon>
          </v-btn>

          <div style="line-height: 56px;">{{manhuaname}}</div>

      </div>
      <div class="sjimg">
        <v-carousel v-model="page" hide-delimiters :show-arrows="false" :height="'auto'">
          <v-carousel-item
            v-for="img in mangaimg"
            :key="img[1]"
          >
            <v-img 
              v-if="okif"
              class="imgcss"
              :src="img[1]?'https://cdn.mangaeden.com/mangasimg/'+img[1]:planb"
              lazy-src="@/assets/img/loading2.gif"
              alt="">
            />
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div><span class="sjcount"> {{page+1}}/{{max+1}} 第{{now}}话</span></div>
    </div>
  </div>
</template>

<script>
import userPhoto from '@/assets/img/oo.png'
import leftimg from '@/assets/img/nev.png'
import rightimg from '@/assets/img/next.png'
export default {
  name: 'read',
  data () {
      return {
        snackbar: false,
        text: 'My timeout is set to 2000.',
        timeout: 2000,
        sjheadershow:false,
        planb:userPhoto,
        mangaimg:[],
        infoshow:false,
        manhuamane:'',
        now:1,
        w:50,
        w50:50,
        w100:100,
        page:0,
        max:20,
        show:false,
        okif:false,
        leftimg:leftimg,
        rightimg:rightimg,
        manhualist:[]
      }
    },
  created() {
      //  this.docount()
      //获取当前漫画名字
      var manhuaname = localStorage.getItem('manhuaname');
      this.manhuaname = manhuaname == undefined ? null : JSON.parse(manhuaname);
      //获取当前漫画详情
      var mangeinfo = localStorage.getItem('mangeinfo');
      //获取当前漫画所有漫画列表
      this.manhualist = mangeinfo == undefined ? null : JSON.parse(mangeinfo).chapters;

      //获取当前漫画图片
      var manhuaimg = localStorage.getItem('manhuaimg');
      var manhuaimgs = manhuaimg == undefined ? null : JSON.parse(manhuaimg);
      if(manhuaimgs){
        this.mangaimg=manhuaimgs
        var page = localStorage.getItem('page');
        this.page = page == undefined ? 0 : +JSON.parse(page);
        console.log(this.page)
        this.max = this.mangaimg.length-1
        
        this.now = this.manhualist[this.$route.params.id][0]
        this.okif = true
      }
      else{
        this.ajaxmanhua(this.manhualist[this.$route.params.id][3])
      }
      

  },
  // 监听,当路由发生变化的时候执行
  
  watch: {
    page: function (val) {
      console.log(val)
      localStorage.setItem('page', JSON.stringify(val));
    },
    
  },
  methods:{
    gotoup(){
      this.$router.go(-1)
    },
    //请求当前漫画详情
    ajaxmanhua(a){
      // console.log(a)
      //a为当前话的id
      this.infoshow = !this.infoshow
      const id = 'https://www.mangaeden.com/api/chapter/' + a
      this.axios.get(id).then((response) => {
        this.page=0
        this.mangaimg = response.data.images
        this.infoshow = !this.infoshow
        this.okif = true
        this.mangaimg=this.mangaimg.reverse()
        localStorage.setItem('manhuaimg', JSON.stringify(this.mangaimg));
        localStorage.setItem('page', JSON.stringify(this.page));
        this.max = this.mangaimg.length-1
        this.now = this.manhualist[this.$route.params.id][0]
        // this.docount()
      // })
      }).catch(() => console.log('promise catch err')); //捕获异常
    },
    enter(){
      this.show = !this.show
    },
    leave(){
      this.show = !this.show
    },
    gotohome(){
      this.$router.push('/')
    },
    sjheaderclick(){
      this.sjheadershow = !this.sjheadershow
    },
    nextimg(){
      //点击漫画，会根据id请求相应的漫画列表，点击漫画列表某一话，获取该话漫画所有图片
      //进入图片页面首先，page=0，重点是page不为时，如何判断十分第一次进入页面
      if(this.page==this.mangaimg.length-1){
          this.nextmulus()
      }else{
          this.page+=1
          localStorage.setItem('page', JSON.stringify(this.page));
      }
    
    },
    preimg(){
      //点击漫画，会根据id请求相应的漫画列表，点击漫画列表某一话，获取该话漫画所有图片
      //进入图片页面首先，page=0，重点是page不为时，如何判断十分第一次进入页面
      if(this.page==0){
          this.premulus()
      }else{
        this.page-=1
        localStorage.setItem('page', JSON.stringify(this.page));
      }
    },
    premulus(){
      //跳转到上一话。需要获取到上一话的
      if(this.$route.params.id==0){
        // $.MsgBox.Alert("消息", "已经是第一章了");
        this.snackbar = true
        this.text="已经是第一章了"
      }else{
        localStorage.setItem('manhuaimg', JSON.stringify(''));
        const id = this.$route.params.id-1
        this.$route.params.id = id
        this.ajaxmanhua(this.manhualist[this.$route.params.id][3])
      }
    },
    nextmulus(){
      //跳转到上一话。需要获取到x下一话的
      if(this.$route.params.id==this.manhualist.length-1){
        this.snackbar = true
        this.text="已经是最新一章了"
      }else{
        localStorage.setItem('manhuaimg', JSON.stringify(''));
        const id = +this.$route.params.id+1
        this.$route.params.id =id
        this.ajaxmanhua(this.manhualist[this.$route.params.id][3])
      }
    },
    cut(){
      if(this.w100==50){
        return
      }else{
        this.w100-=10
        this.w=this.w50*this.w100/100
      }
    },
    add(){
      if(this.w100==200){
        return
      }else{
        this.w100+=10
        this.w=this.w50*this.w100/100
      }
    },
    gotoread(){
      
    }
  }
}
</script>

<style lang="scss" scoped>
.leftbox{
  width: 50%;
  height: 100%;
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 5;
}
.rightbox{
  width: 50%;
  height: 100%;
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 5;
}
.read{
  background-color: #212121!important;
  min-height: 100vh;
}
// 头部start 
img{
  width: 100%;
  height: 100%;
}
.iconcut,.iconadd{
  font-size: 32px;
  line-height: 32px;
  cursor:pointer;//鼠标变小手
}
.mauto{
  color: #fff;
  opacity: .9;
  position: absolute;
  font-size: 14px;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  line-height: 36px;
}
.slider{
  font-size: 14px;
  width: 323px;
  display: flex;
  .text{
    color: #777;
    font-size: 14px;
    line-height: 36px;
    margin-right: 20px;
  }
  .elslider{
    width: 100%;
  }
}
.caozuo{
  display: flex;
  position: absolute;
  right: 0;
}
.hidefoot{
  z-index: 1000;
  width: 100%;
  position: fixed;
  opacity: 0;
  bottom: 0px;
  .footbox{
    display: flex;
    justify-content: center;
    position: relative;
    min-width: 1080px;
    max-width: 1160px;
    height: 50px;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 7px;
    .wcss{
      position: absolute;
      left: 0;
      color: #fff;
      opacity: .9;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      width: 120px;
      height: 36px;
      border-radius: 18px;
      border: 1px solid hsla(0,0%,100%,.4);
    }
    .syihua,.xyihua{
      font-size: 14px!important;
      color: rgba(255,255,255,.9);
      line-height: 36px!important;
      cursor:pointer!important;//鼠标变小手
      padding: 0 8px;
      margin-left: 24px;
    }
  }
}
.hidehead{
  z-index: 1000;
  width: 100%;
  position: fixed;
  top: 0px;
  opacity: 0;
}

.showbox{
  background-color: rgba(0,0,0,.9);
}
.headerhover,.foothover{
  cursor:pointer;//鼠标变小手
  width: 100%;
  height: 50px;
}
// .headerhover:hover .hidehead{
//   top:0px;
//   transition:all .3s ease-in-out .3s;          /*transition中的left值为.move类事件触发时随鼠标变化的属性*/
//   -webkit-transition:all .3s ease-in-out .3s; /*chrome/safari浏览器*/
//   -moz-transition:all .3s ease-in-out .3s;    /*firefox浏览器*/
//   -o-transition:all .3s ease-in-out .3s;     /*opera浏览器*/
// }

.headbox{
  height: 50px;
  min-width: 1080px;
  max-width: 1160px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  position: relative;
  .headlogo{
    width: 144px;
    height: 50px;
    position: absolute;
    left: 0;
  }
  .headabout{
    color: #fff;
    opacity: .9;
    line-height: 50px;
    font{
      opacity: .5!important;
    }
    span{
      cursor:pointer;//鼠标变小手
    }
  }
}


.imgbox{
  margin: 0 auto;
  .imgcss{
    width: 100%;
    height: auto;
    min-height: 60vh;
  }
}
.noselect {

-webkit-touch-callout: none; /* iOS Safari */

-webkit-user-select: none; /* Chrome/Safari/Opera */

-khtml-user-select: none; /* Konqueror */

-moz-user-select: none; /* Firefox */

-ms-user-select: none; /* Internet Explorer/Edge */

user-select: none; /* Non-prefixed version, currently

not supported by any browser */

}
.sj{
  padding: 10vh 0;
}
.leftclick{
  position: fixed;
  left: 0;
  top: 10vh;
  width: 25vw;
  height: 80vh;
  z-index: 1000;
}
.rightclick{
  position: fixed;
  right: 0;
  top: 10vh;
  width: 25vw;
  height: 80vh;
  z-index: 1000;
}
.centclick{
  position: fixed;
  right: 25vw;
  left: 25vw;
  top: 10vh;
  width: 50vw;
  height: 80vh;
  z-index: 1000;
}
.imgcss{
  width: 100vw;
  height: auto;
  min-height: 60vh;
}
.sjheader{
  width: 100vw;
  background-color: #1e212c;
  color: #fff;
  display: flex;
  box-sizing: border-box;
  line-height: 10vh;
  position: fixed;
  top: 0;
  left: 0;
}
.sjcount{
  padding: 5px 10px;
  border-radius: 10px;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,.6);
  color: #fff;
  font-size: 12px;
}
</style>