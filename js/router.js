Router = Backbone.Router.extend({
    initialize: function(opts) {
        opts = opts || {};
        this.entryPoint = opts.entryPoint || '/';
        this.token = opts.token || '';
        var api = new Hyperagent.Resource({
            url: this.entryPoint,
            headers: {
                access_token: this.token
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
                access_token: this.token
            }
        });
        api.fetch().then(function (root) {
            window.root = root;
            viewer.render();
        }, function (err) {
            console.warn('Error fetching API root', err);
        });
    }
})
