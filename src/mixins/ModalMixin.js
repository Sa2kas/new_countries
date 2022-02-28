export const modalMixin = {
    data() {
        return {
            isModalVisible: false,
        };
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        refreshList: function () {
            this.$emit("refList");
        },
        open(message) {
            this.$emit("open", message);
        },
    },
};