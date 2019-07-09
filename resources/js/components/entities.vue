<template>
    <v-layout row wrap>
        <v-flex xs12 sm8 md6 offset-md3 offset-sm2>

            <div class="mb-3">
                <v-btn :to="{name: 'entity-edit', params: {entity_id: 'new'}}" outline color="primary">
                    <v-icon>add_circle_outline</v-icon>
                    グループ追加
                </v-btn>
                <v-btn outline color="warning" @click="isEdit = !isEdit">
                    <v-icon>edit</v-icon>
                    編集モード<span v-show="isEdit">解除</span>
                </v-btn>
            </div>

            <v-card v-for="(entity, entity_index) in entities" :key="entity.id" class="mb-3">
                <v-card-title primary-title class="pt-3 pb-3 grey lighten-4">
                    <div>
                        <h3>{{entity.name}}</h3>
                        <div v-if="entity.desc" class="caption">{{entity.desc}}</div>
                    </div>
                </v-card-title>

                <v-card-actions v-show="isEdit">
                    <v-btn outline small color="warning" :to="{name: 'entity-edit', params: {entity_id: entity.id}}">
                        <v-icon>edit</v-icon>
                        変更
                    </v-btn>
                    <v-btn outline small color="error" @click="deleteEntity(entity)">
                        <v-icon>remove_circle_outline</v-icon>
                        削除
                    </v-btn>
                    <v-btn outline small color="primary"
                           :to="{name: 'anniv-edit', params: {entity_id: entity.id, anniv_id: 'new'}}">
                        <v-icon>add_circle_outline</v-icon>
                        記念日追加
                    </v-btn>
                </v-card-actions>

                <v-divider></v-divider>

                <template v-for="(day, day_index) in entity.days">
                    <v-card-text :class="{'pb-0': isEdit}">
                        <div>
                            <div>
                                <span class="blue--text font-weight-bold">{{day.name}}</span>
                                まで
                                <span class="pink--text font-weight-bold">{{day.diff_days}}</span>
                                日
                            </div>
                            <div v-if="day.desc" class="caption">
                                {{day.desc}}
                            </div>
                            <div class="mt-2">
                                <span>{{day.anniv_at}} ({{jDate(day.anniv_at, true)}})</span>
                                <span class="ml-4">{{getAges(day.anniv_at)}}</span>
                            </div>
                        </div>
                    </v-card-text>

                    <v-card-actions v-show="isEdit">
                        <v-btn
                            small outline
                            :to="{name: 'anniv-edit', params: {entity_id: entity.id, anniv_id: day.id}}"
                            color="warning">
                            <v-icon>edit</v-icon>
                            変更
                        </v-btn>
                        <v-btn small outline color="error" @click="deleteAnniv(entity, day)">
                            <v-icon>remove_circle_outline</v-icon>
                            削除
                        </v-btn>
                    </v-card-actions>

                    <v-divider v-if="day_index + 1 < entity.days.length"></v-divider>
                </template>
            </v-card>
            <v-btn :to="{name: 'entity-edit', params: {entity_id: 'new'}}" outline color="primary">
                <v-icon>add_circle_outline</v-icon>
                グループ追加
            </v-btn>
            <v-btn outline color="warning" @click="isEdit = !isEdit">
                <v-icon>edit</v-icon>
                編集モード<span v-show="isEdit">解除</span>
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    import mixinJDate from '../util/jdate'
    import moment from 'moment'
    import mixinErrorProcess from '../util/ErrorProcess.js'

    export default {
        name: 'entities',
        mixins: [
            mixinJDate, mixinErrorProcess,
        ],
        data() {
            return {
                entities: [],
                isEdit: false,
            }
        },
        mounted() {
            this.getEntities()
        },
        methods: {
            getEntities() {
                axios.get('api/entities')
                    .then(result => {
                        this.entities = result.data
                    })
                    .catch(error => {
                        this.setErrorMessage(error)
                    })
            },
            getAges(value) {
                if ((!value) || value.length != 10) {
                    return ''
                }
                let dt = moment(value, 'YYYY-MM-DD')
                if (!dt.isValid()) {
                    return ''
                }
                // 未来日なら表示しない
                if (moment().diff(value, 'days') < 0) {
                    return ''
                }

                let diff_year = moment().diff(value, 'years')
                return diff_year + '年(' + (diff_year + 1) + '年目)'
            },
            deleteEntity(entity) {
                if(confirm('削除しますか')) {
                    axios.delete('api/entities/' + entity.id)
                        .then(result => {
                            this.getEntities()
                        })
                }
            },
            deleteAnniv(entity, anniv) {
                if(confirm('削除しますか')) {
                    axios.delete('api/entities/' + entity.id + '/days/' + anniv.id)
                        .then(result => {
                            this.getEntities()
                        })
                }
            },
        }
    }
</script>
