const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        clickedUser: "",
    },

    methods: {
        onUserClick: function(myUser){
           return this.clickedUser = myUser
        },
    }
})