<template>
<div class="page">
  <Icon @click="showDrawer" class="match-settings" type="md-settings" size="40" />
  <div class="board">
    <div class="board__hd">{{welcomes}}</div>
    <div class="board__bd">
      <div class="time-panel">
        <div @click="toggleTimer" class="time item" :class="{ 'font-yellow': timer }">{{sec2Time}}</div>
        <div class="round item">{{scene}}</div>
      </div>
      <div class="athlete">
        <div class="name red">&nbsp;{{performer.red.name}}&nbsp;</div>
        <div class="name blue">&nbsp;{{performer.blue.name}}&nbsp;</div>
      </div>
      <div class="score">
        <div class="score-item red">
          <div class="score-item__top">
            <div class="part-rule">
              <div class="title"><Icon @click="scoreChange('red.attention.remove')" type="md-remove" size="24" />注意<Icon @click="scoreChange('red.attention.add')" type="md-add" size="24" /></div>
              <div class="content">
                <div class="num score-small">{{performer.red.attention}}</div>
              </div>
            </div>
            <div class="part-score">
              <div class="title"><Icon @click="scoreChange('red.advantageAttack.remove')" type="md-remove" size="24" />优势<Icon @click="scoreChange('red.advantageAttack.add')" type="md-add" size="24" /></div>
              <div class="content">
                <div class="num score-big">{{performer.red.advantageAttack}}</div>
              </div>
            </div>
          </div>
          <div class="score-item__mid">
            <div class="part-rule">
              <div class="title"><Icon @click="scoreChange('red.warn.remove')" type="md-remove" size="24" />警告<Icon @click="scoreChange('red.warn.add')" type="md-add" size="24" /></div>
              <div class="warn">
                <div v-for="item in (performer.red.warn)" :key="item" class="dot dot-warn"></div>
              </div>
            </div>
            <div class="part-score">
              <div class="title"><Icon @click="scoreChange('red.normalAttack.remove')" type="md-remove" size="24" />有效<Icon @click="scoreChange('red.normalAttack.add')" type="md-add" size="24" /></div>
              <div class="content">
                <div class="num score-big">{{performer.red.normalAttack}}</div>
              </div>
            </div>
          </div>
          <div class="score-item__btm">
            <div class="part-rule"></div>
            <div class="part-score">
              <div class="title"><Icon @click="scoreChange('red.secondReading.remove')" type="md-remove" size="24" />读秒<Icon @click="scoreChange('red.secondReading.add')" type="md-add" size="24" /></div>
              <div class="content">
                <div v-for="item in (performer.red.secondReading)" :key="item" class="dot dot-seconds"></div>
              </div>
            </div>
          </div>
        </div>


        <div class="score-item blue">
          <div class="score-item__top">
            <div class="part-score border-rt">
              <div class="title"><Icon @click="scoreChange('blue.advantageAttack.remove')" type="md-remove" size="24" />优势<Icon @click="scoreChange('blue.advantageAttack.add')" type="md-add" size="24" /></div>
              <div class="content">
                <div class="num score-big">{{performer.blue.advantageAttack}}</div>
              </div>
            </div>
            <div class="part-rule">
              <div class="title"><Icon @click="scoreChange('blue.attention.remove')" type="md-remove" size="24" />注意<Icon @click="scoreChange('blue.attention.add')" type="md-add" size="24" /></div>
              <div class="content">
                <div class="num score-small">{{performer.blue.attention}}</div>
              </div>
            </div>
          </div>
          <div class="score-item__mid">
            <div class="part-score border-rt">
              <div class="title"><Icon @click="scoreChange('blue.normalAttack.remove')" type="md-remove" size="24" />有效<Icon @click="scoreChange('blue.normalAttack.add')" type="md-add" size="24" /></div>
              <div class="content">
                <div class="num score-big">{{performer.blue.normalAttack}}</div>
              </div>
            </div>
             <div class="part-rule">
              <div class="title"><Icon @click="scoreChange('blue.warn.remove')" type="md-remove" size="24" />警告<Icon @click="scoreChange('blue.warn.add')" type="md-add" size="24" /></div>
              <div class="warn">
                <div v-for="item in (performer.blue.warn)" :key="item" class="dot dot-warn"></div>
              </div>
            </div>
          </div>
          <div class="score-item__btm">
            <div class="part-score border-rt">
              <div class="title"><Icon @click="scoreChange('blue.secondReading.remove')" type="md-remove" size="24" />读秒<Icon @click="scoreChange('blue.secondReading.add')" type="md-add" size="24" /></div>
              <div class="content">
                <div v-for="item in (performer.blue.secondReading)" :key="item" class="dot dot-seconds"></div>
              </div>
            </div>
            <div class="part-rule"></div>
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
      <div>标题配置：<Input v-model="tempData.welcomes" placeholder="输入比赛标题" style="width: 300px" /></div>
      <br>
      <div>
        运动员：
        <Select v-model="tempData.red" style="width:200px" clearable not-found-text="请先录入运动员姓名">
          <!-- <div style="background: red;" slot="prefix" >&nbsp;&nbsp;&nbsp;&nbsp;</div> -->
          <Icon style="color: red;" type="ios-contact" slot="prefix" size="20" />
          <Option v-for="item in athletes" :value="item" :disabled="tempData.blue === item" :key="item">{{ item }}</Option>
        </Select>
        <Select v-model="tempData.blue" style="width:200px" clearable not-found-text="请先录入运动员姓名">
          <Icon style="color: blue;" type="ios-contact" slot="prefix" size="20" />
          <Option v-for="item in athletes" :value="item" :disabled="tempData.red === item" :key="item">{{ item }}</Option>
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
      清空比分？<i-switch v-model="tempData.clearScore" /> <span v-show="tempData.clearScore" style="color: red;">点击确认后会清空比分和时间哦~</span><br><br>
      <div>
        <Collapse v-model="value1">
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
        </Collapse>
      </div>
      <br>
      <div class="drawer-footer">
        <Button type="primary" @click="confirmInfo" long>确认</Button>
      </div>
    </Drawer>
  </div>
  <!-- <div class="settings">
    <Card>
     
    </Card>
  </div> -->
</div>
</template>

<script>
  export default {
    name: 'Scoreboard',
    data() {
      return {
        drawerShow: true,
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
        }
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
        console.log(timeObj)
        const {roundNum, roundSeconds, extraroundSeconds} = timeObj
        this.roundNum = roundNum
        this.roundSeconds = roundSeconds
        this.extraroundSeconds = extraroundSeconds
      }
      // localStorage.athletes && this.athletes = localStorage.athletes.split(',')
    },
    methods: { 
      checkInfo () {
        const nameOk = !!(this.performer.red.name && this.performer.blue.name)
        const timeOk = !!this.countTimeSec
        const roundOk = !!this.scene
        const ok = !!(nameOk && timeOk && roundOk)
        if (!ok) {
          this.$Message.error('请先配置比赛信息')
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
        // console.log(localStorage.athletes, this.athletes, localStorage.getItem('athletes'))
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
        this.tempData.roundSeconds = this.countTimeSec
        clearInterval(this.timer)
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
.match-settings{
  position: fixed;
  right: 20px;
  top: 20px;
  color: aqua;
  z-index: 1000;
}
.settings{
  max-width: 1600px;
  margin: 30px auto;
}
.blue{
  background: #0000CC;
}
.red{
  background: #CC3300;
}
.font-md{
  text-align: center;
}
.border-rt{
  border-right: 1px solid black;
}
.score-big{
  font-size: 150px;
  font-weight: 900;
}
.score-small{
  font-size: 40px;
  font-weight: 900;
}
.dot{
  width: 50px;
  height: 50px;
  background: yellow;
  border-radius: 50%;
  &-warn{
    margin-top: 20px;
  }
  &-seconds{
    margin-right: 20px;
  }
}
.font-yellow{
  color: yellow;
}
.board{
  display: flex;
  flex-direction: column;
  color: #fff;
  height: 100vh;
  &__hd{
    font-size: 50px;
    text-align: center;
    background: gray;
  }
  &__bd{
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    .time-panel{
      width: 400px;
      height: 200px;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      top: 0;
      background: black;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        width: 100%;
      }
    }
    .athlete{
      font-size: 50px;
      line-height: 2;
      display: flex;
      .name{
        flex: 1;
        .font-md;
      }
    }
    .score{
      flex: 1;
      display: flex;
      &-item{
        flex: 1;
        display: flex;
        flex-direction: column;
        &__top{
          flex: 5;
          display: flex;
        }
        &__mid{
          flex: 5;
          display: flex;
        }
        &__btm{
          flex: 2;
          display: flex;          
        }
      }
      .part-rule{
        flex: 1;
        display: flex;
        flex-direction: column;
        .border-rt;
      }
      .part-score{
        flex: 4;
        display: flex;
        flex-direction: column;
      }
      .title{
        font-size: 20px;
        line-height: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(51, 0, 51, 0.2);
      }
      .content{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .warn{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
