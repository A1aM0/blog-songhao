
// convert markdown to HTML
$('#blogForm').submit(function () {
    if ($('#blogType').val() == 'note') {
        $('#newBlogBody').html(marked($('#newBlogBody').text()));
        $('#typeErr').show().fadeOut(500);
        return true;
    } else if ($('#blogType').val() == 'gossip') {
        $('#newBlogBody').html(marked($('#newBlogBody').text()));
        $('#typeErr').show().fadeOut(500);
        return true;
    } else {
        $('#typeErr').show().fadeIn(500);
        return false;
    }
});

setInterval(function () {
    $('#localTime').html(new Date().toLocaleTimeString());
}, 1000);
