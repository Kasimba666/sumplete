<template>
  <div class="Sumplete">
    <div class="container">

      <div class="row">
        <div class="col-12 col-md-12 col-lg-8 mb-4">
            <div id="GF" class="game-field">
              <div class="horizontal"
                   v-for="(hor, j) of arrayField" :key="j">
                <div class="cell" :class="[marks[cell.status], {alive:cell.isAlive},
                                                {bordertopwin: success & (j==0)},
                                                {borderbottomwin: success & (j==(fieldSizeY-1))},
                                                {borderleftwin: success & (i==0)},
                                                {borderrightwin: success & (i==(fieldSizeX-1))},
                                                {bordertop: !success & (j==0)},
                                                {borderleft: !success & (i==0)}
                                                ]"
                     :style="{fontStyle: true ? 'normal':'italic',
                              color: false ? 'gray':'black',
                              width: `${cellSize}px`,
                              height: `${cellSize}px`}"
                     v-for="(cell, i) of hor" :key="i"
                     @click="cellClick(cell)">
                  <div :class="[signedmarks[cell.status]]">

                  </div>
                    {{ cell.value }}
                </div>
                <div class="cell-alive-sum"
                     :style="{fontWeight: arraySumAliveHorizontal[j] === arraySumMarkedHorizontal[j] ? 'bold':'normal',
                              width: `${cellSize}px`,
                              height: `${cellSize}px`
                }">
                  {{ arraySumAliveHorizontal[j] }}
                </div>
                <!--                            <div class="cell-marked-sum">-->
                <!--                                {{ arraySumMarkedHorizontal[j] }}-->
                <!--                            </div>-->
              </div>

              <div class="horizontal">
                <div class="cell-alive-sum"
                     :style="{fontWeight: arraySumAliveVertical[i - 1] === arraySumMarkedVertical[i - 1] ? 'bold':'normal',
                              width: `${cellSize}px`,
                              height: `${cellSize}px`
                }"
                     v-for="i of this.fieldSizeX">
                  {{ arraySumAliveVertical[i - 1] }}
                </div>
              </div>

              <!--                        <div class="horizontal">-->
              <!--                            <div class="cell-marked-sum"-->
              <!--                                 v-for="i of this.field_size">-->
              <!--                                {{ arraySumMarkedVertical[i - 1] }}-->
              <!--                            </div>-->
              <!--                        </div>-->
            </div>

        </div>
      </div>

        <div class="row">
            <div class="col-12 col-md-12 col-lg-8 mb-2">
                <div class="controls">
                    Размер поля:
                    <b-input id="fieldSizeX"
                             style="width: 50px;"
                             min="3"
                             max="9"
                             size="sm"
                             v-model.number="fieldSizeX" type="number"></b-input>
                    x
                    <b-input id="fieldSizeY"
                             style="width: 50px;"
                             min="3"
                             max="9"
                             size="sm"
                             v-model.number="fieldSizeY" type="number"></b-input>
                    <b-button @click="createNewGame(fieldSizeX, fieldSizeY)"
                              variant="primary"
                              size="sm"
                    >Создать
                    </b-button>
                    {{ screen.type }}, {{ gfWidth }}
                </div>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import BSResearch from '@/components/views/BSResearch.vue';
import {mapState} from "vuex";

const cell = JSON.stringify({value: null, isAlive: null, status: null});

export default {
  name: 'Home',
  components: {BSResearch},
  data() {
    return {
      fieldSizeX: 4,
      fieldSizeY: 4,
      cellWidth: 60,
      cellHeight: 60,
      arrayField: [],
      arraySumAliveHorizontal: [],
      arraySumAliveVertical: [],
      arraySumMarkedHorizontal: [],
      arraySumMarkedVertical: [],
      marks: ['', 'mark-no', 'mark-yes'],
      signedmarks: ['', 'signed-mark-no', 'signed-mark-yes'],

      success: false,
    }
  },
  computed: {
      ...mapState(['screen', 'screenBreakpoints']),
      gfWidth() {
          // const w = window["GF"].clientWidth;
          const w = window["GF"].clientWidth;
          if (this.screen.type!=='xs') {
              console.log(this.screen.type, w);
          } else {
              console.log(this.screen.width, w);
          }
          return w;
      },
      cellSize() {
        return Math.floor(this.gfWidth/(this.fieldSizeX + 1));
      },

  },
  methods: {
    cellClick(cell) {
      cell.status++;
      cell.status %= 3;
      this.recalc();
    },
    recalc() {
      const sizeX = this.fieldSizeX;
      const sizeY = this.fieldSizeY;
      let i, j;
      let sumMarkedHorizontal = 0;
      let sumMarkedVertical = 0;


      for (j = 0; j < sizeY; j++) {
        for (i = 0, sumMarkedHorizontal = 0; i < sizeX; i++) {

          if (this.arrayField[j][i].status !== 1) {
            sumMarkedHorizontal += this.arrayField[j][i].value;
          }
        }

        this.arraySumMarkedHorizontal[j] = sumMarkedHorizontal;
      }

      for (i = 0; i < sizeX; i++) {
        for (j = 0, sumMarkedVertical = 0; j < sizeY; j++) {
          if (this.arrayField[j][i].status !== 1) {
            sumMarkedVertical += this.arrayField[j][i].value;
          }
        }
        this.arraySumMarkedVertical[i] = sumMarkedVertical;
      }
      this.success = (JSON.stringify(this.arraySumAliveHorizontal) === JSON.stringify(this.arraySumMarkedHorizontal)) &
          (JSON.stringify(this.arraySumAliveVertical) === JSON.stringify(this.arraySumMarkedVertical));
    },
    createNewGame: function (sizeX, sizeY) {
      this.arrayField = [];
      this.arraySumAliveHorizontal = [];
      this.arraySumAliveVertical = [];
      this.arraySumMarkedVertical = [];
      this.arraySumMarkedHorizontal = [];
      let i, j;
      let horizontal = [];
      let sumAliveHorizontal = 0;
      let sumAliveVertical = 0;

      for (j = 0; j < sizeY; j++) {
        horizontal = [];
        sumAliveHorizontal = 0;
        for (i = 0; i < sizeX; i++) {
          horizontal.push({
            value: (Math.trunc(Math.random() * 9) + 1),
            isAlive: (Math.random() < 0.5),
            status: 0
          });
          if (horizontal[i].isAlive) {
            sumAliveHorizontal += horizontal[i].value
          }
        }
        this.arrayField.push(horizontal);
        this.arraySumAliveHorizontal.push(sumAliveHorizontal);
        this.arraySumMarkedHorizontal.push(0);
      }
      for (i = 0; i < sizeX; i++) {
        sumAliveVertical = 0;
        for (j = 0; j < sizeY; j++) {
          if (this.arrayField[j][i].isAlive) {
            sumAliveVertical += this.arrayField[j][i].value
          }
          if (this.arrayField[j][i].status == 2) {
            sumAliveVertical += this.arrayField[j][i].value
          }
        }
        this.arraySumAliveVertical.push(sumAliveVertical);
        this.arraySumMarkedVertical.push(0);
      }
      this.recalc();
    },

  },
  watcher: {},
}
</script>


<style lang="scss">

.Sumplete {
  width: 100%;
  height: auto;
  padding: 20px 30px;

  .container {
    //border: 1px solid red;
  }

  .controls {
    height: auto;
    width: 100%;
    //margin: 20px 0px;
    padding: 10px;
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
    align-items: center;
    background-color: hsl(210, 78%, 91%);
  }

  .game-field {
    height: 100%;
    width: 100%;
    border: 1px solid gray;

  }

  .field-cell {
    //width: 450px;
    //border-top: 1px solid gray;
    //border-left: 1px solid gray;
    //
    //display: flex;
    //flex-flow: column;
    //box-shadow: none;
    //background-color: hsl(38, 78%, 96%);
    //
    //&.success {
    //  box-shadow: 0 0 10px 3px transparent;
    //}
  }

  .horizontal {
    display: flex;
    flex-flow: row;
  }

  .cell {
    position: relative;
    //min-width: 50px;
    //min-height: 50px;
    //border: 1px solid gray;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.mark-no {
      //background-color: hsla(0, 100%, 50%, .1);
    }

    &.mark-yes {
      //background-color: hsla(120, 100%, 25%, .1);
    }

    &.alive {
      font-weight: bold;
    }

    &:hover {
      box-shadow: 0 0 10px 3px lightgrey;
    }

    &.bordertopwin {
      border-top: 3px solid green;
    }

    &.borderbottomwin {
      border-bottom: 3px solid green;
    }

    &.borderleftwin {
      border-left: 3px solid green;
    }

    &.borderrightwin {
      border-right: 3px solid green;
    }

    &.bordertop {
      border-top: 1px solid gray;
    }

    &.borderleft {
      border-left: 1px solid gray;
    }
  }

  .signed-mark-yes {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    height: 90%;
    border: 5px solid hsla(120, 37%, 59%, 0.66);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;

  }


  .cell-alive-sum {
    width: 50px;
    height: 50px;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .cell-marked-sum {
    width: 50px;
    height: 50px;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .button-control {

  }
}
</style>