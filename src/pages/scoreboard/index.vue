<template>
  <div class="board">
    <div class="board__header">澳门赌场</div>
    <div class="board__body">
      <div class="athlete">
        <div class="athlete-name blue">张三</div>
        <div class="athlete-mid">Round 1</div>
        <div class="athlete-name red">李四</div>
      </div>
      <div class="score">
        <div class="score-history"></div>
        <div class="score-panel">
          <div class="score-panel__lf blue">12</div>
          <div class="score-panel__rt red">5</div>
          <div class="time">02:23</div>
          <div class="score-panel__lf-warn warn">
            <div class="warn-item"></div>
          </div>
          <div class="score-panel__rt-warn warn">
            <div class="warn-item"></div>
            <div class="warn-item"></div>
          </div>
        </div>
        <div class="score-history"></div>
      </div>
    </div>
    <div class="board__footer">
      <div class="board__footer-content"></div>
      <div class="board__footer-content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Scoreboard',
  }
</script>

<style lang="less">
.board{
  display: flex;
  flex-direction: column;
  height: 100vh;
  // background: gray;
  color: #fff;
  &__header{
    .font-md;
    height: 100px;
    font-size: 60px;
    background: green;
    color: #fff;
  }
  &__body{
    flex: 1;
    display: flex;
    flex-direction: column;
    .athlete{
      height: 100px;
      display: flex;
      font-size: 50px;
      border-bottom: 2px solid transparent;
      &-name{
        .font-md;
        flex: 1;
      }
      &-mid{
        .font-md;
        width: 500px;
        width: 20%;
        background: black;
      }
    }
    .score{
      background: #fff;
      flex: 1;
      display: flex;
      .score{
        &-history{
          width: 100px;
        }
        &-panel{
          flex: 1;
          position: relative;
          &__lf{
            .font-md;
            float: left;
            font-size: 500px;
            font-weight: 900;
            width: 50%;
            height: 100%;
          }
          &__rt{
            .font-md;
            float: right;
            font-size: 500px;
            font-weight: 900;
            width: 50%;
            height: 100%;
          }
          &__lf-warn{
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
          }
          &__rt-warn{
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
          }
          .warn{
            padding: 2%;
            width: 8%;
            &-item{
              width: 0;
              height: 0;
              background: yellow;
              padding: 50%;
              border-radius: 50%;
              margin-bottom: 30%;
            }
          }
          .time{
            .font-md;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 500px;
            font-size: 50px;
            background: black;
          }
        }
      }
    }
  }
  &__footer{
    height: 100px;
    font-size: 60px;
    background: bisque;
    display: flex;
    &-content{
      flex: 1;
    }
  }
  .blue{
    background: blue;
    background: #000099;
  }
  .red{
    background: #FF3333;
    background: #CC0033;
    background: #CC0000;
  }
  .font-md{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
