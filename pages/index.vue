<template>
    <the-application />
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import TheApplication from '../components/application/TheApplication.vue';

    @Component({
        name: 'Index',
        components: { TheApplication },
    })
    export default class Index extends Vue {}
</script>

<style lang="sass">
body
    margin: 0
</style>
