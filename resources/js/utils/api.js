export const getPost = (page = 1, $loading) => {
    let loader = $loading.show({
        // Optional parameters
        container: false,
        canCancel: true,
        onCancel: () => {},
        color: "blue",
        backgroundColor: "#ccc",
        width: 200,
        height: 200,
        loader: "bars",
    });
    return axios.get(`/api/posts?page=${page}`).then((res) => {
        loader.hide();
        return res.data;
    });
};

export const createPost = (data) => {
    const { title, body } = data;
    return axios
        .post("/api/posts", {
            title,
            body,
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            if (err.response.status == 422) {
                console.error(`------${err.response}`);
                return err.response;
            }
        });
};

export const editPost = (loading, alert, data) => {
    let loader = loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
        color: "blue",
        backgroundColor: "#ccc",
        width: 200,
        height: 200,
        loader: "bars",
    });
    return axios.put("/api/posts/" + post.id, data).then((res) => {
        if (res.data["status"] == true) {
            alert({
                position: "center",
                icon: "success",
                title: "The post was updated",
                showConfirmButton: false,
                timer: 1500,
            });
            loader.hide();
        }
    });
};
