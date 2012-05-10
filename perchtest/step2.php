<?php
    $fail = false;
    $reasons = array();
    
    // Session test
    if(session_id() == "") { 
        session_start(); 
    }
    $_SESSION['PERCH_COMPAT']++;
    
    $db_server   = (isset($_POST['db_server']) ? $_POST['db_server'] : false);
    $db_database = (isset($_POST['db_database']) ? $_POST['db_database'] : false);
    $db_username = (isset($_POST['db_username']) ? $_POST['db_username'] : false);
    $db_password = (isset($_POST['db_password']) ? $_POST['db_password'] : false);


    // check we have all fields
    if ($db_server == false || $db_database == false || $db_username == false || $db_password == false) {
        $fail = true;
        $reasons[] = "You were unable to provide enough details to connect to the database.";
    }else{


        // Can you Connect4? It's easy and fun! Just use your head, Connect4 and you've won! Make a connection, MAKE A CONNECTION!
        $link = @mysql_connect($db_server, $db_username, $db_password);
    
        if (!$link) {
    	    $fail = true;
    	    $reasons[] = "Could not connect to the database with the information provided.";
    	}else{
    		mysql_select_db($db_database);
    	}
	
	
    	// Try to create a table
    	$sql    = "CREATE TABLE `perch_compatibility_test` (
          `id` int(11) NOT NULL auto_increment,
          `item_value` varchar(255) default NULL,
          PRIMARY KEY  (`id`)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8";
        $result = mysql_query($sql, $link);
    	if (mysql_error()) {
            $fail = true;
            $reasons[] = "Could not create a table. MySQL returned the error: ". mysql_error();
    	}
	
        // Try an INSERT
        $sql = "INSERT INTO perch_compatibility_test(item_value) VALUES('test')";
        $result = mysql_query($sql, $link);
        if (mysql_error()) {
            $fail = true;
            $reasons[] = "Could not insert data into the table. MySQL returned the error: ". mysql_error();
        }
    
    
        // Try an UPDATE
        $sql = "UPDATE perch_compatibility_test SET item_value='test2' WHERE item_value='test'";
        $result = mysql_query($sql, $link);
        if (mysql_error()) {
            $fail = true;
            $reasons[] = "Could not update data in the table. MySQL returned the error: ". mysql_error();
        }
    
        // Try a DELETE
        $sql = "DELETE FROM perch_compatibility_test WHERE item_value='test2'";
        $result = mysql_query($sql, $link);
        if (mysql_error()) {
            $fail = true;
            $reasons[] = "Could not delete data in the table. MySQL returned the error: ". mysql_error();
        }
    
    
        // Try and clear up - may not be possible, that's ok
        $sql = "DROP TABLE perch_compatibility_test";
        $result = mysql_query($sql, $link);
    
    
    
        // Check the MySQL version
        $version_string = mysql_get_server_info();
        $v_parts = explode('.', $version_string);
        if ((int) $v_parts[0] < 4) {
            $fail = true;
            $reasons[] = "Perch needs at least MySQL version 4.1 to run.";
        }else{
            if ((int) $v_parts[0] == 4 && (int) $v_parts[1] < 1) {
                $fail = true;
                $reasons[] = "Perch needs at least MySQL version 4.1 to run.";
            }
        }
    
    
    }
    
    if (!isset($_SESSION['PERCH_COMPAT']) || !intval($_SESSION['PERCH_COMPAT'])>1) {
        $fail = true;
        $reasons[] = "PHP Sessions are not functioning as expected.";
    }
    
    if (!$fail) {
        header('Location: pass.php');
        exit;
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
                        <p class="alert-failure">FAIL: Sorry, your can't run Perch</p>

                        <ul>
                            <?php
                                foreach($reasons as $reason) {
                                    echo '<li>' . $reason . '</li>';
                                }
                            ?>
                        </ul>

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
