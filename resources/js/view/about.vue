<template>
    <div>
        <header-app></header-app>

        <section class="container">
             <h1>About  {{ this.$t('language') }} {{ this.$store.state.count }} </h1>



             <form @submit.prevent="submit"
             class="vl-parent"
             ref="formContainer">
           <!-- your form inputs goes here-->
           <label><input type="checkbox" v-model="fullPage">Full page?</label>
           <button type="submit">Login</button>
       </form>


        </section>

        <div class="container">
            <div class="row">
              <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
              <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>

              <!-- Force next columns to break to new line -->
              <div class="w-100"></div>

              <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
              <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
            </div>
          </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                fullPage: false
            }
        },
        methods: {
            submit() {
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: true,
                    onCancel: this.onCancel,
                });
                // simulate AJAX
                setTimeout(() => {
                    loader.hide()
                }, 5000)
            },
            onCancel() {
                console.log('User cancelled the loader.')
            }
        }
    }
</script>
