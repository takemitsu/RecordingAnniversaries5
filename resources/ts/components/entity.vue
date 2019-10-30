<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 md6 offset-md3 offset-sm2>
      <v-card>
        <v-card-title class="title">
          グループ
          <span v-if="entity_id">変更</span>
          <span v-else>追加</span>
        </v-card-title>
        <v-card-text>

          <div v-if="isErrorMessageTypeForm()">
            <v-alert v-for="(error, error_index) in error_message" :key="error_index" :value="true" type="error"
                     outlined>
              <div v-for="e in error">{{e}}</div>
            </v-alert>
          </div>

          <v-form>
            <v-text-field
                v-model="entity.name"
                label="名前"
                required
            ></v-text-field>

            <v-textarea
                v-model="entity.desc"
                label="説明"
            ></v-textarea>

            <v-btn outlined color="primary" @click="saveEntity">登録</v-btn>
            <v-btn outlined :to="{name:'entities'}">戻る</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
    import {Component, Mixins} from 'vue-mixin-decorator'
    import mixinErrorProcess from '../util/ErrorProcess'
    import axios from 'axios'
    import '../models'

    @Component
    export default class EntityComponent extends Mixins<mixinErrorProcess>(mixinErrorProcess) {

        entity_id = null as null | number
        entity: Entity = {
            name: '',
            desc: '',
        }

        mounted() {
            if (this.$route.params.entity_id !== 'new') {
                this.entity_id = parseInt(this.$route.params.entity_id, 10)
                this.getEntity()
            }
        }

        getEntity() {
            axios.get('/api/entities/' + this.entity_id)
                .then(result => {
                    this.entity = result.data
                })
        }

        saveEntity() {
            this.initializeErrorMessage()

            let url = '/api/entities'
            let method = 'POST'
            if (this.entity_id) {
                url += '/' + encodeURIComponent(this.entity_id)
                method = 'PUT'
            }

            if (method=='POST') {
                axios.post(url, this.entity)
                    .then(res => {
                        this.$router.push({name: 'entities'})
                    })
                    .catch(error => {
                        this.setErrorMessage(error)
                    })
            } else {
                axios.put(url, this.entity)
                    .then(res => {
                        this.$router.push({name: 'entities'})
                    })
                    .catch(error => {
                        this.setErrorMessage(error)
                    })
            }
        }
    }
</script>
