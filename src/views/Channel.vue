<template>
  <div>
    <div v-if="htmlResponse" v-html="htmlResponse"></div>
  </div>
</template>

<script>
import { getHTMLChannel } from '@/api/api';
export default {
  name: 'Channel',
  data() {
    return {
      frontLink: import.meta.env.VITE_FRONT_URL,
      channel: this.$route.params.id,
      htmlResponse: null,
    };
  },
  methods: {
    async fetchHtml() {
      try {
        const response = await getHTMLChannel(this.channel);
        this.htmlResponse = this.modifyLinks(response.data);
      } catch (error) {
        console.error('Ошибка загрузки HTML:', error);
      }
    },

    modifyLinks(htmlString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      const links = doc.querySelectorAll("a");

      links.forEach((link) => {
        if (link.href.includes("https://tgstat.ru/channel/")) {
          link.href = link.href.replace("https://tgstat.ru/channel/", `${this.frontLink}/channel/`);
        }
      });

      return doc.documentElement.outerHTML;
    }

  },
  async mounted() {
    await this.fetchHtml();
  },
};
</script>