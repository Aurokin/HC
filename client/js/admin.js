Template.adminContent.helpers({
  posts: function() {
    return Posts.find({}, {sort: {date: -1} });
  },

  roster: function() {
    return Roster.find({}, {sort: {class: 1, name: 1} });
  },

  classCSS: function(classNum) {
    const css = Classes.findOne({num: classNum});
    if (css) {
      return css.css;
    } else {
      return null;
    }
  }
});

Template.adminContent.rendered = function() {
  $('#newPostDate').val(new Date().toDateInputValue());
};

Template.adminPanel.events({
  'click .adminSelector'(event) {
    const panel = $('#' + event.target.id).attr('panel');
    if (!$('#' + event.target.id).hasClass('adminSelected')) {
      $('.adminPanel').addClass('hidden');
      $('#' + panel).removeClass('hidden');
    }
    $('.adminSelector').removeClass('adminSelected');
    $('#' + event.target.id).addClass('adminSelected');
  }
});

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

  'click .currentPostTitle'(event) {
    $('#' + this._id).toggleClass('hidden');
  },

  'click .deletePost'() {
    Posts.remove(this._id);
  },

  'click #refreshRoster'() {
    console.log('hi');
    Meteor.call('getGuildMembers', 'Burning Legion', 'HC', function(error, members) {
      console.log(members);
      console.log(error);
    });
  },
});
