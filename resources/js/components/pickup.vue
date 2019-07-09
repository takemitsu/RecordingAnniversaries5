<template>
  <v-layout row>
    <v-flex xs12 sm8 md6 offset-md3 offset-sm2>

      <v-card class="mb-3">
        <template v-for="(entity, index) in pickup">
          <v-card-title primary-title class="pt-3 pb-3 grey lighten-4">
            <div>
              <h3>{{entity.name}}</h3>
              <div v-if="entity.desc" class="caption">{{entity.desc}}</div>
            </div>
          </v-card-title>
          <v-divider></v-divider>

          <template v-for="(day, day_index) in entity.days">
            <v-card-text>
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
            <v-divider v-if="day_index + 1 < entity.days.length"></v-divider>
          </template>

          <v-divider v-if="index + 1 < pickup.length" :key="index"></v-divider>
        </template>
      </v-card>

    </v-flex>
  </v-layout>
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
