//This is an object literal which is going to hold all of my event handlers
//and callback functions.
var handlers = {

  getContacts: function(query) {
    $.getJSON('/contacts', {query: query}, handlers.processContacts);
  },

  processContacts: function(data) {
    var table = $('#contacts').find('tbody').empty();
    $.each(data, function(index, contact) {
      var tr = $('<tr>').addClass('contact').attr('id', contact.id).appendTo(table);
      $('<td>').text(contact.firstname + " " + contact.lastname).appendTo(tr);
      // $('<td>').text(contact.lastname).appendTo(tr);
      // $('<td>').text(contact.email).appendTo(tr);
    });
  },

  addContact: function(event) {
    // event.preventDefault();
    var newContact = {
      firstname: $('#firstname').val(),
      lastname: $('#lastname').val(),
      email: $('#email').val()
    };
    $.post('/contacts/create', newContact, handlers.addedContact, 'json');
  },

  addedContact: function(data) {
    if (data.result) {
      handlers.getContacts();
    }
    else {
      alert("There was an error.");
    }
  },

  searchContact: function(event) {
    event.preventDefault();
    var query = $('#query').val();
    handlers.getContacts(query);
  },

  clickContact: function() {
    $.getJSON('/contacts/' + $(this).attr('id'), handlers.showContact);
  },

  showContact: function(data) {
    if (data.result) {
      var contact = data.contact;
      $('#fullname').text(contact.firstname + ' ' + contact.lastname);
      $('#email').text(contact.email);
      $('#details').removeClass('hide');
    }
    else {
      alert("Contact not found on the database.");
    }
  }
};

// Function that assigns the button to its specific handler.
$(function() {
  // $('#getContacts').on('click', handlers.getContacts);
  handlers.getContacts();
  $('#createContact').on('click', handlers.addContact);
  $('#searchContact').on('click', handlers.searchContact);
  $(document).on('click', '.contact',handlers.clickContact);
});