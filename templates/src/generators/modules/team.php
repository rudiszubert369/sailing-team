<?php
/*
$data = [
		'url' => '',
];
*/
if(!function_exists('generate_module_team')){
	function generate_module_team($data){
		// Settings
		$data_defaults = [
			'url' => null,
		];
		
		//Bootstrap
		ob_start();

		extract(array_merge($data_defaults, $data));

		$buttons_filters = [
            ['label' => 'Show all', 'active' => true],
            ['label' => 'Trim', 'active' => false],
            ['label' => 'Tactic', 'active' => false],
            ['label' => 'Helmsman', 'active' => false],
        ];

		$buttons_grid_options = [
			['label'=> '1', 'active'=> false, 'mobile_only' => true],
			['label'=> '2', 'active'=> false, 'mobile_only' => true],//TODO daj temu tez aktive i na inicie grid column control niech sprawdza czy jest mobiel czy desktop i w zaleznosi dodaje no i przy breakpoincie niech to jeszcze raz zrobi
			['label'=> '3', 'active'=> false, 'mobile_only' => true],
			['label'=> '4', 'active'=> false, 'mobile_only' => false],
			['label'=> '5', 'active'=> true, 'mobile_only' => false],
			['label'=> '6', 'active'=> false, 'mobile_only' => false],
		]

		//Template
		?>

		<section class="team" id="crew" data-component='{"component": "load-content"}' data-url="<?= $url; ?>">
			<div class="team__inner" data-component='{"component": "grid-column-control"}'>
				<div class="container team__top">
					<div>
						<?php echo generate_component_headline([
								'label' => 'Unser team',
								'tag' => 'h2',
								'tag_class' => 'h2',
								'class' => 'team__headline color-light'
							]); ?>
						<?php echo generate_component_headline([
							'label' => 'Subtitle goes here',
							'tag' => 'h5',
							'tag_class' => 'h5',
							'class' => 'team__subtitle color-light'
						]); ?>
					</div>
					<div class="team__button-group__filter-control js-load-content__button-group">
						<?php echo generate_component_toggle_button_group($buttons_filters) ?>
					</div>
				</div>
				<div class="container container--hd container--no-padding">
					<div class="js-load-content__result team__results__grid"></div>
					<div class="team__button-group__grid-control js-grid-column-control__button-group">
						<?php echo generate_component_toggle_button_group($buttons_grid_options) ?>
					</div>
					<div class="team__button-container">
						<?php echo generate_component_button([
							'label' => 'Load more',
							'class' => 'js-load-content__button__load-more',
							'style' => 'primary-white',
						]) ?>
					</div>
				</div>
			</div>
		</section>

		<?php
		//Output
		return ob_get_clean();
	}
}
?>