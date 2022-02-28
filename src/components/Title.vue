<template>
  <div class="title">
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      :prop_title="prop_modal_title"
      :prop_type="prop_modal_type"
      :prop_post_url="prop_modal_post_url"
      @open="open"
      @refList="refreshList()"
    />
    <p class="name">{{ prop_title }}</p>
    <button class="add" @click="showModal">
      <img
        src="../assets/plus.png" style="height:18px;"
      />
    </button>
  </div>
</template>
<script>
import { modalMixin } from "../mixins/ModalMixin.js";
import Modal from "../components/Modal.vue";
export default {
  mixins: [modalMixin],
  components: {
    Modal,
  },
  props: {
    prop_title: {
      type: String,
      default: "",
      require: true,
    },
    prop_modal_title: {
      type: String,
      default: "",
      require: true,
    },
    prop_modal_type: {
      type: String,
      default: "",
      require: true,
    },
    prop_modal_post_url: {
      type: String,
      default: "",
      require: true,
    },
  },
};
</script>
<style scoped>
.title {
  width: 100%;
  text-align: left;
}
p.name {
  display: inline-block;
  margin: 0;
  text-transform: uppercase;
  font-style: normal;
  font-weight: normal;
  font-size: 64px;
  line-height: 95px;
  letter-spacing: 0.016em;
  text-transform: uppercase;
  font-family: "Oswald";
  color: #5c5c5c;
  caret-color: rgba(0, 0, 0, 0);
}
button.add {
  caret-color: rgba(0, 0, 0, 0);
  border: none;
  background-color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-left: 5px;
  vertical-align: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 13px;
  color: #969696;
}
button:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
</style>