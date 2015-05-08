(function ($) {
  $('.upvoteButton').click(function() {
    console.log('upvote');
    vote(this.parentNode.parentNode.dataset.id, 'up');
  })

  $('.downvoteButton').click(function() {
    console.log('downvote');
    vote(this.parentNode.parentNode.dataset.id, 'down');
  })
  function vote(id,vote) {
    $.ajax(
      '/links/' + id + '/'+ vote,
      {
        method:'POST'
      }
      ).done(function() {
        updateRatingFor(id)
      }).error(function() {
        console.log('failed');
      }).always(function() {
        console.log('fertig');
      })
  }
  $('#loginButton').click(function() {
    loginAs();
  })

  $('#logoutButton').click(function() {
    logout();
  })

  function loginAs() {
    $.ajax(
        '/login_as/' + $("#loginInput").val() ,
        {
          method:'POST'
        }
        ).done(function(res) {
          $('#userInformation').html('logged in as '+ res);
          $('#logoutButton').show();
          $('#loginForm').hide()
        }).error(function() {
          console.log('failed');
        }).always(function() {
          console.log('fertig');
        })
  }

  function logout(){
    $.ajax(
        '/logout/',
        {
          method:'DELETE'
        }  
      )
      .done(function() {
          $('#logoutButton').hide()
          $('#userInformation').html('');
          $('#loginForm').show()
      })
  }

  function updateRatingFor(id) {
    $.ajax(
        '/Links/' + id +"/rating" ,
        {
          method:'GET'
        }
        ).done(function(res) {
          $('#rating-div-'+id).html(res);
        }).error(function() {
          console.log('failed');
        }).always(function() {
          console.log('fertig');
        })
  }
  
  $('#saveLink').click(function() {
      createLink($('#linkName').val(), $('#linkUrl').val());
  })
  
  function createLink(linkName, linkUrl){
    $.post('/links/',{linkName: linkName, linkUrl: linkUrl})
      .done(function(res) {
        $('#linkList').append(res);
      })
  }

}) (jQuery);
