<template>
  <div class="table-data">
    <Modal
      ref="modalItem"
      v-show="isModalVisible"
      @close="closeModal()"
      :prop_put_url="selectedUrl"
      :prop_title="modalTitle"
      :prop_type="prop_modal_type"
      @open="open"
      @refList="refreshList()"
    />
    <Confirm
      v-show="isConfirmVisible"
      @close="closeConfirm()"
      :prop_delete_url="selectedUrl"
      :prop_element="confirmedItem"
      @open="open"
      @refList="refreshList()"
    />

    <div class="emptyTable" v-if="items.length == 0">duomenų nerasta!</div>
    <table v-if="items.length != 0">
      <thead>
        <tr>
          <th style="cursor: pointer" @click="order()">
            pavadinimas
            <img src="../assets/arrow1.png" style="height: 14px" alt="" />
          </th>
          <th>užimamas plotas</th>
          <th>gyventojų skaičius</th>
          <th>{{ prop_code }}</th>
          <th style="width: 6vw">veiksmai</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-if="item.type === 'cities'">{{ item.attributes.name }}</td>
          <td v-if="item.type === 'countries'">
            <router-link :to="{ name: 'Cities', params: { prop_item: item } }">
              {{ item.attributes.name }}
            </router-link>
          </td>
          <td>{{ item.attributes.area }}</td>
          <td>{{ item.attributes.population }}</td>
          <td v-if="item.attributes.phone_code != null">
            {{ item.attributes.phone_code }}
          </td>
          <td v-if="item.attributes.postal_code != null">
            {{ item.attributes.postal_code }}
          </td>
          <td>
            <img
              class="icons" @click="handleDelete(item)"
              src="../assets/trash.png"
              />
            <img
               class="line" src="../assets/line.png"
              />
            <img
              class="icons" @click="selectUrl(item.id);
                handleEdit(selectedUrl)"
              src="../assets/edit.png"
              />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import Confirm from "./Confirm.vue";
import { modalMixin } from "../mixins/ModalMixin.js";
export default {
  data() {
    return {
      sortDirection: "",
      selectedUrl: "",
      isConfirmVisible: false,
      modalTitle: this.prop_modal_title,
      confirmedItem: "",
    };
  },
  mixins: [modalMixin],
  components: {
    Modal,
    Confirm,
  },
  props: {
    prop_code: {
      type: String,
      default: "",
      require: true,
    },
    items: {
      type: Array,
      require: true,
    },
    prop_modal_title: {
      type: String,
      default: "Redaguoti",
      require: true,
    },
    prop_modal_type: {
      type: String,
      default: "",
      require: true,
    },
    prop_modal_url: {
      type: String,
      default: "",
      require: true,
    },
  },
  methods: {
    order: function () {
      if (!this.sortDirection || this.sortDirection == "desc") {
        this.items.sort((a, b) =>
          a.attributes.name
            .toLowerCase()
            .localeCompare(b.attributes.name.toLowerCase())
        );
        this.sortDirection = "asc";
      } else {
        this.items.sort((a, b) =>
          b.attributes.name
            .toLowerCase()
            .localeCompare(a.attributes.name.toLowerCase())
        );
        this.sortDirection = "desc";
      }
    },
    selectUrl: function (id) {
      this.selectedUrl = this.prop_modal_url + "/" + id;
    },
    showConfirm() {
      this.isConfirmVisible = true;
    },
    closeConfirm() {
      this.isConfirmVisible = false;
    },
    modalItem(url) {
      this.$refs.modalItem.getItem(url);
    },
    confirmItem: function (item) {
      this.confirmedItem = item.attributes.name;
    },
    handleDelete(item) {
      this.selectUrl(item.id); 
      this.showConfirm(); 
      this.confirmItem(item);
    },
    handleEdit(selectedUrl) {
      this.modalItem(selectedUrl);
      this.showModal();
      
    }
  },
};
</script>
<style scoped>
td {
  border: 1px solid rgba(92, 92, 92, 0.2);
  text-align: left;
  padding: 8px 10px;
  background: #ffffff;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  width: fit-content;
}
tr {
  text-align: left;
  background: #ffffff;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
}
th {
  border: 1px solid rgba(92, 92, 92, 0.2);
  padding: 10px;
  background: #ffffff;
  text-transform: uppercase;
  font-family: "Oswald";
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0.016em;
}
table {
  caret-color: rgba(0, 0, 0, 0);
  padding-top: 24px;
  border-collapse: collapse;
  border: hidden;
  box-shadow: 0 0 0 24px #ffffff, 0 0 10px 24px rgba(0, 0, 0, 0.1);
  width: calc(100% - 48px);
  margin-left: 24px;
  margin-right: 24px;
  min-width: fit-content;
  color: #5c5c5c;
}
.table-data {
  padding-top: 26px;
  margin-bottom: 36px;
  width: min(1185px, 61.719vw);
  justify-content: center;
  align-content: center;
}
.icons {
  height: 20px;
  width: 20px;
  padding:0 0.5vw 2px 0.5vw;
}
.line {
  height: 26px;
  padding-top: 2px;
}
.icons:hover {
  cursor: pointer;
}
a {
  text-decoration: none;
  color: #5c5c5c;
}
a:hover {
  font-weight: bold;
}
.emptyTable {
  font-family: "Oswald";
  font-size: 20px;
  padding: 10px;
  letter-spacing: 0,02em;
  font-weight: normal;
  text-transform: uppercase;
}
</style>