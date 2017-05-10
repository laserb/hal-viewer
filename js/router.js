Router = Backbone.Router.extend({
    initialize: function(opts) {
        opts = opts || {};
        this.entryPoint = opts.entryPoint || '/';
        var api = new Hyperagent.Resource({
            url: this.entryPoint,
            headers: {
                access_token: token
            }
        });
        api.fetch().then(function (root) {
            var links = new Links({
                model: root,
                template: _.template($("#nav_links_template").html()),
                className: "nav navbar-nav",
                selfName: "home"
            });
            $("#main_navigation").html(links.render().el);
            var links = new Links({
                model: root,
                template: _.template($("#login_template").html()),
                className: "nav navbar-nav navbar-right",
            });
            $("#main_navigation").append(links.render().el);
        }, function (err) {
            console.warn('Error fetching API root', err);
        });
    },

    routes: {
        '*url': 'resourceRoute'
    },

    resourceRoute: function() {
        var viewer = new Viewer();
        url = location.hash.slice(1);
        var api = new Hyperagent.Resource({
            url: this.entryPoint + url,
            headers: {
                access_token: token
            }
        });
        api.fetch().then(function (root) {
            viewer.render(root);
        }, function (err) {
            console.warn('Error fetching API root', err);
        });
    }
})
