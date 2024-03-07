<?php
if(!function_exists('generate_module_text_content')){
	function generate_module_text_content(){
		//Bootstrap
		ob_start();

		//Template
		?>

		<section class="text-content">
			<div class="container">
				<div class="text-content__inner">
					<div class="text-content__top">
						<?php echo generate_component_headline([
							'label' => 'This is headline',
							'tag' => 'h2',
							'tag_class' => 'h2',
							'class' => 'text-content__headline'
						]); ?>
						<?php echo generate_component_headline([
							'label' => 'Subtitle goes here',
							'tag' => 'h5',
							'tag_class' => 'h5',
							'class' => 'text-content__subtitle'
						]); ?>
					</div>
					<p class="text-content__text copy">
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</br>
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
					</p>
				</div>
			</div>
		</section>

		<?php
		//Output
		return ob_get_clean();
	}
}
?>