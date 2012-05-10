<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    	<title>Perch Server Compatibility Test Suite</title>
    	<link rel="stylesheet" href="assets/compat.css" type="text/css" media="screen" />
    </head>

    <body>
        <div id="content">  
            <div id="compat">
                <div id="hd">
                    <img src="assets/logo.png" alt="Logo" />
                </div>
                <div class="bd">
                    <div class="inner">              
                        <p class="alert-success">PASS: You're all set!</p>
                        <p>Your server appears to meet the basic requirements for running Perch. Hurray!</p>

                        <?php
                            if (!extension_loaded('gd') && !extension_loaded('imagick')) {
                        ?>
                            <p class="alert-notice pad">NOTICE: No image resize functionality</p>
                            <p>Your server has no capability for resizing images. This isn't required to use Perch, 
                                but ask your host to enable <strong>GD</strong> or <strong>ImageMagick</strong> 
                                if you need to resize images.</p>
                            
                        <?php
                            } // image check 
                        ?>

                        <p class="next"><a href="http://grabaperch.com/buy" class="button">Next step</a>
                    </div>
                </div>

            </div>
            <div id="footer">
        		<div class="credit">
        			<p><a href="http://grabaperch.com"><img src="assets/perch.gif" width="35" height="12" alt="Perch" /></a>
        			by <a href="http://edgeofmyseat.com">edgeofmyseat.com</a></p>
        		</div>

            	</div>

        </div>
    </body>
    </html>
