<template>
    <div>
        <header-app></header-app>
        <router-view></router-view>



        <div class="container">
            <h2 class="text-center">Register</h2>

            <form action="" @submit="register">
                <section class="from-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" placeholder="Enter email" v-model="email">
                      <span v-if="errors.email" class="text-danger">{{ errors.email[0]}}</span>
                </section>

                <section class="from-group">
                    <label for="exampleInputEmail1">Password</label>
                    <input type="password" class="form-control" placeholder="Password" v-model="password">
                    <span v-if="errors.password" class="text-danger">{{ errors.password[0]}}</span>
                </section>

                <section class="from-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" class="form-control" placeholder="name" v-model="name">
                        <span v-if="errors.name" class="text-danger">{{ errors.name[0]}}</span>
                </section>
                <br>
                <section class="text-center">
                    <input type="submit" name="register" value="Register" class="btn btn-primary">
                </section>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            email: '',
            password: '',
            name: '',
            errors:[]
        }
    },
    methods:{
        register(e){
            e.preventDefault();
            axios.post('/api/register', {
                email: this.email,
                password: this.password,
                name: this.name
            })
          .then(response => {
                console.log(response.response.data["errors"]);
            })
          .catch(error => {

               if(error.response.status == 422){
                  this.errors = error.response.data["errors"];
               }
            })
        }
    }
}
</script>
