export const notifMixin = {
    data() {
        return {
            isNotificationVisible: false,
        };
    },
    methods: {
        closeNotification() {
            this.isNotificationVisible = false;
        },
        showNotification(message) {
            this.isNotificationVisible = true;
            this.message = message;
        },
    },
};