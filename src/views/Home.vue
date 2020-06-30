<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- 头部start -->
    <div class="d-none d-sm-block headerbox">
      <div class="headerconter">
        <img src="@/assets/img/logo_min1.png" class="mylogo" alt="">
        <v-tabs height='60'> 
          <v-tab class="title">首页</v-tab>
          <v-tab class="title" @click="gotofenlei">分类</v-tab>
          <v-tab class="title" @click="gotojingxuan">精选</v-tab>
        </v-tabs>
      </div>
    </div>
    <!-- 头部end -->
    <!-- 精选力荐start -->
   <div class="jingxuan" v-if="!infoshow">
     <div class="jingxuanconter">
       <v-row>
        <v-col cols="12" lg="9">
          <div class="top fixbetter">
              <div class="boxleft">
                  <div class="phb">精选<span class="c_3">力荐</span></div>
                  <span class="h_eng">RECOMMEND</span>
              </div>
              <div class="gotofeilei" @click="gotofenlei">MORE+</div>
          </div>
          <div class="about">
            <v-row no-gutters v-resize="onResize">
              <div
                :class="imgcss"
                v-for="a in hot" :key="a.i"
                @click="gotomore(a.i,a.t,a.im)"
              >
                <div class="aboutbox">
                  <v-img 
                   :src="a.im?'https://cdn.mangaeden.com/mangasimg/'+a.im:'@/assets/img/oo.png'"
                   lazy-src="@/assets/img/loading.gif"
                   class="img100" 
                   alt="">
                  </v-img>
                  <div class="bookname">{{a.t}}</div>
                  <div class="biaoqian">{{a.c?a.c.join(','):''}}</div>
                </div>
              </div >
            </v-row>
          </div>
        </v-col>
        <v-col lg="3" class="d-none d-lg-flex d-xl-flex cflex" >
          <div class="top fixbetter full">
            <div class="phb">
              排行榜
            </div>
            <div class="gotofeilei" @click="gotofenlei">MORE+</div>
          </div>
          <div class="test">
              <li 
              v-for="(a,index) in ranking" 
              :key="a.i" 
              :class="index==tabs?'imgshow':'imghidde'" 
              @click="gotomore(a.i,a.t,a.im)"
              v-on:mouseenter="cheack(index)">
                <img :src="a.im?'https://cdn.mangaeden.com/mangasimg/'+a.im:'@/assets/img/oo.png'" alt="">
                <div class="morebox">
                  <div class="morename">{{a.t}}</div>
                  <div class="paihangbox">
                    <div class="biaoqian">{{a.c?a.c.join(','):''}}</div>
                    <div class="paiming">{{index+1}}</div>
                  </div>
                </div>
              </li>
            
          </div>
        </v-col >
      </v-row>
      
     </div>
     
    
   </div>
   <!-- 精选力荐end -->
   <!-- 最近更新start -->
   <div class="now" v-if="!infoshow">
     <div class="nowconter">
        <div class="top fixbetter">
            <div class="boxleft">
                <div class="phb">最近<span class="c_3">更新</span></div>
                <span class="h_eng">UPDATE</span>
            </div>
            <div class="gotofeilei" @click="gotofenlei">MORE+</div>
        </div>
       <v-row class="d-none d-lg-flex d-xl-flex">
         <v-col cols="3">
           <v-carousel
              cycle
              height="auto"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(a, i) in nowshow"
                :key="i"
                @click="gotomore(a.i,a.t,a.im)"
              >
                <v-sheet>
                  <v-row
                    class="fill-height bcw"
                    align="center"
                    justify="center"
                  >
                    <v-img 
                    aspect-ratio="0.6"
                    :src="a.im?'https://cdn.mangaeden.com/mangasimg/'+a.im:planb"
                    lazy-src="@/assets/img/loading.gif"
                    class="imgscss"
                    :title="a.t">
                    </v-img>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
         </v-col>
         <v-col cols="9">
           <v-row class="sxflex">
             <v-col style="padding:0 10px 10px 10px;" cols="4" v-for="(nows,i) in now" :key="i" @click="gotomore(nows.i,nows.t,nows.im)">
               <div class="nowsbt">
                 <div class="potoleft">
                    <img 
                    :src="nows.im?'https://cdn.mangaeden.com/mangasimg/'+nows.im:planb"
                    style="border-radius: 10px;"
                    :title="nows.t">
                    
                 </div>
                 <div class="nowaboutr">
                   <div class="manganame">{{nows.t}}</div>
                   <div class="biaoqian" style="width:100%;">{{nows.c?nows.c.join(','):''}}</div>
                 </div>
                  
               </div>
               
             </v-col>
           </v-row>
         </v-col>
       </v-row> 
       <v-row no-gutters class="d-lg-none d-xl-none d-md-flex">
              <v-col
                cols="6"
                sm="4"
                md="3"
                v-for="a in nowlist" :key="a.i"
              >
                <div class="aboutbox">
                  <v-img 
                   :src="a.im?'https://cdn.mangaeden.com/mangasimg/'+a.im:'@/assets/img/oo.png'"
                   lazy-src="@/assets/img/loading.gif"
                   class="img100" 
                   alt="">
                  </v-img>
                  <div class="bookname">{{a.t}}</div>
                  <div class="biaoqian">{{a.c?a.c.join(','):''}}</div>
                </div>
              </v-col >
            </v-row>
         
      
     </div>
   </div>
   <!-- 最近更新end -->
   <!-- 热番原作start -->
   <div class="now" v-if="!infoshow">
     <div class="nowconter">
        <div class="top fixbetter">
            <div class="boxleft">
                <div class="phb">热番<span class="c_3">原作</span></div>
                <span class="h_eng">ORIGINAL</span>
            </div>
            <div class="gotofeilei" @click="gotofenlei">MORE+</div>
        </div>
       <v-row class="d-none d-lg-flex d-xl-flex">
         <v-col cols="3">
           <v-carousel
              cycle
              height="auto"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(a, i) in origishow"
                :key="i"
                @click="gotomore(a.i,a.t,a.im)"
              >
                <v-sheet>
                  <v-row
                    class="fill-height bcw"
                    align="center"
                    justify="center"
                  >
                    <v-img 
                    aspect-ratio="0.6"
                    :src="a.im?'https://cdn.mangaeden.com/mangasimg/'+a.im:planb"
                    lazy-src="@/assets/img/loading.gif"
                    class="imgscss"
                    :title="a.t">
                    </v-img>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
         </v-col>
         <v-col cols="9">
           <v-row class="sxflex">
             <v-col style="padding:0 10px 10px 10px;" cols="4" v-for="(nows,i) in origi" :key="i" @click="gotomore(nows.i,nows.t,nows.im)">
               <div class="nowsbt">
                 <div class="potoleft">
                    <img 
                    :src="nows.im?'https://cdn.mangaeden.com/mangasimg/'+nows.im:planb"
                    style="border-radius: 10px;"
                    :title="nows.t">
                    
                 </div>
                 <div class="nowaboutr">
                   <div class="manganame">{{nows.t}}</div>
                   <div class="biaoqian" style="width:100%;">{{nows.c?nows.c.join(','):''}}</div>
                 </div>
                  
               </div>
               
             </v-col>
           </v-row>
         </v-col>
       </v-row> 
       <v-row no-gutters class="d-lg-none d-xl-none d-md-flex">
              <v-col
                cols="6"
                sm="4"
                md="3"
                v-for="a in origilist" :key="a.i"
              >
                <div class="aboutbox">
                  <v-img 
                   :src="a.im?'https://cdn.mangaeden.com/mangasimg/'+a.im:'@/assets/img/oo.png'"
                   lazy-src="@/assets/img/loading.gif"
                   class="img100" 
                   alt="">
                  </v-img>
                  <div class="bookname">{{a.t}}</div>
                  <div class="biaoqian">{{a.c?a.c.join(','):''}}</div>
                </div>
              </v-col >
            </v-row>
         
      
     </div>
   </div>
   <!-- 热番原作end -->
   <div class="foot">
     <div class="foot1">资源收集自网络，请勿相信视频内的任何水印网址！</div>
     <div class="footname">© 2020 歪果仁漫画</div>
     <div class="coll">站务：2276839311@qq.com</div>
     <div class="coll">{{nows()}}</div>
   </div>
   <v-overlay :value="infoshow">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import userPhoto from '@/assets/img/oo.png'
export default {
  name: 'Home',
  data () {
      return {
        model: 'tab-1',
        manga:[],
        tabs: 0,
        hot:8,
        now:6,
        ranking:8,
        nowshow:4,
        nowlist:8,
        origishow:4,
        origi:6,
        origilist:8,
        planb:userPhoto,
        infoshow:true,
        windowSize:1920,
        imgcss:'xlcss'
      }
    },
    // computed:{
    //   nows:function(){
    //     return Date.now();
    //   }
    // },
    created() {
      var manhua = localStorage.getItem('manhua');
      var manhualist = manhua == undefined ? null : JSON.parse(manhua);
      if(manhualist){
        this.create(manhualist)
        this.infoshow = false
      }
      else{
        this.axios.get('https://www.mangaeden.com/api/list/0/').then((response) => {
          console.log(response.data.manga)
          this.create(response.data.manga)
          localStorage.setItem('manhua', JSON.stringify(response.data.manga));
          this.infoshow = !this.infoshow
        })
      }
    },
    mounted () {
      this.onResize()
    },
    methods: {
      nows(){
        return Date.now();
      },
      onResize () {
        this.windowSize = window.innerWidth
        // var manhua = localStorage.getItem('manhua');
        // var manhualist = manhua == undefined ? null : JSON.parse(manhua);
        console.log(this.windowSize)
        if(this.windowSize>1480){
          this.imgcss='xlcss'
          this.hot = this.manga.slice(0,12);
        }
        if(this.windowSize<1479){
          this.imgcss='lgcss'
          this.hot = this.manga.slice(0,10);
        }
        if(this.windowSize<1264){
          this.imgcss='mdcss'
          this.hot = this.manga.slice(0,8);
          this.nowlist = this.manga.slice(43,51)
          this.origilist = this.manga.slice(84,92)
        }
        if(this.windowSize<960){
          this.imgcss='smcss'
          this.hot = this.manga.slice(0,8);
        }
        if(this.windowSize<600){
          this.imgcss='xscss'
          this.hot = this.manga.slice(0,8);
        }
        if(this.windowSize<360){
          this.imgcss='sscss'
          this.hot = this.manga.slice(0,8);
        }
      },
      cheack(a){
        this.tabs=a
      },
      create(manga){
        this.manga = manga
        this.manga.sort(function(a, b) {
            var x = a.h;
            var y = b.h;
            return x > y ? -1 : x < y ? 1 : 0;
          });
        this.hot = this.manga.slice(0,8);
        this.ranking = this.manga.slice(18,26)
        this.now = this.manga.slice(43,43+6);
        this.nowshow = this.manga.slice(62,66)
        this.origishow = this.manga.slice(71,73)
        this.origi = this.manga.slice(84,90)
        
      },
      gotofenlei(){
        this.$router.push({name: 'Fenlei'})
      },
      gotojingxuan(){
        this.$router.push({name: 'Fenlei'})
      },
      gotomore(a,t,im){
        var mangeinfos = localStorage.getItem('mangeinfo');
        var mangeinfo = mangeinfos == undefined ? null : JSON.parse(mangeinfos);
        if(mangeinfo){
          if(mangeinfo.image == im){
            localStorage.setItem('manhuaname', JSON.stringify(t));
            const id = a
            this.$router.push({
              path: `/more/${id}`,
            });
          }
          else{
            localStorage.setItem('manhuaname', JSON.stringify(t));
            localStorage.setItem('mangeinfo', JSON.stringify(''));
            const id = a
            this.$router.push({
              path: `/more/${id}`,
            });
          }
        }
        else{
          localStorage.setItem('manhuaname', JSON.stringify(t));
          const id = a
          this.$router.push({
            path: `/more/${id}`,
          });
        }
        
      }
      
    }
}
</script>
<style lang="scss" scoped>

.sxflex{
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  height: 100%;
}
.imgscss{
  width: 100%;
  height: auto;
  border-radius: 20px;
}
.xlcss{
  width: calc(100%/6);
  box-sizing: border-box;
}
.lgcss{
  width: 20%;
  box-sizing: border-box;
}
.mdcss{
  width: 25%;
  box-sizing: border-box;
}
.smcss{
  width: 33.3%;
  box-sizing: border-box;
}
.xscss{
  -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
    width: 100%;
    .biaoqian{
      max-width: 164px;
    }
}
.sscss{
  width: 100%;
}
body {
    background: #292838;
    color: #999;
}
// 头部start 
.img100{
  width: 131px;
  height: 174px;
}
.headerbox{
  width: 100%;
  height: 60px;
  background-color: #000;
  .headerconter{
    margin: 0 auto;
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    background-color: #fff;
    .mylogo{
      width:180px;
      height:100%;
    }
  }
}
//头部end
// 精选start
.jingxuanconter{
    margin: 0 auto;
    width: 80%;
    height: 100%;
    display: flex;
    justify-content:space-between;
    align-items: center;
    background-color: #fff;
    .boxleft{
      font-weight: normal;
      display: flex;
      align-items: center;
        .c_3{
          color: #ff7282;
          line-height: 32px;
          height: 34px;
          display: inline-block;
        }
    }
    .h_eng{
      vertical-align: middle;
      font-size: 16px;
      color: #999;
      padding-left: 15px;
    }

}
.fixbetter{
  display: flex;
  justify-content: space-between;
}
.top{
  width: 100%;
  height: 48px;
}
.phb{
  line-height: 48px;
  font-size: 22px;
  font-weight: 400;
  color: rgba(0,0,0,.87);
}
.aboutbox{
  margin-top: 10px;
  width: 100%;
  height: 210px;
  cursor:pointer;//鼠标变小手
  // background-color: #857856;
  .bookname{
    font-size: 14px;
    color: rgba(0,0,0,.87);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Arial, "Microsoft YaHei", "Microsoft Sans Serif", "Microsoft SanSerf", 微软雅黑;
  }
  
}
.cflex{
  flex-direction:column;
}
li{float:left;margin:0;padding:0;list-style:none;}
.imgshow{
  cursor:pointer;//鼠标变小手
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 15px;
  img{
    width: 120px;
    height: 160px;
    object-fit: cover;
    flex: 0 0 120px;
  }
  .morebox{
    width:100%;
    margin-left: 10px;
    height: 160px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .morename{
      font-size: 18px;
      color: rgba(0,0,0,.87);
      text-align: left;
    }
    .paihangbox{
      flex-basis: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .biaoqian{
      max-width: 75px;
    }
  }
}
.biaoqian{
  font-size: 12px;
  width: 100%;
  color: rgba(0,0,0,.34);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Arial, "Microsoft YaHei", "Microsoft Sans Serif", "Microsoft SanSerf", 微软雅黑;
}
.paiming{
  font-size: 64px;
  font-weight: 700;
  line-height: 50px;
  color: #cf9870;
}
.imghidde{
  cursor:pointer;//鼠标变小手
  width: 100%;
  margin-bottom: 15px;
  img{
        display: none;
      }
  .morebox{
    width: 100%;
    height: 25px;
    position: relative;
    .morename{
      font-size: 16px;
      line-height: 25px;
      color: rgba(0,0,0,.87);
      position: absolute;
      left: 20px;
      width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .paiming{
      position: absolute;
      left: 0;
      font-weight: 700;
      width: 10%;
      font-size: 18px;
      line-height: 25px;
      color: #cf9870;
    }
    .biaoqian{
      position: absolute;
      right: 0;
      line-height: 25px;
      font-size: 12px;
      width: 140px;
      color: rgba(0,0,0,.34);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: Arial, "Microsoft YaHei", "Microsoft Sans Serif", "Microsoft SanSerf", 微软雅黑;
    }
  }
  
}
// 精选end
// 最近更新start
.bcw{
  background-color:#fff;
  cursor:pointer;//鼠标变小手
}
.nowconter{
  margin: 0 auto;
  width: 80%;
  background-color: #fff;
  padding: 40px 0 0 0;
  .boxleft{
    font-weight: normal;
    display: flex;
    align-items: center;
      .c_3{
        color: #ff7282;
        line-height: 32px;
        height: 34px;
        display: inline-block;
      }
  }
  .h_eng{
    vertical-align: middle;
    font-size: 16px;
    color: #999;
    padding-left: 15px;
  }
}
.nowsbt{
  display: flex;
  cursor:pointer;//鼠标变小手
  .potoleft{
    width: 50%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
      vertical-align: bottom；
    }
  }
  .nowaboutr{
    width: 50%;
    background-color: #f4f6fa;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.foot{
  text-align: center;
  margin-top: 40px;
  .footname{
    margin-top: 10px;
  }
}
.gotofeilei{
  line-height: 48px;
  cursor:pointer;//鼠标变小手
}
</style>
