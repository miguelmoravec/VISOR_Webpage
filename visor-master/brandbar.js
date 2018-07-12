// NEW OMNI templates are having the GSAsitesearch var declared in the meta.xsl file
// NEW WORDPRESS templates have this var declared in header.php 
// FOR TESTING
// var GSAsitesearch = 'https://hr.vanderbilt.edu/';
// var GSAfrontend = ''; 

var head = document.head || document.getElementsByTagName("head")[0];

var vuStyle = document.createElement("link");
vuStyle.type = "text/css";
vuStyle.rel = "stylesheet";
vuStyle.href = "https://s3.amazonaws.com/vu-www4/brandbar/css/vu-brandbar.css";

head.appendChild(vuStyle);

var sanitized = GSAsitesearch
           .replace(/^https\:\/\//, 'SSL').replace(/^http\:\/\//, 'NONSSL') 
           // remove the leading protocols (temporarily)
           .replace(/\/+/g, '/')       // replace consecutive slashes with a single slash
           .replace(/\/+$/, '')			// remove trailing slashes
           .replace('SSL', 'https://').replace('NONSSL', 'http://');  // add back in protocol     

GSAsitesearchCLEAN = sanitized;

/////////////////////////
// USING CUSTOM GSA FRONTEND
/////////////////////////
if (typeof GSAfrontend !== 'undefined' && GSAfrontend) {
	var SearchOptions = '<input type="hidden" name="site" value="'+GSAfrontend+'"/>'+
            '<input type="hidden" name="client" value="'+GSAfrontend+'"/>'+
            '<input type="hidden" name="proxystylesheet" value="'+GSAfrontend+'"/>';  
    var SearchDropdown = '<button class="btn btn-default" aria-label="submit search" type="submit"><i class="vubrandbar__icon glyphicon glyphicon-search"></i>&nbsp;</button>';
	}
/////////////////////////
// NOT USING GSA CUSTOM FRONT END
/////////////////////////
else { 
	
	var SearchOptions = '<input type="hidden" name="site" value="default_collection"/>'+
        '<input type="hidden" name="client" value="default_frontend"/>'+
        '<input type="hidden" name="proxystylesheet" value="default_frontend"/>'; 
            
	// sitesearch value exists? 
	if (typeof GSAsitesearchCLEAN !== 'undefined' && GSAsitesearchCLEAN) {
    var SearchDropdown = '<button type="button" class="btn btn-default dropdown-toggle" aria-label="submit search" value="submit search" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="vubrandbar__icon glyphicon glyphicon-search"></i> <span class="caret"></span></button>'+
        '<ul class="dropdown-menu dropdown-menu-right" aria-hidden="true" aria-label="search what">'+
        '<li class="searchdropdown"><input type="radio" id="sitesearchSITE" name="sitesearch" value="'+GSAsitesearchCLEAN+'" checked><label for="sitesearchSITE">Search This Site</label></li>'+
        '<li class="searchdropdown"><input type="radio" id="sitesearchALL" name="sitesearch" value=""><label for="sitesearchALL">Search All VU</label></li>'+
        '</ul>';
	}
	// no sitesearch value exists
	else {
    	var SearchDropdown = '<button class="btn btn-default" aria-label="submit search" value="submit search" type="submit"><i class="vubrandbar__icon glyphicon glyphicon-search"></i>&nbsp;</button>';
	}
	
}

var vuTopBar = '<nav class="navbar navbar-inverse" id="main_navbar" role="navigation">' +
    '<div class="container">'+
    '    <div class="navbar-header">'+
    '        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'+
    '        <span class="sr-only">Toggle navigation</span>'+
    '        <span class="icon-bar"></span>'+
    '        <span class="icon-bar"></span>'+
    '        <span class="icon-bar"></span>'+
    '        </button>'+
    '        <a class="navbar-brand" href="http://www.vanderbilt.edu">'+
    '            <img class="hidden-xs hidden-sm hidden-md" src="https://s3.amazonaws.com/vu-www4/brandbar/images/Vanderbilt.png" alt="Vanderbilt University" />'+
    '        <img class="visible-xs visible-sm visible-md" src="https://s3.amazonaws.com/vu-www4/brandbar/images/Vanderbilt-mob.png" alt="Vanderbilt University" /></a>'+
    '    </div>'+
    '    <div class="vubrandbar collapse navbar-collapse">'+
    '        <ul class="nav navbar-nav navbar-right vu-toolbar">'+
    '            <li>'+
    '                  <!-- search form -->'+
    '                <form method="get" action="https://searchvu.vanderbilt.edu/search" class="navbar-form-expanded navbar-form navbar-left visible-lg-block visible-md-block visible-xs-block" role="search">'+
    '                    <div class="vu-toolbar__group input-group">'+SearchOptions+
    '                        <input type="hidden" name="output" value="xml_no_dtd"/>'+
    '                        <input type="hidden" name="getfields" value="*"/>'+
    '                        <input type="hidden" name="numgm" value="15"/>'+
    '                        <input type="text" class="form-control" data-width="80px" data-width-expanded="170px" placeholder="Search..." name="q" aria-label="text to search for">'+
    '                        <span class="vu-toolbar__group-btn input-group-btn">'+SearchDropdown+
    '                        </span>'+
    '                    </div>'+
    '                </form>'+
    '            </li>'+
    '            <!-- Logins -->'+
    '            <li class="dropdown">'+
    '                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="vubrandbar__icon glyphicon glyphicon-lock"></i>&nbsp; Logins <span class="caret"></span></a>'+
    '                <ul class="dropdown-menu">'+
    '                    <li> <a href="http://gmail.vanderbilt.edu">VUGmail</a></li>'+
    '                    <li><a href="http://email.vanderbilt.edu">VMail</a></li>'+
    '                    <li><a href="http://yes.vanderbilt.edu/">YES</a></li>'+
    '                    <li><a href="http://www.vanderbilt.edu/brightspace/">Brightspace</a></li>'+
    '                    <li><a href="https://webapp.mis.vanderbilt.edu/c2hr/">C2HR</a></li>'+
    '                    <li><a href="https://anchorlink.vanderbilt.edu/account/logon">Anchor Link</a></li>'+
    '                </ul>'+
    '            </li>'+
    '            <!-- Resources -->'+
    '            <li class="dropdown">'+
    '                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="vubrandbar__icon glyphicon glyphicon-cog"></i>&nbsp; Resources <span class="caret"></span></a>'+
    '                <ul class="dropdown-menu">'+
    '                    <li><a href="http://vu.edu/peoplefinder">PeopleFinder</a></li>'+
    '                    <li><a href="http://www.library.vanderbilt.edu/">Libraries</a></li>'+
    '                    <li><a href="http://news.vanderbilt.edu">News</a></li>'+
    '                    <li><a href="http://events.vanderbilt.edu">Calendar</a></li>'+
    '                    <li><a href="http://www.vanderbilt.edu/map/">Maps</a></li>'+
    '                    <li><a href="http://www.vanderbilt.edu/atoz/letter/A">A-Z</a></li>'+
    '                    <li><a href="https://social.vanderbilt.edu">Get Social</a></li>'+
    '                </ul>'+
    '            </li>'+
    '            <!-- Explore VU -->'+
    '            <li class="dropdown">'+
    '                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="vubrandbar__icon glyphicon glyphicon-th"></i>&nbsp; Explore VU <span class="caret"></span></a>'+
    '                <ul class="dropdown-menu">'+
    '                    <li><a href="http://www.vanderbilt.edu/about/">About</a></li>'+
    '                    <li><a href="http://www.vanderbilt.edu/prospective/">Admissions</a></li>'+
    '                    <li><a href="http://www.vanderbilt.edu/academics/">Academics</a></li>'+
    '                    <li><a href="http://research.vanderbilt.edu/">Research</a></li>'+
    '                    <li><a href="http://www.vanderbilt.edu/student/">Students</a></li>'+
    '                    <li><a href="http://www.vanderbilt.edu/faculty-staff/">Faculty &amp; Staff</a></li>'+
    '                    <li><a href="http://www.vucommodores.com/">Athletics</a></li>'+
    '                    <li class="last"><a href="http://www.mc.vanderbilt.edu/">Medical Center</a></li>'+
    '                </ul>'+
    '            </li>'+
    '        </ul>'+
    '    </div>'+
    '</div>'+
    '</nav>'+
    '<script type="text/javascript" src="https://s3.amazonaws.com/vu-www4/brandbar/emergency.js"></script>';
document.body.insertAdjacentHTML('afterbegin', vuTopBar);