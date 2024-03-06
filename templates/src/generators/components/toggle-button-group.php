<?php
/*
$buttons = [
    [
        'label' => 'Button Label',
        'active' => false,
    ], //Repeat for each button you need in the group
];
*/
if(!function_exists('generate_component_toggle_button_group')){
    function generate_component_toggle_button_group($data){

        // Bootstrap
        ob_start();
		// Template
        ?>
		
        <div class="toggle-button-group">
            <?php foreach ($data as $button): ?>
                <?php echo generate_component_button([
                    'style' => 'link',
					'tag' => 'button',
                    'label' => $button['label'],
					'class' => 'js-load-content__button--toggle' . ($button['active'] ? ' button--active' : ''),
                    'icon_right' => true,
                ]); ?>
            <?php endforeach; ?>
        </div>
        <?php
        // Output
        return ob_get_clean();
    }
}
?>