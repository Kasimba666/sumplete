<template>
  <div class="Resolver_1">
    <b-container>
      <b-row>
        <div class="d-flex col-12">
          <div class="field-values" v-if="!!computed_rows">
            <div class="task-row"
                 v-for="(row, j) of computed_rows" :key="j">
              <div class="cell"
                   :class="[{bordertop: (j===0)}, {borderleft: (i===0)}]"
                   v-for="(value, i) of row" :key="i">
                {{ value }}
              </div>
              <div class="cell-sum">
                <div class="sum-border"></div>
                {{ computed_rowSums[j] }}
              </div>
            </div>
            <div class="task-row" v-if="!!cols.values">
              <div class="cell-sum"
                   v-for="item of computed_colSums">
                <div class="sum-border"></div>
                {{ item }}
              </div>
            </div>
          </div>
          <div class="field-values" :key="curStep">
            <div class="field-values" v-if="!!solution">
              <div class="task-row"
                   v-for="(row, j) of solution" :key="j">
                <div class="cell"
                     :class="[{bordertop: (j===0)}, {borderleft: (i===0)}]"
                     v-for="(value, i) of row" :key="i">
                  {{ value }}
                </div>
                <div class="cell-sum" v-if="!!solutionRowSums">
                  <div class="sum-border"></div>
                  {{ solutionRowSums[j] }}
                </div>
              </div>
              <div class="task-row" v-if="!!solutionColSums">
                <div class="cell-sum"
                     v-for="(item, i) of solutionColSums" :key="i">
                  <div class="sum-border"></div>
                  {{ item }}
                </div>
              </div>
            </div>
          </div>

        </div>

      </b-row>
      <b-row>
        <div class="d-flex col-12">
          <b-button class="task-btn"
                    size="sm"
                    variant="secondary"
                    @click="init">
            Init
          </b-button>
          <b-button class="task-btn"
                    size="sm"
                    variant="primary"
                    @click="setSolution">
            Fix Hs by Sum
          </b-button>

          <b-checkbox class="task-btn"
                      v-model="stepsMode"
          >by step
          </b-checkbox>
          <b-button class="task-btn"
                    size="sm"
                    variant="primary"
                    ref="run"
                    @click="solve">
            Run
          </b-button>

          <b-button class="task-btn"
                    size="sm"
                    variant="primary"
                    ref="next"
                    @click="nextSolve">
            Next
          </b-button>

          <b-button class="task-btn"
                    size="sm"
                    variant="danger"
                    @click="abortTask">
            Abort
          </b-button>
          <div class="task-btn">
            {{ timer.deltaValue }}
          </div>
        </div>

      </b-row>
      <b-row>
        <div>
          <div v-for="(line, l) of lines" :key="l">
            {{ line.values }}:{{ line.hs }}
          </div>
        </div>
      </b-row>

      <div>
        Суммы совпадают: {{ !!sumsIsRight() }}
      </div>
      <div>
      </div>
      <div>

      </div>

    </b-container>
  </div>
</template>

<script>
import {mapState} from "vuex";

const timeInterval = 100;


export default {
  name: "Resolver_1",
  components: {},
  props: [],
  data() {
    return {
      taskConveer: [],
      stepsMode: true,
      curStep: 0,
      rows: [],
      cols: [],
      lines: [],
      solution: [],
      solutionRowSums: [],
      solutionColSums: [],
      clearedCellsToFix: [],
      timer: {
        startValue: 0,
        stopValue: 0,
        deltaValue: 0,
        idTimer: 0,
        state: 'stopped',

        stopTimer() {
          this.state = 'stopped';
          clearInterval(this.idTimer);
          this.stopValue = Date.now();

        },
        startTimer() {
          this.state = 'inprogress';
          this.deltaValue = 0;
          this.startValue = Date.now();
          this.idTimer = setInterval(() => {
            this.deltaValue = ((Date.now() - this.startValue) / 1000).toFixed(1);
          }, timeInterval);
        },

        pauseTimer() {
          this.state = 'paused';
        },


      }
    }
  },
  computed: {
    ...mapState(["currentTask"]),
    game() {
      return this.currentTask;
    },

    computed_cols() {
      if (!this.game) {
        return null;
      }
      let c = [];
      for (let i = 0; i < this.game.countRows; i++) {
        let col = [];
        for (let j = 0; j < this.game.countCols; j++) {
          col.push(this.game.arrRows[j][i]);
        }
        c.push(col);
      }
      return c;
    },
    computed_colSums() {
      if (!this.game) {
        return null;
      }
      let cs = [];
      for (let i = 0; i < this.game.countRows; i++) {
        let sum = 0;
        for (let j = 0; j < this.game.countCols; j++) {
          sum += this.game.arrRows[j][i] * this.game.arrAlives[j][i];
          ;
        }
        cs.push(sum);
      }
      return cs;
    },

    computed_rows() {
      if (!this.game) {
        return null;
      }
      let r = [];
      for (let j = 0; j < this.game.countCols; j++) {
        let row = [];
        for (let i = 0; i < this.game.countRows; i++) {
          row.push(this.game.arrRows[j][i]);
        }
        r.push(row);
      }
      return r;
    },
    computed_rowSums() {
      if (!this.game) {
        return null;
      }
      let rs = [];
      for (let j = 0; j < this.game.countCols; j++) {
        let sum = 0;
        for (let i = 0; i < this.game.countRows; i++) {
          sum += this.game.arrRows[j][i] * this.game.arrAlives[j][i];
        }
        rs.push(sum);
      }
      return rs;
    },

  },
  methods: {
    dotProduct(vector, num) {
      return vector.reduce((sum, v, i) => sum += v * ((num >> i) & 1), 0);
    },

    //возвращает массив гипотез, у которых сумма ячеек равна заданной
    filterBySum(line) {
      line.hs = line.hs.filter((v) => {
        return this.dotProduct(line.values, v) === line.sum;
      });
    },

    //возвращает массив гипотез, у которых в заданной позиции находится заданное значение
    /**
     *
     * @param line
     * @param pos
     * @param value
     */
    filterByPos(line, pos, value) {
      line.hs = line.hs.filter((v) => {
        return ((v >> pos) & 1) == value
      })
    },

//возвращает массив ячеек, значения которых совпадают в гипотезах переданной строки или столбца
    getFixedFromHsOld(line, direction) {
      let cells = [];
      if (line.hs.length) {
        // console.log(line.values);
        for (let k = 0; k < line.values.length; k++) {
          let bit = (line.hs[0] >> k) & 1;
          let isEqual = 1;
          // console.log('позиция ' + k);
          // console.log('гипотеза 0 значение '+ bit);
          for (let i = 1; i < line.hs.length; i++) {
            // console.log('гипотеза ' + i + ' значение ' + ((line.hs[i] >> k) & 1));
            if (bit != ((line.hs[i] >> k) & 1)) {
              isEqual = 0;
              break;
            }
          }
          if (isEqual) {
            // console.log(bit + ' в позиции ' + k);
            if (direction === 'row') {
              cells.push({ncol: k, nrow: line.index, value: bit})
            }
            if (direction === 'col') {
              cells.push({ncol: line.index, nrow: k, value: bit})
            }

          } else {
            // console.log('не совпали в позиции ' + k);
          }
        }
      }
      return cells;
    },
//возвращает массив ячеек, значения которых совпадают в гипотезах переданной строки или столбца
    getFixedFromHs(line, all) {
      let cells = [];
      if (line.hs.length) {
        // console.log(line.values);
        for (let k = 0; k < line.values.length; k++) {
          let bit = (line.hs[0] >> k) & 1;
          let isEqual = 1;
          // console.log('позиция ' + k);
          // console.log('гипотеза 0 значение '+ bit);
          for (let i = 1; i < line.hs.length; i++) {
            // console.log('гипотеза ' + i + ' значение ' + ((line.hs[i] >> k) & 1));
            if (bit != ((line.hs[i] >> k) & 1)) {
              isEqual = 0;
              break;
            }
          }
          if (isEqual || all) {
            // console.log(bit + ' в позиции ' + k);
            if (line.ort === 'cols') {
              cells.push({ncol: k, nrow: line.index, value: bit})
            }
            if (line.ort === 'rows') {
              cells.push({ncol: line.index, nrow: k, value: bit})
            }

          } else {
            // console.log('не совпали в позиции ' + k);
          }
        }
      }
      return cells;
    },


//возвращает массив ячеек, значения которых совпадают для всех гипотез
    cellsHsEqualBits() {
      let cellsToFix = [];
      for (let j = 0; j < this.rows.length; j++) {

        cellsToFix.push(this.getFixedFromHsOld(this.rows[j], 'row'));
      }
      for (let i = 0; i < this.cols.length; i++) {
        // console.log('cols:' + i);
        cellsToFix.push(this.getFixedFromHsOld(this.cols[i], 'col'));
      }
      cellsToFix = cellsToFix.flat();

      //удалить дубли
      this.clearedCellsToFix = [];

      for (let i = 0; i < cellsToFix.length; i++) {
        let isExist = 0;
        for (let j = 0; j < this.clearedCellsToFix.length; j++) {
          if (JSON.stringify(this.clearedCellsToFix[j]) === JSON.stringify(cellsToFix[i])) {
            isExist = 1;
            break;
          }
        }
        if (!isExist) {
          this.clearedCellsToFix.push(cellsToFix[i]);
        }
      }

      return this.clearedCellsToFix;
    },

//заполняет матрицу решений
    setSolution() {
      let cells = this.cellsHsEqualBits();

      for (let q = 0; q < cells.length; q++) {
        this.solution[cells[q].nrow][cells[q].ncol] = cells[q].value;
      }
      ;

    },

    init() {
      if (!this.game) {
        return null;
      }
      let countCols = this.game.countCols;
      let countRows = this.game.countRows;
      let allHsCols = [];
      let allHsRows = [];

      for (let i = 0; i < 2 ** this.game.countRows; i++) {
        allHsCols.push(i);
      }
      this.cols = this.computed_cols.map((v, i) => {
        return {
          ort: 'rows',
          index: i,
          values: [...v],
          hs: [...allHsCols],
          sum: this.computed_colSums[i]
        };
      });

      if (countCols === countRows) {
        allHsRows = allHsCols;
      } else {
        for (let j = 0; j < 2 ** this.game.countCols; j++) {
          allHsRows.push(j);
        }
      }
      this.rows = this.computed_rows.map((v, i) => {
        return {
          ort: 'cols',
          index: i,
          values: [...v],
          hs: [...allHsRows],
          sum: this.computed_rowSums[i]
        };
      });
      this.rows.forEach(v => this.filterBySum(v));
      this.cols.forEach(v => this.filterBySum(v));

      this.solution = [];
      for (let j = 0; j < countRows; j++) {
        this.solution[j] = [];
        for (let i = 0; i < countCols; i++) {
          this.solution[j][i] = null;
        }
      }
      this.stateTask = 'prepared';
      this.lines = [...this.rows, ...this.cols,];


      //упорядочить массив линий по количеству гипотез у линии
      this.lines.sort((a, b) => a.hs.length - b.hs.length);
      this.curStep = 0;
      this.solutionRowSums = [],
      this.solutionColSums = [],
      this.$refs['run'].disabled = false;
      this.$refs['next'].disabled = true;
    },

//Возвращает 1, если осталось по одной гипотезе
    allHsSingle() {
      return !this.lines.reduce((s, v) => s += (v.hs.length != 1), 0);
    },

//возвращает множество точек, общих для всех гипотез; при наличии флага забирает все точки из первой гипотезы
    solveLine(line, all) {
      let fxPoints = this.getFixedFromHs(line, all);
//удалить первую гипотезу
      if (all) this.lines[0].hs.splice(0, 1);
      fxPoints.forEach((v) => {
        //обработать только новые точки;
        if (this.solution[v.nrow][v.ncol] === null) {
          this.solution[v.nrow][v.ncol] = v.value;

          this.taskConveer.push({
            line: this[line.ort][line.ort === 'rows' ? v.nrow : v.ncol],
            idx: line.ort === 'rows' ? v.ncol : v.nrow,
            value: v.value,
          });
        }
      });

    },

    solveTasks() {
      while (this.taskConveer.length !== 0) {
        let task = this.taskConveer.shift();
        this.filterByPos(task.line, task.idx, task.value);
        this.solveLine(task.line, 0);
      }
    },

    solveStep() {
      this.solveLine(this.lines[this.curStep], 0);
      this.solveTasks();

      console.log('step solved #', this.curStep);
      this.curStep++;
    },


    calcSolutionsSums() {
      this.solutionRowSums = [];
      for (let j = 0; j < this.cols.length; j++) {
        let sum = 0;
        for (let i = 0; i < this.rows.length; i++) {
          // console.log(this.solution[j][i], this.rows[j].values[i]);
          sum += this.solution[j][i] * this.rows[j].values[i];
        }
        this.solutionRowSums.push(sum);
      }
      this.solutionColSums = [];
      for (let i = 0; i < this.rows.length; i++) {
        let sum = 0;
        for (let j = 0; j < this.cols.length; j++) {
          // console.log(this.solution[j][i], this.cols[i].values[j]);
          sum += this.solution[j][i] * this.cols[i].values[j];
        }
        this.solutionColSums.push(sum);
      }

    },

    nextSolve() {
//сделать бэкап lines
//удалить все lines с единичными гипотезами и упорядочить
      this.lines = this.lines.filter(v => v.hs.length > 1).sort((a, b) => a.hs.length - b.hs.length);
//зафиксировать в решении все точки из первой гипотезы
      this.solveLine(this.lines[0], 1);
      this.solve();
    },
//суммы в полученном решении соответствуют исходным
    sumsIsRight() {
      return (JSON.stringify(this.computed_rowSums) === JSON.stringify(this.solutionRowSums)) &&
             (JSON.stringify(this.computed_colSums) === JSON.stringify(this.solutionColSums))
    },

    solve() {
      this.timer.startTimer();
      if (this.stepsMode) {
        if (this.curStep < this.lines.length) {
          this.solveStep();
        } else {
          console.error('Хватит нажимать кнопку!');
        }
      } else {
        while (this.curStep < this.lines.length) {
          this.solveStep();
        }
        this.curStep = 0;
      }
      this.timer.stopTimer();
      console.log(!this.allHsSingle() ? 'не' : '', 'все решения найдены за', this.timer.stopValue - this.timer.startValue, 'мс');
      this.lines = this.lines.filter(v => v.hs.length > 1).sort((a, b) => a.hs.length - b.hs.length);
      this.$refs['next'].disabled = this.allHsSingle();
      if (this.allHsSingle()) {this.calcSolutionsSums()};
    },

    abortTask() {
      this.timer.stopTimer();
      this.stateTask = 'aborted';
    },


  },

  mounted() {
    this.$refs['run'].disabled = true;
    this.$refs['next'].disabled = true;

  },
}
</script>

<style lang="scss">
/****  Resolver_1  ****/
.Resolver_1 {
  width: 100%;
  height: auto;

  .task-btn {
    width: 80px;
    margin: 10px;
    align-items: center;
  }
}
</style>*--------------