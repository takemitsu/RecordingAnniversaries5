<template>

  <v-layout row wrap>
    <v-flex xs12 sm8 md6 offset-md3 offset-sm2>
      <v-card>
        <v-card-title class="title">
          記念日
          <span v-if="anniv_id">変更</span>
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
                v-model="form.name"
                label="名前"
                required
            ></v-text-field>

            <v-text-field
                v-model="form.anniv_at"
                label="記念日"
                required
                :suffix="jDate(form.anniv_at, true)"
            ></v-text-field>

            <p>記念日は、下の日付を選択するか上のフィールドを入力してください</p>

            <v-date-picker
                v-model="form.anniv_at"
                locale="jp-ja"
                full-width
                :day-format="date => new Date(date).getDate()"
            ></v-date-picker>

            <v-textarea
                v-model="form.desc"
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

    import Datepicker from 'vuejs-datepicker'

    import moment from 'moment'
    import axios from 'axios'

    import {Component, Mixins} from 'vue-mixin-decorator'
    import mixinJDate from '../util/jdate'
    import mixinErrorProcess from '../util/ErrorProcess'

    interface IMixinInterface extends mixinErrorProcess, mixinJDate{}

    @Component({
        comments: {
            datepicker: Datepicker
        }
    })
    export default class AnnivComponent extends Mixins<IMixinInterface>(mixinErrorProcess, mixinJDate) {

        entity_id: null | string = null
        anniv_id: null | string = null
        form: Anniversary = {
            name: '' as string,
            anniv_at: '' as string,
            desc: '' as string,
        }

        datepickerOption: object = {
            format: 'yyyy-MM-dd',
            language: 'ja',
            bootstrapStyling: true,
            required: true,
            disabled: false,
        }

        mounted() {
            if (!this.$route.params.entity_id || !this.$route.params.anniv_id) {
                this.$router.push({name: 'entities'})
            }
            this.entity_id = this.$route.params.entity_id
            if (parseInt(this.entity_id, 10) === 0) {
                this.$router.push({name: 'entities'})
            }
            if (this.$route.params.anniv_id === 'new') {
                return
            }
            this.anniv_id = this.$route.params.anniv_id
            if (parseInt(this.anniv_id, 10) === 0) {
                this.$router.push({name: 'entities'})
            }
            this.getAnniv()
        }

            getAnniv() {
                if(this.entity_id == null)
                    return
                if(this.anniv_id == null)
                    return
                axios.get('/api/entities/' + encodeURIComponent(this.entity_id) + '/days/' + encodeURIComponent(this.anniv_id))
                    .then(result => {
                        this.form = result.data
                    })
            }
            saveEntity() {
                if (this.entity_id == null)
                    return

                this.form.anniv_at = this.customFormatter(this.form.anniv_at)

                this.initializeErrorMessage()

                let url = '/api/entities/' + encodeURIComponent(this.entity_id) + '/days'
                let method = 'POST'
                if (this.anniv_id) {
                    url += '/' + encodeURIComponent(this.anniv_id)
                    method = 'PUT'
                }

                if(method == 'POST') {
                    axios.post(url, this.form)
                        .then(res => {
                            this.$router.push({name: 'entities'})
                        })
                        .catch(error => {
                            this.setErrorMessage(error)
                        })
                } else {
                    axios.put(url, this.form)
                        .then(res => {
                            this.$router.push({name: 'entities'})
                        })
                        .catch(error => {
                            this.setErrorMessage(error)
                        })
                }
            }
            customFormatter(date: string) {
                return moment(date).format('YYYY-MM-DD');
            }
    }
</script>
