<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>

	<!-- STYLES -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Open+Sans:wght@400;500l;600;700&display=swap" rel="stylesheet">

	<link type="text/css" rel="stylesheet" href="<?php bloginfo('template_url'); ?>/assets/css/reset.css">

	<link type="text/css" rel="stylesheet" href="<?php bloginfo('template_url'); ?>/assets/css/g__text.css">
	<link type="text/css" rel="stylesheet" href="<?php bloginfo('template_url'); ?>/assets/css/style.css?v=2.0.0">
	<!-- STYLES END -->
</head>
<body <?php body_class(); ?>>

	<script>
		var turnOffAnimationOption = "<?= get_field('turn_off_animation', 'option'); ?>";
	</script>

<?php
if ( function_exists( 'wp_body_open' ) ) {
    wp_body_open();
}
?>

<style>
	
</style>

<style>
	body > .loader {
		background-color: #ffffff;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 333;
	}

	body > .loader > *,
	body > .loader:before,
	body > .loader:after {
		display: none !important;
	}
</style>

<div class="loader"></div>

<!-- <div class="yv-top-info">
	<div class="wrapper">
		<div class="content">
			<div class="el-text">
				<div class="g__text type-1">
					Promoción de envío gratis solo por esta semana en todas las compras superiores a $1000 MX
				</div>
			</div>
		</div>
	</div>
</div>

<div class="yv-header">
	<div class="wrapper">
		<div class="content">
			<div class="block-list flex space-between middle">
				<div class="block-item block-item-1">
					<div class="block-item-inner flex middle">
						<div class="el-logo">
							<div class="g__image">
								<?= get_image_by_obj(get_field('logo', 'option'), 'preview', ''); ?>
							</div>
						</div>

						<div class="el-nav">
							<ul>
								<li>
									<a href="#">
										Inicio
									</a>
								</li>

								<li>
									<a href="#">
										Productos
									</a>
								</li>

								<li>
									<a href="#">
										Acerca de
									</a>
								</li>

								<li>
									<a href="#">
										Blog
									</a>
								</li>

								<li>
									<a href="#">
										Contacto
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="block-item block-item-2">
					<div class="block-item-inner flex middle">
						<div class="el-search">
							<div class="g__form type-search">
								<div class="g__form-row">
									<div class="g__form-input">
										<div class="g__form-input-inner">
											<input type="search">
										</div>
									</div>

									<div class="g__form-input type-button">
										<div class="g__form-input-inner">
											<div class="el-search-icon">
												<div class="g__image">
													<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M11.7419 10.344C12.7102 9.02267 13.1439 7.38447 12.9562 5.75713C12.7685 4.12979 11.9733 2.63332 10.7297 1.56711C9.48604 0.500899 7.88567 -0.056418 6.24876 0.00665514C4.61184 0.0697283 3.05911 0.748541 1.90119 1.90729C0.743273 3.06603 0.0655718 4.61926 0.00366997 6.25621C-0.0582319 7.89317 0.500231 9.49314 1.56733 10.736C2.63443 11.9789 4.13147 12.773 5.75894 12.9596C7.38641 13.1461 9.0243 12.7112 10.3449 11.742H10.3439C10.3739 11.782 10.4059 11.82 10.4419 11.857L14.2919 15.707C14.4794 15.8946 14.7338 16.0001 14.9991 16.0002C15.2643 16.0003 15.5188 15.895 15.7064 15.7075C15.8941 15.52 15.9995 15.2656 15.9996 15.0003C15.9997 14.7351 15.8944 14.4806 15.7069 14.293L11.8569 10.443C11.8212 10.4068 11.7827 10.3734 11.7419 10.343V10.344ZM11.9999 6.49998C11.9999 7.22225 11.8577 7.93745 11.5813 8.60474C11.3049 9.27203 10.8997 9.87834 10.389 10.3891C9.87829 10.8998 9.27197 11.3049 8.60468 11.5813C7.93739 11.8577 7.22219 12 6.49992 12C5.77765 12 5.06245 11.8577 4.39516 11.5813C3.72787 11.3049 3.12156 10.8998 2.61083 10.3891C2.10011 9.87834 1.69498 9.27203 1.41858 8.60474C1.14218 7.93745 0.999921 7.22225 0.999921 6.49998C0.999921 5.04129 1.57938 3.64234 2.61083 2.61089C3.64228 1.57944 5.04123 0.999979 6.49992 0.999979C7.95861 0.999979 9.35756 1.57944 10.389 2.61089C11.4205 3.64234 11.9999 5.04129 11.9999 6.49998Z" fill="#525245"/>
													</svg>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="el-account-button">
							<div class="g__button type-round">
								<div class="g__button-inner">
	                                <div class="g__button-frame"></div>

									<div class="g__button-icon">
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clip-path="url(#clip0_3_1618)">
										<path d="M13.75 7.5C13.75 8.49456 13.3549 9.44839 12.6517 10.1517C11.9484 10.8549 10.9946 11.25 10 11.25C9.00544 11.25 8.05161 10.8549 7.34835 10.1517C6.64509 9.44839 6.25 8.49456 6.25 7.5C6.25 6.50544 6.64509 5.55161 7.34835 4.84835C8.05161 4.14509 9.00544 3.75 10 3.75C10.9946 3.75 11.9484 4.14509 12.6517 4.84835C13.3549 5.55161 13.75 6.50544 13.75 7.5V7.5Z" fill="#525245"/>
										<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10V10ZM10 1.25C8.35222 1.25009 6.73796 1.71545 5.343 2.59253C3.94805 3.46962 2.8291 4.72276 2.11496 6.20774C1.40081 7.69272 1.12048 9.34917 1.30625 10.9864C1.49201 12.6237 2.13632 14.1753 3.165 15.4625C4.0525 14.0325 6.00625 12.5 10 12.5C13.9937 12.5 15.9463 14.0312 16.835 15.4625C17.8637 14.1753 18.508 12.6237 18.6938 10.9864C18.8795 9.34917 18.5992 7.69272 17.885 6.20774C17.1709 4.72276 16.052 3.46962 14.657 2.59253C13.262 1.71545 11.6478 1.25009 10 1.25V1.25Z" fill="#525245"/>
										</g>
										<defs>
										<clipPath id="clip0_3_1618">
										<rect width="20" height="20" fill="white"/>
										</clipPath>
										</defs>
										</svg>
									</div>
								</div>
							</div>
						</div>

						<div class="el-cart-button">
							<div class="g__button type-round">
								<div class="g__button-inner">
	                                <div class="g__button-frame"></div>

									<div class="g__button-icon">
										<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 0.875C0 0.70924 0.065848 0.550268 0.183058 0.433058C0.300269 0.315848 0.45924 0.25 0.625 0.25H2.5C2.63941 0.250039 2.77481 0.296688 2.88466 0.382531C2.99452 0.468373 3.07251 0.58848 3.10625 0.72375L3.6125 2.75H18.125C18.2168 2.75008 18.3074 2.77038 18.3904 2.80944C18.4735 2.8485 18.5469 2.90537 18.6055 2.976C18.6641 3.04664 18.7064 3.12931 18.7294 3.21815C18.7524 3.30698 18.7556 3.3998 18.7388 3.49L16.8638 13.49C16.8369 13.6332 16.7609 13.7626 16.6489 13.8557C16.5368 13.9488 16.3957 13.9999 16.25 14H5C4.85429 13.9999 4.71321 13.9488 4.60114 13.8557C4.48907 13.7626 4.41306 13.6332 4.38625 13.49L2.5125 3.50875L2.0125 1.5H0.625C0.45924 1.5 0.300269 1.43415 0.183058 1.31694C0.065848 1.19973 0 1.04076 0 0.875ZM3.8775 4L5.51875 12.75H15.7313L17.3725 4H3.8775ZM6.25 14C5.58696 14 4.95107 14.2634 4.48223 14.7322C4.01339 15.2011 3.75 15.837 3.75 16.5C3.75 17.163 4.01339 17.7989 4.48223 18.2678C4.95107 18.7366 5.58696 19 6.25 19C6.91304 19 7.54893 18.7366 8.01777 18.2678C8.48661 17.7989 8.75 17.163 8.75 16.5C8.75 15.837 8.48661 15.2011 8.01777 14.7322C7.54893 14.2634 6.91304 14 6.25 14ZM15 14C14.337 14 13.7011 14.2634 13.2322 14.7322C12.7634 15.2011 12.5 15.837 12.5 16.5C12.5 17.163 12.7634 17.7989 13.2322 18.2678C13.7011 18.7366 14.337 19 15 19C15.663 19 16.2989 18.7366 16.7678 18.2678C17.2366 17.7989 17.5 17.163 17.5 16.5C17.5 15.837 17.2366 15.2011 16.7678 14.7322C16.2989 14.2634 15.663 14 15 14ZM6.25 15.25C6.58152 15.25 6.89946 15.3817 7.13388 15.6161C7.3683 15.8505 7.5 16.1685 7.5 16.5C7.5 16.8315 7.3683 17.1495 7.13388 17.3839C6.89946 17.6183 6.58152 17.75 6.25 17.75C5.91848 17.75 5.60054 17.6183 5.36612 17.3839C5.1317 17.1495 5 16.8315 5 16.5C5 16.1685 5.1317 15.8505 5.36612 15.6161C5.60054 15.3817 5.91848 15.25 6.25 15.25ZM15 15.25C15.3315 15.25 15.6495 15.3817 15.8839 15.6161C16.1183 15.8505 16.25 16.1685 16.25 16.5C16.25 16.8315 16.1183 17.1495 15.8839 17.3839C15.6495 17.6183 15.3315 17.75 15 17.75C14.6685 17.75 14.3505 17.6183 14.1161 17.3839C13.8817 17.1495 13.75 16.8315 13.75 16.5C13.75 16.1685 13.8817 15.8505 14.1161 15.6161C14.3505 15.3817 14.6685 15.25 15 15.25V15.25Z" fill="#494F53"/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div> -->

<div class="main-menu">
	<div class="g__background"></div>
	
    <div class="el-burger">
								<div class="g__burger">
									<div class="g__burger-line-list-outer">
										<div class="g__burger-line-list">
											<div class="g__burger-line-item-outer g__burger-line-item-outer-1">
												<div class="g__burger-line-item g__burger-line-item-1"></div>
											</div>

											<div class="g__burger-line-item-outer g__burger-line-item-outer-2">
												<div class="g__burger-line-item g__burger-line-item-2"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
    
	<div class="wrapper">
		<div class="content">
			<div class="part-list-outer">
				<div class="part-list">
					<div class="part-top">
						<div class="el-account">
							<a href="<?php echo get_permalink( get_option('woocommerce_myaccount_page_id') ); ?>">
								<svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g filter="url(#filter0_d_85_20441)">
								<circle cx="32.5" cy="32.5" r="22.5" fill="white"/>
								</g>
								<g clip-path="url(#clip0_85_20441)">
								<path d="M36.75 30.5C36.75 31.4946 36.3549 32.4484 35.6517 33.1517C34.9484 33.8549 33.9946 34.25 33 34.25C32.0054 34.25 31.0516 33.8549 30.3483 33.1517C29.6451 32.4484 29.25 31.4946 29.25 30.5C29.25 29.5054 29.6451 28.5516 30.3483 27.8483C31.0516 27.1451 32.0054 26.75 33 26.75C33.9946 26.75 34.9484 27.1451 35.6517 27.8483C36.3549 28.5516 36.75 29.5054 36.75 30.5Z" fill="#525245"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M23 33C23 30.3478 24.0536 27.8043 25.9289 25.9289C27.8043 24.0536 30.3478 23 33 23C35.6522 23 38.1957 24.0536 40.0711 25.9289C41.9464 27.8043 43 30.3478 43 33C43 35.6522 41.9464 38.1957 40.0711 40.0711C38.1957 41.9464 35.6522 43 33 43C30.3478 43 27.8043 41.9464 25.9289 40.0711C24.0536 38.1957 23 35.6522 23 33ZM33 24.25C31.3522 24.2501 29.738 24.7155 28.343 25.5925C26.948 26.4696 25.8291 27.7228 25.115 29.2077C24.4008 30.6927 24.1205 32.3492 24.3062 33.9864C24.492 35.6237 25.1363 37.1753 26.165 38.4625C27.0525 37.0325 29.0062 35.5 33 35.5C36.9937 35.5 38.9463 37.0312 39.835 38.4625C40.8637 37.1753 41.508 35.6237 41.6938 33.9864C41.8795 32.3492 41.5992 30.6927 40.885 29.2077C40.1709 27.7228 39.052 26.4696 37.657 25.5925C36.262 24.7155 34.6478 24.2501 33 24.25Z" fill="#525245"/>
								</g>
								<defs>
								<filter id="filter0_d_85_20441" x="0" y="0" width="65" height="65" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
								<feFlood flood-opacity="0" result="BackgroundImageFix"/>
								<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
								<feOffset/>
								<feGaussianBlur stdDeviation="5"/>
								<feComposite in2="hardAlpha" operator="out"/>
								<feColorMatrix type="matrix" values="0 0 0 0 0.423529 0 0 0 0 0.447059 0 0 0 0 0.498039 0 0 0 0.13 0"/>
								<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_85_2044"/>
								<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_85_2044" result="shape"/>
								</filter>
								<clipPath id="clip0_85_20441">
								<rect width="20" height="20" fill="white" transform="translate(23 23)"/>
								</clipPath>
								</defs>
								</svg>
							</a>
						</div>

						<div class="el-menu">
							<?php
								$args = array(
									'theme_location'  => '',
									'menu'            => '', 
									'container'       => '', 
									'container_class' => '', 
									'theme_location'  => 'main-menu', 
									'container_id'    => '',
									'menu_class'      => '', 
									'menu_id'         => '',
									'echo'            => true,
									'fallback_cb'     => 'wp_page_menu',
									'before'          => '',
									'after'           => '',
									'link_before'     => '',
									'link_after'      => '',
									'items_wrap'      => '<ul>%3$s</ul>',
									'depth'           => 0
								);

								wp_nav_menu($args);
							?>
						</div>
					</div>
				</div>	
			</div>				
		</div>
	</div>
</div>


<div class="elementor-native-header">
	<?php
	if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'header' ) ) {
		?>
		
	<header id="site-header" class="site-header" role="banner">

		<div id="logo">
			<?php the_custom_logo(); ?>
		</div>
		
		
		
		<?php if (display_header_text()) : ?>
		<h1 class="site-title">
			<a href="<?php echo esc_attr( home_url( '/' ) ); ?>" title="Home" rel="home">
			<?php echo esc_html( get_bloginfo( 'name' ) ); ?>
			</a>
		</h1>
		<p class="tagline"><?php bloginfo('description'); ?></p>	
		
		<?php endif; ?>	
		
		
		<nav>
		<?php
		$args = array( 'theme_location' => 'main-menu' );
		wp_nav_menu( $args );
		?>
		</nav>

	</header>

	<?php
	}
	?>
</div>

<?php