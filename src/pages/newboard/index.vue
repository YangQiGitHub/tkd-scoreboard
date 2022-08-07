<template>
<div class="newboard" :style="{padding: style.panelPadding + 'px', background: style.panelBg}">
  <div class="mid" @click="toggleTimer" :style="midStyle" :class="{ 'time-going': timer }">
    <div class="mid-item mid-top">{{scene}}</div>
    <div class="mid-item mid-btm">{{sec2Time}}</div>
  </div>
  <div class="board">
    <div class="board-item board-left" :style="blueBgStyle" >
      <div class="name" :style="nameStyle">{{performer.blue.name}}</div>
      <div class="attention">
        <div class="title" :style="titleStyle">
          <Icon class="icon" :style="iconClass" @click="scoreChange('blue.attention.remove')" type="md-remove" :size="style.iconSize" />
          &nbsp;注意&nbsp;
          <Icon class="icon" :style="iconClass" @click="scoreChange('blue.attention.add')" type="md-add" :size="style.iconSize" />
        </div>
        <div class="content" :style="contentStyle">{{performer.blue.attention}}</div>
      </div>
      <div class="advantage">
        <div class="title" :style="titleStyle">
          <Icon class="icon" :style="iconClass" @click="scoreChange('blue.advantageAttack.remove')" type="md-remove" :size="style.iconSize" />
          &nbsp;优势&nbsp;
          <Icon class="icon" :style="iconClass" @click="scoreChange('blue.advantageAttack.add')" type="md-add" :size="style.iconSize" />
        </div>
        <div class="content" :style="contentStyle">{{performer.blue.advantageAttack}}</div>
      </div>
      <div class="warn">
        <div class="title" :style="titleStyle">
          <Icon class="icon" :style="iconClass" @click="scoreChange('blue.warn.remove')" type="md-remove" :size="style.iconSize" />
          &nbsp;警告&nbsp;
          <Icon class="icon" :style="iconClass" @click="scoreChange('blue.warn.add')" type="md-add" :size="style.iconSize" />
        </div>
        <div class="content" :style="contentStyle" style="position: relative;">
          <div v-for="item in (performer.blue.warn)" :key="item" class="dot" :style="dotStyle"></div>
          <img src="../../lib/images/a.png" @click="showDrawer" alt="" class="logo">
        </div>
      </div>
      <div class="valid">
        <div class="title" :style="titleStyle">
          <Icon class="icon" :style="iconClass" @click="scoreChange('blue.normalAttack.remove')" type="md-remove" :size="style.iconSize" />
          &nbsp;有效&nbsp;
          <Icon class="icon" :style="iconClass" @click="scoreChange('blue.normalAttack.add')" type="md-add" :size="style.iconSize" />
        </div>
        <div class="content" :style="contentStyle">{{performer.blue.normalAttack}}</div>
      </div>
      <div class="read">
        <div class="title" :style="titleStyle">
          <Icon class="icon" :style="iconClass" @click="scoreChange('blue.secondReading.remove')" type="md-remove" :size="style.iconSize" />
          &nbsp;读秒&nbsp;
          <Icon class="icon" :style="iconClass" @click="scoreChange('blue.secondReading.add')" type="md-add" :size="style.iconSize" />
        </div>
        <div class="content" :style="contentStyle">
          <div v-for="item in (performer.blue.secondReading)" :key="item" class="dot" :style="dotStyle"></div>
        </div>
      </div>
    </div>

    <div :style="{width: style.gap + 'px'}"></div>

    <div class="board-item board-right" :style="redBgStyle">
      <div class="name" :style="nameStyle">{{performer.red.name}}</div>
      <div class="attention">
        <div class="title" :style="titleStyle">
          <Icon class="icon" :style="iconClass" @click="scoreChange('red.attention.remove')" type="md-remove" :size="style.iconSize" />
          &nbsp;注意&nbsp;
          <Icon class="icon" :style="iconClass" @click="scoreChange('red.attention.add')" type="md-add" :size="style.iconSize" />
        </div>
        <div class="content" :style="contentStyle">{{performer.red.attention}}</div>
      </div>
      <div class="advantage">
        <div class="title" :style="titleStyle">
          <Icon class="icon" :style="iconClass" @click="scoreChange('red.advantageAttack.remove')" type="md-remove" :size="style.iconSize" />
          &nbsp;优势&nbsp;
          <Icon class="icon" :style="iconClass" @click="scoreChange('red.advantageAttack.add')" type="md-add" :size="style.iconSize" />
        </div>
        <div class="content" :style="contentStyle">{{performer.red.advantageAttack}}</div>
      </div>
      <div class="warn">
        <div class="title" :style="titleStyle">
          <Icon class="icon" :style="iconClass" @click="scoreChange('red.warn.remove')" type="md-remove" :size="style.iconSize" />
          &nbsp;警告&nbsp;
          <Icon class="icon" :style="iconClass" @click="scoreChange('red.warn.add')" type="md-add" :size="style.iconSize" />
        </div>
        <div class="content" :style="contentStyle" style="position: relative;">
          <div v-for="item in (performer.red.warn)" :key="item" class="dot" :style="dotStyle"></div>
          <img src="../../lib/images/b.png" @click="showDrawer" alt="" class="logo">
        </div>
      </div>
      <div class="valid">
        <div class="title" :style="titleStyle">
          <Icon class="icon" :style="iconClass" @click="scoreChange('red.normalAttack.remove')" type="md-remove" :size="style.iconSize" />
          &nbsp;有效&nbsp;
          <Icon class="icon" :style="iconClass" @click="scoreChange('red.normalAttack.add')" type="md-add" :size="style.iconSize" />
        </div>
        <div class="content" :style="contentStyle">{{performer.red.normalAttack}}</div>
      </div>
      <div class="read">
        <div class="title" :style="titleStyle">
          <Icon class="icon" :style="iconClass" @click="scoreChange('red.secondReading.remove')" type="md-remove" :size="style.iconSize" />
          &nbsp;读秒&nbsp;
          <Icon class="icon" :style="iconClass" @click="scoreChange('red.secondReading.add')" type="md-add" :size="style.iconSize" />
        </div>
        <div class="content" :style="contentStyle">
          <div v-for="item in (performer.red.secondReading)" :key="item" class="dot" :style="dotStyle"></div>
        </div>
      </div>
    </div>
  </div>


  <Drawer
    title="比赛设置"
    v-model="drawerShow"
    width="720"
    :mask-closable="true"
    draggable
  >
    <!-- <div>标题配置：<Input v-model="tempData.welcomes" placeholder="输入比赛标题" style="width: 300px" /></div> -->
    <!-- <br> -->
    <div>
      运动员：
      <Select v-model="tempData.blue" style="width:200px" clearable not-found-text="请先录入运动员姓名">
        <Icon style="color: blue;" type="ios-contact" slot="prefix" size="20" />
        <Option v-for="item in athletes" :value="item" :disabled="tempData.red === item" :key="item">{{ item }}</Option>
      </Select>
      <Select v-model="tempData.red" style="width:200px" clearable not-found-text="请先录入运动员姓名">
        <Icon style="color: red;" type="ios-contact" slot="prefix" size="20" />
        <Option v-for="item in athletes" :value="item" :disabled="tempData.blue === item" :key="item">{{ item }}</Option>
      </Select>
    </div>
    <br>
    <div>
      比赛：
      <RadioGroup v-model="tempData.round" vertical @on-change="roundChange">
        <Radio v-for="item in roundNum" :key="item" :label="item">
            <span>第{{item}}局</span> 比赛时间
        </Radio>
        <Radio label="extra">
            <span>加时赛</span>
        </Radio>
      </RadioGroup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      比赛时长<InputNumber :precision="0" :step="30" :min="0" v-model="tempData.roundSeconds"></InputNumber>秒
    </div>
    <br>
    清空比分？<i-switch v-model="tempData.clearScore" /> <span v-show="tempData.clearScore" style="color: red;">点击确认后会清空比分哦~</span><br><br>
    <Button type="primary" @click="confirmInfo" long>确认</Button><br><br>
    <div>
      <Collapse v-model="value1" accordion>
        <Panel name="1">
          比赛配置
          <div slot="content">
            <div>
              所有运动员：<Tag v-for="(item, idx) in athletes" :key="idx" @on-close="delAthlete(idx)" type="border" closable color="primary">{{item}}</Tag>
            </div>
            <br>
            <div>
              <Input v-model="athleteStr" search enter-button="添加" @on-search="addAthlete" @on-enter="addAthlete" :autosize="true" placeholder="运动员姓名录入" style="width: 300px" />
            </div>
            <Divider dashed />
            <div>
              比赛为<InputNumber @on-change="storageInfo" :precision="0" :max="10" :min="1" v-model="roundNum"></InputNumber>局，每局<InputNumber @on-change="storageInfo" :precision="0" :step="30" :min="0" v-model="roundSeconds"></InputNumber>秒，如比赛结果为平局则加赛一局，加赛局为<InputNumber @on-change="storageInfo" :precision="0" :step="30" :min="0" v-model="extraroundSeconds"></InputNumber>秒
            </div>
          </div>
        </Panel>
        <Panel name="2">
          主题配置
          <div slot="content">
            加分按钮大小
            <Slider v-model="style.iconSize"></Slider>
            选择按钮背景颜色：<ColorPicker v-model="style.btnBg" alpha/> &nbsp;选择按钮字体颜色：<ColorPicker v-model="style.btnFontColor" alpha/>
            <br>
            <Divider dashed />
            得分项标题字体大小
            <Slider v-model="style.titleFontSize"></Slider>
            得分字体大小
            <Slider v-model="style.contentFontSize" :max="500"></Slider>
            运动员字体大小
            <Slider v-model="style.nameFontSize" :max="200"></Slider>
            <Divider dashed />
            面板背景底色：<ColorPicker v-model="style.panelBg" alpha />
            <br>
            <br>
            面板外边缘宽度
            <Slider v-model="style.panelPadding" :max="200"></Slider>
            首行高度
            <Slider v-model="style.firstRow" :max="500"></Slider>
            尾行高度
            <Slider v-model="style.lastRow" :max="500"></Slider>
            靠外侧列宽度
            <Slider v-model="style.outerColumn" :max="100"></Slider>
            红色/蓝色面板间隙
            <Slider v-model="style.gap" :max="200"></Slider>
            倒计时区域字体颜色：<ColorPicker v-model="style.midFontColor" alpha />
            <br><br>
            倒计时区域大小
            <Slider v-model="style.midSize" :max="800"></Slider>
            倒计时区域字体大小
            <Slider v-model="style.midFontSize" :max="200"></Slider>
            <br><br>
            红方背景起始颜色：<ColorPicker v-model="style.redStart" alpha /> 红方背景终止颜色：<ColorPicker v-model="style.redEnd" alpha />
            <br>
            <br>
            蓝方背景起始颜色：<ColorPicker v-model="style.blueStart" alpha /> 蓝方背景起始颜色：<ColorPicker v-model="style.blueEnd" alpha />
            <br><br>
            （警告、读秒）圆点大小
            <Slider v-model="style.dotSize" :max="200"></Slider>
            （警告、读秒）圆点颜色：<ColorPicker v-model="style.dotColor" alpha />
            <Divider dashed />

            <Button @click="storeCfg" type="primary">存为预设</Button> “存为预设”后，所设置的主题样式在页面刷新后依然保留，否则刷新后将恢复默认样式
            <br><br>
            <Button @click="getDefaultTheme" type="default">恢复默认</Button>
          </div>
        </Panel>
      </Collapse>
    </div>
  </Drawer>
</div>
</template>

<script>
  let defaultTheme = {
    iconSize: 40,
    btnBg: '#ffffff',
    btnFontColor: '#333333',
    titleFontSize: 40,
    contentFontSize: 200,
    nameFontSize: 70,
    firstRow: 150,
    lastRow: 250,
    outerColumn: 26,
    midSize: 440,
    midFontSize: 80,
    redStart: '#ce3301',
    redEnd: '#ff8f6b',
    blueStart: '#0000cd',
    blueEnd: '#8787fb',
    gap: 0,
    panelPadding: 10,
    panelBg: '#ffffff',
    midFontColor: 'rgba(42,42,36,1)',
    dotSize: 50,
    dotColor: 'yellow'
  }
  export default {
    name: 'Scoreboard',
    data() {
      return {
        drawerShow: false,
        scene: '',
        welcomes: '',
        athletes: [],
        athleteStr: '',
        roundNum: 2,
        roundSeconds: 120,
        extraroundSeconds: 60,
        performer: {
          red: {
            name: '',
            advantageAttack: 0,
            attention: 0,
            normalAttack: 0,
            warn: 0,
            secondReading: 0
          },
          blue: {
            name: '',
            advantageAttack: 0,
            attention: 0,
            normalAttack: 0,
            warn: 0,
            secondReading: 0
          }
        },
        value1: ['1'],
        timer: 0,
        countTimeSec: 0,
        tempData: {
          welcomes: '',
          red: '',
          blue: '',
          clearScore: false,
          round: '',
          roundSeconds: 0,
        },
        style: defaultTheme
      }
    },
    mounted() {
      document.documentElement.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 32) {
          this.countDown()
        }
      })
      if (window.localStorage.athletes) {
        this.athletes = localStorage.athletes.split(',')
      }
      if (window.localStorage.timeObj) {
        let timeObj = {}
        try {
          timeObj = JSON.parse(window.localStorage.timeObj)
        } catch (error) {
          
        }
        const {roundNum, roundSeconds, extraroundSeconds} = timeObj
        this.roundNum = roundNum
        this.roundSeconds = roundSeconds
        this.extraroundSeconds = extraroundSeconds
      }
      if (window.localStorage.theme) {
        let style = {}
        try {
          style = JSON.parse(window.localStorage.theme)
        } catch (error) {

        }
        this.style = style
      }
    },
    methods: {
      storeCfg () {
        localStorage.setItem('theme', JSON.stringify(this.style))
        this.$Message.success('保存成功~')
      },
      getDefaultTheme() {
        this.style = defaultTheme
        localStorage.setItem('theme', JSON.stringify(this.style))
      },
      checkInfo () {
        const nameOk = !!(this.performer.red.name && this.performer.blue.name)
        const roundOk = !!this.scene
        const ok = !!(nameOk && roundOk)
        if (!ok) {
          this.$Message.error('点击logo,请配置比赛信息')
        }
        return !ok
      },
      addAthlete() {
        console.log(this.athleteStr)
        const name = this.athleteStr.trim()
        this.athleteStr = ''
        if (!name) return
        if (this.athletes.includes(name)) return this.$Message.error('有重名了哦~')
        this.athletes.push(name)
        localStorage.setItem('athletes', this.athletes)
      },
      delAthlete(idx) {
        this.athletes.splice(idx, 1)
        localStorage.setItem('athletes', this.athletes)
      },
      toggleTimer() {
        this.countDown()
      },
      countDown() {
        if(this.checkInfo()) return
        if (this.timer) {
          clearInterval(this.timer)
          return this.timer = 0
        }
        this.timer = setInterval(() => {
          if (this.countTimeSec === 0) {
            clearInterval(this.timer)
            document.getElementById('audiotagbell').play()
            return this.timer = 0
          }
          this.countTimeSec -= 1
        }, 1000)
      },
      confirmInfo() {
        if (!this.tempData.red) {
          return this.$Message.error('请选择红方运动员姓名')
        }
        if (!this.tempData.blue) {
          return this.$Message.error('请选择蓝方运动员姓名')
        }
        if (!this.tempData.round) {
          return this.$Message.error('请选择比赛局')
        }
        if (this.tempData.clearScore) {
          const clearData = {
            advantageAttack: 0,
            attention: 0,
            normalAttack: 0,
            warn: 0,
            secondReading: 0
          }
          Object.assign(this.performer.red, clearData)
          Object.assign(this.performer.blue, clearData)
        }
        this.scene = this.tempData.round === 'extra' ? 'Extra Round' : `Round ${this.tempData.round}`
        this.performer.red.name = this.tempData.red
        this.performer.blue.name = this.tempData.blue
        this.welcomes = this.tempData.welcomes
        this.countTimeSec = this.tempData.roundSeconds

        this.drawerShow = false
      },
      roundChange() {
        console.log(this.tempData.round);
        
        this.tempData.roundSeconds = (this.tempData.round === 'extra') ? this.extraroundSeconds : this.roundSeconds
      },
      scoreChange(key) {
        if(this.checkInfo()) return
        let strategy = {
          add: (who, attr) => {
            this.performer[who][attr] += 1
          },
          remove: () => {
            if(this.performer[who][attr] === 0) return
            this.performer[who][attr] -= 1
          }
        }
        console.log(key)
        const [who, attr, action] = key.split('.')
        strategy[action](who, attr)
      },
      showDrawer () {
        if (this.timer) {
          return this.$Message.error('请先暂停时间')
        }
        if (this.countTimeSec) {
          this.tempData.roundSeconds = this.countTimeSec
        }
        this.drawerShow = true
      },
      storageInfo () {
        localStorage.timeObj = JSON.stringify({
          roundNum: this.roundNum,
          roundSeconds: this.roundSeconds,
          extraroundSeconds: this.extraroundSeconds
        })
      }
    },
    computed: {
      iconClass () {
        return {
          background: this.style.btnBg,
          color: this.style.btnFontColor
        }
      },
      titleStyle () {
        return {
          fontSize: this.style.titleFontSize + 'px'
        }
      },
      contentStyle() {
        return {
          fontSize: this.style.contentFontSize + 'px'
        }
      },
      nameStyle() {
        return {
          fontSize: this.style.nameFontSize + 'px'
        }
      },
      rowStyle() {
        return {
          'grid-template-rows': this.style.firstRow + 'px'+' 1fr 1fr ' + this.style.lastRow + 'px'
        }
      },
      midStyle() {
        return {
          width: this.style.midSize + 'px',
          height: (this.style.midSize * 396) / 440 + 'px',
          fontSize: this.style.midFontSize + 'px',
          color: this.style.midFontColor
        }
      },
      dotStyle() {
        return {
          width: this.style.dotSize + 'px',
          height: this.style.dotSize + 'px',
          background: this.style.dotColor
        }
      },
      redBgStyle() {
        return {
          background: `linear-gradient(to bottom, ${this.style.redStart}, ${this.style.redEnd})`,
          'grid-template-columns': `1fr ${this.style.outerColumn}%`,
          ...this.rowStyle
        }
      },
      blueBgStyle() {
        return {
          background: `linear-gradient(to bottom, ${this.style.blueStart}, ${this.style.blueEnd})`,
          'grid-template-columns': `${this.style.outerColumn}% 1fr`,
          ...this.rowStyle
        }
      },
      sec2Time () {
        let t = ''
        let s = this.countTimeSec
        if (s > -1) {
          let hour = Math.floor(s/3600)
          let min = Math.floor(s/60) % 60;
          let sec = s % 60;

          if(min < 10){t += "0";}
          t += min + ":";
          if(sec < 10){t += "0";}
          t += sec;
        }
        return t
      },
      fontColor () {
        return this.timer
      }
    },
  }
</script>

<style lang="less">
.newboard{
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  .mid{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: url("../../lib/images/mid-pic.png") center center no-repeat;
    background-size: contain;
    width: 440px;
    height: 396px;
    font-size: 80px;
    display: flex;
    flex-direction: column;
    opacity: 0.8;
    &-item{
      .font-md;
      flex: 1;
      opacity: 0.8;
    }
    &-top{
      padding-top: 16%;
    }
    &-btm{
      padding-bottom: 16%;
      font-weight: 500;
    }
  }
  .board{
    display: flex;
    height: 100%;
    color: #fff;
    &-item{
      flex: 1;
      height: 100%;
      border-radius: 50px;
      box-shadow:0 0 10px #000;
    }
    &-left{
      background: #ce3301;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to bottom, #ce3301, #ff8f6b);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to bottom, #ce3301, #ff8f6b); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      display: grid;
      grid-template-columns: 26% 1fr;
      grid-template-rows: 130px 1fr 1fr 1fr;
      grid-template-areas: "name name" "attention advantage" "warn valid" "warn read";
      .attention,.warn{
        border-right: 1px solid #333;
      } 
    }
    &-right{
      background: #0000cd;
      background: -webkit-linear-gradient(to bottom, #0000cd, #8787fb); 
      background: linear-gradient(to bottom, #0000cd, #8787fb); 
      display: grid;
      grid-template-columns: 1fr 26%;
      grid-template-rows: 130px 1fr 1fr 1fr;
      grid-template-areas: "name name" "advantage attention" "valid warn" "read warn";
      .attention,.warn{
        border-left: 1px solid #333;
      }
    }
  }
  .name{
    .flex;
    grid-area: name;
  }
  .attention{
    .flex;
    grid-area: attention;
  }
  .advantage{
    .flex;
    grid-area: advantage;
  }
  .warn{
    .flex;
    grid-area: warn;
    .content{
      padding: 10px;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
  .valid{
    .flex;
    grid-area: valid;
  }
  .read{
    .flex;
    grid-area: read;
  }
  .flex{
    display: flex;
    flex-direction: column;
  }
  .title{
    .font-md;
    padding: 10px 0;
    font-size: 30px;
    line-height: 1.4;
    font-weight: 500;
    background: rgba(51, 0, 51, 0.2);
  }
  .content{
    .font-md;
    flex: 1;
    font-size: 80px;
    font-weight: 600;
    line-height: 1;
  }
  .font-md{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .name{
    .font-md;
    font-size: 70px;
    font-weight: 500;
  }
  .icon{
    background: #fff;
    border-radius: 50%;
    color: #333;
  }
  .dot{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: yellow;
    margin: 10px;
  }
  .logo{
    position: absolute;
    width: 80%;
    bottom: 40px;
  }
  .time-going{
    opacity: 1;
    .mid-item{
      opacity: 1;
    }
  }
}
</style>
