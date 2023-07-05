<template>
    <div class="BSResearch">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-4 col-lg-4 col-xl-4 mt-4 mb-4">
                    <div class="block -b1">
                        <b-dropdown
                            class="breed-selector m-md-2"
                            id="breeds"
                            :text="(selected_breed || 'Порода собаки')"
                            >
                            <b-dropdown-item v-for="breed of type_breed" @click="ddClick(breed)">{{ breed }}</b-dropdown-item>
                        </b-dropdown>

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
                <div class="col-12 col-md-4 col-lg-4 col-xl-4 mt-4 mb-4">
                    <div class="block -b2">
                        <b-button-group>
                            <b-button variant="primary">ok</b-button>
                            <b-button variant="secondary">cancel</b-button>
                            <b-button variant="outline-info">info</b-button>
                        </b-button-group>
                        <b-button @click="show=true" variant="primary">show modal</b-button>
                    </div>
                </div>
                <div class="d-none d-lg-block col-lg-4 col-xl-4 mt-4 mb-4">
                    <div class="block -b3 ">
                        <b-form-checkbox-group
                        id="checkbox"
                        v-model="selected_breeds"
                        :options = "type_breed"
                        >

                        </b-form-checkbox-group>
                        {{selected_breeds}}
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-4 col-lg-4 col-xl-4 mb-4">
                    <div class="block -b1">
                      {{ geoobjects }}
                    </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4 col-xl-4">
                    <div class="block -b2">

                    </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4 col-xl-4">
                    <div class="block -b3">

                    </div>
                </div>
            </div>


        </div>
        <!--        <div class="container-fluid">-->
        <!--            <div class="row">-->
        <!--                <div class="col-12 col-md-8 col-lg-6 mb-4">-->
        <!--                    <div class="block -b1">col-12 col-md-8 col-lg-6</div>-->
        <!--                </div>-->
        <!--                <div class="col-12 col-md-4 col-lg-3">-->
        <!--                    <div class="block -b2">col-12 col-md-4 col-lg-3</div>-->
        <!--                </div>-->
        <!--                <div class="d-none d-lg-block col-lg-3">-->
        <!--                    <div class="block -b3 ">d-none d-lg-block col-lg-3</div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <div>
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
                        Modal Footer Content: Lorem ipsum dolor sit amet, cons ectetur adi pisi cing elit. Ab accusamus
                        at autem beatae cupiditate eligendi error expedita explicabo, fugit, inventore ipsa libero nam
                        necessitatibus numquam, optio quos repellendus tempore voluptate.
                        <!--                        </p>-->
                    </div>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
import geojson from "@/data/bolgar_settlements.geojson"

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

            type_breed: ['wolf', 'pinscher', 'pomeranian spitz', 'fox', 'pug'],
            selected_breeds: [],
            selected_breed: null,
            geoobjects: geojson.features,

        }
    },
    computed: {},
    methods: {
        ddClick(v){
            this.selected_breed = v;
        }
    },
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
    .breed-selector{
        min-width: 200px;
       &>.dropdown-toggle {
           display: inline-flex;
           justify-content: space-between;
          align-items: center;
       }
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

  .btn {
    margin-bottom: 10px;
  }
}
</style>