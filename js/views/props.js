var Props = Backbone.View.extend({
    className: 'props list-group',

    tagName: 'ul',

    template: _.template($('#props_template').html()),

    render: function() {
        var that = this;
        if(this.model === null) {
            this.el = "";
        }
        else if(typeof this.model === 'object') {
            var props = Object.keys(this.model);
            $.each(props, function(i, prop) {
                var value = that.model[prop];
                if(typeof value === 'object') {
                    that.$el.append(Mustache.render(that.template(),
                        { name: prop }
                    ));
                    that.$el.find(".props_value").last().html(
                        new Props({model: that.model[prop]}).render().el
                    );
                } else {
                    that.$el.append(Mustache.render(that.template(),
                        {
                            name: prop,
                            value: value
                        }
                    ));
                }
            });
        } else {
            this.el = this.model;
        }
        return this;
    }
});
