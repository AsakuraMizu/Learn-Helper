<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, maximum-scale=1">
    <meta name="description" content="Metro UI CSS">
    <meta name="author" content="Sergey Pimenov">
    <meta name="keywords" content="windows 8, modern style, Metro UI, style, modern, css, framework">

    <link href="css/modern.css" rel="stylesheet">
    <link href="css/modern-responsive.css" rel="stylesheet">
    <link href="css/site.css" rel="stylesheet" type="text/css">

    <script src="js/jquery-1.8.2.min.js"></script>
    <script src="js/google-analytics.js"></script>
    <script src="js/github.info.js"></script>
    <script src="js/sharrre/jquery.sharrre-1.3.4.min.js"></script>
    <script src="js/carousel.js"></script>

    <title>Metro UI CSS</title>

</head>
<body class="modern-ui">
    <div class="page">
        <? include("header.php")?>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span8">
                            <div class="hero-unit">
                                <div class="carousel" data-role="carousel" style="height: 242px;" data-param-duration="300">
                                    <div class="slides">

                                        <div class="slide" id="slide1">
                                            <h1 class="fg-color-blueLight">Metro UI CSS</h1>

                                            <h2>Create site in Windows 8 style now!</h2>

                                            <br />
                                            <p>Metro UI CSS allows to create a Web site in the style of
                                                Windows 8 quickly and without distractions
                                                on routine tasks.</p>
                                            <h3>To start: include modern.css</h3>
                                            <p class="tertiary-info-text">
                                                &lt;link href="modern.css" rel="stylesheet"&gt;
                                            </p>
                                        </div>

                                        <div class="slide" id="slide2">
                                            <h1 class="fg-color-blueLight">Metro UI CSS</h1>
                                            <p class="bg-color-pink padding20 fg-color-white">
                                                Developed with the advice of Microsoft to build the user interface and <strong>include:</strong>
                                            </p>
                                            <ul class="unstyled sprite-details two-columns" style="margin-top: 20px;">
                                                <li><i class="icon-swap-right"></i> General styles</li>
                                                <li><i class="icon-swap-right"></i> Grid with Responsive</li>
                                                <li><i class="icon-swap-right"></i> Layouts</li>
                                                <li><i class="icon-swap-right"></i> Typography</li>
                                                <li><i class="icon-swap-right"></i> Many components</li>
                                                <li><i class="icon-swap-right"></i> 200+ built in icons</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="span4">
                            <div class="span4 bg-color-red padding30 text-center place-left" style="height: auto;">
                                <h2 class="fg-color-white">Sponsor ?</h2>
                                <p class="fg-color-white">1000+ <a class="fg-color-yellow" href="http://hit.ua/site_view/19154">users</a> every day</p>
                                <p class="tertiary-text">this banner $250/month</p>
                            </div>
                            <a class="span2 place-left" style="" href="http://bizspark.com/"><img src="images/1005-BizSpark-261x230.jpg" /></a>
                            <a class="span2 place-left" style="padding-top: 25px;" href="http://jetbrains.com/"><img src="images/logo-jetbrains.jpg"/></a>
                        </div>
                    </div>
                </div>

                <div class="grid">
                    <div class="row">
                        <div class="span4 bg-color-blue">
                            <img src="images/simple.png" class="place-right" style="margin: 10px;"/>
                            <h2 class="fg-color-white">&nbsp;Simple</h2>
                        </div>

                        <div class="span4 bg-color-green">
                            <img src="images/grid.png" class="place-right" style="margin: 10px;"/>
                            <h2 class="fg-color-white">&nbsp;Sufficient</h2>
                        </div>

                        <div class="span4 bg-color-yellow">
                            <img src="images/responsive.png" class="place-right" style="margin: 10px;"/>
                            <h2 class="fg-color-white">&nbsp;Responsive</h2>
                        </div>
                    </div>
                </div>

                <div class="grid">
                    <div class="row">
                        <div class="span4">
                            <img src="images/author.jpg" style="width:100%"/>
                            <p class="tertiary-info-secondary-text bg-color-grayDark" style="padding: 10px; color: #fff;">Hi! My name is Sergey Pimenov and i'm author of Metro UI CSS from <abbr title="The capital of Ukraine">Kiev</abbr>, <abbr title="The center of Europe">Ukraine</abbr>.</p>
                        </div>
                        <div class="span4">
                            <h2>Welcome</h2>
                            <p>
                                Metro UI CSS a set of styles to create a site with an interface similar to Windows 8 Metro UI. This set of styles was developed as a self-contained solution.
                            </p>
                            <p>
                                Metro UI CSS contained two type of licenses: <a href="https://github.com/olton/Metro-UI-CSS/blob/master/LICENSE">MIT</a> and <a href="https://github.com/olton/Metro-UI-CSS/blob/master/LICENSE-FOR-COMMERCIAL-USE">Commercial</a>
                            </p>
                            <h3>LESS</h3>
                            <p class="tertiary-info-text">
                                Metro UI CSS is made with LESS. <a href="http://lesscss.org">LESS</a> a dynamic stylesheet language created by one good man, <a href="http://cloudhead.io/">Alexis Sellier</a>. It makes developing systems-based CSS faster, easier, and more fun.
                            </p>
                            <h3>Supported browsers:</h3>
                            <div class="browsers-icons clearfix">
                                <img src="images/ie.png" title="Internet Explorer 9+"/>
                                <img src="images/chrome.png" title="Google Chrome"/>
                                <img src="images/firefox.png" title="Firefox"/>
                                <img src="images/opera.png" title="Opera"/>
                            </div>
                            <br />
                            <p class="tertiary-info-secondary-text">All modern browsers. Internet Explorer supported on 9+</p>
                        </div>
                        <div class="span4">
                            <div id="social">
                                <div id="shareme" data-url="http://metroui.org.ua/" data-text="" data-title="share this page"></div>
                            </div>

                            <script>
                                $('#shareme').sharrre({
                                    share: {
                                        googlePlus: true
                                        ,facebook: true
                                        ,twitter: true
                                        //,digg: true
                                        ,delicious: true
                                    },
                                    //enableTracking: true,
                                    urlCurl: "js/sharrre/sharrre.php",
                                    //shorterTotal: false,
                                    buttons: {
                                        googlePlus: {size: 'tall'},
                                        facebook: {layout: 'box_count'},
                                        twitter: {count: 'vertical'},
                                        //digg: {type: 'DiggMedium'},
                                        delicious: {size: 'tall'}
                                    },
                                    hover: function(api, options){
                                        $(api.element).find('.buttons').show();
                                    },
                                    hide: function(api, options){
                                        //$(api.element).find('.buttons').hide();
                                    }
                                });
                            </script>

                            <br />
                            <h2>GitHub Project Info:</h2>
                            <table class="github-info" data-repo="olton/Metro-UI-CSS">
                                <tbody>
                                <tr>
                                    <td>Starred:</td>
                                    <td class="right"><span class="github-watchers">982</span></td>
                                </tr>
                                <tr>
                                    <td>Forks:</td>
                                    <td class="right bg"><span class="github-forks">215</span></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 20px 0 0; border: 0;">
                                        <button class="image-button bg-color-pink fg-color-white" onclick="document.location.href='https://github.com/olton/Metro-UI-CSS'">View on Github<img class="bg-color-pinkDark" src="images/github.png"/></button>
                                        <button class="image-button bg-color-darken fg-color-white" onclick="document.location.href='https://github.com/olton/Metro-UI-CSS/zipball/master'">Download<img class="bg-color-green" src="images/download-32.png"/></button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <br />
                            <div class="text-center">
                                <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                                    <input type="hidden" name="cmd" value="_s-xclick">
                                    <input type="hidden" name="hosted_button_id" value="AVMB2NYSENK3A">
                                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                                </form>
                            </div>
                            <!--
                            <br />
                            <div class="">
                                <form style="display:inline" method=POST action="https://liqpay.com/?do=clickNbuy">
                                    <input type="hidden" name="preorder" value="c27a4aa9211f4e6735b739850e99d568422af6e7">
                                    <button type="submit" class="span3 command-button default">Donate 10 USD<small>for Metro UI CSS [LiqPay]</small></button>
                                </form>
                            </div>
                            -->
                        </div>
                    </div>
                    <div class="row">
                        <? include("adsense.php")?>
                    </div>
                </div>
            </div>
        </div>
        <? include("footer.php")?>
    </div>
    <?php include("counter.php");?>

</body>
</html>