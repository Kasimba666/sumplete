<template>
  <div class="Sumplete">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-12 col-lg-8 mb-2">
          <div class="controls">
            <label for="field_size">Размер поля:</label>
            <b-input id="field_size"
                   style="width: 50px;"
                   min="3"
                   max="9"
                   size="sm"
                   v-model.number="field_size" type="number"></b-input>
            <b-button @click="createNewGame(field_size)"
                      size="sm"
            >Создать
            </b-button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-12 col-lg-8 mb-4">
          <div class="main">
            <div class="field-cell" :class="{success}">
              <div class="horizontal"
                   v-for="(hor, j) of arrayField" :key="j">
                <div class="cell" :class="[marks[cell.status], {alive:cell.isAlive},
                                                {bordertopwin: success & (j==0)},
                                                {borderbottomwin: success & (j==(field_size-1))},
                                                {borderleftwin: success & (i==0)},
                                                {borderrightwin: success & (i==(field_size-1))},
                                                {bordertop: !success & (j==0)},
                                                {borderleft: !success & (i==0)}
                                                ]"
                     :style="{fontStyle: true ? 'normal':'italic',
                              color: false ? 'gray':'black',
                              width: `${cellWidth}px`,
                              height: `${cellHeight}px`}"
                     v-for="(cell, i) of hor" :key="i"
                     @click="cellClick(cell)">
                  <div :class="[signedmarks[cell.status]]">
                    {{ cell.value }}
                  </div>

                </div>
                <div class="cell-alive-sum"
                     :style="{fontWeight:
                              arraySumAliveHorizontal[j] === arraySumMarkedHorizontal[j] ? 'bold':'normal',
                              width: `${cellWidth}px`,
                              height: `${cellHeight}px`
                }">
                  {{ arraySumAliveHorizontal[j] }}
                </div>
                <!--                            <div class="cell-marked-sum">-->
                <!--                                {{ arraySumMarkedHorizontal[j] }}-->
                <!--                            </div>-->
              </div>

              <div class="horizontal">
                <div class="cell-alive-sum"
                     :style="{fontWeight:
                               arraySumAliveVertical[i - 1] === arraySumMarkedVertical[i - 1] ? 'bold':'normal'
                              width: `${cellWidth}px`,
                              height: `${cellHeight}px`
                }"
                     v-for="i of this.field_size">
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
      </div>
    </div>
  </div>
</template>

<script>
import BSResearch from '@/components/views/BSResearch.vue';

const cell = JSON.stringify({value: null, isAlive: null, status: null});

export default {
  name: 'Home',
  components: {BSResearch},
  data() {
    return {
      field_size: 4,
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
  computed: {},
  methods: {
    cellClick(cell) {
      cell.status++;
      cell.status %= 3;
      this.recalc(this.field_size);
    },
    recalc() {
      const size = this.field_size;
      let i, j;
      let sumMarkedHorizontal = 0;
      let sumMarkedVertical = 0;


      for (j = 0; j < size; j++) {
        for (i = 0, sumMarkedHorizontal = 0; i < size; i++) {

          if (this.arrayField[j][i].status !== 1) {
            sumMarkedHorizontal += this.arrayField[j][i].value;
          }
        }

        this.arraySumMarkedHorizontal[j] = sumMarkedHorizontal;
      }

      for (i = 0; i < size; i++) {
        for (j = 0, sumMarkedVertical = 0; j < size; j++) {
          if (this.arrayField[j][i].status !== 1) {
            sumMarkedVertical += this.arrayField[j][i].value;
          }
        }
        this.arraySumMarkedVertical[i] = sumMarkedVertical;
      }
      this.success = (JSON.stringify(this.arraySumAliveHorizontal) === JSON.stringify(this.arraySumMarkedHorizontal)) &
          (JSON.stringify(this.arraySumAliveVertical) === JSON.stringify(this.arraySumMarkedVertical));
    },
    createNewGame: function (size) {
      this.arrayField = [];
      this.arraySumAliveHorizontal = [];
      this.arraySumAliveVertical = [];
      this.arraySumMarkedVertical = [];
      this.arraySumMarkedHorizontal = [];
      let i, j;
      let horizontal = [];
      let sumAliveHorizontal = 0;
      let sumAliveVertical = 0;

      for (j = 0; j < size; j++) {
        horizontal = [];
        sumAliveHorizontal = 0;
        for (i = 0; i < size; i++) {
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
      for (i = 0; i < size; i++) {
        sumAliveVertical = 0;
        for (j = 0; j < size; j++) {
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
}
</script>

<style lang="scss">

.Sumplete {
  width: 100%;
  height: auto;
  padding: 20px 30px;

  .common {
    border-style: solid;
    border-color: gray;
    border-radius: 20px;
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

  .main {
    height: auto;
    width: auto;
  }

  .field-cell {
    //width: 450px;
    //border-top: 1px solid gray;
    //border-left: 1px solid gray;
    padding: 10px;
    display: flex;
    flex-flow: column;
    box-shadow: none;
    background-color: hsl(38, 78%, 91%);

    &.success {
      box-shadow: 0 0 10px 3px transparent;
    }
  }

  .horizontal {
    display: flex;
    flex-flow: row;
  }

  .cell {
    position: relative;
    min-width: 50px;
    min-height: 50px;
    //border: 1px solid gray;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.mark-no {
      background-color: hsla(0, 100%, 50%, .3);
    }

    &.mark-yes {
      background-color: hsla(120, 100%, 25%, .3);
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
    top: 0;
    left: 0;
    wigth: 100%;
    height: 100%;
    border: 3px solid green;
    border-radius: 20px;
  }

  .cell-alive-sum {
    width: 50px;
    height: 50px;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
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