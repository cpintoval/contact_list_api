//This is an object literal which is going to hold all of my event handlers
//and callback functions.
var handlers = {

  getContacts: function() {
    $.getJSON('/contacts', handlers.processContacts);
  },

  processContacts: function(data) {
    var table = $('#contacts').find('tbody').empty();
    $.each(data, function(index, contact) {
      var tr = $('<tr>').appendTo(table);
      $('<td>').text(contact.firstname).appendTo(tr);
      $('<td>').text(contact.lastname).appendTo(tr);
      $('<td>').text(contact.email).appendTo(tr);
    });
    $('#results').removeClass('hide');
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
  }
};

// Function that assigns the button to its specific handler.
$(function() {
  $('#getContacts').on('click', handlers.getContacts);
  $('#createContact').on('click', handlers.addContact);
});