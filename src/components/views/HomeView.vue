<template>
    <div class="home">
    <div class="control">
        <label for="field_size">Размер поля:</label>
        <input id="field_size"
               v-model.number="field_size" type="number">
        <button @click="createNewGame(field_size)">Создать</button>
    </div>

    <div class="game-field">

    </div>
    </div>
</template>

<script>

export default {
    name: 'HomeView',
    components: {},
    data() {
        return {
            field_size: 4,
            cell: {value: null, isAlive: null, mark: null},
            field: [],

        }
    },
    computed: {},
    methods: {
        createNewGame: function(size) {
            this.field = [];
            let i, j;
            let horizontal = [];
            for (j=0; j<size; j++) {
                horizontal = [];
                for (i=0; i<size; i++) {
                   horizontal.push({value: 0, isAlive: 0, mark: 0})
                }
                this.field.push(horizontal);
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
  height: 25px;
  width: 100%;
  display: flex;
  flex-flow: row;
}

.main {
  height: 100%;
  width: 100%;
}

.field {

}

.cell {
  width: 50px;
  height: 50px;
  border-style: solid;
  border-color: gray;
  border-radius: 5px;
}

.button-control {

}

</style>