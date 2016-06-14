import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  SecretKey.remove({});
  SecretKey.insert({"key": "1L1rFIOyS4MhHF66MkDaQxp7RtfmQ2r8"});

  ServiceConfiguration.configurations.remove({
    service: "battlenet"
  });

  ServiceConfiguration.configurations.insert({
    service: "battlenet",
    clientId: "unqvmbute4n2gxd6nfhetvhxwjj7eqws",
    scope:'wow.profile',
    secret: "PwtVEGMdju3dUNx7UFcfBNUhTz7WH2y7"
  });
});
