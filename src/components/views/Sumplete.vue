<template>
  <div class="Sumplete">
    <div class="container">

      <div class="row">
        <div class="col-12 col-md-12 col-lg-8 mb-4">
          <div id="GF" class="game-field">
            <div class="horizontal" v-if="arrayField.length"
                 v-for="(hor, j) of arrayField" :key="j">
              <div class="cell" :class="[{alive: (cell.isAlive && showAlive)},
                                                {bordertopwin: isSuccess() & (j===0)},
                                                {borderbottomwin: isSuccess() & (j===(fieldSizeY-1))},
                                                {borderleftwin: isSuccess() & (i===0)},
                                                {borderrightwin: isSuccess() & (i===(fieldSizeX-1))},
                                                {bordertop: !isSuccess() & (j===0)},
                                                {borderleft: !isSuccess() & (i===0)}
                                                ]"
                   :style="{fontStyle: 'normal',
                              color: 'black',
                              width: `${cellSize}px`,
                              height: `${cellSize}px`}"
                   v-for="(cell, i) of hor" :key="i"
                   @click="cellClick(cell)">
                <div :class="[signedmarks[cell.status]]"></div>
                {{ cell.value }}
              </div>
              <div class="cell-alive-sum"
                   :class="{matched: (arraySumHorizontal[j].status == 1)}"
                   :style="{width: `${cellSize}px`,
                              height: `${cellSize}px`
                              }"
                   @click="setHorizontalMarks(j)"
              >
                <div class="sum-border"></div>
                {{ arraySumHorizontal[j].alive_value }}
<!--                {{ arraySumHorizontal[j].current_value }},{{ arraySumHorizontal[j].marked_value }}-->
              </div>

            </div>

            <div class="horizontal" v-if="arrayField.length">
              <div class="cell-alive-sum"
                   :class="{matched: (arraySumVertical[i - 1].status == 1)}"
                   :style="{width: `${cellSize}px`,
                              height: `${cellSize}px`
                             }"
                   @click="setVerticalMarks(i-1)"
                   v-for="i of this.fieldSizeX">
                <div class="sum-border"></div>
                {{ arraySumVertical[i - 1].alive_value }}
<!--                {{ arraySumVertical[i - 1].current_value }},{{ arraySumVertical[i - 1].marked_value }}-->
              </div>
            </div>

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
                     v-model.number="newfieldSizeX" type="number"></b-input>
            x
            <b-input id="fieldSizeY"
                     style="width: 50px;"
                     min="3"
                     max="9"
                     size="sm"
                     v-model.number="newfieldSizeY" type="number"></b-input>
            <b-button @click="createNewGame(newfieldSizeX, newfieldSizeY)"
                      variant="primary"
                      size="sm"
            >Создать
            </b-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import BSResearch from '@/components/views/BSResearch.vue';
import {mapState} from "vuex";


// const cell = JSON.stringify({value: null, isAlive: null, status: null});

export default {
  name: 'Home',
  components: {BSResearch},
  data() {
    return {
      showAlive: 0,
      fieldSizeX: 4,
      fieldSizeY: 4,
      newfieldSizeX: 4,
      newfieldSizeY: 4,
      arrayField: [],
      arraySumHorizontal: [],
      arraySumVertical: [],

      marks: ['', 'mark-no', 'mark-yes'],
      signedmarks: ['', 'signed-mark-no', 'signed-mark-yes'],
      summarks: ['no-marked', 'marked'],
    }
  },
  computed: {
    ...mapState(['screen', 'screenBreakpoints']),

    cellSize() {
      const w = document.getElementById("GF")?.clientWidth ?? 1000;

      if (this.screen.type !== 'xs') {
        console.log(this.screen.type, w);
      } else {
        console.log(this.screen.width, w);
      }
      return Math.floor(w / (this.fieldSizeX + 1));

    },

  },
  methods: {
    cellClick(cell) {
      cell.status++;
      cell.status %= 3;
      this.recalc();
    },
    recalc() {
      this.fieldSizeX = this.newfieldSizeX;
      this.fieldSizeY = this.newfieldSizeY;
      const sizeX = this.fieldSizeX;
      const sizeY = this.fieldSizeY;
      let i, j;
      let sumCurrentHorizontal = 0;
      let sumMarkedHorizontal = 0;
      let sumCurrentVertical = 0;
      let sumMarkedVertical = 0;

      for (j = 0; j < sizeY; j++) {
        sumCurrentHorizontal = 0;
        sumMarkedHorizontal = 0;
        for (i = 0; i < sizeX; i++) {
          if (this.arrayField[j][i].status !== 1) {
            sumCurrentHorizontal += this.arrayField[j][i].value;
          }
          if (this.arrayField[j][i].status == 2) {
            sumMarkedHorizontal += this.arrayField[j][i].value;
          }
        }
        this.arraySumHorizontal[j].current_value = sumCurrentHorizontal;
        this.arraySumHorizontal[j].marked_value = sumMarkedHorizontal;
        this.arraySumHorizontal[j].status = (this.arraySumHorizontal[j].current_value === this.arraySumHorizontal[j].alive_value);

      }

      for (i = 0; i < sizeX; i++) {
        sumCurrentVertical = 0;
        sumMarkedVertical = 0;
        for (j = 0; j < sizeY; j++) {
          if (this.arrayField[j][i].status !== 1) {
            sumCurrentVertical += this.arrayField[j][i].value;
          }
          if (this.arrayField[j][i].status == 2) {
            sumMarkedVertical += this.arrayField[j][i].value;
          }
        }
        this.arraySumVertical[i].current_value = sumCurrentVertical;
        this.arraySumVertical[i].marked_value = sumMarkedVertical;
        this.arraySumVertical[i].status = (this.arraySumVertical[i].current_value === this.arraySumVertical[i].alive_value);
      }


    },
    createNewGame: function (sizeX, sizeY) {
      this.arrayField = [];
      this.arraySumHorizontal = [];
      this.arraySumVertical = [];

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

        this.arraySumHorizontal.push({
          alive_value: sumAliveHorizontal,
          current_value: 0,
          marked_value: 0,
          status: 0
        });

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

        this.arraySumVertical.push({
          alive_value: sumAliveVertical,
          current_value: 0,
          status: 0
        });

      }

      this.recalc();
    },
    setHorizontalMarks(horizontal) {
      if (this.arraySumHorizontal[horizontal].status == 1) {
        let index = 0;
        for (index = 0; index < this.fieldSizeX; index++) {
          if (this.arrayField[horizontal][index].status == 0) {
            this.arrayField[horizontal][index].status = 2;
          }
        }
      } else {
        let index = 0;
        if (this.arraySumHorizontal[horizontal].alive_value == this.arraySumHorizontal[horizontal].marked_value) {
          for (index = 0; index < this.fieldSizeX; index++) {
            if (this.arrayField[horizontal][index].status == 0) {
              this.arrayField[horizontal][index].status = 1;
            }
          }
        }
      }
      this.recalc();
    },

    setVerticalMarks(vertical) {
      if (this.arraySumVertical[vertical].status == 1) {
        let index = 0;
        for (index = 0; index < this.fieldSizeY; index++) {
          if (this.arrayField[index][vertical].status == 0) {
            this.arrayField[index][vertical].status = 2;
          }
        }
      } else {
        let index = 0;
        if (this.arraySumVertical[vertical].alive_value == this.arraySumVertical[vertical].marked_value) {
          for (index = 0; index < this.fieldSizeY; index++) {
            if (this.arrayField[index][vertical].status == 0) {
              this.arrayField[index][vertical].status = 1;
            }
          }
        }
      }
      this.recalc();
    },

    isSuccess() {
      let i, j;
      let suc = true;
      for (i = 0; suc && (i < this.arraySumHorizontal.length); i++) {
        suc = (this.arraySumHorizontal[i].alive_value == this.arraySumHorizontal[i].current_value);
      }
      for (j = 0; suc && (j < this.arraySumVertical.length); j++) {
        suc = (this.arraySumVertical[j].alive_value == this.arraySumVertical[j].current_value);
      }

      return suc;
    },
  },
  mounted: function () {
    this.createNewGame(this.newfieldSizeX, this.newfieldSizeY);
  },

}
</script>


<style lang="scss">
:root {
  --max-cell-size: 100px;
  --min-cell-size: 20px;
}

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


  .horizontal {
    display: flex;
    flex-flow: row;
  }

  .cell {
    position: relative;
    min-width: var(--min-cell-size);
    min-height: var(--min-cell-size);
    max-width: var(--max-cell-size);
    max-height: var(--max-cell-size);

    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

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
    border: 6px solid hsla(120, 37%, 59%, 0.66);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;

  }

  .signed-mark-no {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff0000' stroke-width='2' stroke-linecap='square' stroke-linejoin='miter'%3E%3Cline x1='18' y1='6' x2='6' y2='18' /%3E%3Cline x1='6' y1='6' x2='18' y2='18' /%3E%3C/svg%3E");
    background-position: center;
    opacity: 20%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .cell-alive-sum {
    position: relative;
    max-width: var(--max-cell-size);
    max-height: var(--max-cell-size);
    min-width: var(--min-cell-size);
    min-height: var(--min-cell-size);
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;

    &.matched {
      font-weight: bold;
    }
    .sum-border {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 75%;
      height: 75%;
      border: 3px solid hsla(0, 0%, 50%, 0.2);
      border-radius: 25%;
      cursor: pointer;

      &:hover {
        border-color: hsla(0, 0%, 50%, 0.5);
      }
    }

  }

}
</style>