const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        clickedUser: "",
        userMessage: "",
        timeOut: null,
        searchedUser: "",
    },

    computed: {
        getLastAccess() {
            if (!this.clickedUser.messages) {
                return "";
            }
            const receivedMsgs = this.clickedUser.messages.filter(msgs => msgs.status === "received");

            
            if (receivedMsgs.length == 0) {
                return "";
            }

            const lastAccess = receivedMsgs[receivedMsgs.length - 1].date;

            return this.formatTime(lastAccess);
        },

        searchUser() {
            return this.usersList.filter(element => element.name.toLowerCase().startsWith(this.searchedUser.toLowerCase()));
        }
    },

    methods: {
        onUserClick(myUser) {
            return this.clickedUser = myUser;
        },

        formatTime(date) {
            return moment(date, "DD/MM/YYYY HH:mm:ss").format("HH:mm");
        },

        userMessagePush() {
            const currentUser = this.clickedUser;
            currentUser.messages.push({
                date: moment().format("DD/MM/YYYY HH:mm:ss"),
                text: this.userMessage,
                status: 'sent'
            });
            this.userMessage = "";
            this.scrollToBottom();
            setTimeout(() => {
                this.answer(currentUser);
            }, 2000);
        },



        answer(currentUser) {
            currentUser.messages.push({
                date: moment().format("DD/MM/YYYY HH:mm:ss"),
                text: "Ok",
                status: 'received'
            });
            this.scrollToBottom();
        },

        getUserLastMsg(user) {
            if (!this.clickedUser.messages) {
                return "";
            }
            const receivedMsgs = user.messages.filter(msgs => msgs.status === "received");
            if (receivedMsgs.length == 0) {
                return "";
            }

            return receivedMsgs[receivedMsgs.length - 1].text;

        },

        getUserLastAccess(user) {
            const receivedMsgs = user.messages.filter(msgs => msgs.status === "received");

            if (receivedMsgs.length == 0) {
                return "";
            }

            const lastAccess = receivedMsgs[receivedMsgs.length - 1].date;

            return this.formatTime(lastAccess);
        },

        scrollToBottom() {
            this.$nextTick(() => {
                const htmlElement = this.$refs.chat;
                htmlElement.scrollTop = htmlElement.scrollHeight;
            });
        },

        activeDefine(message) {
            message.active = !message.active;
        },

        messageDelete(message) {
            this.clickedUser.messages.splice(message, 1);
        }

    },

    mounted() {
        this.clickedUser = this.usersList[0];
    }
})