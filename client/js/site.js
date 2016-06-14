Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

recruitmentHoverOn = function() {
  var x = $(this).offset().left;
  var y = $(this).offset().top;
  var yOffset = 31;
  var spec = $(this).attr("spec");

  $("#" + spec).css({"position":"absolute", "top":(y + yOffset), "left":x}).removeClass("hidden");
};

recruitmentHoverOff = function() {
  var spec = $(this).attr("spec");
  $("#" + spec).addClass("hidden");
}

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM/DD/YYYY');
});

Template.blogHome.helpers({
  posts: function() {
    return Posts.find({}, {sort: {date: -1} });
  }
});

Template.header.rendered = function() {
  $('.classIcon').hover(recruitmentHoverOn, recruitmentHoverOff);
};

Template.adminLogin.events({
  'submit #adminLogin'(event) {
    event.preventDefault();
    const key = event.target.adminKey.value;
    const search = SecretKey.findOne({"key": key});
    if (search) {
      //window.location.href = "/admin";
    } else {
      // Declined
    }
  }
});
