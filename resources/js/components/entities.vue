<template>
    <section id="entities" class="container">
        <h2>Entities</h2>
        <div class="card" v-for="(entity, entity_index) in entities">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-8">
                        <h4>{{entity.name}}</h4>
                        <div class="small">{{entity.desc}}</div>
                    </div>
                    <div class="col-md-4 text-right">
                        <div class="btn-group btn-group-sm" role="group">
                            <router-link :to="{name: 'entity-edit', params: {entity_id: entity.id}}" class="btn btn-warning">編集</router-link>
                            <button type="button" class="btn btn-danger" @click="deleteEntity(entity)">削除</button>
                        </div>
                        <div class="btn-group btn-group-sm" role="group">
                            <router-link :to="{name: 'anniv-edit', params: {entity_id: entity.id, anniv_id: 'new'}}" class="btn btn-primary">記念日追加</router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <div class="row days" v-for="(day,index) in entity.days">
                    <div class="col-md-3 name">
                        <span class="text-primary">{{day.name}}</span> まで
                        <span class="text-danger">{{day.diff_days}}</span> 日
                    </div>
                    <div class="col-md-3 anniv_at">{{day.anniv_at}} ({{jDate(day.anniv_at, true)}})</div>
                    <div class="col-md-3 anniv_diff">{{getAges(day.anniv_at)}}</div>
                    <div class="col-md-3 actions text-right">
                        <div class="btn-group btn-group-sm" role="group">
                            <router-link :to="{name: 'anniv-edit', params: {entity_id: entity.id, anniv_id: day.id}}" class="btn btn-warning">編集</router-link>
                            <button type="button" class="btn btn-danger" @click="deleteAnniv(entity, day)">削除</button>
                        </div>
                    </div>
                    <div class="col-md-12 desc" v-if="day.desc">{{day.desc}}</div>
                </div>
            </div>
        </div>
        <router-link :to="{name: 'entity-edit', params: {entity_id: 'new'}}" class="btn btn-primary">グループ追加</router-link>
    </section>
</template>
<script>
    import mixinJDate from '../util/jdate'
    import moment from 'moment'
    export default {
        name: 'pickup',
        mixins: [
            mixinJDate,
        ],
        data() {
            return {
                entities: [],
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
            },
            getAges(value) {
                if ((!value) || value.length != 10) {
                    return ''
                }
                let dt = moment(value, 'YYYY-MM-DD')
                if (!dt.isValid()) {
                    return ''
                }
                let diff_year = moment().diff(value, 'years')
                if (diff_year < 0) {
                    return Math.abs(diff_year) + '年以上後'
                }
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
<style lang="scss" scoped>
    .card {
        margin-bottom: 20px;
    }
    .card-body {
        padding: 0;
    }
    .days {
        border-top: solid 1px #ddd;
        margin: 0;
        .name, .anniv_at, .anniv_diff, .actions, .desc {
            padding: 10px;
        }
    }
    .days:first-child {
        border-top: none;
    }
</style>
