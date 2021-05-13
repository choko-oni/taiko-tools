<template>
  <div class="main index-wrapper">
    <div class="toolbar">
      <el-row :gutter="24" class="row-bar">
        <el-col :span="12" class="left-col">
          <el-button type="primary" class="add-song">添加歌曲</el-button>
          <el-button type="primary">上一节</el-button>
          <el-button type="primary">下一节</el-button>
          <el-select v-model="sectionNumber" @change="onChangeSection" placeholder="请选择小节内音符数量" class="section-number">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="right-col">
          <!-- 左侧按钮 -->
          <draggable
            v-model="buttonList"
            draggable=".c-item"
            v-bind="dragOptions"
            :options="{sort: false, group: {name: 'field', pull:'clone',put: false}}"
          >
            <transition-group>
              <el-button v-for="(item,index) in buttonList" :key="index">
                <div class="add-don">
                  <img :src="item.src" alt="" class="don-icon">
                  <span class="don-text">{{ item.name }}</span>
                </div>
              </el-button>
              <!--              <div v-for="d in list1" :key="d.id" class="item c-item">{{ d.name }}</div>-->
            </transition-group>
          </draggable>

          <!--          <el-button v-for="(item,index) in buttonList" :key="index" >-->
          <!--            <div class="add-don">-->
          <!--              <img :src="item.src" alt="" class="don-icon">-->
          <!--              <span class="don-text">{{item.name}}</span>-->
          <!--            </div>-->
          <!--          </el-button>-->
          <!--          <el-button v-for="(item,index) in buttonList" :key="index" >-->
          <!--            <div class="add-don">-->
          <!--              <img src="../../public/image/don1.png" alt="" class="don-icon">-->
          <!--              <span class="don-text">咚</span>-->
          <!--            </div>-->
          <!--          </el-button>-->
          <!--          <el-button>-->
          <!--            <div class="add-don">-->
          <!--              <img src="../../public/image/ka.png" alt="" class="don-icon">-->
          <!--              <span class="don-text">咔</span>-->
          <!--            </div>-->
          <!--          </el-button>-->
          <!--          <el-button>-->
          <!--            <div class="add-don">-->
          <!--              <img src="../../public/image/don-dai.png" alt="" class="don-icon">-->
          <!--              <span class="don-text">咚（大）</span>-->
          <!--            </div>-->
          <!--          </el-button>-->
          <!--          <el-button>-->
          <!--            <div class="add-don">-->
          <!--              <img src="../../public/image/ka-dai.png" alt="" class="don-icon">-->
          <!--              <span class="don-text">咔（大）</span>-->
          <!--            </div>-->
          <!--          </el-button>-->
          <!--          <el-button>-->
          <!--            <div class="add-don">-->
          <!--              <img src="../../public/image/roll.png" alt="" class="don-icon">-->
          <!--              <span class="don-text">连打</span>-->
          <!--            </div>-->
          <!--          </el-button>-->
          <!--          <el-button>-->
          <!--            <div class="add-don">-->
          <!--              <img src="../../public/image/ballon.png" alt="" class="don-icon">-->
          <!--              <span class="don-text">气球</span>-->
          <!--            </div>-->
          <!--          </el-button>-->
        </el-col>
      </el-row>

    </div>
    <div class="editbox">
      <div class="scroll-bar">
        <!--                左侧用于显示分数的部分-->
        <div class="score-box">
          <div class="taiko"></div>


          <!--                  </draggable>-->
          <!--                  -->
          <!--                    <draggable-->
          <!--                            class="dragArea list-group"-->
          <!--                            :list="list1"-->
          <!--                            :group="{ name: 'people', pull: 'clone', put: false }"-->
          <!--                            @change="log"-->
          <!--                    >-->
          <!--                        <transition-group>-->
          <!--                        <div-->
          <!--                                class="list-group-item"-->
          <!--                                v-for="element in list1"-->
          <!--                                :key="element.name"-->
          <!--                        >-->
          <!--                            {{ element.name }}-->
          <!--                        </div>-->
          <!--                        </transition-group>-->
          <!--                    </draggable>-->
          <!--                    <draggable-->
          <!--                            class="dragArea list-group"-->
          <!--                            :list="list2"-->
          <!--                            group="people"-->
          <!--                            @change="log"-->
          <!--                    >-->
          <!--                        <transition-group>-->
          <!--                        <div-->
          <!--                                class="list-group-item"-->
          <!--                                v-for="element in list2"-->
          <!--                                :key="element.name"-->
          <!--                        >-->
          <!--                            {{ element.name }}-->
          <!--                        </div>-->
          <!--                        </transition-group>-->
          <!--                    </draggable>-->
          <!--                    <rawDisplayer class="col-3" :value="list1" title="List 1" />-->
          <!--                    <rawDisplayer class="col-3" :value="list2" title="List 2" />-->
        </div>
        <!--                右侧用于显示谱面部分-->
        <div class="surface-box">
          <div class="surface-main">
            <!--                        用于谱面滚动-->
            <div class="surface-scroll">
              <!--                            1小节-->
<!--              <div class="surface-part">-->
                <!-- 右侧按钮 -->
                <draggable group="field" class="surface-part" :list="sectionNumber" v-bind="dragOptions" @change="toChange">
                  <div class="part-item" v-for="(item,index) in sectionList"
                       :style="{'width':partLength+'px',}"></div>
                  <!--                  <div v-for="d in list2" :key="d.id" class="item">{{ d.name }}</div>-->
                </draggable>

<!--              </div>-->
            </div>
            <div class="determine">
              <div class="circle">
                <div class="point-circle"></div>
              </div>
            </div>
            <div class="bottom-bar">

            </div>
          </div>
        </div>
      </div>
    </div>
    <!--        <audio class="success"-->
    <!--               src="/static/audios/do_wrong.mp3">-->
    <!--        </audio>-->

  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'HelloWorld',
  components: {
    draggable,
  },
  computed: {
    partLength() {
      return 1280 / this.sectionNumber
    },
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      myArray: [1, 2, 1, 2],
      dragOptions: {animation: 200},
      buttonList: [
        {name: "咚", src: require('../../public/image/don1.png')},
        {name: "咔", src: require('../../public/image/ka.png')},
        {name: "咚（大）", src: require('../../public/image/don-dai.png')},
        {name: "咔（大）", src: require('../../public/image/ka-dai.png')},
        {name: "连打", src: require('../../public/image/roll.png')},
        {name: "气球", src: require('../../public/image/ballon.png')},
      ],
      list1: [
        {name: "John", id: 1},
        {name: "Joao", id: 2},
        {name: "Jean", id: 3},
        {name: "Gerard", id: 4}
      ],
      list2: [
        {name: "Juan", id: 5},
        {name: "Edgard", id: 6},
        {name: "Johnson", id: 7}
      ],
      // list1: [
      //     { name: "John", id: 1 },
      //     { name: "Joao", id: 2 },
      //     { name: "Jean", id: 3 },
      //     { name: "Gerard", id: 4 }
      // ],
      // list2: [
      //     { name: "Juan", id: 5 },
      //     { name: "Edgard", id: 6 },
      //     { name: "Johnson", id: 7 }
      // ],
      colors: [{
        text: "Aquamarine"
      }, {
        text: "Hotpink"
      }, {
        text: "Gold"
      }, {
        text: "Crimson"
      }, {
        text: "Blueviolet"
      }, {
        text: "Lightblue"
      }, {
        text: "Cornflowerblue"
      }, {
        text: "Skyblue"
      }, {
        text: "Burlywood"
      }],
      options: [{
        value: 32,
        label: '32分音'
      }, {
        value: 16,
        label: '16分音'
      }, {
        value: 8,
        label: '8分音'
      }, {
        value: 4,
        label: '4分音'
      }, {
        value: 2,
        label: '2分音'
      }, {
        value: 1,
        label: '全音符'
      },],
      sectionNumber: 1,  //每小节的音符数量，根据音符数量来划分小节的谱面
      sectionList:[], //用于存放用于排序的数组
    }
  },
  methods: {
    onChangeSection(val){
      console.log(val)
      for(let i=0;i<val;i++){
        this.sectionList.push({val:val,name:'arr'})
      }
      console.log(this.sectionList)
      //
    },

    log: function (evt) {
      window.console.log(evt);
    },
    toChange(e) {
      console.log(e)
      if (e.added) {
        console.log(this.list2)
      }
    },
  },
  mounted: function () {
    this.colors.forEach((item) => {
      Vue.set(item, 'isComb', false)
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-wrapper {
  margin: 0;
}

.toolbar {
  background-color: #F2F6FC;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 0;
  /*height: 80px;*/
}

.toolbar .row-bar .left-col .section-number {
  margin-left: 10px;
}

.toolbar .row-bar .left-col {
  display: flex;
  justify-content: flex-start;
}

.toolbar .row-bar .right-col {
  display: flex;
  justify-content: flex-end;
}

.toolbar .row-bar {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.add-song {
  background: #fe7839;
  font-weight: normal;
  border-color: #fe7839;
  float: left;
  margin-left: 50px;
}

.editbox {
  /*width: 100%;*/
  /*height: 200px;*/
  /*box-sizing: border-box;*/
  /*!*background-color: #333;*!*/
  /*display: flex;*/
  /*align-items: center;*/
  /*background: url("../../public/image/scroll_bg_base.png");*/
  /*background-repeat: no-repeat;*/
  /*background-size: 100% 100%;*/
  background-color: #2c2c2c;
  /*background-position: top right;*/
  /*border-bottom: 2px solid #000;*/


}

.editbox .scroll-bar .surface-box {
  width: 100%;

}

.editbox .scroll-bar .surface-box .surface-main .bottom-bar {
  background: #908d91;
  width: 100%;
  height: 30px;
  border-top: 5px solid #000;
}

.editbox .scroll-bar .surface-box .surface-main .surface-scroll .surface-part .part-item {
  border-left: 2px solid rgba(255, 255, 255, .7);
  height: 100%;
}

.editbox .scroll-bar .surface-box .surface-main .surface-scroll .surface-part {
  width: 1280px;
  height: calc(100% - 35px);
  display: flex;
  justify-content: flex-start;
}

.editbox .scroll-bar .surface-box .surface-main .surface-scroll {
  /*background: rgba(255,255,255,.5);*/
  width: 1280px;
  height: 100%;
  position: absolute;
  left: 114px;

  /*top: 10px;*/
}

.editbox .scroll-bar .surface-box .surface-main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
}

.editbox .scroll-bar .surface-box .surface-main .determine .circle .point-circle {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /*border: 4px solid #8f9092;*/
  background-color: #5a5b5a;
}

.editbox .scroll-bar .surface-box .surface-main .determine .circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #8f9092;
}

.editbox .scroll-bar .surface-box .surface-main .determine {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: 17px;
  border: 4px solid #6c6b6e;
  margin-left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.editbox .scroll-bar .score-box .taiko {
  width: 120px;
  height: 150px;
  background: url("../../public/image/Taiko.png") no-repeat;
  background-size: contain;
  float: right;
  margin-right: 30px;
  margin-top: 20px;

}

.editbox .scroll-bar .score-box {
  width: 400px;
  height: 100%;
  background: url("../../public/image/score-bg.png");
  background-size: cover;
}

.editbox .scroll-bar {
  /*background: url("../../public/image/scroll_bg_base.png");*/
  /*background-size: contain;*/
  height: 220px;
  display: flex;
  justify-content: flex-start;
  /*background-repeat: no-repeat;*/
  box-sizing: border-box;
  border-bottom: 12px solid #000;
  border-top: 12px solid #000;
  /*width: 100%;*/
  /*background-color: #909399;*/
}

.toolbar .row-bar {
  width: 100%;
}

.add-don {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.add-don .don-icon {
  height: 65px;
  /*width: 50px;*/
}

.add-don .don-text {
  margin-top: 5px;
}

</style>
