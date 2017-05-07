var Embedded = Backbone.View.extend({
    initialize: function(options) {
        this.number = options.number || 0;
        this.parent = options.parent || "embedded";
    },

    className: 'embedded panel panel-default',

    template: _.template($('#embedded_template').html()),

    render: function() {
        var that = this;
        var embedded;
        var keys;
        if( this.model.embedded.data ) {
            embedded = this.model.embedded.data;
        } else {
            embedded = [];
            keys = Object.keys(this.model.embedded);
            $.each(keys, function(i, obj) {
                if(Array.isArray(that.model.embedded[obj])) {
                    $.each(that.model.embedded[obj], function(j, item) {
                        embedded.push(item);
                    });
                } else {
                    embedded.push(that.model.embedded[obj]);
                }
            });
        }
        var data = [];
        $.each(embedded, function(i, obj) {
            that.$el.append(Mustache.render(that.template(),
                        {
                embName: keys ? keys[i] : "",
                name: obj.props.name || "",
                index: i,
                number: that.number,
                parent: that.parent
            }
            ));
            if(obj.props) {
                var objProps = new Props({model: obj});
                that.$el.find(".emb_props").last().html(objProps.render().el);
            }
            if(obj.links) {
                var objLinks = new Links({
                    model: obj,
                    tagName: 'div',
                    selfName: 'open'
                });
                that.$el.find(".emb_links").last().append(objLinks.render().el);
            }
            if(obj.embedded && Object.keys(obj.embedded).length) {
                var objEmbedded = new Embedded({
                    model: obj,
                    number: i+1,
                    parent: 'none'
                });
                that.$el.find(".emb_embedded").last().html(objEmbedded.render().el);
            }
        });
        return this;
    }
})
