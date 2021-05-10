const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        clickedUser: "",
        userMessage: "",
        timeOut: null,
        searchedUser: "",
        control: false

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
            if (this.icon === "microphone") {
                return;
            }

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

            let msg = receivedMsgs[receivedMsgs.length - 1];

            let trimmedMsg = msg.text.slice(0, 20);

            if (msg.text.length > 20) {
                trimmedMsg = trimmedMsg + "...";
            }

            return trimmedMsg;

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

        showPopUpDefine(message, event) {
            message.showPopUp = true;
            event.currentTarget.focus();
        },

        onFocusLost(message) {
            message.showPopUp = false;
        },

        messageDelete(index) {
            this.clickedUser.messages.splice(index, 1);
        },

        notSwitch() {
            this.control = !this.control
        },

        counterControl(){
            if(this.control === false){
                return true
            }else{
                return ""
            }
        }



    },

    mounted() {
        this.clickedUser = this.usersList[0];

        this.usersList.forEach(user => {
            user.messages.forEach(message => {
                this.$set(message, "showPopUp", false);
            });
        });
    }
})