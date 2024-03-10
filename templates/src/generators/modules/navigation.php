<?php
if(!function_exists('generate_module_navigation')){
	function generate_module_navigation(){
		//Bootstrap
		ob_start();

		//Template
		?>

		<nav class="navigation" data-component='{ "component": "navigation" }'>
			<div class="container">
				<div class="navigation__inner">
					<a href="#" class="navigation__logo">
						<img class="navigation__logo__image" src="/assets/images/logo.svg" alt="Segelteam">
					</a>

					<div class="navigation__main">
						<ul class="navigation__links">
							<li>
								<a class="navigation__links__item label color-light" href="#about">About us</a>
							</li>
							<li>
								<a class="navigation__links__item label color-light" href="#">Gallery</a>
							</li>
							<li>
								<a class="navigation__links__item label color-light" href="#crew">Crew</a>
							</li>
						</ul>
						
						<?php echo generate_component_button([
							'label' => 'Contact',
							'class' => 'navigation__button',
							'icon' => 'arrow-right',
							'icon_type' => 'symbol',
							'icon_right' => true,
							'href' => '#contact',
						]) ?>
					</div>

					<div class="navigation__mobile-toggle js-navigation__mobile-toggle">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		</nav>

		<?php
		//Output
		return ob_get_clean();
	}
}
?>