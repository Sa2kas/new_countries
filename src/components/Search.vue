<template>
  <div class="data">
    <div class="search">
      <input
        type="text" class="item" v-model="search" 
        @keyup="searchItem(search);refreshList();" placeholder=""/>
      <button class="toggle" @click="toggle = !toggle">
        filtravimas  
        <img src="../assets/toggle.png" style="height: 15px"/>
      </button>
    </div>
      <div class="filter" v-show="toggle">
      <div class="labels">
        <label for="startDate" class="filterLabel">Pradžia</label>
        <label for="endDate" class="filterLabel">Pabaiga</label>
      </div>
      <div class="inputs">
        <input 
          type="date" v-model="startDate" id="startDate" class="filterItem"/>
        <input
          type="date" v-model="endDate" id="endDate" class="filterItem"/>
        <button class="filterButton" @click="filtering">Filtruoti</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      toggle: false,
      startDate: "",
      endDate: "",
    };
  },
  props: {
    prop_link: {
      type: String,
      default: "",
      require: true,
    },
    prop_type: {
      type: String,
      default: "",
      require: true,
    },
  },
  methods: {
    refreshList: function () {
      this.$emit("refList");
    },
    searchItem: function (item) {
      if (this.prop_type == "countries") {
        this.$globalData.url = this.prop_link + "?search=" + item;
      }
      if (this.prop_type == "cities") {
        this.$globalData.citiesUrl = this.prop_link + "?search=" + item;
      }
    },
    filtering: function () {
      if (this.startDate || this.endDate) {
        if (this.prop_type == "countries") {
          this.$globalData.url =
            this.prop_link + "?start_date=" + this.startDate + "?end_date=" + this.endDate;
        }
        if (this.prop_type == "cities") {
          this.$globalData.citiesUrl =
            this.prop_link + "?start_date=" + this.startDate + "?end_date=" + this.endDate;
        }
        this.open("Duomenų filtravimas sėkmingai atliktas!");
        this.refreshList();
      } else {
        if(!(this.startDate && this.endDate)) {
          this.open("Filtravimui nėra pateikta data!");
        } 
        else {
          this.open('Neteisingas duomenų pateikimas! Reikalingas datos formatas: "YYYY-mm-dd"');
        }
      }
    },
    open(message) {
      this.$emit("open", message);
    },
  },
};
</script>
<style scoped>
.data {
  width: min(1185px, 61.719vw);
  justify-content: center;
  align-content: center;
}
.filter {
  margin-bottom: 20px;
  width: min(1185px, 61.719vw);
  justify-content: center;
  align-content: center;
}
.labels {
  text-align: left;
  color: #969696;
  caret-color: rgba(0, 0, 0, 0);
}
.filterLabel {
  margin-right: 4vw;
  display: inline-block;
  color: #5c5c5c;
  font-size: 20px;
  font-family: "Oswald";
  letter-spacing: 0.02em;
  text-transform: uppercase;
  width: min(180px, 17vw);
}
.inputs {
  text-align: left;
  height: 50px;
}
.filterItem {
  padding: 0 1vw;
  margin-right: 2vw;
  color: #5c5c5c;
  width: min(180px, 17vw);
  font-size: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  border: none;
  height: 50px;
  text-transform: uppercase;
}
.filterItem::placeholder {
  color: rgba(163, 163, 163, 0.5);
}
::-webkit-calendar-picker-indicator{
  filter:invert(0.75);
  z-index: 0;
}
.filterButton {
  float: right;
  color: #969696;
  width: 161px;
  height: 50px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border: none;
  font-family: "Oswald";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0.016em;
  text-transform: uppercase;
}
button {
  caret-color: rgba(0, 0, 0, 0);
}

.search {
  margin-top: 29px;
  text-align: left;
  margin-bottom: 26px;
  width: min(1185px, 61.719vw);
  justify-content: center;
  align-content: center;
}
.item {
  display: inline-block;
  width: min(1000px, calc(100% - 189px));
  height: 48px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border: none;
  margin-right: 24px;
  background: url("../assets/search.png")
    no-repeat 98%;
  background-size: 2.5vh;
  font-size: 16px;
}
input:focus {
  outline: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.toggle {
  color: #969696;
  width: 161px;
  height: 50px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border: none;
  vertical-align: middle;
  font-family: "Oswald";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  letter-spacing: 0.016em;
  text-transform: uppercase;
  margin-top: -4px;
}
button:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.icons:hover {
  cursor: pointer;
}
</style>