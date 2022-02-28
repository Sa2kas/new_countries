<template>
  <div class="cities">
    <Notification
      v-show="isNotificationVisible"
      @close="closeNotification"
    >
      <template v-slot:notification>
        {{ message }}
      </template>
    </Notification>
    <Title
      :prop_title="prop_item.attributes.name"
      prop_modal_title="Pridėti miestą"
      prop_modal_type="city"
      :prop_modal_post_url="this.url"
      @open="showNotification"
    />
    <Search @refList="getCities()" :prop_link="this.url" prop_type="cities" />
    <Table
      prop_code="miesto pašto kodas"
      :items="cities"
      @refList="getCities()"
      :prop_modal_url="this.url"
      prop
      _modal_title="Redaguoti miestą"
      prop_modal_type="city"
      @open="showNotification"
    />
    <Pagination :prop_urls="urls" @refList="getCities()" prop_type="city" />
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
      cities: [],
      urls: [],
      url: this.prop_item.relationships.cities.links.related,
      message: "",
    };
  },
  props: {
    prop_item: {
      type: Object,
      require: true,
    },
  },
  methods: {
    async getCities() {
      try {
        var response = await axios.get(this.$globalData.citiesUrl);
        this.cities = response.data.data;
        this.urls = response.data.meta.links;
      } catch (error) {
        this.showNotification("Nepavyko gauti miestų duomenų!");
      }
    },
  },
  created() {
    this.$globalData.citiesUrl =
      this.prop_item.relationships.cities.links.related;
    this.getCities();
  },
};
</script>
<style scoped>
.cities {
  padding: 45px min(376px, 19.58vw) 50px min(359px, 18.698vw);
}
</style>
