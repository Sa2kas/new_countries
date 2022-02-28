<template>
  <div class="backdrop">
    <div class="notification">
      <div class="header">
        <button class="close" @click="close()">&#10005;</button>
      </div>
      <div class="body">
        <slot name="notification"></slot>
      </div>
      <div class="footer">
        <button class="confirm" @click="close()">Patvirtinti</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    close: function () {
      this.$emit("close");
    },
  },
  props: {},
};
</script>
<style scoped>
.backdrop {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.notification {
  z-index: 2;
  background: #ffffff;
  width: 374px;
  height: 138px;
  position: fixed;
  top: 20px;
  left: auto;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  visibility: visible;
  padding: 18px 46px;
}
.header {
  text-align: right;
  height: 14px;
  margin-right: -28px;
}
.body {
  padding: 17px 0;
  height: 50px;
  font-family: "Oswald";
  font-size: 18px;
  letter-spacing: 0.01em;
  font-weight: normal;
  font-style: normal;
  text-transform: uppercase;
  vertical-align: middle;
}
.footer {
  height: 40px;
}
button {
  border: none;
  background-color: #ffffff;
  font-family: "Oswald";
  font-size: 14px;
  border-radius: 5px;
  color: #969696;
  letter-spacing: 0.02em;
  font-weight: normal;
  font-style: normal;
  text-transform: uppercase;
}
.confirm {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 120px;
  height: 40px;
  float: right;
  font-size: 18px;
}

.confirm:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.close:hover {
  color: #5c5c5c;
}
</style>