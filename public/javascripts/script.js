(function ($) {
  var source   = $("#handlebars-Template-linkitem").html();
  var template = Handlebars.compile(source);
  function bindVoteButtons(){
    $('.upvoteButton').click(function() {
      console.log('upvote');
      vote(this.parentNode.parentNode.dataset.id, 'up');
    }) 
    $('.downvoteButton').click(function() {
      console.log('downvote');
      vote(this.parentNode.parentNode.dataset.id, 'down');
    })
    $('.deleteButton').click(function(event) {
        console.dir($(event.target))
        deleteLink($(event.currentTarget).attr('data-id'))
    })
  }

  $('#loginButton').click(function() {
    loginAs();
  })
  $('#logoutButton').click(function() {
    logout();
  })
  bindVoteButtons();
 
  setInterval(function(){ refreshLinksH(); }, 5000);

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
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    var regex = new RegExp(expression)
    if(linkName.length > 0 && linkUrl.match(regex) ){
      params = {linkName: linkName, linkUrl: linkUrl};
      console.dir(params);
      $.post('/links/',params)
        .done(function(res) {
          prependLink(res)
        })
    }else{
      alert("Please enter a name and a valid URL");
    }
  }

  function prependLink(res){
    //$('#linkList').prepend(res);
    var html = template({links: [res]});
    $('#linkList').prepend(html);
    bindVoteButtons();
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


  function refreshLinks() {
    $.ajax(
        '/links/',
        {
          method:'GET'
        }
        ).done(function(res) {
          $('#linkList').replaceWith(res);
          bindVoteButtons();
        }).error(function() {
          console.log('failed');
        }).always(function() {
          console.log('fertig');
        })
  }

  function refreshLinksH() {
    $.ajax(
        '/links/handlebars',
        {
          method:'GET'
        }
        ).done(function(res) {
          console.dir(res);
          var html = template(res);
          $('#linkList').html(html);
          bindVoteButtons();
        }).error(function() {
          console.log('failed');
        }).always(function() {
          console.log('fertig');
        })
  }

}) (jQuery);
