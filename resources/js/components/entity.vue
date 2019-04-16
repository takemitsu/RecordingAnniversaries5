<template>
    <section id="anniv_edit" class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h3>
                    グループ
                    <span v-if="entity_id">変更</span>
                    <span v-else>追加</span>
                </h3>
                <div class="alert alert-danger" v-if="isErrorMessageTypeForm()" style="margin-bottom: 22px;">
                    <div>
                        <ul v-for="error in error_message" style="margin-bottom: 0;">
                            <li v-for="e in error">{{e}}</li>
                        </ul>
                    </div>
                </div>

                <form>
                    <div class="form-group">
                        <label for="name">名前</label>
                        <input type="text" class="form-control" id="name" v-model="entity.name" placeholder="Enter name">
                    </div>
                    <div class="form-group">
                        <label for="desc">説明</label>
                        <input type="text" class="form-control" id="desc" v-model="entity.desc" placeholder="description">
                    </div>
                    <button type="button" class="btn btn-primary" @click="saveEntity()">Submit</button>
                    <router-link :to="{name:'entities'}" class="btn btn-link">戻る</router-link>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
    import mixinErrorProcess from '../util/ErrorProcess.js'
    export default {
        name: 'entity',
        mixins: [
            mixinErrorProcess
        ],
        data() {
            return {
                entity_id: null,
                entity: {
                    name: null,
                    desc: null,
                },
            }
        },
        mounted() {
            if (this.$route.params.entity_id !== 'new') {
                this.entity_id = this.$route.params.entity_id
                this.getEntity()
            }
        },
        methods: {
            getEntity() {
                axios.get('/api/entities/' + this.entity_id)
                    .then(result => {
                        this.entity = result.data
                    })
            },
            saveEntity() {
                this.initializeErrorMessage()

                let url = '/api/entities'
                let method = 'POST'
                if (this.entity_id) {
                    url += '/' + encodeURIComponent(this.entity_id)
                    method = 'PUT'
                }

                axios({
                    method: method,
                    url: url,
                    data: this.entity
                })
                    .then(res => {
                        this.$router.push({name:'entities'})
                    })
                    .catch(error => {
                        this.setErrorMessage(error)
                    })

            }
        }
    }
</script>
