function checkAdmin(ctx, redirect) {
  if (false) {
    redirect('/secret');
  }
}

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

FlowRouter.route('/login', {
  action: function() {
    BlazeLayout.render("main", {content: "login"});
  }
});

FlowRouter.route('/secret', {
  action: function() {
    BlazeLayout.render("main", {content: "adminLogin"});
  }
})

FlowRouter.route('/admin', {
  triggersEnter: [checkAdmin],
  action: function() {
    BlazeLayout.render("admin", {content: "adminContent", panel: "adminPanel"});
  }
});
