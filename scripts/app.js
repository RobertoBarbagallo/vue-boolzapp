const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        clickedUser: "",
        userMessage: "",
        timeOut: null,
        searchedUser: ""
       
    },

    computed: {
        getLastAccess(){
            if(!this.clickedUser.messages){
                return ""
            }
            const recievedMsgs = this.clickedUser.messages.filter(msgs => msgs.status === "received")


            const lastAccess = recievedMsgs[recievedMsgs.length -1].date

            return this.formatTime(lastAccess)
        },

        searchUser(){
                if(this.searchedUser == ""){
                   return this.usersList 
                }else if(!this.searchedUser){
                    return ""
                }else{
                    return this.usersList.filter(element => element.name.includes(this.searchedUser))
                }
        }
    },

    methods: {
        onUserClick(myUser){
           return this.clickedUser = myUser
        },

        formatTime(date){
            return moment(date, "DD/MM/YYYY HH:mm:ss").format("HH:mm")
        },

        userMessagePush (){
            this.clickedUser.messages.push({
                date: moment(),
                text: this.userMessage,
                status: 'sent'
            })
           this.AIanswer() 
        },

        AIanswer(){
            this.time,Out = setTimeout(this.answer, 1000)
        },
        answer(){
            this.clickedUser.messages.push({
                date: moment(),
                text: "Ok",
                status: 'received'
            })
        }
    },

    mounted (){
        this.clickedUser = this.usersList[0]
    }
})