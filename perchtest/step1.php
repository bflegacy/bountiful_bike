<?php
    $fail = false;
    $reasons = array();

    // Session test
    if(session_id() == "") { 
        session_start(); 
    }
    
    $_SESSION['PERCH_COMPAT'] = 1;

    // Check PHP version
    if (version_compare(PHP_VERSION, '5.0.0', '<')) {
        $fail = true;
        $reasons[] = "Perch requires PHP 5 or greater.";
    }




?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
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
<?php
    if ($fail) {
?>                    
                    <p class="alert-failure">FAIL: Sorry, your can't run Perch</p>
                    
                    <ul>
                        <?php
                            foreach($reasons as $reason) {
                                echo '<li>' . $reason . '</li>';
                            }
                        ?>
                    </ul>
<?php
    }else{
?>
                    <p>Enter your MySQL connection details below. We'll connect to the server, create a table called "perch_compatibility_test", and write some data to it.</p>
                    <form method="post" action="step2.php">
                            <div>
                                <label for="db_server" class="">Server</label> <input type="text" id="db_server" name="db_server" value="localhost" class="text" />
                            </div>
                            <div>
                                <label for="db_database" class="">Database</label> <input type="text" id="db_database" name="db_database" value="" class="text" />
                            </div>
                            <div>
                                <label for="db_username" class="">Username</label> <input type="text" id="db_username" name="db_username" value="" class="text" />
                            </div>
                            <div>
                                <label for="db_password" class="">Password</label> <input type="password" id="db_password" name="db_password" value="" class="text" />
                            </div>

                            <p>
                                <input type="submit" name="next" value="Next step" class="button" />
                            </p>
                        
                        
                    </form>
<?php
    }
?>
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
