<template>
    <div v-if="htmlResponse" v-html="htmlResponse"></div>
    
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
            fetch('https://uk.tgstat.com/', ).then(data => {
                return data.text();
            })
            .then((html) => {
                this.htmlResponse = html
            })
        }
    }
</script>
