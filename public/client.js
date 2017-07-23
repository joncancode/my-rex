//1 state
let state = {
  users: [],
  view: {
    login: true,
    mainList: false,
    ListResults: false,
    recs: false,
  },
};
//2 function
function storeData(data) {
  state.users = data;
  render(state);
  console.log('state', state);
}
//3 render
function render(state) {
  console.log(state);
  //const resultArray = state.view.ListResults.Similar.Results;
  //console.log('RESULTS ARRAY LENGTH: ', state.view.ListResults.Similar.Results.length);
  // let listResults = '';
  // state.users.forEach(function(items) {
  //   listResults += `
  //   `;
  //};
}
// BEST PRACTICE -- WORK ON LATER
// function showView(){
//     if (state.view = 'login') {
//       $('.login').removeAttr('hidden');
//       $('.main-list').attr('hidden', true);
//       $('.recs').attr('hidden', true);
//       console.log("STATE IS LOGIN");
//     } else if (state.view = 'main-list') {
//       $('.main-list').removeAttr('hidden');
//       $('.login').attr('hidden', true);
//       $('.recs').attr('hidden', true);
//     } else if (state.view = 'recs') {
//       $('.recs').removeAttr('hidden');
//       $('.login').attr('hidden', true);
//       $('.main-list').attr('hidden', true);
//     }
// }
    // $('.login').hide()
    // $('.main-list').hide()
    // $('.recs').hide()
    // $(`.${state.view}`).show();
//4 event listeners
function addUser() {
  $('#register-form').submit(function (e) {
    e.preventDefault();
    console.log('Hello');
    const url = '/api/signup';
    const username = $('#username-input').val();
    const password = $('#password-input').val();
    const email = $('#email-input').val();
    $.ajax({
      url,
      method: 'POST',
      //dataType: "json",
      data: { username, password, email },
    }).done(data => {
      state.users = data;
      console.log('STATE>>>>>>>>>>>>>>>>>>>> FROM ADDUSER', state);
       $('.main-list').removeAttr('hidden');
       $('.login').attr('hidden', true);
       $('.recs').attr('hidden', true);
      //console.log(state);
    });
  });
}
function addListToState() {
  $('#query-form').submit(function (e) {
    e.preventDefault();
    console.log('Hello from Query Form');
    const userID = state.users._id;
    const url = `/api/users/${userID}/list`;
    const name = $('#query-form').val();
    $.ajax({
      url,
      method: 'POST',
      //dataType: "json",
      data: { name },
    }).done(data => {
      state.users.myList = data;
      //console.log(state);
    });
  });
}
$('#query-form').submit(function (e) {
  e.preventDefault();
  const url = '/api/users/list/';
  let query = $('#query').val();
  $.ajax({
    url,
    method: 'POST',
    //dataType: "json",
    data: {
      name: query
    },
  }).done(data => {
    state.users.myList = data;
    console.log('STATE>>>>>>>>>>>>> FROM QUERY', state);
    if (state.users.myList !== undefined && state.users.myList.Similar.Results.length === 0) {
      $('.correction').removeAttr('hidden');
      query = $('#query').val('');
    } else {
      let listArray =
        `<p> ${data.Similar.Info[0].Name} </p>
        <button type="button" class="rec-button">Rex for ${data.Similar.Info[0]
    .Name} </button>`;
      $('.correction').attr('hidden', true);
      $('#list-results').append(listArray);
      query = $('#query').val('');
    }
  });
});
function populateRecs() {
}
function recHandler() {
  $('#list-results').on('click', '.rec-button', function () {
    //console.log(e.target);
    const url = '/api/recommendations/';
    //const similar = state.view.ListResults.Similar.Results;
    $.ajax({
      url,
      method: 'POST',
      //dataType: "json",
      //data: { similar },
    }).done(() => {
      const results = state.users.myList.Similar.Results;
      $('.recs').html(
        `<h2 class="recs-title">My-Rex for ${state.users.myList.Similar.Info[0].Name}</h2>
        <button id="back">Go back to Your List</button>`);
      console.log('RESULTS ARRAY FROM RECHANDLER: ', state.users.myList.Similar.Results);
      for (let i = 1; i < results.length; i++) {
        const name = results[i].Name;
        const type = results[i].Type;
        let recArray = `<p>${name}</p>
                      <p>${type}</p>`;
        $('.recs').append(recArray);
        $('.recs').removeAttr('hidden');
       $('.login').attr('hidden', true);
       $('.main-list').attr('hidden', true);
      }
    });
  });
}
function backClickHandler() {
  $('.recs').on('click', '#back', function() {
     $('.main-list').removeAttr('hidden');
       $('.login').attr('hidden', true);
       $('.recs').attr('hidden', true);
       console.log('back was clicked!!!!!');
  })
}
$(function () {
  recHandler(state);
  backClickHandler();
  render(state);
  addUser();
});