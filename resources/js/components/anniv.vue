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
                     outline>
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

            <v-btn outline color="primary" @click="saveEntity">登録</v-btn>
            <v-btn outline :to="{name:'entities'}">戻る</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
    import mixinErrorProcess from '../util/ErrorProcess.js'
    import vuejsDatepicker from 'vuejs-datepicker'
    import {en, ja} from 'vuejs-datepicker/dist/locale'
    import moment from 'moment'
    import mixinJDate from '../util/jdate'

    export default {
        name: 'anniversary',
        mixins: [
            mixinErrorProcess, mixinJDate
        ],
        components: {
            vuejsDatepicker,
        },
        data() {
            return {
                entity_id: null,
                anniv_id: null,
                form: {
                    name: null,
                    anniv_at: null,
                    desc: null,
                },
                anniv_at: null,
                datepickerOption: {
                    format: 'yyyy-MM-dd',
                    language: ja,
                    bootstrapStyling: true,
                    required: true,
                    disabled: false,

                }
            }
        },
        mounted() {
            if (!this.$route.params.entity_id || !this.$route.params.anniv_id) {
                this.router.push({name: 'entities'})
            }
            this.entity_id = this.$route.params.entity_id
            if (parseInt(this.entity_id, 10) === 0) {
                this.router.push({name: 'entities'})
            }
            if (this.$route.params.anniv_id === 'new') {
                return
            }
            this.anniv_id = this.$route.params.anniv_id
            if (parseInt(this.anniv_id, 10) === 0) {
                this.router.push({name: 'entities'})
            }
            this.getAnniv()
        },
        methods: {
            getAnniv() {
                axios.get('/api/entities/' + encodeURIComponent(this.entity_id) + '/days/' + encodeURIComponent(this.anniv_id))
                    .then(result => {
                        this.form = result.data
                        this.anniv_at = this.form.anniv_at
                    })
            },
            saveEntity() {
                this.form.anniv_at = this.customFormatter(this.form.anniv_at)

                this.initializeErrorMessage()

                let url = '/api/entities/' + encodeURIComponent(this.entity_id) + '/days'
                let method = 'POST'
                if (this.anniv_id) {
                    url += '/' + encodeURIComponent(this.anniv_id)
                    method = 'PUT'
                }

                axios({
                    method: method,
                    url: url,
                    data: this.form
                })
                    .then(res => {
                        this.$router.push({name: 'entities'})
                    })
                    .catch(error => {
                        this.setErrorMessage(error)
                    })
            },
            customFormatter(date) {
                return moment(date).format('YYYY-MM-DD');
            },
            changePickerAnnivAt() {
                this.anniv_at = this.form.anniv_at
            },
            changeFormAnnivAt(val) {
                this.form.anniv_at = this.customFormatter(val)
            }
        }
    }
</script>
