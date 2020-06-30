<template>
  <div class="more">
    <v-overlay :value="infoshow">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- 头部start -->
    <div class="d-flex d-sm-none">

      <v-toolbar>
        <v-btn icon @click="gotoup">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title>{{manhuaname}}</v-toolbar-title>

        <v-spacer></v-spacer>
<!-- 
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn> -->
      </v-toolbar>
    </div>

          
    <div class="d-none d-sm-block headerbox">
      <div class="headerconter">
        <img src="@/assets/img/logo_min1.png" class="mylogo" alt="">
        <v-tabs height='60'  v-model="model"> 
          <v-tab class="title" @click="gotohome">首页</v-tab>
          <v-tab class="title" @click="gotofenlei">分类</v-tab>
          <v-tab class="title" @click="gotojingxuan">精选</v-tab>
          <v-tab  href="#tab-4" class="d-none">vip</v-tab>
        </v-tabs>
      </div>
    </div>
    <!-- 头部end -->
    <div class="listcount">
      
    </div>
    <div class="morebody">
      <div class="morebox" v-if="show">
        <div class="message">
            <v-row>
              <v-col cols="12" lg="3">
                <div class="imgbox">
                  <v-img 
                    aspect-ratio="0.75"
                    :src="mangeinfo.image?'https://cdn.mangaeden.com/mangasimg/'+mangeinfo.image:planb"
                    lazy-src="@/assets/img/oo.png"
                    alt="">
                  </v-img>
                </div>
              </v-col>
                <v-col cols="12" lg="9">
                  <div class="morenamebox">
                    <div class="messagebox">
                      <div class="moretitlename">{{mangeinfo.title}}</div>
                      <div class="zuoze">{{mangeinfo.author}}</div>
                      <div class="biaoqian"><v-icon small color="teal darken-2">local_offer</v-icon>{{mangeinfo.categories?mangeinfo.categories.join(','):''}}</div>
                      <div class="gengxing"><v-icon small color="teal darken-2">mdi-update</v-icon> 更新至 {{mangeinfo.chapters[mangeinfo.chapters.length-1][0]}} 话</div>
                      <div class="new"><v-icon small color="teal darken-2">access_time</v-icon> {{mangeinfo.last_chapter_date}}更新</div>
                      <div class="jianjie">{{mangeinfo.description}}</div>
                    </div>
                    <div class="rendbox">
                      <v-btn color="teal" @click="gotoread(mangeinfo.chapters.length-1)">追看 最新第{{mangeinfo.chapters[mangeinfo.chapters.length-1][0]}}话</v-btn>
                    </div>
                  </div>
                </v-col>
            </v-row>
        </div>  
        <div class="manhualiebiao">
          <div class="manhuatitle">
            章节列表
          </div>
          <div class="lable">
            <v-tabs
        v-model="tab"
        show-arrows
      >
        <v-tab
          v-for="item in list"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(item,i) in list"
          :key="item"
        >
          <v-card flat>
            <div class="lable">
            <div :class="boxstyle" v-for="(item,j) in mangeinfo.chapters.slice(0+i*50,50+i*50)" :key = 'j'>
              <div class="mditem">
                <div class="mdlable" @click="gotoread(i*50+j)">{{i*50+1+j}} <span class="text-indent:2em;">第{{item[0]}}话</span></div>
              </div>
            </div>
          </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
          </div>
        </div>
        <div class="suggest">
          <div class="suggesttitle">
            相关推荐
          </div>
          <div class="suggestlist">
            <v-row no-gutters v-resize="onResize">
              <v-col
                cols="6"
                sm="4"
                md="3"
                lg="2"
                v-for="a in mangatuijian" :key="a.i"
                @click="gotomore(a.i,a.t,a.im)"
              >
                <div class="listitem">
                  <v-img 
                    spect-ratio="0.6"
                    :src="a.im?'https://cdn.mangaeden.com/mangasimg/'+a.im:'@/assets/img/oo.png'"
                    lazy-src="@/assets/img/loading.gif"
                    alt="">
                  </v-img>
                  <div class="bookname">{{a.t}}</div>
                  <div class="biaoqian">{{a.c?a.c.join(','):''}}</div>
                  
                </div>
            </v-col >
          </v-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userPhoto from '@/assets/img/oo.png'
export default {
  name: 'more',
  data () {
      return {
        tab: null,
        model: 'tab-4',
        lable:10,
        mangeinfo:{},
        planb:userPhoto,
        infoshow:true,
        count:0,
        list:[],
        chapters:[],
        show:false,
        boxstyle:'mdbox',
        manhuaname:'good',
        mangatuijian:[],
        manga:[]
      }
    },
  created() {
    //获取当前漫画名字
    var manhuaname = localStorage.getItem('manhuaname');
    this.manhuaname = manhuaname == undefined ? null : JSON.parse(manhuaname);
    //获取当前漫画详情
    var mangeinfos = localStorage.getItem('mangeinfo');
    var mangeinfo = mangeinfos == undefined ? null : JSON.parse(mangeinfos);
    //获取所有漫画
    var manhua = localStorage.getItem('manhua');
    var manhualist = manhua == undefined ? null : JSON.parse(manhua);
    this.manga = manhualist
    //判断是否需要重新请求当前漫画详情
    if(mangeinfo){
      this.mangeinfo = mangeinfo
      this.infoshow = false
      this.show = true
      this.docount()
      //如果标签存在
        
      //筛选6部推荐漫画
      this.maketuijian()
    }
    else{
      this.qqmanhua()
    }

    
    // }).catch(() => console.log('promise catch err')); //捕获异常

  },
  mounted () {
    this.onResize()
  },
  methods:{
    gotoup(){
      this.$router.go(-1)
    },
    //请求漫画的方法
    qqmanhua(){
      this.infoshow=true
      this.show = false
      const id = 'https://www.mangaeden.com/api/manga/' + this.$route.params.id
      this.axios.get(id).then((response) => {
        this.mangeinfo = response.data
        this.infoshow = false
        this.show = true
        this.mangeinfo.chapters=this.mangeinfo.chapters.reverse()
        localStorage.setItem('mangeinfo', JSON.stringify(this.mangeinfo));
        this.docount()
        console.log(this.mangeinfo)
        //如果标签存在
        
        //筛选6部推荐漫画
        this.maketuijian()

      })
    },
    //在详情页面点击新漫画
    maketuijian(){
      console.log(this.mangeinfo.categories[0],'this.mangeinfo.categories')
      if(this.mangeinfo.categories){
      //筛选6部推荐漫画
        for (var j = 0; j < this.manga.length; j++) {
          for (var k = 0; k < this.manga[j].c.length; k++) {
            // console.log(this.manga[j].c[k].search(this.mangeinfo.categories[0].toUpperCase()) != -1)
            if (this.manga[j].c[k].search(this.mangeinfo.categories[0]) != -1) {
              this.mangatuijian.push(this.manga[j]);
            }
          }
        }
        this.mangatuijian=this.mangatuijian.slice(0,0+6)
      }
      else{
        var arrIndex = Math.floor(Math.random()*500);
        this.mangatuijian=this.manga.slice(arrIndex,arrIndex+6)
      }
    },
    gotomore(a,t,im){
      var mangeinfos = localStorage.getItem('mangeinfo');
      var mangeinfo = mangeinfos == undefined ? null : JSON.parse(mangeinfos);
      if(mangeinfo.image == im){
        console.log(t)
      }
      else{
        // localStorage.setItem('manhuaname', JSON.stringify(t));
        // localStorage.setItem('mangeinfo', JSON.stringify(''));
        const id = a
        // this.$router.push({
        //   path: `/more/${id}`,
        // });
        this.$route.params.id=id
        this.qqmanhua()
      }
      
      
    },
    onResize () {
        this.windowSize = window.innerWidth
        if(this.windowSize>1264){
          this.boxstyle='mdbox'
        }
        if(this.windowSize<1264){
          this.boxstyle='mdbox'
        }
        if(this.windowSize<960){
          this.boxstyle='smbox'
        }
        if(this.windowSize<600){
          this.boxstyle='xsbox'
        }
        if(this.windowSize<360){
          this.boxstyle='ssbox'
        }
      },
    gotohome(){
        this.$router.push('/')
      },
    gotofenlei(){
        this.$router.push({name: 'Fenlei'})
      },
    gotojingxuan(){
        this.$router.push({name: 'Fenlei'})
      },
    docount(){
      // this.count=Math.ceil(this.mangeinfo.chapters_len / 50)
      // this.count=Math.ceil(this.chapters.length / 50)
      // console.log(this.mangeinfo.chapters.length)
      this.list=[]
      this.count=Math.ceil(this.mangeinfo.chapters_len / 50)
      for(let i =0;i<this.count;i++){
        if(i<this.count-1){
          this.list.push((i*50+1)+'-'+(i+1)*50)
        }else{
          this.list.push((i*50+1)+'-'+this.mangeinfo.chapters_len)
        }
        
      }
      console.log(this.list)
    },
    gotoread(a){
      localStorage.setItem('manhuaimg', JSON.stringify(''));
      const id = a
      this.$router.push({
        path: `/read/${id}`,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
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
//more start
.morebox{
  margin: 40px auto;
  width: 80%;
  background-color: #fff;
}
.imgbox{
  padding:0 10%;
}
.morenamebox{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .moretitlename{
    margin: 0 0 11px;
    font-size: 28px;
    font-weight: 400;
    color: rgba(0,0,0,.87);
  }
  .zuoze{
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    color: rgba(0,0,0,.56);
    white-space: nowrap;
  }
  .biaoqian{
    font-size: 14px;
    line-height: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0,0,0,.34);
  }
  .gengxing{
    font-size: 14px;
    line-height: 2;
    color: rgba(0,0,0,.34);
  }
  .new{
    font-size: 14px;
    line-height: 2;
    color: rgba(0,0,0,.34);
  }
  .jianjie{
    margin-top: 8px;
    font-size: 14px;
    white-space: normal;
    color: rgba(0,0,0,.56);
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical;
    overflow:hidden;
  }
  .rendbox{
    margin-top: 10px;
  }
}
.manhuatitle{
  font-size: 24px;
  color: rgba(0,0,0,.87);
  margin-top: 32px;
}
.lable{
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.mdbox{
  width: 20%;
  padding:0 10px 10px 0;
  box-sizing: border-box;
}
.smbox{
  width: 33.3%;
  padding:0 10px 10px 0;
  box-sizing: border-box;
}
.smbox{
  width: 33.3%;
  padding:0 10px 10px 0;
  box-sizing: border-box;
}
.xsbox,.ssbox{
  width: 50%;
  padding:0 10px 10px 0;
  box-sizing: border-box;
}
.mditem{
  text-align: left;
  padding: 0 12px;
  height: 48px;
  line-height: 48px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,.12);
  cursor:pointer;//鼠标变小手
}
.suggesttitle{
  font-size: 24px;
  color: rgba(0,0,0,.87);
  margin-top: 32px;
}
.suggestlist{
  .listitem{
    padding: 10px;
    .bookname{
      font-size: 16px;
      line-height: 30px;
      color: rgba(0,0,0,.87);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .biaoqian{
      font-size: 12px;
      width: 100%;
      color: rgba(0,0,0,.34);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mblable{
      font-size: 14px;
      color: rgba(0,0,0,.87);
    }
  }
}
.listcount{
  margin: 0 auto;
  width: 80%;
}
//more end
</style>