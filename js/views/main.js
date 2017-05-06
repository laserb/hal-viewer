var Viewer = Backbone.View.extend({
    render: function() {
        console.log("hier");
        var links = new Links({model: root});
        var props = new Props({model: root});
        var embedded = new Embedded({model: root});
        $("#navigation").html(links.render().el);
        $("#properties").html(props.render().el);
        $("#embedded").html(embedded.render().el);
    }
})

