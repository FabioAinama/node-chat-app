var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    if (message.from === $('[name=username]').val())
        var li = $('<li class="myMessage"></li>');
    else
        var li = $('<li></li>');    
    console.log('New message: ', message);
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Cha',
//     text: 'Coucou'
//     console.log('Message received', data);
// });

socket.on('newLocationMessage', function(message) {
    console.log('Called');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function (event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: $('[name=username]').val() || 'User',
        text: $('[name=message]').val()
    }, function(data) {
        console.log('Message received', data);
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation)
        return alert('Sorry, geolocation not supported by your browser.')
    navigator.geolocation.getCurrentPosition(function(postion) {
        socket.emit('createLocationMessage', {
            latitude: postion.coords.latitude,
            longitude: postion.coords.longitude
        })
    }, function() {
        alert('Unable to fetch location.');
    });
});