<?php 
$root_path = $_SERVER['DOCUMENT_ROOT'];
include($root_path . '/partials/head.php');

// For static development purposes, it's using a hardcoded 'team_config' array here. For production
// scenario, consult with the backend team to use getenv('API_URL') and getenv('API_TOKEN').
$team_config = [
    'url' => 'https://challenge-api.view.agentur-loop.com/api/',
	'token' => '0123456789',
];

$moduleFunctions = [
    'navigation' => 'generate_module_navigation',
    'hero' => 'generate_module_hero',
    'textContent' => 'generate_module_text_content',
    'visual' => 'generate_module_visual',
    'team' => function() use ($team_config) {
        return generate_module_team($team_config);
    },
    'footer' => 'generate_module_footer',
];

foreach ($moduleFunctions as $function) {
    echo is_callable($function) ? $function() : $function;
}

include($root_path . '/partials/foot.php');
