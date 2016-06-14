function loginResponse(err, response) {
  console.log(err);
  console.log(response);
}

Template.login.events({
  'click #loginBtn'() {
    Meteor.loginWithBattlenet({
      "loginStyle": "popup"
    }, loginResponse);
  },
});
