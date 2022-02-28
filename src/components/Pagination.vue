<template>
  <div class="pages">
    <button
      class="page"
      v-for="url in prop_urls"
      :key="url.label"
      @click="pagination(url.url)"
      :disabled="url.url === null"
      :class="{ active: url.active === true }"
    >
      <span v-if="url.label === 'Next &raquo;'"> &gt;</span>
      <span v-else-if="url.label === '&laquo; Previous'">&lt;</span>
      <span v-else>{{ url.label }}</span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    prop_urls: {
      type: Array,
      require: true,
    },
    prop_type: {
      type: String,
      default: "",
      require: true,
    },
  },
  methods: {
    pagination: function (url) {
      if (url != null) {
        if (this.prop_type == "country") {
          this.$globalData.url = url;
        }
        if (this.prop_type == "city") {
          this.$globalData.citiesUrl = url;
        }
        this.refreshList();
      }
    },
    refreshList: function () {
      this.$emit("refList");
    },
  },
};
</script>
<style scoped>
.page.active {
  background-color: #a3a3a3;
  color: white;
}
.page {
  cursor: pointer;
  min-width: 11px;
  height: 15px;
  background-color: #ffffff;
  border: none;
  color: #5c5c5c;
  border-radius: 20%;
  padding: 1px 2px;
  margin: 1px;
}
.page:disabled {
  color: rgba(92, 92, 92, 0.5);
}
.pages {
  width: 100%;
  caret-color: rgba(0, 0, 0, 0);
}
</style>