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
    clientId: "sjnxk44yek97g8vp5y9cjca3mymep8jf",
    scope:'wow.profile',
    secret: "3UWXbm3uVMw28k6RuBzam8j5dm8tTqbP"
  });

  console.log(Meteor.absoluteUrl());
});
