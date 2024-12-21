<template>
  <div>
    <div v-if="htmlResponse" v-html="htmlResponse"></div>
  </div>
</template>

<script>
import { getHTMLChannel } from '../api/api';
export default {
  name: 'Home',
  data() {
    return {
      htmlResponse: null,
    };
  },
  methods: {
    async fetchHtml() {
      try {
        const response = await getHTMLChannel('TCH_channel');
        this.htmlResponse = response.data;
      } catch (error) {
        console.error('Ошибка загрузки HTML:', error);
      }
    },
  },
  async mounted() {
    await this.fetchHtml();
  },
};
</script>