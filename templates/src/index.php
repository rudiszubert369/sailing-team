<?php 
$root_path = $_SERVER['DOCUMENT_ROOT'];
include($root_path . '/partials/head.php');

$team_config = [
    'url' => 'https://challenge-api.view.agentur-loop.com/api/',
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
