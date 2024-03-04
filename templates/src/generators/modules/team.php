<?php
/*
$data = [
		'url' => '',
];
*/

if(!function_exists('generate_module_team')){
	function generate_module_team($config){
		// Settings
		$data_defaults = [
			'url' => null,
		];

		//Bootstrap
		extract(array_merge($data_defaults, $config));
		ob_start();

		//Template
		?>

		<section class="team" data-component='{"component": "load-content"}' data-url="<?= $url; ?>">
			<div class="js-load-content__result"></div>
			<?php echo generate_component_button([
				'label' => 'Load more',
				'class' => 'js-load-content__button',
			]) ?>
		</section>

		<?php
		//Output
		return ob_get_clean();
	}
}
?>