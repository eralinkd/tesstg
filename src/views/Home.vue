<template>

    
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                htmlResponse: '',
            }
        },


        async mounted() {
            fetch('https://uk.tgstat.com/').then(data => {
                this.htmlResponse = data
                console.log(this.htmlResponse)
            })
        }
    }
</script>
