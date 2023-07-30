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
          <div class="field-values">
            <div class="field-values" v-if="!!solution">
              <div class="task-row"
                   v-for="(row, j) of solution" :key="j">
                <div class="cell"
                     :class="[{bordertop: (j===0)}, {borderleft: (i===0)}]"
                     v-for="(value, i) of row" :key="i">
                  {{ value }}
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
            Fix Hs
          </b-button>

          <b-button class="task-btn"
                    size="sm"
                    variant="primary"
                    @click="startTask">
            Start
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
      <div>
        Rows: {{ rows }}
      </div>
      <div>
        Cols: {{ cols }}
      </div>
      <div>
        Выявленные ячейки: {{ clearedCellsToFix }}
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
      rows: [],
      cols: [],
      solution: [],
      stateTask: 'created',
      orderList: [],
      clearedCellsToFix: [],
      timer: {
        startValue: 0,
        deltaValue: 0,
        idTimer: 0,
        state: 'stopped',

        stopTimer() {
          clearInterval(this.idTimer);
          this.state = 'stopped';
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
    filterByPos(line, pos, value) {
      line.hs = line.hs.filter((v) => {
        return ((v >> pos) & 1) == value
      })
    },

//возвращает массив ячеек, значения которых совпадают в гипотезах переданной строки или столбца
    getFixedFromHs(line, direction) {
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

//возвращает массив ячеек, значения которых совпадают для всех гипотез
    cellsHsEqualBits() {
      let cellsToFix = [];
      for (let j = 0; j < this.rows.length; j++) {

        cellsToFix.push(this.getFixedFromHs(this.rows[j], 'row'));
      }
      for (let i = 0; i < this.cols.length; i++) {
          // console.log('cols:' + i);
          cellsToFix.push(this.getFixedFromHs(this.cols[i], 'col'));
      }
        cellsToFix = cellsToFix.flat();

      //удалить дубли
      this.clearedCellsToFix = [];
      // for (let i = 0; i < cellsToFix.length; i++) {
      //   if (!this.clearedCells.includes(cellsToFix[i])) {
      //     this.clearedCells.push(cellsToFix[i])
      //   }
      // }
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
      };
      // console.log(cellsToFix.length);
      // console.log(this.clearedCellsToFix.length);

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

      for (let i = 0; i < 2 ** countCols; i++) {
        allHsCols.push(i);
      }
      this.cols = this.computed_cols.map((v, i) => {
        return {
          index: i,
          values: [...v],
          hs: [...allHsCols],
          sum: this.computed_colSums[i]
        };
      });

      if (countCols === countRows) {
        allHsRows = allHsCols;
      } else {
        for (let j = 0; j < 2 ** this.rows.length; j++) {
          allHsRows.push(j);
        }
      }
      this.rows = this.computed_rows.map((v, i) => {
        return {
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
    },

    startTask() {
      this.timer.startTimer();
      this.stateTask = 'inprogress';


//Цикл: Взять следующую строку, у которой разница между суммой значений всех ячеек и заданной суммой наименьшая
//  Цикл: Взять следующую гипотезу для строки
//    Цикл: Взять следующую ячейку в строке
//      Если в ячейке есть решение, то окончательно фильтруем гипотезы для столбца
//
//      Цикл: Взять следующую гипотезу для столбца из множества, в котором значение ячейки равно текущему значению из гипотезы строки
//        Цикл: Взять следующую ячейку в столбце
//        Если в ячейке есть решение, то предварительно фильтруем гипотезы для строки

//Если остаётся одна гипотеза, она и есть решение
//Как только у гипотезы нет хотя бы по одной перпендикулярной гипотезы, её вычёркиваем

    },

    abortTask() {
      this.timer.stopTimer();
      this.stateTask = 'aborted';
    },


  },

  mounted() {
  },
}
</script>

<style lang="scss">
/****  Resolver_1  ****/
.Resolver_1 {
  width: 100%;
  height: auto;

  .task-btn {
    width: 60px;
    margin: 10px;
    align-items: center;
  }
}
</style>*--------------