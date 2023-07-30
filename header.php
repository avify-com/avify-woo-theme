<!doctype html>
<html <?php language_attributes(); ?> lang="">

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php wp_head(); ?>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
        :root {
            --color-black: #000000;
            --color-grey: #494F53;
            --color-grey-2: #626262;
            --color-grey-3: #484848;
            --color-dark: #000000;
            --color-red: #F2210A;
            --color-accent: #AC8138;
            --color-accent-2: #00543B;
        }
    </style>
    <link type="text/css" rel="stylesheet" href="<?php bloginfo('template_url'); ?>/assets/avify.css?v=2.0.7">
    <script type="module" src="<?php bloginfo('template_url'); ?>/assets/avify.js?v=2.0.7"></script>
    <title></title>
</head>

<body <?php body_class(); ?>>

<script>
    const turnOffAnimationOption = "<?= get_field('turn_off_animation', 'option'); ?>";
</script>

<?php
if (function_exists('wp_body_open')) {
    wp_body_open();
}
?>

<div class="loader"></div>

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
                            <a href="<?php echo get_permalink(get_option('woocommerce_myaccount_page_id')); ?>">
                                <svg width="65" height="65" viewBox="0 0 65 65" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_85_20441)">
                                        <circle cx="32.5" cy="32.5" r="22.5" fill="white"/>
                                    </g>
                                    <g clip-path="url(#clip0_85_20441)">
                                        <path d="M36.75 30.5C36.75 31.4946 36.3549 32.4484 35.6517 33.1517C34.9484 33.8549 33.9946 34.25 33 34.25C32.0054 34.25 31.0516 33.8549 30.3483 33.1517C29.6451 32.4484 29.25 31.4946 29.25 30.5C29.25 29.5054 29.6451 28.5516 30.3483 27.8483C31.0516 27.1451 32.0054 26.75 33 26.75C33.9946 26.75 34.9484 27.1451 35.6517 27.8483C36.3549 28.5516 36.75 29.5054 36.75 30.5Z"
                                              fill="#525245"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M23 33C23 30.3478 24.0536 27.8043 25.9289 25.9289C27.8043 24.0536 30.3478 23 33 23C35.6522 23 38.1957 24.0536 40.0711 25.9289C41.9464 27.8043 43 30.3478 43 33C43 35.6522 41.9464 38.1957 40.0711 40.0711C38.1957 41.9464 35.6522 43 33 43C30.3478 43 27.8043 41.9464 25.9289 40.0711C24.0536 38.1957 23 35.6522 23 33ZM33 24.25C31.3522 24.2501 29.738 24.7155 28.343 25.5925C26.948 26.4696 25.8291 27.7228 25.115 29.2077C24.4008 30.6927 24.1205 32.3492 24.3062 33.9864C24.492 35.6237 25.1363 37.1753 26.165 38.4625C27.0525 37.0325 29.0062 35.5 33 35.5C36.9937 35.5 38.9463 37.0312 39.835 38.4625C40.8637 37.1753 41.508 35.6237 41.6938 33.9864C41.8795 32.3492 41.5992 30.6927 40.885 29.2077C40.1709 27.7228 39.052 26.4696 37.657 25.5925C36.262 24.7155 34.6478 24.2501 33 24.25Z"
                                              fill="#525245"/>
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_85_20441" x="0" y="0" width="65" height="65"
                                                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix"
                                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                           result="hardAlpha"/>
                                            <feOffset/>
                                            <feGaussianBlur stdDeviation="5"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix"
                                                           values="0 0 0 0 0.423529 0 0 0 0 0.447059 0 0 0 0 0.498039 0 0 0 0.13 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix"
                                                     result="effect1_dropShadow_85_2044"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_85_2044"
                                                     result="shape"/>
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
                                'menu' => '',
                                'container' => '',
                                'container_class' => '',
                                'theme_location' => 'main-menu',
                                'container_id' => '',
                                'menu_class' => '',
                                'menu_id' => '',
                                'echo' => true,
                                'fallback_cb' => 'wp_page_menu',
                                'before' => '',
                                'after' => '',
                                'link_before' => '',
                                'link_after' => '',
                                'items_wrap' => '<ul>%3$s</ul>',
                                'depth' => 0
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
        if (
                !function_exists('elementor_theme_do_location') ||
                !elementor_theme_do_location('header')) {
        ?>
        <header id="site-header" class="site-header" role="banner">
            <div id="logo">
                <?php the_custom_logo(); ?>
            </div>

            <?php if (display_header_text()) : ?>
                <h1 class="site-title">
                    <a href="<?php echo esc_attr(home_url('/')); ?>" title="Home" rel="home">
                        <?php echo esc_html(get_bloginfo('name')); ?>
                    </a>
                </h1>
                <p class="tagline"><?php bloginfo('description'); ?></p>

            <?php endif; ?>

            <nav>
                <?php
                $args = array('theme_location' => 'main-menu');
                wp_nav_menu($args);
                ?>
            </nav>
        </header>
        <?php
    }
    ?>
</div>