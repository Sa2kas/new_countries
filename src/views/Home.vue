<template>
  <div class="home">
    <Notification
      v-show="isNotificationVisible"
      @close="closeNotification"
    >
      <template v-slot:notification>
        {{ message }}
      </template>
    </Notification>

    <Title
      prop_title="šalys"
      prop_modal_title="Pridėti šalį"
      prop_modal_type="country"
      :prop_modal_post_url="this.url"
      @open="showNotification"
    />
    <Search
      @refList="getCountries()"
      :prop_link="this.url"
      prop_type="countries"
      @open="showNotification"
    />
    <Table
      prop_code="šalies tel. kodas"
      :items="countries"
      @refList="getCountries()"
      :prop_modal_url="this.url"
      prop
      _modal_title="Redaguoti šalį"
      prop_modal_type="country"
      @open="showNotification"
    />
    <Pagination
      :prop_urls="urls"
      @refList="getCountries()"
      prop_type="country"
    />
  </div>
</template>

<script>
import axios from "axios";
import Title from "../components/Title.vue";
import Search from "../components/Search.vue";
import Table from "../components/Table.vue";
import Pagination from "../components/Pagination.vue";
import Notification from "../components/Notification.vue";
import { notifMixin } from "../mixins/NotifMixin.js";
export default {
  name: "Home",
  components: {
    Title,
    Search,
    Table,
    Pagination,
    Notification,
  },
  mixins: [notifMixin],
  data() {
    return {
      countries: [],
      urls: [],
      url: this.$globalData.defaultUrl,
      message: "",
    };
  },
  methods: {
    async getCountries() {
      try {
        var response = await axios.get(this.$globalData.url);
        this.countries = response.data.data;
        this.urls = response.data.meta.links;
      } catch (error) {
        this.showNotification("Nepavyko gauti šalių duomenų!");
      }
    },
  },
  created() {
    this.getCountries();
    this.$globalData.url = this.$globalData.defaultUrl;
  },
};
</script>
<style scoped>
.home {
  padding: 45px min(376px, 19.58vw) 50px min(359px, 18.698vw);
}
</style>
