<?php
if(!function_exists('generate_module_visual')){
	function generate_module_visual(){
		//Bootstrap
		ob_start();

		//Template
		?>

		<section class="visual">
			<div class="container">
				<div class="visual__inner">
					<div class="visual__visual">
						<?php echo generate_component_image([
							'sources' => [
								[
									'src' => '/assets/images/visual.jpg',
									'width' => 810,
								],
							],
							'class' => 'visual__visual__image',
						]); ?>
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