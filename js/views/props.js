var Props = Backbone.View.extend({
    className: 'props',

    tagName: 'ul',

    template: _.template($('#props_template').html()),

    render: function() {
        var props = Object.keys(this.model.props);
        var model = this.model;
        props = $.map(props, function(prop, i) {
            return {
                name: prop,
                value: model.props[prop]
            };
        });
        this.$el.html(Mustache.render(this.template(),
            { props: props }
        ));
        return this;
    }
})
