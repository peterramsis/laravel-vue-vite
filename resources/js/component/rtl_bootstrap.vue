<template>
    <teleport to='head' v-if="this.$i18n.locale == 'ar'" >
        <!-- start css -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css" integrity="sha384-gXt9imSW0VcJVHezoNQsP+TNrjYXoGcrqBZJpry9zJt8PCQjobwmhMGaDHTASo9N" crossorigin="anonymous">
    </teleport>
</template>


<script>
export default {
    mounted(){
        this.token = localStorage.getItem("token");
        this.$i18n.locale = localStorage.getItem("lan") ?? "en";
    },
}
</script>
