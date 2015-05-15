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
          refreshLinks()
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
          refreshLinks()
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
      createLink($('#linkNameInput').val(), $('#linkUrlInput').val());
  })
  
  function createLink(linkName, linkUrl){
    params = {linkName: linkName, linkUrl: linkUrl};
    console.dir(params);
    $.post('/links/',params)
      .done(function(res) {
        prependLink(res)
      })
  }

  function prependLink(rawHtml){
    $('#linkList').prepend(rawHtml);
  }

  function deleteLink(id) {
    $.ajax(
      '/Links/' + id,
      {
         method:'DELETE'
      }
      ).done(function(res) {
        $('li[data-id='+id+']').remove()
      })
  }

  $('.deleteButton').click(function(event) {
      console.dir($(event.target))
      deleteLink($(event.currentTarget).attr('data-id'))
  })

  function refreshLinks() {
    $.ajax(
        '/links/',
        {
          method:'GET'
        }
        ).done(function(res) {
          $('#linkList').replaceWith(res);
        }).error(function() {
          console.log('failed');
        }).always(function() {
          console.log('fertig');
        })
  }

}) (jQuery);
