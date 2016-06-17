import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  //Meteor.users.remove({});

  // Configure Battle Net Configurations
  ServiceConfiguration.configurations.remove({
    service: "battlenet"
  });

  ServiceConfiguration.configurations.insert({
    service: "battlenet",
    clientId: Meteor.settings.bnetClientID,
    scope:'wow.profile',
    secret: Meteor.settings.bnetSecret
  });

  Meteor.methods({
    loginRoleCheck: function() {
      const user = Meteor.user();
      const userId = Meteor.userId();
      if (Meteor.settings.adminWhitelist) {
        // Admin Stuff
        for (i = 0; i < Meteor.settings.adminWhitelist.length; i++) {
          if (Meteor.settings.adminWhitelist[i] == user.profile.tag) {
            Roles.addUsersToRoles(userId, ['admin']);
          }
        }
      }
      if (!_.isEmpty(user.profile.characters)) {
        // Characters Role Comparisons
      }
    }
  });

  Accounts.onCreateUser((options, user) => {
    //console.log(options);
    user._id = user.services.battlenet.id.toString();
    user.profile = options.profile;
    //console.log(user);

    return user;
  });

  //console.log(Meteor.absoluteUrl());
});
