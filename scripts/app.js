const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        clickedUser: "",
       
    },

    computed: {
        getLastAccess(){
            if(!this.clickedUser.messages){
                return ""
            }
            const recievedMsgs = this.clickedUser.messages.filter(msgs => msgs.status === "received")


            const lastAccess = recievedMsgs[recievedMsgs.length -1].date

            return this.formatTime(lastAccess)
        }
    },

    methods: {
        onUserClick: function(myUser){
           return this.clickedUser = myUser
        },

        formatTime: function (date){
            return moment(date, "DD/MM/YYYY HH:mm:ss").format("HH:mm")
        },
    },

    mounted (){
        this.clickedUser = this.usersList[0]
    }
})