<template>
  <div class="fenlei">
    <!-- 头部start -->
    <div class="d-none d-sm-block headerbox">
      <div class="headerconter">
        <img src="@/assets/img/logo_min1.png" class="mylogo" alt="">
        <v-tabs height='60'  v-model="model"> 
          <v-tab class="title" @click="gotohome">首页</v-tab>
          <v-tab href="#tab-2" @click="gotofenlei" class="title">分类</v-tab>
          <v-tab href="#tab-3" class="title" @click="gotojinxuan">精选</v-tab>
        </v-tabs>
      </div>
    </div>
    <!-- 头部end -->
    <!-- 题材start -->
    <div class="ticai">
      <div class="ticaiibox">
        <div class="ticaititle">题材：</div>
          <v-btn text large :color="ticai==-1?'error':'#000'" @click="changeticai(-1)">all</v-btn>
          <v-btn text large  v-for="(titem,i) in fenlei" :key="i" :color="ticai==i?'error':'#000'" @click="changeticai(i,titem)">{{titem}}</v-btn>

      </div>
    </div>
    <!-- 题材end -->
    <!-- 漫画列表start -->
    <div class="tablelist">
      <div class="tablelistbox">
        <div class="tabletilebox">
          <div class="tablelisttitle">漫画<span class="c_3">列表</span></div>
          <div class="allcount">共<span class="c_3">{{mangaall.length}}</span>部漫画</div>
        </div>
        <div class="listbox">
          <v-row no-gutters>
              <v-col
                cols="6"
                sm="4"
                md="3"
                lg="2"
                v-for="a in manga30" :key="a.i"
                @click="gotomore(a.i,a.t,a.im)"
              >
                <div class="listitem">
                  <v-img 
                   aspect-ratio="0.6"
                   :src="a.im?'https://cdn.mangaeden.com/mangasimg/'+a.im:planb"
                   lazy-src="@/assets/img/oo.png"
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
    <!-- 漫画列表end -->
    <!-- 分页start -->
    <div class="text-center page d-none d-lg-flex d-xl-flex d-md-flex">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="30"
        layout="prev, pager, next, jumper"
        :total="mangaall.length">
      </el-pagination>
    </div>
    <div class="text-center page d-lg-none d-xl-none d-md-none d-sm-flex">
      <el-pagination
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        layout="prev, pager, next"
        :page-count='length'>
      </el-pagination>
    </div>
    <!-- 分页stend -->
    
  </div>
</template>

<script>
import userPhoto from '@/assets/img/oo.png'
export default {
  name: 'fenlei',
  data () {
    return {
      page:1,
      length:20,
      model: 'tab-2',
      ticai:-1,
      manga:30,
      manga30:30,
      mangaall:30,
      planb:userPhoto,
      fenlei:["Action",
            "Adult",
            "Adventure",
            "Comedy",
            "Doujinshi",
            "Drama",
            "Ecchi",
            "Fantasy",
            "Gender Bender",
            "Harem",
            "Historical",
            "Horror",
            "Josei",
            "Martial Arts",
            "Mature",
            "Mecha",
            "Mystery",
            "One Shot",
            "Psychological",
            "Romance",
            "School Life",
            "Sci-fi",
            "Seinen",
            "Shoujo",
            "Shounen",
            "Slice of Life",
            "Smut",
            "Sports",
            "Supernatural",
            "Tragedy",
            "Webtoons",
            "Yaoi",
            "Yuri"],
    }
  },
  watch: {
      'page': function(newVal){
          this.create(newVal)
      },
      
  },
  created() {
    var manhua = localStorage.getItem('manhua');
    var manhualist = manhua == undefined ? null : JSON.parse(manhua);
    if(manhualist){
      this.manga = manhualist
      this.manga.sort(function(a, b) {
        var x = a.h;
        var y = b.h;
        return x > y ? -1 : x < y ? 1 : 0;
      });
      this.mangaall = this.manga
      this.length = Math.ceil(this.manga.length / 30)
      this.create(this.page)
    }
    else{
      this.axios.get('https://www.mangaeden.com/api/list/0/').then((response) => {
        this.manga = response.data.manga
        this.manga.sort(function(a, b) {
          var x = a.h;
          var y = b.h;
          return x > y ? -1 : x < y ? 1 : 0;
        });
        this.mangaall = this.manga
        this.length = Math.ceil(this.manga.length / 30)
        this.create(this.page)
      })
    }
  },
  methods:{
    gotohome(){
      this.$router.push('/')
    },
    gotojinxuan(){
      this.changeticai(0,'Action')
      // this.$router.push('/jinxuan')
      //1.分类页面添加点击跳转事件
      //2.详情页面，手机端问题
    },
    gotofenlei(){
      this.changeticai(-1)
      // this.$router.push('/jinxuan')
    },
    //改变页数改变漫画列表
    create(i){
      
      this.manga30 = this.mangaall.slice((i-1)*30,30*i);
    },
    //改变标签改变漫画列表
    changeticai(a,b){
      //选择高亮
      this.ticai = a
      console.log(b)
      if(a==-1){
        this.model='tab-2'
        this.mangaall = this.manga
        this.length = Math.ceil(this.mangaall.length / 30)
        this.manga30 = this.mangaall.slice(0,30)
      }else{
        //首先查出标签类漫画列表
        this.model='tab-3'
        this.mangaall=[]
        for (var j = 0; j < this.manga.length; j++) {
          for (var k = 0; k < this.manga[j].c.length; k++) {
            if (this.manga[j].c[k].search(b) != -1) {
              this.mangaall.push(this.manga[j]);
            }
          }
        }
        this.length = Math.ceil(this.mangaall.length / 30)
        this.manga30 = this.mangaall.slice(0,30)
      }
      
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
<style >
.v-application ul, .v-application ol {
    padding-left: 0;
}
</style>
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
//题材start
.ticaiibox{
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  .ticaititle{
    line-height: 44px;
  }
  .error--text:after {
    content: " ";
    display: block;
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #fd113a;
  }
}
//题材end
// 漫画列表start
.c_3{
      color: #ff7282;
    }
.tablelistbox{
  margin: 0 auto;
  width: 80%;
  .tabletilebox{
    display: flex;
    justify-content: space-between;
  }
  .tablelisttitle{
    font-size: 24px;
    
  }
  .listitem{
    padding: 10px;
    cursor: pointer;
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
  }
}
// 漫画列表end
//分页start
.page{
  justify-content: center;
  margin: 20px;
}
//分页end
</style>