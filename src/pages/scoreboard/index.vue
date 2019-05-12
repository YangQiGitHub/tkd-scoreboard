<template>
<div class="page">
  <div class="board">
    <Icon @click="drawerShow = true" class="match-settings" type="md-settings" size="40" />
    <div class="board__hd">{{welcomes}}</div>
    <div class="board__bd">
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
      :mask-closable="false"
      draggable
    >
      <div>标题配置：<Input v-model="welcomes" placeholder="Enter something..." style="width: 300px" /></div>
      <br>
      <div>
        运动员：
        <Select v-model="performer.red.name" style="width:200px" clearable>
          <!-- <div style="background: red;" slot="prefix" >&nbsp;&nbsp;&nbsp;&nbsp;</div> -->
          <Icon style="color: red;" type="ios-contact" slot="prefix" size="20" />
          <Option v-for="item in athletes" :value="item" :disabled="performer.blue.name === item" :key="item">{{ item }}</Option>
        </Select>
        <Select @on-change="a" v-model="performer.blue.name" style="width:200px" clearable>
          <Icon style="color: blue;" type="ios-contact" slot="prefix" size="20" />
          <Option v-for="item in athletes" :value="item" :disabled="performer.red.name === item" :key="item">{{ item }}</Option>
        </Select>
      </div>
      <br>
      <div>
        <Cascader :data="data" v-model="value1" style="width: 300px" ></Cascader>
      </div>
      <br>
      <div class="drawer-footer">
        <Button type="primary" @click="drawerShow = false">Submit</Button>
      </div>
    </Drawer>
  </div>
  <div class="settings">
    <Card>
      <p slot="title">设置面板</p>
      <!-- <div>标题配置：<Input v-model="welcomes" placeholder="Enter something..." style="width: 300px" /></div>
      <br> -->
      <div>
        所有运动员：<Tag v-for="(item, idx) in athletes" :key="idx" @on-close="delAthlete(idx)" type="border" closable color="primary">{{item}}</Tag>
      </div>
      <br>
      <div>
        <Input v-model="athleteStr" search enter-button="添加" @on-enter="addAthlete" :autosize="true" placeholder="运动员姓名录入" style="width: 300px" />
      </div>
      <br>
      
    </Card>
  </div>
</div>
</template>

<script>
  export default {
    name: 'Scoreboard',
    data() {
      return {
        drawerShow: true,
        welcomes: '澳门赌场一日游',
        athletes: ['张三1', '李四2'],
        athleteStr: '',
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
        }
      }
    },
    methods: {
      addAthlete() {
        console.log(this.athleteStr)
        const name = this.athleteStr.trim()
        if (!name) return
        if (this.athletes.includes(name)) return this.$Message.error('有重名了哦~')
        this.athletes.push(name)
      },
      delAthlete(idx) {
        this.athletes.splice(idx, 1)
      },
      a() {
        console.log(this.performer)
      },
      scoreChange(key) {
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
      }
    }
  }
</script>

<style lang="less">
.match-settings{
  position: fixed;
  right: 20px;
  top: 20px;
  color: aqua;
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
