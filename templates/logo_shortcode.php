<?php
    function yvLogo($atts) {
    	$image = get_field('logo', 'option');
        $alt = $image['alt'];
        $size = 'thumbnail';
    	$thumb = $image['sizes'][ $size ];
        ?>
        	<a href="<?= get_home_url(); ?>" style="display:block; max-width: 161px;">
            	<img src="<?= $thumb; ?>" alt="<?= $alt; ?>" style="display:block; width:100%; height:auto;"/>
            </a>
		<?php
    }

    add_shortcode('yvLogo', 'yvLogo');
?>