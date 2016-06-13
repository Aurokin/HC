FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("main", {content: "blogHome"});
  }
});

FlowRouter.route('/apply', {
  action: function() {
    BlazeLayout.render("main", {content: "application"});
  }
});

FlowRouter.route('/roster', {
  action: function() {
    BlazeLayout.render("main", {content: "roster"});
  }
});

FlowRouter.route('/sales', {
  action: function() {
    BlazeLayout.render("main", {content: "sales"});
  }
});

FlowRouter.route('/admin', {
  action: function() {
    BlazeLayout.render("admin", {content: "adminContent", panel: "adminPanel"});
  }
});
