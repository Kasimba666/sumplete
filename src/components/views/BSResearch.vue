<template>
    <div class="BSResearch">
        <h2>BSResearch</h2>

        <div class="container">
            <div class="row">
                <div class="col-12 col-md-8 col-lg-6 mb-4">
                    <div class="block -b1">col-12 col-md-8 col-lg-6
                        <div class="container px-0">
                            <div class="row">
                                <div class="col-12 col-md-8 col-lg-6 mb-4">
                                    <div class="block -b1">col-12 col-md-8 col-lg-6
                                      <b-dropdown id="breeds" text="Порода собаки">
                                        <b-dropdown-item>Пинчер</b-dropdown-item>
                                        <b-dropdown-item>Корги</b-dropdown-item>
                                        <b-dropdown-item active>Бигль</b-dropdown-item>
                                      </b-dropdown>
                                      <div>
                                        <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
                                          <b-dropdown-item>Первое действие</b-dropdown-item>
                                          <b-dropdown-item>Второе действие</b-dropdown-item>
                                          <b-dropdown-item>Третье действие</b-dropdown-item>
                                          <b-dropdown-divider></b-dropdown-divider>
                                          <b-dropdown-item active>Активное действие</b-dropdown-item>
                                          <b-dropdown-item disabled>Отключенное действие</b-dropdown-item>
                                        </b-dropdown>
                                      </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4 col-lg-3">
                                    <div class="block -b2">col-12 col-md-4 col-lg-3</div>
                                </div>
                                <div class="d-none d-lg-block col-lg-3 offset-lg-2">
                                    <div class="block -b3 ">d-none d-lg-block col-lg-3</div>

                                </div>
                                <div class="col-4">
                                    <b-button @click="show=true" variant="primary">Show Modal</b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4 col-lg-3">
                    <div class="block -b2">col-12 col-md-4 col-lg-
                        <br>
                        <button class="btn btn-primary">Ok!</button>
                        <button class="btn btn-secondary">cancel</button>
                        <button class="btn">cancel</button>
                    </div>
                </div>
                <div class="d-none d-lg-block col-lg-3 offset-lg-2">
                    <div class="block -b3 ">d-none d-lg-block col-lg-3</div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-8 col-lg-6 mb-4">
                    <div class="block -b1">col-12 col-md-8 col-lg-6</div>
                </div>
                <div class="col-12 col-md-4 col-lg-3">
                    <div class="block -b2">col-12 col-md-4 col-lg-3</div>
                </div>
                <div class="d-none d-lg-block col-lg-3 offset-lg-2">
                    <div class="block -b3 ">d-none d-lg-block col-lg-3</div>
                </div>
            </div>
        </div>
        <div>
            <b-button @click="show=true" variant="primary">Show Modal</b-button>

            <b-modal
                    v-model="show"
                    title="Modal Variants"
                    :header-bg-variant="headerBgVariant"
                    :header-text-variant="headerTextVariant"
                    :body-bg-variant="bodyBgVariant"
                    :body-text-variant="bodyTextVariant"
                    :footer-bg-variant="footerBgVariant"
                    :footer-text-variant="footerTextVariant"
            >
                <b-container fluid>
                    <b-row class="mb-1 text-center">
                        <b-col cols="3"></b-col>
                        <b-col>Background</b-col>
                        <b-col>Text</b-col>
                    </b-row>

                    <b-row class="mb-1">
                        <b-col cols="3">Header</b-col>
                        <b-col>
                            <b-form-select
                                    v-model="headerBgVariant"
                                    :options="variants"
                            ></b-form-select>
                        </b-col>
                        <b-col>
                            <b-form-select
                                    v-model="headerTextVariant"
                                    :options="variants"
                            ></b-form-select>
                        </b-col>
                    </b-row>

                    <b-row class="mb-1">
                        <b-col cols="3">Body</b-col>
                        <b-col>
                            <b-form-select
                                    v-model="bodyBgVariant"
                                    :options="variants"
                            ></b-form-select>
                        </b-col>
                        <b-col>
                            <b-form-select
                                    v-model="bodyTextVariant"
                                    :options="variants"
                            ></b-form-select>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col cols="3">Footer</b-col>
                        <b-col>
                            <b-form-select
                                    v-model="footerBgVariant"
                                    :options="variants"
                            ></b-form-select>
                        </b-col>
                        <b-col>
                            <b-form-select
                                    v-model="footerTextVariant"
                                    :options="variants"
                            ></b-form-select>
                        </b-col>
                    </b-row>
                </b-container>

                <template #modal-footer>
                    <div class="w-100">
                        <b-button
                            variant="primary"
                            size="sm"
                            class="float-right"
                            @click="show=false"
                        >
                            Close
                        </b-button>
<!--                        <p class="float-left">-->
                            Modal Footer Content: Lorem ipsum dolor sit amet, cons ectetur adi pisi cing elit. Ab accusamus at autem beatae cupiditate eligendi error expedita explicabo, fugit, inventore ipsa libero nam necessitatibus numquam, optio quos repellendus tempore voluptate.
<!--                        </p>-->
                    </div>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
export default {
    name: "BSResearch",
    components: {},
    props: [],
    data() {
        return {
            show: false,
            variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
            headerBgVariant: 'dark',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark',
            footerBgVariant: 'warning',
            footerTextVariant: 'dark',

            type_breed: ['unknown', 'pinscher', 'pomeranian spitz', 'fox'],
        }
    },
    computed: {},
    methods: {},
    mounted() {
    },
}
</script>

<style lang="scss">
/****  BSResearch  ****/
.BSResearch {
  width: 100%;
  height: auto;

  .container {
    border: 1px solid red;
  }

  .block {
    width: 100%;
    height: auto;
    min-height: 150px;
    border: 1px solid green;
    //display: flex;
    //align-items: center;
    //justify-content: center;
    &.-b1 {
      background-color: hsl(210, 78%, 91%);
    }

    &.-b2 {
      background-color: hsl(8, 78%, 91%);
    }

    &.-b3 {
      background-color: hsl(108, 78%, 91%);
    }

    &.-b4 {
      background-color: hsl(288, 78%, 91%);
    }

    &.-b5 {
      background-color: hsl(38, 78%, 91%);
    }

    &.-b6 {
      background-color: hsl(158, 78%, 91%);
    }

    &.-b7 {
      background-color: hsl(338, 78%, 91%);
    }
  }
}
</style>