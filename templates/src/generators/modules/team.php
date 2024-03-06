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
			['label'=> '1','active'=> false],
			['label'=> '2','active'=> true],
			['label'=> '3','active'=> false],
		]

		//Template
		?>

		<section class="team" data-component='{"component": "load-content"}' data-url="<?= $url; ?>">
			<?php echo generate_component_headline([
					'label' => 'Unser team',
					'tag' => 'h2',
					'tag_class' => 'h2',
					'class' => 'team__headline'
				]); ?>
			<?php echo generate_component_headline([
				'label' => 'Subtitle goes here',
				'tag' => 'h5',
				'tag_class' => 'h5',
				'class' => 'team__subtitle'
			]); ?>
			<div class="team__content" data-component='{"component": "grid-column-control"}'>
				<div class="team__filter-control js-load-data--filter-control">
					<?php echo generate_component_toggle_button_group($buttons_filters) ?>
				</div>
				
				<div class="js-load-content__result"></div>
				<div class="team__grid-control js-grid-column-control">
					<?php echo generate_component_toggle_button_group($buttons_grid_options) ?>
				</div>
				<?php echo generate_component_button([
					'label' => 'Load more',
					'class' => 'js-load-content__button--load-more',
				]) ?>

			</div>
		</section>

		<?php
		//Output
		return ob_get_clean();
	}
}
?>