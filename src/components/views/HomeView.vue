<template>
    <div class="home">
        <div class="control">
            <label for="field_size">Размер поля:</label>
            <input id="field_size"
                   style="width: 40px;"
                   min="3"
                   max="9"
                   v-model.number="field_size" type="number">
            <button @click="createNewGame(field_size)">Создать</button>
        </div>

        <div class="main">
            <div class="field-all">
                <div class="field-cell">
                    <div class="horizontal"
                         v-for="(hor, j) of arrayField"  :key="j">
                        <div class="cell"
                             v-for="(cell, i) of hor" :key="i"
                             @click="cellClick(cell)">
                            {{ cell.value }}
                        </div>
                        <div class="cell-sum">
                            {{ arraySumAliveHorizontal[j] }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <pre>{{ arrayField }}</pre>
    </div>

</template>

<script>

const cell = JSON.stringify({value: null, isAlive: null, status: null});
export default {
    name: 'HomeView',
    components: {},
    data() {
        return {
            field_size: 4,
            arrayField: [],
            arraySumAliveHorizontal: [],
            arraySumAliveVertical: [],
        }
    },
    computed: {},
    methods: {
        cellClick(cell){
            cell.status++;
            cell.status %= 3;
            this.recalc();
        },
        recalc(){
            console.log('recalc');
        },
        createNewGame: function (size) {
            this.arrayField = [];
            this.arraySumAliveHorizontal = [];
            this.arraySumAliveVertical = [];
            let i, j;
            let horizontal = [];
            let sumHorizontal = 0;
            for (j = 0; j < size; j++) {
                horizontal = [];
                sumHorizontal = 0;
                for (i = 0; i < size; i++) {
                    horizontal.push({
                        value: (Math.trunc(Math.random() * 9) + 1),
                        isAlive: (Math.random() < 0.5),
                        status: 0
                    });
                    sumHorizontal += horizontal[i].value;
                }
                ;

                this.arrayField.push(horizontal);
                this.arraySumAliveHorizontal.push(sumHorizontal);
            }
        },

    },
}
</script>

<style lang="scss">
.common {
  border-style: solid;
  border-color: gray;
  border-radius: 20px;
}

.control {
  height: 30px;
  width: 100%;
  margin: 10px;
  display: flex;
  flex-flow: row;
  gap: 10px;
}

.main {
  height: 100%;
  width: 100%;
}

.field-all {
  width: 600px;
  display: flex;
  flex-flow: row;
}

.field-cell {
  width: 500px;
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  display: flex;
  flex-flow: column;
}

.horizontal {
  display: flex;
  flex-flow: row;
}

.cell {
  width: 50px;
  height: 50px;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
}

.cell-sum {

}

.button-control {

}

</style>