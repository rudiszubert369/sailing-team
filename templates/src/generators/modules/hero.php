<?php
if(!function_exists('generate_module_hero')){
	function generate_module_hero(){
		//Bootstrap
		ob_start();

		//Template
		?>

		<section class="hero">
			<div class="hero__main">
				<div class="hero__visual">
					<?php echo generate_component_image([
						'sources' => [
							[
								'src' => '/assets/images/hero.jpg',
								'width' => 1920,
							]
						],
						'alt' => 'Segeln',
						'class' => 'hero__visual__image',
					]) ?>
				</div>
				<div class="hero__inner container">
					<div class="hero__inner__content">
						<?php echo generate_component_headline([
							'label' => 'This is headline',
							'tag' => 'h1',
							'tag_class' => 'h1',
							'class' => 'hero__headline color-light'
						]); ?>
						<div class="hero__text copy color-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus massa est scelerisque penatibus. </div>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="hero__teasers">
					<?php for($i = 0; $i < 3; $i++) {
						$style = null;
						$illustration = null;
						$text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

						if($i == 1) $style = 'black';
						if ($i == 2) {
							$illustration = '/assets/images/map.svg';
							$text .= ' Tempus massa est scelerisque penatibus.';
						}

						echo generate_component_teaser([
							'style' => $style,
							'illustration' => $illustration,
							'uptitle' => '17 Mai',
							'headline' => [
								'label' => 'Headline beitrag 2021',
								'tag' => 'h2',
								'tag_class' => $i < 2 ? 'h5' : 'h3',
							],
							'subtitle' => 'Subtitle',
							'text' => $text,
						]);
					} ?>
				</div>
			</div>
		</section>

		<?php
		//Output
		return ob_get_clean();
	}
}
?>