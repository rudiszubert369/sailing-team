<?php
if(!function_exists('generate_module_footer')){
	function generate_module_footer(){
		//Bootstrap
		ob_start();

		//Template
		?>

		<footer class="footer">

		</footer>

		<?php
		//Output
		return ob_get_clean();
	}
}
?>