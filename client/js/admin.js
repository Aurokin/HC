Template.adminContent.helpers({
  posts: function() {
    return Posts.find({}, {sort: {date: -1} });
  }
});

Template.adminContent.rendered = function() {
  $('#newPostDate').val(new Date().toDateInputValue());
};

Template.adminContent.events({
  'submit #newPost'(event) {
    event.preventDefault();
    const target = event.target;
    const header = target.newPostHeader.value;
    const image = target.newPostImage.value;
    const text = target.newPostText.value;
    const date = target.newPostDate.value;
    Posts.insert({
      header,
      image,
      text,
      date,
      createdAt: new Date(),
    });
    target.newPostHeader.value = '';
    target.newPostImage.value = '';
    target.newPostText.value = '';
    target.newPostDate.value = new Date().toDateInputValue();
  },

  'submit .currentPost'(event) {
    event.preventDefault();
    const target = event.target;
    const header = $("#" + this._id + "-PostHeader").val();
    const image = $("#" + this._id + "-PostImage").val();
    const text = $("#" + this._id + "-PostText").val();
    const date = $("#" + this._id + "-PostDate").val();
    Posts.update(this._id, {
      header,
      image,
      text,
      date,
    });
  },

  'click .deletePost'() {
    Posts.remove(this._id);
  },
});
