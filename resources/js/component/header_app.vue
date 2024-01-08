<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#"> System </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav m-auto mb-2 mb-lg-0">
              <li class="nav-item" v-if="!token">
                <router-link class="nav-link" to="/" exact>Register</router-link>
              </li>
              <li class="nav-item" v-if="!token">
                <router-link class="nav-link" to="/login" exact>Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/about">About</router-link>
              </li>
              <li class="nav-item" v-if="token">
                <router-link class="nav-link" to="/posts">Posts</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  switch language
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item"  @click="switchLan('ar')">Arabic</a></li>
                  <li><a class="dropdown-item"  @click="switchLan('en')">English</a></li>

                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>
</template>

<script>
export default {
    name:"header-app",
    data(){
        return{
           token: ""
        }
    },
    mounted(){
        this.token = localStorage.getItem("token");
    },
    methods:{
        switchLan(language){
          axios.post("api/switchLanguage" , {
            language: language
          }).then( res => {
                window.location.reload();
          }).catch( res => {

          })
        }
    }

}
</script>
