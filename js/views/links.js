var Links = Backbone.View.extend({
    initialize: function(options) {
        this.model = options.model;
        if(options.template) {
            this.template = options.template;
        };
        this.selfName = options.selfName || 'self';
        this.index = options.index;
        if(options.tagName) {
            this.tagName = options.tagName;
        }
        if(options.className) {
            this.className = options.className;
        }
        this.backButton = options.backButton;
    },

    events: {
        'click .link': 'followLink'
    },

    className: 'links',

    tagName: 'ul',

    template: _.template($('#links_template').html()),

    render: function() {
        var that = this;
        var links = [];
        if(this.backButton) {
            links.push({
                back_button: true
            });
        }
        $.each(Object.keys(this.model.links), function(i, link) {
            if(that.index) {
                if(that.index.indexOf(i) === -1) {
                    return true;
                }
            }
            var name = link === 'self' ? that.selfName : link;
            if(name === audioStreamItem) {
                link = entryPoint + that.model.links[link].href + "?access_token=" + token;
                links.push({
                    name: name,
                    link: link,
                    audio_stream: true
                });
            } else {
                links.push({
                    name: name,
                    link: link
                });
            }
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
        window.location.hash = linkObj.href;
        linkObj.fetch()
        .catch(function(data) {
            showLogin(linkObj.href);
        });
    }
})
