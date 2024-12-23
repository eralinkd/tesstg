<template>
  <div>
    <div v-if="htmlResponse" v-html="htmlResponse"></div>



    <div 
      v-if="isModalVisible" 
      class="modal modal-background m-0 show" 
      id="ajaxModal12331553" 
      tabindex="-1" 
      role="dialog" 
      aria-labelledby="exampleModalLabel" 
      aria-modal="true" 
      style="padding-right: 17px; display: block;">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content bg-transparent" style="min-height:200px;">

          <div class="modal-header border-bottom-0 px-1 px-sm-3">
            <div class="modal-title">
              <h3 class="text-success text-shadow-1">Вход на сайт</h3>
            </div>
            <button @click="closeModal" type="button" class="text-success custom-close-button-top" aria-hidden="true">×</button>
          </div>

          <div class="modal-body pt-0 px-0 px-sm-3">
            <div class="card card-body">
              <p>
                После нажатия кнопки вы перейдете в диалог с нашим ботом <b>@tg_analytic_bot</b>.
              </p>
              <p>В диалоге с ботом нажмите кнопку <b>Start</b></p>
              <div class="d-flex justify-content-center">
                <a href="https://t.me/tg_anaIytic_bot" role="button" target="_blank" class="btn btn-primary auth-btn">
                  <i class="uil uil-telegram"></i><span>&nbsp; Войти через Telegram</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div v-if="isModalVisible" class="modal-backdrop show"></div>
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
      isModalVisible: false,
    };
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    openModal() {
      this.isModalVisible = true;
    },
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
    const openModalButton = document.querySelector('[data-src="/login"]');
    if (openModalButton) {
      openModalButton.addEventListener('click', this.openModal);
    }
  },
};
</script>