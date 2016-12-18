<?php
/*
Plugin Name: All In One Social Network Buttons
Plugin URI: http://www.cmsvoteup.com
Description: You can have all social network buttons or box counters from Facebook, Google Buzz, Twitter, StumbleUpon, Digg, MySpace, Delicious, Multiply, Mister Wong, Baidu, Blogger, Bebo, Amazon, LinkedIn, Hellotxt, Bitly, Google Translate, Google Reader, myAOL, Netvibes, Instapaper, Hacker News, etc all in one Wordpress plugin which integrate AddThis free service and direct customization Facebook and Twitter scripts directly in your Wordpress post.
Version: 1.2
Author: Leon Wood
Author URI: CMSVoteUp.com
License:  http://www.gnu.org/licenses/old-licenses/gpl-2.0.html GNU/GPL version 2

Note: Some of the code from this plugin makes use some part of code from: Google Buzz Button For Wordpress (Author: Tejaswini, Sanjeev)
*/

/*
Plugin Name: Google Buzz Button For Wordpress
Plugin URI: http://www.clickonf5.org/google-buzz-button-wordpress
Description: It adds Google buzz button to your post/page
Version: 1.0.0	
Author: Tejaswini, Sanjeev
Author URI: http://www.clickonf5.org/
Wordpress version supported: 2.7 and above
*/

define("all_in_one_social_network_button","1.2",false);

function all_in_one_social_network_button_url( $path = '' ) {
	global $wp_version;
	if ( version_compare( $wp_version, '2.8', '<' ) ) { // Using WordPress 2.7
		$folder = dirname( plugin_basename( __FILE__ ) );
		if ( '.' != $folder )
			$path = path_join( ltrim( $folder, '/' ), $path );

		return plugins_url( $path );
	}
	return plugins_url( $path, __FILE__ );
}

function activate_all_in_one_social_network_button() {
	global $all_in_one_social_network_button_options;
	$all_in_one_social_network_button_options = array('location'=>'after',
							   'style'=>'toolbox_32x32',
							   'creditIsOn'=>'yes',
							   'pub_id'=>'');
	add_option('all_in_one_social_network_button_options',$all_in_one_social_network_button_options);
}	

global $all_in_one_social_network_button_options;	

$all_in_one_social_network_button_options = get_option('all_in_one_social_network_button_options');		
	  
register_activation_hook( __FILE__, 'activate_all_in_one_social_network_button' );

function add_all_in_one_social_network_button_automatic($content){ 
 global $all_in_one_social_network_button_options, $post;
 
 $p_title = get_the_title($post->ID);
 $voteUrl = get_permalink( $post->ID ).'&title='.str_replace(' ','+',$p_title).'&referenceUrl='.get_bloginfo( 'url' );
 $style = $all_in_one_social_network_button_options['style'];
 $pub_id = $all_in_one_social_network_button_options['pub_id'];
 
  switch($style){
	case "toolbox_16x16":
		$htmlCode .= "<!-- AddThis Button BEGIN --> \n";
		$htmlCode .= "<div class=\"addthis_toolbox addthis_default_style\"> \n";
		$htmlCode .= "<a class=\"addthis_button_compact\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_googlebuzz\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_twitter\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_facebook\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_linkedin\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_stumbleupon\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_digg\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_misterwong\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_multiply\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_hellotxt\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_bitly\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_googletranslate\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_myspace\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_bebo\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_amazonwishlist\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_baidu\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_blinklist\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_blip\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_blogger\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_faves\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_formspring\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_googlereader\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_hackernews\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_hotmail\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_instapaper\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_myaol\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_netvibes\"></a> \n";
		$htmlCode .= "<a title=\"Send to CMSVoteUp\" href=\"http://cmsvoteup.com/index.php?page=submit1&url=$url\"><img border=\"0\" src=\"http://cmsvoteup.com/images/cmsvoteup-icon-16x16-2.png\"></a> \n";
		$htmlCode .= "<a title=\"Send to DontClickOn\" href=\"http://dontclickon.com/index.php?page=submit1&url=$url\"><img border=\"0\" src=\"http://dontclickon.com/images/dco-icon-16x16.png\"></a> \n";
		$htmlCode .= "</div> \n";
		$htmlCode .= "<script type=\"text/javascript\">var addthis_config = {\"data_track_clickback\":$track_this};</script> \n";
		$htmlCode .= "<script type=\"text/javascript\" src=\"http://s7.addthis.com/js/250/addthis_widget.js#pubid=$pub_id\"></script> ";
		break;
	case "toolbox_32x32":
		$htmlCode .= "<!-- AddThis Button BEGIN --> \n";
		$htmlCode .= "<div class=\"addthis_toolbox addthis_default_style addthis_32x32_style\"> \n";
		$htmlCode .= "<a class=\"addthis_button_compact\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_googlebuzz\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_twitter\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_facebook\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_linkedin\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_stumbleupon\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_digg\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_misterwong\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_multiply\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_hellotxt\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_bitly\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_googletranslate\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_myspace\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_bebo\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_amazonwishlist\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_baidu\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_blinklist\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_blip\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_blogger\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_faves\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_formspring\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_googlereader\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_hackernews\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_hotmail\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_instapaper\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_myaol\"></a> \n";
		$htmlCode .= "<a class=\"addthis_button_netvibes\"></a> \n";
		$htmlCode .= "<a title=\"Send to CMSVoteUp\" href=\"http://cmsvoteup.com/index.php?page=submit1&url=$url\"><img border=\"0\" src=\"http://cmsvoteup.com/images/cmsvoteup-icon-32x32-2.png\"></a> \n";
		$htmlCode .= "<a title=\"Send to DontClickOn\" href=\"http://dontclickon.com/index.php?page=submit1&url=$url\"><img border=\"0\" src=\"http://dontclickon.com/images/dco-icon-32x32.png\"></a> \n";
		$htmlCode .= "</div> \n";
		$htmlCode .= "<script type=\"text/javascript\">var addthis_config = {\"data_track_clickback\":$track_this};</script> \n";
		$htmlCode .= "<script type=\"text/javascript\" src=\"http://s7.addthis.com/js/250/addthis_widget.js#pubid=$pub_id\"></script> ";
		break;
	case "sharecount_vertical":
		
		$htmlCode .= "<div style=\"width:180px\">";
		$htmlCode .= "<table width=\"180px\" border=\"0\" align=\"center\">";
		$htmlCode .= "<tr>";
		$htmlCode .= "<td align=\"center\" valign=\"middle\">";
		$htmlCode .= "<!-- AddThis Button BEGIN -->";
		$htmlCode .= "<div class=\"addthis_toolbox addthis_default_style \">\n";
		$htmlCode .= "<a class=\"addthis_counter\"></a>\n";
		$htmlCode .= "</div></td>";
		
		$htmlCode .= "<td align=\"center\" valign=\"middle\">";
		$htmlCode .= "<a href=\"http://twitter.com/share\" class=\"twitter-share-button\" data-count=\"vertical\" data-url=$voteUrl data-text=\"$p_title \"Tweet</a>\n<script type=\"text/javascript\" src=\"http://platform.twitter.com/widgets.js\"></script>\n";
		$htmlCode .= "</td>";
		
		$htmlCode .= "<td align=\"center\" valign=\"middle\">";
		$htmlCode .= "<script type=\"text/javascript\" src=\"http://cmsvoteup.com/socialbuttons/2/vote-up.js\"></script>\n";
		$htmlCode .= "</td>";
		
		$htmlCode .= "<td align=\"center\" valign=\"middle\">";
		$htmlCode .= "<script src=\"http://connect.facebook.net/en_US/all.js#xfbml=1\"></script><fb:like href=\"\" send=\"false\" layout=\"box_count\" width=\"450\" show_faces=\"false\" font=\"arial\"></fb:like>\n";
		$htmlCode .= "</td>";
		//$htmlCode .= "<td align=\"center\" valign=\"middle\">";
		//$htmlCode .= "<script type=\"text/javascript\" src=\"http://dontclickon.com/socialbuttons/2/vote-up.js\"></script>\n";
		//$htmlCode .= "</td>";
		$htmlCode .= "</tr></table>";
		$htmlCode .= "</div>";
		$htmlCode .= "<script type=\"text/javascript\">var addthis_config = {\"data_track_clickback\":$track_this};</script> \n";
		$htmlCode .= "<script type=\"text/javascript\" src=\"http://s7.addthis.com/js/250/addthis_widget.js#pubid=$pub_id\"></script> ";
		
		break;
	case "sharecount_horizontal":
		$htmlCode .= "<!-- AddThis Button BEGIN -->";
		$htmlCode .= "<div class=\"addthis_toolbox addthis_default_style \"> \n";
		$htmlCode .= "<a class=\"addthis_button_facebook_like\" fb:like:layout=\"button_count\"></a>\n";
		$htmlCode .= "<a class=\"addthis_button_google_plusone\"></a>\n";
		$htmlCode .= "<a class=\"addthis_button_tweet\"></a>\n";
		$htmlCode .= "<script type=\"text/javascript\" src=\"http://cmsvoteup.com/socialbuttons/1/vote-up.js\"></script>\n";
		//$htmlCode .= "<script src=\"http://connect.facebook.net/en_US/all.js#xfbml=1\"></script><fb:like href=\"\" send=\"false\" layout=\"button_count\" width=\"450\" show_faces=\"false\" font=\"arial\"></fb:like>\n";
		//$htmlCode .= "<script type=\"text/javascript\" src=\"http://dontclickon.com/socialbuttons/1/vote-up.js\"></script>\n";
		$htmlCode .= "</div>\n";
		$htmlCode .= "<script type=\"text/javascript\">var addthis_config = {\"data_track_clickback\":$track_this};</script> \n";
		$htmlCode .= "<script type=\"text/javascript\" src=\"http://s7.addthis.com/js/250/addthis_widget.js#pubid=$pub_id\"></script> ";
		break;	
	}		
  
   
	$all_in_one_social_network_button = $htmlCode;
	if($all_in_one_social_network_button_options['location'] == 'before' ){
		$content = $all_in_one_social_network_button . $content;
	}
	else if($all_in_one_social_network_button_options['location'] == 'after' ){
		$content = $content . $all_in_one_social_network_button;
	} else  if($all_in_one_social_network_button_options['location'] == 'before_and_after' ){
		$content = $all_in_one_social_network_button. $content. $all_in_one_social_network_button;
	}
	return $content;
}

if ($all_in_one_social_network_button_options['location'] != 'manual'){
	add_filter('the_content','add_all_in_one_social_network_button_automatic'); 
}

function add_all_in_one_social_network_button(){
	global $all_in_one_social_network_button_options, $post;
	$p_title = get_the_title($post->ID);
	$voteUrl = get_permalink( $post->ID ).'&title='.str_replace(' ','+',$p_title).'&referenceUrl='.get_bloginfo( 'url' );
	 $pub_id = $all_in_one_social_network_button_options['pub_id'];
	$style = $all_in_one_social_network_button_options['style'];

	switch($style){
		case "toolbox_16x16":
			$htmlCode .= "<!-- AddThis Button BEGIN --> \n";
			$htmlCode .= "<div class=\"addthis_toolbox addthis_default_style\"> \n";
			$htmlCode .= "<a class=\"addthis_button_compact\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_googlebuzz\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_twitter\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_facebook\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_linkedin\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_stumbleupon\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_digg\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_misterwong\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_multiply\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_hellotxt\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_bitly\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_googletranslate\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_myspace\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_bebo\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_amazonwishlist\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_baidu\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_blinklist\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_blip\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_blogger\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_faves\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_formspring\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_googlereader\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_hackernews\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_hotmail\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_instapaper\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_myaol\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_netvibes\"></a> \n";
			$htmlCode .= "<a title=\"Send to CMSVoteUp\" href=\"http://cmsvoteup.com/index.php?page=submit1&url=$url\"><img border=\"0\" src=\"http://cmsvoteup.com/images/cmsvoteup-icon-16x16-2.png\"></a> \n";
			$htmlCode .= "<a title=\"Send to DontClickOn\" href=\"http://dontclickon.com/index.php?page=submit1&url=$url\"><img border=\"0\" src=\"http://dontclickon.com/images/dco-icon-16x16.png\"></a> \n";
			$htmlCode .= "</div> \n";
			$htmlCode .= "<script type=\"text/javascript\">var addthis_config = {\"data_track_clickback\":$track_this};</script> \n";
			$htmlCode .= "<script type=\"text/javascript\" src=\"http://s7.addthis.com/js/250/addthis_widget.js#pubid=$pub_id\"></script> ";
			break;
		case "toolbox_32x32":
			$htmlCode .= "<!-- AddThis Button BEGIN --> \n";
			$htmlCode .= "<div class=\"addthis_toolbox addthis_default_style addthis_32x32_style\"> \n";
			$htmlCode .= "<a class=\"addthis_button_compact\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_googlebuzz\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_twitter\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_facebook\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_linkedin\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_stumbleupon\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_digg\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_misterwong\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_multiply\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_hellotxt\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_bitly\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_googletranslate\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_myspace\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_bebo\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_amazonwishlist\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_baidu\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_blinklist\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_blip\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_blogger\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_faves\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_formspring\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_googlereader\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_hackernews\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_hotmail\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_instapaper\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_myaol\"></a> \n";
			$htmlCode .= "<a class=\"addthis_button_netvibes\"></a> \n";
			$htmlCode .= "<a title=\"Send to CMSVoteUp\" href=\"http://cmsvoteup.com/index.php?page=submit1&url=$url\"><img border=\"0\" src=\"http://cmsvoteup.com/images/cmsvoteup-icon-32x32-2.png\"></a> \n";
			$htmlCode .= "<a title=\"Send to DontClickOn\" href=\"http://dontclickon.com/index.php?page=submit1&url=$url\"><img border=\"0\" src=\"http://dontclickon.com/images/dco-icon-32x32.png\"></a> \n";
			$htmlCode .= "</div> \n";
			$htmlCode .= "<script type=\"text/javascript\">var addthis_config = {\"data_track_clickback\":$track_this};</script> \n";
			$htmlCode .= "<script type=\"text/javascript\" src=\"http://s7.addthis.com/js/250/addthis_widget.js#pubid=$pub_id\"></script> ";
			break;
		case "sharecount_vertical":
			$htmlCode .= "<!-- AddThis Button BEGIN -->";
			$htmlCode .= "<div class=\"addthis_toolbox addthis_default_style \">\n";
			$htmlCode .= "<a class=\"addthis_counter\"></a>\n";
			$htmlCode .= "</div>\n";
			$htmlCode .= "<script type=\"text/javascript\">var addthis_config = {\"data_track_clickback\":$track_this};</script> \n";
			$htmlCode .= "<script type=\"text/javascript\" src=\"http://s7.addthis.com/js/250/addthis_widget.js#pubid=$pub_id\"></script> ";
			break;
		case "sharecount_horizontal":
			$htmlCode .= "<!-- AddThis Button BEGIN -->";
			$htmlCode .= "<div class=\"addthis_toolbox addthis_default_style \"> \n";
			$htmlCode .= "<a class=\"addthis_counter addthis_pill_style\"></a>\n";
			$htmlCode .= "<a class=\"addthis_button_facebook_like\" fb:like:layout=\"button_count\"></a>\n";
			$htmlCode .= "<a class=\"addthis_button_tweet\"></a>\n";
			$htmlCode .= "<script type=\"text/javascript\" src=\"http://cmsvoteup.com/socialbuttons/1/vote-up.js\"></script>\n";
			$htmlCode .= "</div>\n";
			$htmlCode .= "<script type=\"text/javascript\">var addthis_config = {\"data_track_clickback\":$track_this};</script> \n";
			$htmlCode .= "<script type=\"text/javascript\" src=\"http://s7.addthis.com/js/250/addthis_widget.js#pubid=$pub_id\"></script> ";
			break;
		
	}		
			
	//$all_in_one_social_network_button = "<a title=\"Send to CMSVoteUp\" href=\"http://cmsvoteup.com/index.php?page=submit1&url=$voteUrl\"><img border=\"0\" src=\"http://cmsvoteup.com/images/cmsvoteup-icon-16x16-2.png\"></a>\n";
	$all_in_one_social_network_button = $htmlCode;

	echo $all_in_one_social_network_button;
}

// function for adding settings page to wp-admin
function all_in_one_social_network_button_settings() {
	add_options_page('All In One Social Network Buttons', 'All In One Social Network Buttons', 9, basename(__FILE__), 'all_in_one_social_network_button_options_form');
}

function all_in_one_social_network_button_options_form(){ 
	global $all_in_one_social_network_button_options;
?>
<div class="wrap">

<div id="poststuff" class="metabox-holder has-right-sidebar" style="float:right;width:30%;"> 
   <div id="side-info-column" class="inner-sidebar"> 
			<div class="postbox"> 
			  <h3 class="hndle"><span>About this Plugin:</span></h3> 
			  <div class="inside">
                <ul>
					<li><a href="http://www.cmsvoteup.com" title="Vote Up your Wordpress Website" >CMS Vote Up!</a></li>
					<li><a href="http://www.dontclickon.com" title="Follow all latest malware & scam in Facebook, Twitter & other social networks" >Dont Click On</a></li>
					<li><a href="http://community.cmsvoteup.com/download-2" title="Download other plugins from same author">Plugin Homepage</a></li>					
                </ul> 
              </div> 
			</div> 
     </div>
 </div> <!--end of poststuff --> 


<form method="post" action="options.php">

<?php settings_fields('all_in_one_social_network_button_options_group'); ?>

<h2>All In One Social Network Buttons Options</h2> 

<table class="form-table" style="clear:none;width:70%;">

<tr valign="top">
<th scope="row">Button Styles</th>
<td>
<select name="all_in_one_social_network_button_options[style]" id="style" >
	<option value="sharecount_vertical" <?php if ($all_in_one_social_network_button_options['style'] == "sharecount_vertical"){ echo "selected";}?> >ShareCount Vertical</option>
	<option value="sharecount_horizontal" <?php if ($all_in_one_social_network_button_options['style'] == "sharecount_horizontal"){ echo "selected";}?>>ShareCount Horizontal</option>
	<option value="toolbox_16x16" <?php if ($all_in_one_social_network_button_options['style'] == "toolbox_16x16"){ echo "selected";}?>>Toolbox 16x16 Icons</option>
	<option value="toolbox_32x32" <?php if ($all_in_one_social_network_button_options['style'] == "toolbox_32x32"){ echo "selected";}?>>Toolbox 32x32 Icons</option>	
</select>
</td>
</tr>

<tr valign="top">
<th scope="row">Location of the buttons</th>
<td><select name="all_in_one_social_network_button_options[location]" id="location" >
<option value="before" <?php if ($all_in_one_social_network_button_options['location'] == "before"){ echo "selected";}?> >Before Content</option>
<option value="after" <?php if ($all_in_one_social_network_button_options['location'] == "after"){ echo "selected";}?> >After Content</option>
<option value="before_and_after" <?php if ($all_in_one_social_network_button_options['location'] == "before_and_after"){ echo "selected";}?> >Before and After</option>
<option value="manual" <?php if ($all_in_one_social_network_button_options['location'] == "manual"){ echo "selected";}?> >Manual Insertion</option>
</select><br/>
<b>Note:</b> &nbsp;You can also use template tag <code>add_all_in_one_social_network_button();</code> for Manual Insertion in any of your post item by selecting "Manual Insertion" option
</td>
</tr>


<tr valign="top">
<th scope="row">AddThis Pub Id (fill your own Id or leave it blank):</th>
<td><input id="pub_id" name="all_in_one_social_network_button_options[pub_id]" value="<?php echo $all_in_one_social_network_button_options[pub_id]; ?>"></td>
</td>
</tr>

</table>

<p class="submit">
<input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" />
</p>

</form>

</div>
<?php }

// Hook for adding admin menus
if ( is_admin() ){ // admin actions
  add_action('admin_menu', 'all_in_one_social_network_button_settings');
  add_action( 'admin_init', 'register_all_in_one_social_network_button_settings' ); 
} 
function register_all_in_one_social_network_button_settings() { // whitelist options
  register_setting( 'all_in_one_social_network_button_options_group', 'all_in_one_social_network_button_options' );
}

?>