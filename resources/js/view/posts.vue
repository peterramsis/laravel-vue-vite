<template>
    <div>
        <header-app></header-app>

        <section class="container">
             <h1>posts</h1>

             <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add post
            </button>

            <br />

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                       <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>


                    <div class="modal-body">
                       <form  @submit="createPost">
                          <div class="form-group">
                            <label for="my-input">Title</label>
                            <input class="form-control" type="text" name="title" v-model="title">
                            <span v-if="errors.title" class="text-danger">{{errors.title[0]}}</span>
                          </div>

                          <div class="form-group">
                            <label for="my-input">body</label>
                            <input class="form-control" type="text" name="body" v-model="body">
                            <span v-if="errors.title" class="text-danger">{{errors.body[0]}}</span>
                          </div>

                          <div class="modal-footer">
                            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
                            <input type="submit" value="Save changes" class="btn btn-primary" name="submit">
                          </div>
                       </form>
                    </div>

                </div>
                </div>
            </div>


            <br />


            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th> Title </th>
                        <th> Body </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="post in posts" :key="post.id">
                        <td>
                          {{ post.title }}
                        </td>
                        <td>
                          {{ post.body }}
                        </td>
                  </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>


<script>

export default{
    data(){
        return{
            title: "",
            body: "",
            posts: [],
            errors:[]
        }
    },
    mounted(){

    },
    methods:{
        deletePost(id){
            axios.delete('/api/posts/'+id).then(res=>{
                this.posts = res.data
            })
        },
        getPost(){
            axios.get('/api/posts').then(res=>{
            console.log(res);
            this.posts = res.data['posts']
            })
        },
        createPost(e){
            e.preventDefault();

            axios.post('/api/posts', {
                title: this.title,
                body: this.body
            }).then(res=>{
                this.posts.push(res.data['posts'])
                this.title = ""
                this.body = ""
            }).catch((err)=>{
                if(err.response.status == 422){
                    console.log(err.response.data);
                   this.errors = err.response.data['errors'];
                }
            })
        }
    },
    created(){
        this.getPost()
    }
}

</script>
