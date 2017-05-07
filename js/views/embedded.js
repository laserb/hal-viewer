var Embedded = Backbone.View.extend({
    className: 'embedded panel panel-default',

    template: _.template($('#embedded_template').html()),

    number: 0,

    render: function() {
        var that = this;
        var embedded = this.model.embedded.data;
        var data = [];
        $.each(embedded, function(i, obj) {
            that.$el.append(Mustache.render(that.template(),
                        {
                name: obj.props.name || "",
                index: i
            }
            ));
            if(obj.props) {
                var objProps = new Props({model: obj});
                that.$el.find(".emb_props").last().html(objProps.render().el);
            }
            if(obj.links) {
                var objLinks = new Links({
                    model: obj,
                    selfName: 'open'
                });
                that.$el.find(".emb_links").last().html(objLinks.render().el);
            }
        });
        return this;
    }
})
