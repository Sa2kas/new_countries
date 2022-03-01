<template>
  <div class="backdrop">
    <div class="confirmation">
      <div class="header">
        <button class="close" @click="close()">&#10005;</button>
      </div>
      <div class="body">
        Ar tikrai norite pašalinti elementą "{{ prop_element }}"?
      </div>
      <div class="footer">
        <button class="no" @click="close()">Atšaukti</button>
        <button class="yes" @click="deleteItem()">
          Patvirtinti
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      elementas: this.prop_element,
    };
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
    refreshList: function () {
      this.$emit("refList");
    },
    async deleteItem() {
      await axios.delete(this.prop_delete_url)
      // alert('Elementas "' + this.prop_element + '" sėkmingai pašalintas');
      .then((response) => {
          if (response.status == 200) {
            this.open('Elementas "' + this.prop_element + '" sėkmingai pašalintas');
            this.close();
            this.refreshList();
          }
        })
        .catch((error) => {
          this.open(
            "Įvyko klaida: " + error.response.status +
              "!\n\r Elemento pašalinti nepavyko");
          this.close();
        });
    },
    open(message) {
      this.$emit("open", message);
    },
  },
  props: {
    prop_element: {
      type: String,
      default: "",
      require: true,
    },
    prop_delete_url: {
      type: String,
      default: "",
      require: true,
    },
  },
};
</script>
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirmation {
  background: #ffffff;
  width: 360px;
  height: 170px;
  position: fixed;
  top: auto;
  left: auto;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  visibility: visible;
  padding: 18px;
}
.header {
  text-align: right;
  height: 14px;
}
.close {
  width: 14px;
  padding: 0;
  font-size: 14px;
}
.body {
  padding: 5px;
  font-family: "Oswald";
  font-size: 20px;
  padding-bottom: 10px;
  letter-spacing: 0.02em;
  padding: 17px 28px 0;
}
.footer {
  padding: 17px 28px 14px;
}
button {
  border: none;
  background-color: #ffffff;
  font-family: "Oswald";
  font-size: 18px;
  border-radius: 5px;
  color: #a3a3a3;
  letter-spacing: 0.02em;
  font-weight: normal;
  font-style: normal;
  text-transform: uppercase;
  cursor: pointer;
}
.yes {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 120px;
  height: 40px;
  float: right;
  color: #a3a3a3;
}
.no {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  width: 120px;
  height: 40px;
  float: left;
  background-color: #a3a3a3;
}
.no:hover,
.yes:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.x:hover {
  color: #5c5c5c;
}
</style>