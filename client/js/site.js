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

Template.roster.helpers({
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
  },

  className: function(classNum) {
    const css = Classes.findOne({num: classNum});
    if (css) {
      return css.name;
    } else {
      return null;
    }
  },

  rankH: function(rank) {
    const rankDb = Ranks.findOne({num: rank});
    if (rankDb) {
      return rankDb.name;
    } else {
      return null;
    }
  }
});

Template.roster.events({
  'click .rosterBtn'(event) {
    const id = event.target.id;
    const image = $('#' + id).attr('image');
    const name = $('#' + id).text();
    const wowClass = $('#' + id).attr('wowClass');
    const rank = $('#' + id).attr('rank');
    const fullLink = 'https://render-api-us.worldofwarcraft.com/static-render/us/' + image + '-profilemain.jpg';

    console.log(id);
    console.log(image);
    console.log(fullLink);
    $('#rosterMain').css('background-image', "url("+fullLink+")");
    $('#rosterName').text(name);
    $('#rosterClass').text(wowClass);
    $('#rosterRank').text(rank);
  }
});

Template.header.rendered = function() {
  $('.classIcon').hover(recruitmentHoverOn, recruitmentHoverOff);
};
