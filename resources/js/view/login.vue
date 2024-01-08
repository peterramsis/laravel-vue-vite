<template>
    <div class="container login">
        <form action="" @submit="login" method="POST">
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
            <br>
            <section class="text-center">
                <input type="submit" name="login" value="Login" class="btn btn-primary">
            </section>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: "",
                password: "",
                errors:[]
            }
        },
        methods: {
            login(e) {
                e.preventDefault();
                axios.post('/api/login', {
                    email: this.email,
                    password: this.password
                })
                 .then(response => {
                        console.log(response.status);
                        if (response.status == 200) {
                             this.$router.push({ path: '/posts'});
                             localStorage.setItem("token" , response.data["token"]);
                        }
                    })
                 .catch(error => {
                    if(error.response.status == 422){
                            this.errors = error.response.data["errors"];
                        }
                    });
            }
        }
    }
</script>
