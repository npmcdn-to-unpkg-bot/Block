$(function(){

	$.ajax({
		url: 'get_tweets.php',
		type: 'GET',
		success: function(response) {
			console.log(response);
			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				var $tweets = $('<ul></ul>');
				$.each(response, function(i, obj) {
					$tweets.append('<li>' + obj.text + '</li>');
					console.log(obj.text);
					responsiveVoice.speak(obj.text);
				});

				$('.tweets-container').html($tweets);

				responsiveVoice.OnVoiceReady = function() {
					  console.log(obj.text);
					  responsiveVoice.speak($tweets);
					};

			} else {
				$('.tweets-container p:first').text('Response error');
			}
		},
		error: function(errors) {
			$('.tweets-container p:first').text('Request error');
		}
	});
});