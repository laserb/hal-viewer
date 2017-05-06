var Embedded = Backbone.View.extend({
    className: 'embedded',

    tagName: 'ul',

    template: _.template($('#embedded_template').html()),

    render: function() {
        var embedded = this.model.embedded.data;
        var data = [];
        var model = this.model;
        var that = this;
        $.each(embedded, function(i, obj) {
            var objProps = new Props({model: obj});
            var objLinks = new Links({model: obj});
            that.$el.append(Mustache.render(that.template(),
                { name: obj.props.name || "" }
            ));
            that.$el.find(".emb_props").last().html(objProps.render().el);
            that.$el.find(".emb_links").last().html(objLinks.render().el);
        });
        return this;
    }
})
