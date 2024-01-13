<template>
    <div>
        <header-app></header-app>

        <section class="container">
             <h1>posts</h1>

             <div>

                  <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add post
            </button>

            <br />

            <!-- Modal -->
            <div  :class="['modal' , 'fade']" ref="myModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
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
                            <input class="form-control" type="text" name="title" v-model="post.title">
                            <span v-if="errors.title" class="text-danger">{{errors.title[0]}}</span>
                          </div>

                          <div class="form-group">
                            <label for="my-input">body</label>
                            <input class="form-control" type="text" name="body" v-model="post.body">
                            <span v-if="errors.body" class="text-danger">{{errors.body[0]}}</span>
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
                             <th>Update</th>
                            <th> Delete</th>
                        </tr>
                    </thead>


                    <tbody>
                        <tr v-for="post in $store.getters.getPosts.data" :key="post.id">
                            <td >{{ post.title }}</td>
                            <td> {{ post.body }} </td>

                            <td>
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#exampleModal-'+post.id">
                                    Update
                                </button>

                                <!-- Modal -->
                                <div class="modal fade" :id="'exampleModal-'+post.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <div class="form-group">
                                                  <label for="my-input">Title</label>
                                                  <input class="form-control" type="text" name="title"  v-model="post.title">
                                                  <span v-if="errors.title" class="text-danger">{{errors.title[0]}}</span>
                                                </div>

                                                <div class="form-group">
                                                  <label for="my-input">body</label>
                                                  <input class="form-control" type="text" name="body"  v-model="post.body">
                                                  <span v-if="errors.body" class="text-danger">{{errors.body[0]}}</span>
                                                </div>

                                                <div class="modal-footer">
                                                  <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
                                                  <button type="button" class="btn btn-primary" @click="updatePost(post)">Save changes</button>

                                                </div>
                                             </form>
                                        </div>

                                    </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="deletePost(post.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>

                    </table>



                    <Bootstrap5Pagination
                    :data="$store.getters.getPosts"
                    @pagination-change-page="handlePaginationChange"

                >
                <slot name="prev-nav">&lt; Previous</slot>
                <slot name="next-nav">Next &gt;</slot>

                </Bootstrap5Pagination>
              </div>







        </section>
    </div>
</template>


<script>


export default{
    data(){
        return{
           page : 1,
           post:  {
                id: "",
                title: "",
                 body: "",
            },

            errors:[],
            hideModelCreate: true
        }
    },
    mounted(){

    },
    computed:{

    },
    methods:{
        handlePaginationChange(newPage) {
        const loading = this.$loading;
        this.$store.dispatch("getPostsAction", { page: newPage, loading });
    },

        showModelPost(){
            this.hideModelCreate =! this.hideModelCreate;

            if(this.hideModelCreate)
              this.$refs.myModal.style.display = "block";
            else
             this.$refs.myModal.style.display = "none";
            console.log(this.hideModelCreate);
        },
        deletePost(id){

            this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                if (result.isConfirmed) {

                    axios.delete('/api/posts/'+id).then(res=>{
                        console.log(res);

                        if(res.data["status"] == true){
                        this.$swal({
                            position: "center",
                            icon: "success",
                            title: "The post was deleted",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.getPost();
                    }



                        })


                }
                });

        },
        updatePost(post){
            let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: true,
                    onCancel: this.onCancel,
                    color: "blue",
                    backgroundColor: "#ccc",
                    width:200,
                    height:200,
                    loader: 'bars',

                });

            axios.put('/api/posts/'+post.id,{
                title: post.title,
                body: post.body,
                id: post.id
            }).then(res=>{
               if(res.data["status"] == true){
                this.$swal({
                    position: "center",
                    icon: "success",
                    title: "The post was updated",
                    showConfirmButton: false,
                    timer: 1500
                 });
                 loader.hide()
               }
            });
        },
        // getPost(page = 1){

        //     let loader = this.$loading.show({
        //             // Optional parameters
        //             container: this.fullPage ? null : this.$refs.formContainer,
        //             canCancel: true,
        //             onCancel: this.onCancel,
        //             color: "blue",
        //             backgroundColor: "#ccc",
        //             width:200,
        //             height:200,
        //             loader: 'bars',

        //         });
        //     axios.get(`/api/posts?page=${page}`).then(res=>{


        //     this.posts = res.data;
        //     loader.hide()
        //     })
        // },
        createPost(e){
            e.preventDefault();

            axios.post('/api/posts', {
                title: this.post.title,
                body: this.post.body
            }).then(res=>{

                this.getPost();
                this.errors = [];
                this.title = ""
                this.body = ""

                this.$refs.myModal.style.display = "none";


            }).catch((err)=>{

                console.log(err);
                if(err.response.status == 422){
                    console.log(err.response.data);
                   this.errors = err.response.data['errors'];
                }
            })
        }
    },
    created(){
        const page = 1;
    let loading = this.$loading;
    this.$store.dispatch("getPostsAction", { page, loading });
    }
}

</script>
