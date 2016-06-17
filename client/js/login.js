function loginResponse(err, response) {
  //console.log(err);
  //console.log(response);
  //console.log(Meteor.user());
  //console.log(Meteor.userId());
  Meteor.call('loginRoleCheck');
}

Template.login.events({
  'click #loginBtn'() {
    Meteor.loginWithBattlenet({
      "loginStyle": "popup"
    }, loginResponse);
  },
});
