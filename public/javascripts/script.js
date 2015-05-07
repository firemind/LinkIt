(function ($) {
    $('.upvoteButton').click(function() {
        console.log('upvote');
        upvote(this.parentNode.parentNode.dataset.id);
    })
    function upvote(id) {
        $.ajax(
            '/links/' + id + '/up',
            {
                method:'POST'
            }
        ).done(function() {
                console.log('success');
        }).error(function() {
            console.log('failed');
        }).always(function() {
            console.log('fertig');
        })
    }
    $('.downvoteButton').click(function() {
        console.log('downvote');
        downvote(this.parentNode.parentNode.dataset.id);
    })
    function downvote(id) {
        $.ajax(
            '/links/' + id + '/down',
            {
                method:'POST'
            }
        ).done(function() {
                console.log('success');
        }).error(function() {
            console.log('failed');
        }).always(function() {
            console.log('fertig');
        })
    }
    $('#loginButton').click(function() {
        loginAs();
    })
    function loginAs() {
        $.ajax(
            '/login_as/' + $("#loginInput").val() ,
            {
                method:'POST'
            }
        ).done(function() {
                console.log('success');
        }).error(function() {
            console.log('failed');
        }).always(function() {
            console.log('fertig');
        })
    }
}) (jQuery);
