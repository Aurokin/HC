import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  var debug = true;
  if (debug == true) {
    Posts.remove({});
    JSON.parse(Assets.getText("posts.json")).posts.forEach(function(post) {
      Posts.insert(post);
    });
  }
});
