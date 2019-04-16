<template>
    <section id="pickup" class="container">
        <div class="card">
            <div class="card-header">Pickup Information</div>

            <div class="card-body entity" :class="{'entity-first': (entity_index === 0)}" v-for="(entity, entity_index) in pickup">
                <div class="row">
                    <div class="col-md-2">{{entity.name}}</div>
                    <div class="col-md-10 days-wrapper">
                        <div class="row days" v-for="(day,index) in entity.days">
                            <div class="col-md-4">
                                <span class="text-primary">{{day.name}}</span> まで
                                <span class="text-danger">{{day.diff_days}}</span> 日
                            </div>
                            <div class="col-md-4">{{day.anniv_at}} ({{jDate(day.anniv_at, true)}})</div>
                            <div class="col-md-4">{{getAges(day.anniv_at)}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import mixinJDate from '../util/jdate'
    import moment from 'moment'
    import mixinErrorProcess from '../util/ErrorProcess.js'

    export default {
        name: 'pickup',
        mixins: [
            mixinJDate, mixinErrorProcess,
        ],
        data() {
            return {
                pickup: [],
            }
        },
        mounted() {
            this.getPickup()
        },
        methods: {
            getPickup() {
                axios.get('api/entities/pickup')
                    .then(result => {
                        this.pickup = result.data
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
            }
        }
    }
</script>

<style lang="scss" scoped>

    .entity {
        border-top: 1px solid #ddd;
    }
    .entity-first {
        border-top: none;
    }

    .days-wrapper {
        padding: 0;
    }
    .days {
        margin: 0;
        padding: 8px;
        border-top: 1px solid #ddd;
    }
    .days:nth-child(even){
        background-color: #f0fff0;
    }
    .days:first-child {
        border-top: none;
    }
</style>
