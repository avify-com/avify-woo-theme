<section id="comments" class="comments-area">

	<?php if ( have_comments() ) : ?>
		<h3 class="title-comments">
			<span>
	<?php
	$comments_number = get_comments_number();
	if ( '1' === $comments_number ) {
		/* translators: %s: post title */
		printf( esc_html( _x( 'One Reply to &ldquo;%s&rdquo;', 'comments title', 'skelementor' ), (get_the_title()) ));
	} else {
		printf(
		esc_html(
		/* translators: 1: number of comments, 2: post title */
		_nx(
		'%1$s Reply to &ldquo;%2$s&rdquo;',
		'%1$s Replies to &ldquo;%2$s&rdquo;',
		$comments_number,
		'comments title',
		'skelementor'
		),
		number_format_i18n( $comments_number ),
		get_the_title()
		)
		);
	}
	?>
			</span>
		</h3>

	<?php the_comments_navigation(); ?>

	<ol class="comment-list">
		<?php
		wp_list_comments( array(
			'style'       => 'ol',
			'short_ping'  => true,
			'avatar_size' => 42,
		) );
		?>
	</ol><!-- .comment-list -->

	<?php the_comments_navigation(); ?>

<?php endif; // Check for have_comments(). ?>

<?php
// If comments are closed and there are comments, let's leave a little note, shall we?
if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
	?>
	<p class="no-comments"><?php esc_html(_e( 'Comments are closed.', 'skelementor' )); ?></p>
<?php endif; ?>

<?php
comment_form();
?>

</section><!-- .comments-area -->
