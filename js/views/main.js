var Viewer = Backbone.View.extend({
    render: function(root) {
        var links = new Links({
            model: root,
            className: "nav navbar-nav",
            template: _.template($("#nav_links_template").html()),
            selfName: "reload",
            backButton: true
        });
        var props = new Props({model: root.props});
        var embedded = new Embedded({model: root});
        $("#navigation").html(links.render().el);
        $("#properties").html(props.render().el);
        $("#embedded").html(embedded.render().el);
        initPlayer();
    },
});

var initPlayer = function() {
    $('video, audio').each(function(i, data) {
        $(data).mediaelementplayer();
    });
};
