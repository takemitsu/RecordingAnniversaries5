<template>
    <section id="anniv_edit" class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h3>Anniversary</h3>
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
                        <input type="text" class="form-control" id="name" v-model="form.name" placeholder="Enter name">
                    </div>

                    <div class="form-group">
                        <label for="anniv">記念日</label>
                        <input type="text" class="form-control" id="anniv" v-model="form.anniv_at" placeholder="Enter anniv_at">
                    </div>

                    <div class="form-group">
                        <label for="desc">説明</label>
                        <input type="text" class="form-control" id="desc" v-model="form.desc" placeholder="description">
                    </div>
                    <button type="button" class="btn btn-primary" @click="saveEntity()">Submit</button>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
    import mixinErrorProcess from '../util/ErrorProcess.js'
    export default {
        mixins: [
            mixinErrorProcess
        ],
        data() {
            return {
                entity_id: null,
                anniv_id: null,
                form: {
                    name: null,
                    anniv_at: null,
                    desc: null,
                },
            }
        },
        mounted() {
            if (!this.$route.params.entity_id || !this.$route.params.anniv_id) {
                this.router.push({name:'entities'})
            }
            this.entity_id = this.$route.params.entity_id
            if(parseInt(this.entity_id, 10) === 0) {
                this.router.push({name:'entities'})
            }
            if (this.$route.params.anniv_id === 'new') {
                return
            }
            this.anniv_id = this.$route.params.anniv_id
            if(parseInt(this.anniv_id, 10) === 0) {
                this.router.push({name:'entities'})
            }
            this.getAnniv()
        },
        methods: {
            getAnniv() {
                axios.get('/api/entities/' + encodeURIComponent(this.entity_id) + '/days/' + encodeURIComponent(this.anniv_id))
                    .then(result => {
                        this.form = result.data
                    })
            },
            saveEntity() {
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
                        this.$router.push({name:'entities'})
                    })
                    .catch(error => {
                        this.setErrorMessage(error)
                    })
            },
        }
    }
</script>
