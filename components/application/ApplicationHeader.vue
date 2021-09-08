<template>
    <div class="application-header">
        <div class="application-header__text">Netsells</div>
        <div class="application-header__text">JavaScript Challenge</div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    @Component
    export default class ApplicationHeader extends Vue {}
</script>

<style lang="sass">
@use "~~/assets/styles/variables"

.application-header
    font-family: "Oswald"
    display: flex
    align-items: center
    justify-content: center
    height: 30px
    position: relative

    .light &
        color: variables.$darkSchemeLightGray
    
    .dark &
        color: #767676

    div:first-child
        position: absolute
        left: 35px
        font-size: 22px

    div:last-child
        font-size: 16px
</style>
