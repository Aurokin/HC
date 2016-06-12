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

Template.blogHome.helpers({
  posts: function() {
    return Posts.find();
  }
});

Template.header.rendered = function() {
  $('.classIcon').hover(recruitmentHoverOn, recruitmentHoverOff);
};
