export default {
    data() {
        return {
            error_message: null,
            error_message_type: null,
            error_message_type_form: 'form'
        }
    },
    methods: {
        getErrorMessageForShow() {
            let rtnMsg = this.error_message[Object.keys(this.error_message)[0]][0]
            return rtnMsg
        },
        initializeErrorMessage() {
            this.error_message = null
            this.error_message_type = null
        },
        isErrorMessageTypeForm() {
            return this.error_message_type === this.error_message_type_form
        },
        setErrorMessage(error) {
            this.error_message = null
            this.error_message_type = null

            console.log(error)

            if (error.response) {
                if (error.response.status && error.response.status === 401) {
                    this.error_message = {error: ['Unauthorized']}
                    window.location.href = '/'
                    return
                }
                if (error.response.status && error.response.status === 419) {
                    this.error_message = {error: ['トークンが切れました。ページを再読みして再度実行してください。']}
                    return
                }
                if (error.response.data && error.response.data.errors) {
                    this.error_message_type = this.error_message_type_form
                    this.error_message = error.response.data.errors
                } else if (error.response.data && error.response.data.message) {
                    this.error_message = {error: [error.response.status + ': ' + error.response.data.message]}
                } else if (error.response.status && error.response.statusText) {
                    this.error_message = {error: [error.response.status + ': ' + error.response.statusText]}
                }
            }
            if (this.error_message == null) {
                this.error_message = {error: ['エラーが発生しました']}
            }
        },
    }
}
