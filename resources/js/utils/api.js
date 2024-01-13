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
        console.log(`-----------${res.data}`);
        return res.data;
    });
};
