<?php

require_once('twitter_proxy.php');

// Twitter OAuth Config options
$oauth_access_token = '2458218104-3OuDfbBLIpUjmQyP6OgNuLqGkJpAnCnjtDXxQGq';
$oauth_access_token_secret = 'TNOPssEBn5x96GMrUpbFMsWYZIktVwompsKgx8I8Oxm7t';
$consumer_key = '6rc9u0rc7qEH4nGDTP1ftz1Bi';
$consumer_secret = 'AQOiyKSf5p7KGuwrYKPg30pbNpd3DFQ07NApAsg1X3WgzNpbzP';
$user_id = '2458218104';
$screen_name = 'AlbinMartinsson';
$count = 5;

$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?user_id=' . $user_id;
$twitter_url .= '&screen_name=' . $screen_name;
$twitter_url .= '&count=' . $count;

// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$user_id,						// User id (http://gettwitterid.com/)
	$screen_name,					// Twitter handle
	$count							// The number of tweets to pull out
);

// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);

echo $tweets;

?>
