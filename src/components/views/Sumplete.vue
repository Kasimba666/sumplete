<template>
  <div class="Sumplete">
    <div class="container">

      <div class="row">
        <div class="col-12 col-md-11 col-lg-8 mb-4">
          <div id="GF" ref="GF" class="game-field">
            <div class="horizontal" v-if="game.fieldSizeY()"
                 v-for="(hor, j) of game.arrayField" :key="j">
              <div class="cell" :class="[{alive: (cell.isAlive && showAlive)},
                                                {bordertopwin: isSuccess() & (j===0)},
                                                {borderbottomwin: isSuccess() & (j===(game.fieldSizeY()-1))},
                                                {borderleftwin: isSuccess() & (i===0)},
                                                {borderrightwin: isSuccess() & (i===(game.fieldSizeX()-1))},
                                                {bordertop: !isSuccess() & (j===0)},
                                                {borderleft: !isSuccess() & (i===0)}
                                                ]"
                   :style="{  width: `${cellSize}px`,
                              height: `${cellSize}px`}"
                   v-for="(cell, i) of hor" :key="i"
                   @click="changeCellState(cell, i, j)">
                <div :class="[signedmarks[cell.status]]"></div>
                {{ cell.value }}
              </div>

              <div class="cell-alive-sum"
                   :class="{matched: (game.arraySumHorizontal[j].status == 1)}"
                   :style="{width: `${cellSize}px`,
                              height: `${cellSize}px`
                              }"
                   @click="setHorizontalMarks(j)"
              >
                <div class="sum-border"></div>
                {{ game.arraySumHorizontal[j].alive_value }}

              </div>

            </div>

            <div class="horizontal" v-if="game.fieldSizeX()">
              <div class="cell-alive-sum"
                   :class="{matched: (game.arraySumVertical[i - 1].status == 1)}"
                   :style="{width: `${cellSize}px`,
                              height: `${cellSize}px`
                             }"
                   @click="setVerticalMarks(i-1)"
                   v-for="i of game.fieldSizeX()">
                <div class="sum-border"></div>
                {{ game.arraySumVertical[i - 1].alive_value }}

              </div>
            </div>

          </div>


        </div>
        <div class="col-12 col-md-1 col-lg-1 mb-4">
          <div class="moves">

          </div>

          </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-12 col-lg-8 mb-2">
          <div class="controls">
            Size:
            <b-dropdown size="sm"
                        class="size-selector"
                        variant="outline-primary"
                        :text="newfieldSizeX"
            >
              <b-dd-items
                  v-for="i of sizeRange"
                  @click="ddClickSizeX(i)">
                {{ i }}
              </b-dd-items>
            </b-dropdown>
            x
            <b-dropdown size="sm"
                        class="size-selector"
                        variant="outline-primary"
                        :text="newfieldSizeY"
            >
              <b-dd-item
                  v-for="i of sizeRange"
                  @click="ddClickSizeY(i)">
                {{ i }}
              </b-dd-item>
            </b-dropdown>

            <b-button
                variant="primary"
                size="sm"
                @click="modalShowNewGame = !modalShowNewGame"
            >
              New
            </b-button>

            <b-button
                variant="secondary"
                size="sm"
                @click="game.undoStep()"
            >
              Undo
            </b-button>
            <b-button
                variant="secondary"
                size="sm"
                @click="game.redoStep()"
            >
              Redo
            </b-button>

            <b-modal id="modalNewGame"
                     size="sm"
                     button-size="sm"
                     centered
                     v-model="modalShowNewGame"
                     title="">
              <p class="my-0">Start new game?</p>
              <template #modal-footer>
                <div class="w-100">
                  <b-button style="width: 80px"
                      variant="secondary"
                      size="sm"
                      class="float-left button-new-game"
                      @click="modalShowNewGame = !modalShowNewGame"
                  >
                    No
                  </b-button>
                  <b-button style="width: 80px"
                      variant="primary"
                      size="sm"
                      class="float-right button-new-game"
                      @click="modalShowNewGame = !modalShowNewGame, createNewGame(newfieldSizeX, newfieldSizeY)"
                  >
                    Yes
                  </b-button>

                </div>
              </template>
            </b-modal>
          </div>
        </div>
      </div>

    </div>
    {{ game.stepCounter }}
    <br>
    {{ game.steps }}
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
      newfieldSizeX: 4,
      newfieldSizeY: 4,
      game: {
        arrayField: [],
        arraySumHorizontal: [],
        arraySumVertical: [],
        fieldSizeX: function () {
          let size = 0;
          if (this.arrayField.length) {
            size = this.arrayField[0].length
          }
          return size;
        },
        fieldSizeY: function () {
          let size = 0;
          if (this.arrayField.length) {
            size = this.arrayField.length
          }
          return size;
        },
        steps: [], //массив объектов: x, y, status
        stepCounter: 0,
        clearSteps: function () {
          this.steps = [];
          this.stepCounter = 0;
        },
        addStep: function (newX, newY, newS) {
          this.steps.push({x: newX, y: newY, s: newS});
          this.stepCounter++;
        },
        undoStep: function () {
          if (this.stepCounter > 0) {
            let step = this.steps[this.stepCounter];
            this.arrayField[step.y][step.x].status = step.s;
            this.recalc();
            this.stepCounter--;
          }
        },

        redoStep: function () {
          if (this.stepCounter < this.steps.length) {
            let step = this.steps[this.stepCounter - 1];
            this.arrayField[step.y][step.x].status = step.s;
            this.recalc();
            this.stepCounter++;
          }
        }
      },
      screenWidth: 1000,
      clientWidth: 1000,
      marks: ['', 'mark-no', 'mark-yes'],
      signedmarks: ['', 'signed-mark-no', 'signed-mark-yes'],
      summarks: ['no-marked', 'marked'],
      sizeRange: [2, 3, 4, 5, 6, 7, 8, 9],
      modalShowNewGame: false,

    }
  },
  computed: {
    ...mapState(['screen', 'screenBreakpoints']),

    cellSize() {
      const w = this.screenWidth;  //document.getElementById("GF")?.clientWidth ?? 1000;

      return Math.floor(w / (this.game.fieldSizeX() + 1));

    },

  },
  methods: {
    ddClickSizeX(v) {
      this.newfieldSizeX = v;
    },
    ddClickSizeY(v) {
      this.newfieldSizeY = v;
    },
    changeCellState(cell,i,j) {
      this.game.addStep(i, j, cell.status);
      cell.status++;
      cell.status %= 3;
      this.recalc();
    },
    recalc() {
      const sizeX = this.game.fieldSizeX();
      const sizeY = this.game.fieldSizeY();
      let i, j;
      let sumCurrentHorizontal = 0;
      let sumMarkedHorizontal = 0;
      let sumCurrentVertical = 0;
      let sumMarkedVertical = 0;

      for (j = 0; j < sizeY; j++) {
        sumCurrentHorizontal = 0;
        sumMarkedHorizontal = 0;
        for (i = 0; i < sizeX; i++) {
          if (this.game.arrayField[j][i].status !== 1) {
            sumCurrentHorizontal += this.game.arrayField[j][i].value;
          }
          if (this.game.arrayField[j][i].status == 2) {
            sumMarkedHorizontal += this.game.arrayField[j][i].value;
          }
        }
        this.game.arraySumHorizontal[j].current_value = sumCurrentHorizontal;
        this.game.arraySumHorizontal[j].marked_value = sumMarkedHorizontal;
        this.game.arraySumHorizontal[j].status = (this.game.arraySumHorizontal[j].current_value == this.game.arraySumHorizontal[j].alive_value);

      }

      for (i = 0; i < sizeX; i++) {
        sumCurrentVertical = 0;
        sumMarkedVertical = 0;
        for (j = 0; j < sizeY; j++) {
          if (this.game.arrayField[j][i].status !== 1) {
            sumCurrentVertical += this.game.arrayField[j][i].value;
          }
          if (this.game.arrayField[j][i].status == 2) {
            sumMarkedVertical += this.game.arrayField[j][i].value;
          }
        }
        this.game.arraySumVertical[i].current_value = sumCurrentVertical;
        this.game.arraySumVertical[i].marked_value = sumMarkedVertical;
        this.game.arraySumVertical[i].status = (this.game.arraySumVertical[i].current_value == this.game.arraySumVertical[i].alive_value);
      }


    },
    createNewGame: function (sizeX, sizeY) {
      this.game.arrayField = [];
      this.game.arraySumHorizontal = [];
      this.game.arraySumVertical = [];

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
        this.game.arrayField.push(horizontal);

        this.game.arraySumHorizontal.push({
          alive_value: sumAliveHorizontal,
          current_value: 0,
          marked_value: 0,
          status: 0
        });

      }
      for (i = 0; i < sizeX; i++) {
        sumAliveVertical = 0;
        for (j = 0; j < sizeY; j++) {
          if (this.game.arrayField[j][i].isAlive) {
            sumAliveVertical += this.game.arrayField[j][i].value
          }
          if (this.game.arrayField[j][i].status == 2) {
            sumAliveVertical += this.game.arrayField[j][i].value
          }
        }

        this.game.arraySumVertical.push({
          alive_value: sumAliveVertical,
          current_value: 0,
          status: 0
        });

      }
      this.game.clearSteps();
      this.recalc();
      this.game.steps.push({x: 0, y: 0, s: 0});
    },
    setHorizontalMarks(y) {
      if (this.game.arraySumHorizontal[y].status == 1) {
        let index = 0;
        for (index = 0; index < this.game.fieldSizeX(); index++) {
          if (this.game.arrayField[y][index].status == 0) {
            this.game.addStep(index, y, this.game.arrayField[y][index].status);
            this.game.arrayField[y][index].status = 2;
          }
        }
      } else {
        let index = 0;
        if (this.game.arraySumHorizontal[y].alive_value == this.game.arraySumHorizontal[y].marked_value) {
          for (index = 0; index < this.game.fieldSizeX(); index++) {
            if (this.game.arrayField[y][index].status == 0) {
              this.game.addStep(index, y, this.game.arrayField[y][index].status);
               this.game.arrayField[y][index].status = 1;
            }
          }
        }
      }
      this.recalc();
    },

    setVerticalMarks(x) {
      console.log(this.game.arraySumVertical[x].status);
      if (this.game.arraySumVertical[x].status == 1) {
        let index = 0;
        for (index = 0; index < this.game.fieldSizeY(); index++) {
          if (this.game.arrayField[index][x].status == 0) {
            this.game.addStep(x, index, this.game.arrayField[index][x].status);
            this.game.arrayField[index][x].status = 2;
          }
          console.log(index + ', ' + this.game.arrayField[index][x].value);
        }
      } else {
        let index = 0;
        if (this.game.arraySumVertical[x].alive_value == this.game.arraySumVertical[x].marked_value) {
          for (index = 0; index < this.game.fieldSizeY(); index++) {
            if (this.game.arrayField[index][x].status == 0) {
              this.game.addStep(x, index, this.game.arrayField[index][x].status);
              this.game.arrayField[index][x].status = 1;
            }
          }
        }
      }
      this.recalc();
    },

    isSuccess() {
      let i, j;
      let suc = true;
      for (i = 0; suc && (i < this.game.fieldSizeX()); i++) {
        suc = (this.game.arraySumHorizontal[i].alive_value == this.game.arraySumHorizontal[i].current_value);
      }
      for (j = 0; suc && (j < this.game.fieldSizeY()); j++) {
        suc = (this.game.arraySumVertical[j].alive_value == this.game.arraySumVertical[j].current_value);
      }

      return suc;
    },
    onResize() {
      this.screenWidth = this.$refs['GF'].clientWidth;

    },


  },
  mounted: function () {
    this.onResize();
    this.createNewGame(this.newfieldSizeX, this.newfieldSizeY);

    window.addEventListener("resize", this.onResize);


  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  watch: {
    clientWidth() {
      return this.$refs['GF'].clientWidth;
    },
    function(v) {
      console.log(v)
    }

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
    //background-color: hsl(210, 78%, 91%);
  }

  .game-field {
    height: 100%;
    width: 100%;
    //border: 1px solid gray;

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
    font-weight: normal;
    color: black;
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

  .moves {
    border: 1px solid hsla(0, 0%, 50%, 0.2);
  }

  .size-selector {
    width: 40px;
    //min-width: 20px;

    & > .dropdown-toggle {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .btn-outline-primary {
    color: black;
  }

}
</style>