var Links = Backbone.View.extend({
    initialize: function(options) {
        this.model = options.model;
        if(options.template) {
            this.template = options.template;
        };
        this.selfName = options.selfName || 'self';
    },

    events: {
        'click .link': 'followLink'
    },

    className: 'links',

    tagName: 'ul',

    template: _.template($('#links_template').html()),

    render: function() {
        var links = Object.keys(this.model.links);
        var that = this;
        links = $.map(links, function(link, i) {
            var name = link === 'self' ? that.selfName : link;
            return {
                name: name,
                link: link
            };
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
