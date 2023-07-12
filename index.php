<?php
get_header();

$is_elementor_theme_exist = function_exists( 'elementor_theme_do_location' );

if ( is_singular() ) {
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
} elseif ( is_archive() || is_home() || is_search() ) {
	if ( ! $is_elementor_theme_exist || ! elementor_theme_do_location( 'archive' ) ) {
?>

<main id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<header class="page-header">
		<h1 class="entry-title"><?php the_archive_title(); ?></h1>
	</header>

	<div class="page-content">
		<?php
		while ( have_posts() ) : the_post();
			printf( '<h1><a href="%s">%s</a></h1>', get_permalink(), get_the_title() );		
			the_post_thumbnail();
			the_excerpt();
			comments_template();
		endwhile;

		the_tags( '<span class="tag-links">' . __('Tagged ', 'skelementor' ) . NULL, NULL, NULL, '</span>' ) ?>		
		
	</div>
	
	<div class="entry-links"><?php wp_link_pages(); ?></div>
	
	<?php global $wp_query; if ( $wp_query->max_num_pages > 1 ) { ?>
	<nav id="nav-below" class="navigation" role="navigation">
		<div class="nav-previous"><?php next_posts_link(sprintf( __( '%s older', 'skelementor' ), '<span class="meta-nav">&larr;</span>' ) ) ?></div>
		<div class="nav-next"><?php previous_posts_link(sprintf( __( 'newer %s', 'skelementor' ), '<span class="meta-nav">&rarr;</span>' ) ) ?></div>
	</nav>
	<?php } ?>

</main>

<?php
	}
} else {
	if ( ! $is_elementor_theme_exist || ! elementor_theme_do_location( 'single' ) ) {
		?>
		
<main id="main" class="site-main" role="main">

	<header class="page-header">
		<h1 class="entry-title"><?php _e( 'The page cannot be found.', 'skelementor' ); ?></h1>
	</header>

	<div class="page-content">
		<p><?php _e( 'Sorry, nothing found at this location.', 'skelementor' ); ?></p>
	</div>

</main>
<?php
	}
}
get_footer();