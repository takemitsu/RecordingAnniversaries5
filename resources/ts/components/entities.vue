<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 md6 offset-md3 offset-sm2>

      <v-card v-for="(entity, entity_index) in entities" :key="entity.id" class="mb-3">
        <v-card-title primary-title class="pt-3 pb-0 grey lighten-4">
          <div>
            <h3>{{entity.name}}</h3>
            <div v-if="entity.desc" class="caption desc">{{entity.desc}}</div>
          </div>
        </v-card-title>

        <div class="grey lighten-4">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined small color="warning" :to="{name: 'entity-edit', params: {entity_id: entity.id}}">
              <v-icon>edit</v-icon>
              変更
            </v-btn>
            <v-btn outlined small color="error" @click="deleteEntity(entity)">
              <v-icon>remove_circle_outline</v-icon>
              削除
            </v-btn>
            <v-btn outlined small color="primary"
                   :to="{name: 'anniv-edit', params: {entity_id: entity.id, anniv_id: 'new'}}">
              <v-icon>add_circle_outline</v-icon>
              記念日追加
            </v-btn>
          </v-card-actions>
        </div>

        <v-divider></v-divider>

        <template v-for="(day, day_index) in entity.days">
          <v-card-text class="pb-0">
            <div>
              <div>
                <span class="blue--text font-weight-bold">{{day.name}}</span>
                まで
                <span class="pink--text font-weight-bold">{{day.diff_days}}</span>
                日
              </div>
              <div v-if="day.desc" class="caption desc">{{day.desc}}</div>
              <div class="mt-2">
                <span>{{day.anniv_at}} ({{jDate(day.anniv_at, true)}})</span>
                <span class="ml-4">{{getAges(day.anniv_at)}}</span>
              </div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                small outlined
                :to="{name: 'anniv-edit', params: {entity_id: entity.id, anniv_id: day.id}}"
                color="warning">
              <v-icon>edit</v-icon>
              変更
            </v-btn>
            <v-btn small outlined color="error" @click="deleteAnniv(entity, day)">
              <v-icon>remove_circle_outline</v-icon>
              削除
            </v-btn>
          </v-card-actions>

          <v-divider v-if="day_index + 1 < entity.days.length"></v-divider>
        </template>
      </v-card>
      <v-btn :to="{name: 'entity-edit', params: {entity_id: 'new'}}" outlined color="primary">
        <v-icon>add_circle_outline</v-icon>
        グループ追加
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
    import {Component, Mixins} from 'vue-mixin-decorator'
    import moment from 'moment'
    import axios from 'axios'

    import '../models'

    import ErrorProcess from "../util/ErrorProcess"
    import jDate from '../util/jdate'

    interface IMixinInterface extends ErrorProcess, jDate {
    }

    @Component
    export default class EntitiesComponent extends Mixins<IMixinInterface>(ErrorProcess, jDate) {

        entities: Array<Object> = []

        mounted() {
            this.getEntities()
        }

        getEntities() {
            axios.get('api/entities')
                .then(result => {
                    this.entities = result.data
                })
                .catch(error => {
                    this.setErrorMessage(error)
                })
        }

        getAges(value: string|null) {
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

        deleteEntity(entity: Entity) {
            if (confirm('削除しますか')) {
                axios.delete('api/entities/' + entity.id)
                    .then(result => {
                        this.getEntities()
                    })
            }
        }

        deleteAnniv(entity:Entity, anniv: Anniversary) {
            if (confirm('削除しますか')) {
                axios.delete('api/entities/' + entity.id + '/days/' + anniv.id)
                    .then(result => {
                        this.getEntities()
                    })
            }
        }

    }
</script>

<style lang="stylus" scoped>
  .desc
    white-space pre-wrap
</style >
