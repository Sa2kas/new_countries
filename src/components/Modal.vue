<template>
  <div class="modal-backdrop">
    <div class="modal">
      <button class="close-btn" @click="close();resetInput();">
        &#10005;
      </button>
      <div class="modal-header">
        <div>{{ prop_title }}</div>
      </div>
      <form id="form" :class="this.errors ? 'error' : 'ok'" onsubmit="return false">
        <div class="modal-body">
          <div class="form__div">
            <input 
              v-model="item.name" class="form__input" required @invalid="invalidateForm"
              oninvalid="this.setCustomValidity(' ')" oninput="this.setCustomValidity('')"/>
            <label class="form__label">Pavadinimas</label>
          </div>
          <div class="form__div">
            <input 
              type="number" v-model.number="item.area" class="form__input" required @invalid="invalidateForm"
              oninvalid="this.setCustomValidity(' ')" oninput="this.setCustomValidity('')"/>
            <label class="form__label">Užimamas plotas</label>
          </div>
          <div class="form__div">
            <input
              type="number" v-model.number="item.population" class="form__input" required @invalid="invalidateForm"
              oninvalid="this.setCustomValidity(' ')" oninput="this.setCustomValidity('')"/>
            <label class="form__label">Gyventojų skaičius</label>
          </div>
          <div class="form__div" v-if="prop_type === 'country'">
            <input
              v-model="item.phone_code" class="form__input" required @invalid="invalidateForm"
              oninvalid="this.setCustomValidity(' ')" oninput="this.setCustomValidity('')"/>
            <label class="form__label">Šalies tel. kodas</label>
          </div>
          <div class="form__div" v-if="prop_type === 'city'">
            <input
              v-model="item.postal_code" class="form__input" required @invalid="invalidateForm"
              oninvalid="this.setCustomValidity(' ')" oninput="this.setCustomValidity('')"/>
            <label class="form__label">Miesto pašto kodas</label>
          </div>
        </div>
        <div class="modal-footer">
          <p>*Būtina užpildyti visus laukus!</p>
          <button class="submit" type="submit" @click="saveItem();">
            saugoti
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Modal",
  data() {
    return {
      item: {},
      errors: false,
    };
  },
  props: {
    prop_title: {
      type: String,
      default: "",
    },
    prop_post_url: {
      type: String,
      default: "",
    },
    prop_put_url: {
      type: String,
      default: "",
    },
    prop_type: {
      type: String,
      default: "",
      require: true,
    },
  },
  methods: {
    invalidateForm() {
      this.errors = true;
    },
    close: function () {
      this.$emit("close");
    },
    refreshList: function () {
      this.$emit("refList");
    },
    saveItem: function () {
      const item = {
        data: {
          attributes: {
            name: this.item.name,
            area: this.item.area,
            population: this.item.population,
            phone_code: this.item.phone_code,
            postal_code: this.item.postal_code,
          },
        },
      };
      this.sendRequest(this.prop_put_url, this.prop_post_url, item);
    },

    sendRequest(put_url, post_url, item) {
      const headers = {
        "Content-type": "application/json",
      };
      if (!put_url) {
        this.postItem(post_url, item, headers);
      } else {
        this.putItem(put_url, item, headers);
      }
    },
    postItem(post_url, item, headers) {
      axios
        .post(post_url, item, { headers })
        .then((response) => {
          if (response.status == 201) {
            this.close();
            this.open('Elementas "' + this.item.name + '" sėkmingai pridėtas');
            this.refreshList();
          }
        })
        .catch((error) => {
          this.open(
            "Įvyko klaida: " + error.response.status +
              "!\n\r Elemento pridėti nepavyko");
        });
    },
    putItem(put_url, item, headers) {
      axios
        .put(put_url, item, { headers })
        .then((response) => {
          if (response.status == 200) {
            this.close();
            this.open('Elementas "' + this.item.name + '" sėkmingai atnaujintas');
            this.refreshList();
          }
        })
        .catch((error) => {
          this.open(
            "Įvyko klaida: " + error.response.status + '!\n\r Elemento "' + 
              this.item.name + '" atnaujinti nepavyko');
        });
    },
    async getItem(url) {
      if (url) {
        try {
          var response = await axios.get(url);
          this.item = response.data.data.attributes;
        } catch (error) {
          this.open(
            "Įvyko klaida: " + error.response.status + "! Elemento gauti nepavyko");
          this.close();
        }
      }
    },
    resetInput: function () {
      this.item = {};
      this.errors = false;
    },
    open: function (message) {
      this.$emit("open", message);
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  z-index: 1;
  background: #ffffff;
  width: 374px;
  height: 379px;
  position: fixed;
  top: auto;
  left: auto;
  overflow-x: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 35px 46px 32px 46px;
}

.modal-header {
  padding: 0;
  margin: 0;
  display: flex;
  position: relative;
  justify-content: space-between;
  font-family: "Oswald";
  font-size: 25px;
  color: #5c5c5c;
  text-transform: uppercase;
  padding-bottom: 28px;
}
.close-btn {
  width: 14px;
  height: 14px;
  color: #969696;
  background: none;
  border: none;
  cursor: pointer;
  float: right;
  padding: 0;
  margin: -17px -28px 0px 0px;
}

.form__div {
  position: relative;
  height: 42px;
  margin-bottom: 25px;
}
.form__input {
  top: 0;
  left: 0;
  width: 352px;
  padding: 0 10px;
  height: 42px;
  font-size: 16px;
  border: 0.75px solid #969696;
  border-radius: 7px;
  background: none;
  outline: none;
  font-weight: normal;
  font-family: "Open Sans";
}
.form__label {
  position: absolute;
  background-color: #fff;
  color: #969696;
  font-size: 10px;
}
.form__input + .form__label {
  top: -0.5rem;
  left: 30px;
  font-weight: normal;
  font-style: normal;
  font-family: "Open Sans";
  letter-spacing: 0.01em;
  padding: 0 0.1rem;
}
form.error .form__input:invalid {
  border: 0.75px solid #d23c3c;
}

.submit {
  background-color: #ffffff;
  color: #969696;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-family: "Oswald";
  font-size: 18px;
  text-transform: uppercase;
  width: 92px;
  height: 40px;
  border: none;
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  margin-top: 3px;
  padding: 6px 15px 13px 16px;
  float: right;
}
.submit:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
p {
  visibility: hidden;
  font-size: 14px;
  font-weight: normal;
  font-family: "Open Sans";
  letter-spacing: 0.01em;
  display: inline;
  color: #d23c3c;
  width: 200px;
  margin: 0px 10px 0 0;
  line-height: 40px;
  float: left;
}
form.error p {
  visibility: visible;
}
form.error .form__input:invalid + .form__label {
  color: #d23c3c;
}
</style>
