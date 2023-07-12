<?php
get_header();

$is_elementor_theme_exist = function_exists( 'elementor_theme_do_location' );


if ( is_single() && 'post' == get_post_type() ) {
		if ( ! $is_elementor_theme_exist || ! elementor_theme_do_location( 'single' ) ) {
			
		while ( have_posts() ) : the_post();
	?>

		<main id="main" class="site-main" role="main">

			<header class="page-header" style="display: none !important;">
				<h1 class="entry-title"><?php the_title(); ?></h1>
			</header>

			<div class="page-content">
				<?php the_content(); ?>
			</div>

		</main>

		<?php endwhile;
	}
} else {
	?>
		<main id="main" class="site-main" role="main">

			<header class="page-header" style="display: none !important;">
				<h1 class="entry-title"><?php the_title(); ?></h1>
			</header>

			<div class="page-content">
				<?php
					the_content();
				?>
			</div>
		</main>
	<?php
}


get_footer();
?>