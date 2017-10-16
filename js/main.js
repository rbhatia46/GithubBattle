$(document).ready(function () {

  let typingTimer;
  let doneTypingInterval = 2000;
  $('#user1').on('keyup', function (e) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);


    $('#versus').html("<br><br><br><center><h1>v/s</h1></center>");
    let username1 = e.target.value;
    //AJAX request
    $.ajax({
      url: 'https://api.github.com/users/' + username1,
      data: {
        client_id: 'b71c2c1c952382dc0aab',
        client_secret: '579729a9a22a970009b5b8afaed90a1cc13675c3'
      }
    }).done(function (response) {
      $.ajax({
        url: 'https://api.github.com/users/' + username1 + '/repos',
        data: {
          client_id: 'b71c2c1c952382dc0aab',
          client_secret: '579729a9a22a970009b5b8afaed90a1cc13675c3',
          sort: 'created : asc',
          per_page: 5
        }
      })
      $('#avatar1').html(`
        <div id="winner1"></div>
        <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">${response.name}</h3>
        </div>
        <div class="panel-body">
          <center><img class="thumbnail" style="height:200px; width:200px;" src="${response.avatar_url}">
          </center>
        </div>
      </div>
        `);
    });
  });



  $('#user2').on('keyup', function (e) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);

    let username2 = e.target.value;

    $('#versus').html("<br><br><center><h1>v/s</h1></center>");

    //AJAX request
    $.ajax({
      url: 'https://api.github.com/users/' + username2,
      data: {
        client_id: 'b71c2c1c952382dc0aab',
        client_secret: '579729a9a22a970009b5b8afaed90a1cc13675c3'
      }
    }).done(function (response) {
      $.ajax({
        url: 'https://api.github.com/users/' + username2 + '/repos',
        data: {
          client_id: 'b71c2c1c952382dc0aab',
          client_secret: '579729a9a22a970009b5b8afaed90a1cc13675c3',
          sort: 'created : asc',
          per_page: 5
        }
      })
      $('#avatar2').html(`
        <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">${response.name}</h3>
        </div>
        <div class="panel-body">
          <center><img class="thumbnail" style="height:200px; width:200px;" src="${response.avatar_url}">
          </center>
        </div>
      </div>
        `);
    });
  });





  //on keydown, clear the countdown 
  $('#user1', '#user2').on('keydown', function () {
    clearTimeout(typingTimer);
  });

  //user is "finished typing," do something
  function doneTyping() {
    $('#compare').show();
  }

  $('#compare').on('click', function () {

    if (document.getElementById('user1').value == document.getElementById('user2').value) {
      alert("Please compare two different users!");
      return false;
    }

    let username1 = document.getElementById('user1').value;
    $.ajax({
      url: 'https://api.github.com/users/' + username1,
      data: {
        client_id: 'b71c2c1c952382dc0aab',
        client_secret: '579729a9a22a970009b5b8afaed90a1cc13675c3'
      }
    }).done(function (response) {
      var noOfPublicRepos = response.public_repos;
      var noOfPublicGists = response.public_gists;
      var followers = response.followers;
      var following = response.following;
      var score1 = (4 * noOfPublicRepos + 3 * noOfPublicGists + 7 * followers + (-0.5) * following) / 10;
      $('#score1').html(`<h3>Your Score is ${score1}</h3>`);
      let username2 = document.getElementById('user2').value;
      $.ajax({
        url: 'https://api.github.com/users/' + username2,
        data: {
          client_id: 'b71c2c1c952382dc0aab',
          client_secret: '579729a9a22a970009b5b8afaed90a1cc13675c3'
        }
      }).done(function (response) {
        var noOfPublicRepos = response.public_repos;
        var noOfPublicGists = response.public_gists;
        var followers = response.followers;
        var following = response.following;
        var score2 = (4 * noOfPublicRepos + 3 * noOfPublicGists + 7 * followers + (-0.5) * following) / 10;
        $('#score2').html(`<h3>Your Score is ${score2}</h3>`);
        // clear the winner flag if neccessary
        $('.arrow_box').remove();
        if (score1 > score2) {
          $('#winner1').append(`<div class="arrow_box">Winner!</div>`);
        } else {
          $('#winner2').append(`<div class="arrow_box">Winner!</div>`);
        }
      });


    });



  });


});
