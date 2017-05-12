var router = new Router({
    entryPoint: entryPoint,
    token: token
});
Backbone.history.start();

// Get the modal
var loginModal = document.getElementById('login-form');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
};

var login = function(data) {
    $.ajax
    ({
        type: "POST",
        url: entryPoint+"/"+loginEndPoint,
        dataType: 'multipart/formdata',
        beforeSend: function(xhr) {
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(data.username.value + ":" + data.password.value));
        }
    })
    .always(function (data) {
        if(data.status >= 200 && data.status < 300) {
            var url = new URI(window.location.href);
            token=JSON.parse(data.responseText).token;
            url.addQuery('access_token', token);
            window.location.href = url.href();
        }
    });
};

var showLogin = function() {
    $("#login-form").css('display', 'block');
};

var goBack = function() {
    Backbone.history.history.back();
};
