<template>
  <div>
    <div v-if="htmlResponse" v-html="htmlResponse"></div>
  </div>
</template>

<script>
import { getHTMLHome } from '@/api/api';
export default {
  name: 'Home',
  data() {
    return {
      frontLink: import.meta.env.VITE_FRONT_URL,
      htmlResponse: null,
    };
  },
  methods: {
    async fetchHtml() {
      try {
        const response = await getHTMLHome();
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