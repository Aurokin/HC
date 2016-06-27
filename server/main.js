import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  //Meteor.users.remove({});
  Classes.remove({});
  Ranks.remove({});
  JSON.parse(Assets.getText('classes.json')).classes.forEach(function(wowClass) {
    console.log(wowClass);
    Classes.insert(wowClass);
  });
  JSON.parse(Assets.getText('ranks.json')).ranks.forEach(function(rank) {
    console.log(rank);
    Ranks.insert(rank);
  });

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
    },

    getGuildMembers: function(realm, guildName) {
      // get the client ID

      var clientId = Meteor.settings.bnetClientID;
      var baseUrl = "https://us.api.battle.net/wow/guild";
      var requestUrl = baseUrl + "/" + realm + "/" + guildName +"?fields=members&locale=en_US&apikey=" + clientId;

      this.unblock();
      var data = Meteor.http.get(requestUrl);

      if (data.data.members) {
        Roster.remove({});
        _.each(data.data.members, function(member) {
          //console.log(member);
          if (member.rank == 0 || member.rank == 1 || member.rank == 3) {
            console.log(member.character.name);
            console.log(" " + member.character.class);
            const image = member.character.thumbnail.split("-");

            Roster.insert({
              name: member.character.name,
              rank: member.rank,
              class: member.character.class,
              realm: member.character.realm,
              thumbnail: member.character.thumbnail,
              image: image[0]
            });
          }
        });
      }

      return data.data.members;
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
