document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  
  // Send email
  document.querySelector('form').addEventListener('submit', sendEmail);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = 
    `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Print emails
  createClickableTable(mailbox)
}

function openEmail(id) {
  const detail = document.createElement('div');
  fetch(`/emails/${id}`).then(response => response.json()).then(emailDetail =>{
    detail.innerHTML = 
    `<b>From:</b> ${emailDetail.sender}<br/>
     <b>To:</b> ${emailDetail.recipients}<br/>
     <b>Subject:</b> ${emailDetail.subject}<br/>
     <b>Timestamp:</b> ${emailDetail.timestamp}<br/>
     <button class="btn btn-sm btn-outline-primary" id="reply">Reply</button>
     <hr>
     ${emailDetail.body}`;
  })
  document.querySelector('#emails-view').innerHTML = ``;
  document.querySelector('#emails-view').append(detail);
}

function createClickableTable (mailbox) {
  //Group emails
  const group = document.createElement('div');
  group.setAttribute('id','emails-list');
  
  // Get emails
  fetch(`/emails/${mailbox}`).then(response => response.json()).then(emails => {
    emails.forEach(email => {
      const row = document.createElement('div');
      row.setAttribute('data-id', email.id);
      row.setAttribute('style', 'border: solid');
      row.innerHTML = 
        ` <b>${email.sender}</b>
         ${email.subject}
         ${email.timestamp}`
      group.append(row);

      row.addEventListener('click', () => openEmail(`${email.id}`));
    });
  });
  document.querySelector('#emails-view').append(group);
}

function sendEmail() {
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;
  
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
    })
  }).then(response => response.json()).then(result => {
      // Print result
      load_mailbox('sent');
  });
}

