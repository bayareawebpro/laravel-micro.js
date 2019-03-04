<?php
if(file_exists(realpath(__DIR__.'/hot'))){
	$url = 'http://localhost:8080';
}else{
	$url = '../';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="<?= $url; ?>/app.css"/>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
</head>
<body>
<div id="app"></div>
<script>window.chunkURL = '<?= $url; ?>/'</script>
<script src="<?= $url; ?>/manifest.js" defer></script>
<script src="<?= $url; ?>/vendor.js" defer></script>
<script src="<?= $url; ?>/app.js" defer></script>
</body>
</html>