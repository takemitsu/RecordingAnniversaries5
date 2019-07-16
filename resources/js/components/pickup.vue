<template>
  <v-layout row>
    <v-flex xs12 sm8 md6 offset-md3 offset-sm2>

      <v-card class="mb-3">
        <template v-for="(entity, index) in pickup">
          <v-card-title primary-title class="pt-3 pb-3 grey lighten-4">
            <div>
              <h3>{{entity.name}}</h3>
              <div v-if="entity.desc && isDesc" class="caption desc">{{entity.desc}}</div>
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
                <div v-if="day.desc && isDesc" class="caption desc">{{day.desc}}</div>
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

      <v-btn v-show="pickup.length > 0" outline @click="isDesc = !isDesc">説明を<span v-show="isDesc">非</span>表示</v-btn>


      <v-alert v-show="pickup.length === 0" :value="true" outline type="error">
        データが登録されていません。<br>
        グループ、記念日を登録後してから再度、このページをお試しください。

        <v-btn outline :to="{name: 'entities'}">データ登録ページに移動する</v-btn>
      </v-alert>

      <v-dialog v-model="isShowDialog" persistent dark>
        <v-card color="primary" dark>
          <v-card-text>
            Please wait ..
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

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
                isDesc: false,
                isShowDialog: true
            }
        },
        mounted() {
            this.getPickup()
        },
        methods: {
            getPickup() {
                this.isShowDialog = true
                axios.get('api/entities/pickup')
                    .then(result => {
                        this.pickup = result.data
                    })
                    .catch(error => {
                        this.setErrorMessage(error)
                    })
                    .finally(()=> {
                        this.isShowDialog = false
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

<style lang="stylus" scoped>
  .desc
    white-space pre-wrap
</style >
