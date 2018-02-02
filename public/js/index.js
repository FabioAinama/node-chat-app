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
    var formattedTime = moment(message.createdAt).format('H:mm');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
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
    var formattedTime = moment(message.createdAt).format('H:mm');    
    li.text(`${message.from}  ${formattedTime}: `);
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
        $('[name=message]').val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation)
        return alert('Sorry, geolocation not supported by your browser.')

    locationButton.attr('disabled', 'disabled').text('Sending location');

    navigator.geolocation.getCurrentPosition(function(postion) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: postion.coords.latitude,
            longitude: postion.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');        
        alert('Unable to fetch location.');
    });
});