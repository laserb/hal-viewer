var Links = Backbone.View.extend({
    initialize: function(options) {
        this.model = options.model;
        if(options.template) {
            this.template = options.template;
        }
    },

    events: {
        'click .link': 'followLink'
    },

    className: 'links',

    tagName: 'ul',

    template: _.template($('#links_template').html()),

    render: function() {
        var links = Object.keys(this.model.links);
        links = $.map(links, function(link, i) {
            return { name: link };
        });
        this.$el.html(Mustache.render(this.template(),
            { links: links }
        ));
        return this;
    },

    followLink: function(event) {
        event.preventDefault();
        var target = $(event.currentTarget);
        var link = target[0].name;
        var linkObj = this.model.links[link];
        linkObj.fetch().then(function(data) {
            window.location.hash = linkObj.href;
            render(data);
        });
    }
})
