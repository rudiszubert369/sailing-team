<?php
if(!function_exists('generate_module_footer')){
	function generate_module_footer(){
		//Bootstrap
		ob_start();

		$links = [
			['label' => 'About us', 'href'=> '#'],
			['label' => 'Impressum', 'href'=> '#'],
			['label' => 'Gallery', 'href'=> '#'],
			['label' => 'Datenschutz', 'href'=> '#'],
			['label' => 'Crew', 'href'=> '#crew'],
			['label' => 'Rechtliches', 'href'=> '#'],
			['label' => 'Contact', 'href'=> '#contact'],
			['label' => 'Copyright', 'href'=> '#'],
        ];

		//Template
		?>

		<footer class="footer" id="contact">
			<div class="footer__logo-container">
				<a href="#" class="footer__logo-container__logo">
					<img class="footer__logo-container__logo__image" src="/assets/images/logo.svg" alt="Segelteam logo">
				</a>
				<p class="color-light">© 2023. Segel-Team. Alle Rechte vorbehalten</p>
			</div>
			<div class="footer__navigation">
				<ul class="footer__navigation__links container--small">
					<?php foreach ($links as $link): ?>
						<li>
							<a class="footer__navigation__links__item color-light" href="<?php echo $link['href']; ?>">
								<?php echo $link['label']; ?>
							</a>
						</li>
					<?php endforeach; ?>
				</ul>
				<ul class="footer__navigation__socials container--small">
					<li class="footer__navigation__socials__item">
						<a href="#">
							<img class="footer__navigation__socials__item__image" alt="Facebook logo" src="/assets/icons/inline/facebook.svg">
						</a>
					</li>
					<li class="footer__navigation__socials__item">
						<a href="#">
							<img class="footer__navigation__socials__item__image" alt="Facebook logo" src="/assets/icons/inline/twitter.svg">
						</a>
					</li>
					<li class="footer__navigation__socials__item">
						<a href="#">
							<img class="footer__navigation__socials__item__image" alt="Facebook logo" src="/assets/icons/inline/instagram.svg">
						</a>
					</li>
					<li class="footer__navigation__socials__item">
						<a href="#">
							<img class="footer__navigation__socials__item__image" alt="Facebook logo" src="/assets/icons/inline/youtube.svg">
						</a>
					</li>
				</ul>
			</div>
		</footer>

		<?php
		//Output
		return ob_get_clean();
	}
}
?>