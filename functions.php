<?php
include dirname(__FILE__) . '/templates/logo_shortcode.php';

// Shortcode to output custom PHP in Elementor
function wpc_elementor_shortcode($atts)
{
    global $wp_query;

    $wp_query_save = $wp_query;

    $wp_query = new WP_Query(array(
        'posts_per_page' => 2,
        'post_type' => 'product',
        'post_status' => 'publish',
        'ignore_sticky_posts' => 1,
        'meta_key' => 'total_sales',
        'orderby' => 'meta_value_num',
        'order' => 'DESC',
    ));

    $wp_query = $wp_query_save;

    // echo "HELLO?";
}

add_shortcode('my_elementor_php_output', 'wpc_elementor_shortcode');

function get_star_rating($atts)
{
    global $woocommerce, $product;

    $average = $product->get_average_rating();

    if ($average == 0) {
        $average = 5;
    }

    print_r($average);
}

add_shortcode('get_star_rating_php_output', 'get_star_rating');

function get_star_rating_single_post($atts)
{
    global $woocommerce;

    $product = wc_get_product(get_the_ID());

    $average = $product->average_rating;

    if ($average == 0) {
        $average = 5;
    }

    print_r($average);
}

add_shortcode('get_star_rating_single_post_php_output', 'get_star_rating_single_post');

add_filter('add_to_cart_redirect', 'lw_add_to_cart_redirect');

function lw_add_to_cart_redirect()
{
    global $woocommerce;
    $lw_redirect_checkout = $woocommerce->cart->get_checkout_url();
    return $lw_redirect_checkout;
}

function add_type_attribute($tag, $handle, $src) {
    // if not your script, do nothing and return original $tag
    if ( 'your-script-handle' !== $handle ) {
        return $tag;
    }
    // change the script tag by adding type="module" and return it.
    $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
    return $tag;
}

function customThemeScripts()
{
    wp_deregister_script('jquery');
    wp_register_script('jquery', get_stylesheet_directory_uri() . '/assets/js/jquery-3.2.1.min.js', false, '1.0.0', true);
    wp_enqueue_script('lib_1', get_stylesheet_directory_uri() . '/assets/js/TweenMax.min.js', array('jquery'), '1.0.0', true);
    wp_enqueue_script('lib_2', get_stylesheet_directory_uri() . '/assets/js/jquery.waypoints.min.js', array('jquery'), '1.0.0', true);
}

add_action('wp_enqueue_scripts', 'customThemeScripts');

if (function_exists('add_image_size')) {
    add_image_size('preview', 640, 9999);
    add_image_size('size_1280', 1280, 9999);
    add_image_size('size_1920', 1920, 9999);
}

add_action('acf/init', 'my_acf_op_init');
function my_acf_op_init()
{

    // Check function exists.
    if (function_exists('acf_add_options_page')) {

        // Register options page.
        $option_page = acf_add_options_page(array(
            'page_title' => __('General theme settings'),
            'menu_title' => __('General theme settings'),
            'menu_slug' => 'theme-general-settings',
            'capability' => 'edit_posts',
            'redirect' => false
        ));
    }
}

// error_reporting(0);

function get_image_url_by_id($id, $size)
{
    $image_id = $id;
    $image_size = $size;
    $image_array = wp_get_attachment_image_src($image_id, $image_size);
    $image_url = $image_array[0];
    return $image_url;
}

function get_image_by_obj($obj, $size, $class)
{
    $imageObj = $obj;
    $imageID = $imageObj['id'];
    $imageAlt = $imageObj['alt'];

    $imageSize = $size;
    $imageArray = wp_get_attachment_image_src($imageID, $imageSize);
    $imageUrl = $imageArray[0];

    return '<img class="' . $class . '" src="' . $imageUrl . '" alt="' . $imageAlt . '">';
}

add_action('admin_head', 'my_custom_fonts');

function my_custom_fonts()
{
    echo '<style>
    .field_type-message {
        padding: 25px 0 !important;
    }

    .acf-tab-group li a {
      font-size: 12px;
    }

    .field_type-message {
        padding: 15px 0 0 0 !important;
    }

    .field_type-message p {
        margin: 0 !important;
        font-size: 16px;
        font-weight: 700;
    }
  </style>';
}

$user = wp_get_current_user();
$allowed_roles = array('administrator');

if (array_intersect($allowed_roles, $user->roles)) {

} else {
    add_action('admin_head', 'style_to_hide_functionality');

    function style_to_hide_functionality()
    {
        echo '
             <style>
                 #adminmenu > li {
                     display: none;
                 }

                 #menu-posts,
                 #menu-media,
                 #menu-pages,
                 #menu-comments,
                 #toplevel_page_woocommerce,
                 #menu-posts-product,
                 #toplevel_page_wc-admin-path--analytics-overview,
                 #toplevel_page_atum-dashboard,
                 #toplevel_page_woocommerce-marketing,
                 #toplevel_page_elementor,
                 #menu-posts-elementor_library,
                 #menu-appearance,
                 #menu-users {
                     display: block !important; 
                 }
             </style>
         ';
    }
}

if (!defined('ABSPATH')) {
    exit;
}

if (!isset($content_width)) $content_width = 1280;

function skelementor_init()
{

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('automatic-feed-links');
    add_theme_support('title-tag');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo', array(
        'width' => 260,
        'height' => 100,
        'flex-height' => true,
        'flex-width' => true,
    ));
    add_theme_support('custom-header');
    add_theme_support('woocommerce');
    add_post_type_support('page', 'excerpt');

    register_nav_menus(
        array('main-menu' => __('Main Menu', 'skelementor'))
    );

    load_theme_textdomain('skelementor', get_template_directory() . '/languages');
}

add_action('after_setup_theme', 'skelementor_init');

function skelementor_comment_reply()
{
    if (get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}

add_action('comment_form_before', 'skelementor_comment_reply');

function skelementor_scripts_styles()
{
    wp_enqueue_style('skelementor-style', get_stylesheet_uri());
}

add_action('wp_enqueue_scripts', 'skelementor_scripts_styles');

function skelementor_register_elementor_locations($elementor_theme_manager)
{
    $elementor_theme_manager->register_all_core_location();
}

;
add_action('elementor/theme/register_locations', 'skelementor_register_elementor_locations');