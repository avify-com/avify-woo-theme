<?php
get_header();

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

get_footer();
?>