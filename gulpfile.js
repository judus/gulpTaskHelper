var GulpTaskHelper = require('./gulpTaskHelper');

/**
 *    Config
 */
var assetsSrc = 'resources/assets/';
var bowerSrc = 'bower_components/';
var cssOutput = 'public/assets/';
var jsOutput = 'public/assets/';

/**
 * Required stylesheets
 */
var stylesheets = [
	[assetsSrc + 'vendorA/plugins/jquery-ui/themes/base/minified/jquery-ui.min.css'],
	[assetsSrc + 'vendorA/plugins/bootstrap/css/bootstrap.min.css'],
	[assetsSrc + 'vendorA/plugins/font-awesome/css/font-awesome.min.css'],
	[assetsSrc + 'vendorA/css/theme/default.css'],
	[assetsSrc + 'vendorA/css/animate.min.css'],
	[assetsSrc + 'vendorA/css/style.min.css'],
	[assetsSrc + 'vendorA/css/style-responsive.min.css'],
	[assetsSrc + 'vendorA/plugins/jquery-jvectormap/jquery-jvectormap-1.2.2.css'],
	[assetsSrc + 'vendorA/plugins/bootstrap-datepicker/css/datepicker.css'],
	[assetsSrc + 'vendorA/plugins/bootstrap-datepicker/css/datepicker3.css'],
	[assetsSrc + 'vendorA/plugins/gritter/css/jquery.gritter.css'],
	[assetsSrc + 'vendorA/plugins/DataTables/css/data-table.css'],
	[assetsSrc + 'vendorB/css/main.css']
];

/**
 * Optional theme stylesheets
 */
var theme = [
	[assetsSrc + 'vendorB/css/theme/green.css']
]

/**
 * Required javascripts
 */
var javascripts = [
	[assetsSrc + 'vendorA/plugins/jquery/jquery-1.9.1.min.js'],
	[assetsSrc + 'vendorA/plugins/jquery/jquery-migrate-1.1.0.min.js'],
	[assetsSrc + 'vendorA/plugins/jquery-ui/ui/minified/jquery-ui.min.js'],
	[assetsSrc + 'vendorA/plugins/bootstrap/js/bootstrap.min.js'],
	[assetsSrc + 'vendorA/plugins/slimscroll/jquery.slimscroll.min.js'],
	[assetsSrc + 'vendorA/plugins/jquery-cookie/jquery.cookie.js'],
	[assetsSrc + 'vendorA/js/login-v2.demo.min.js'],
	[assetsSrc + 'vendorA/plugins/flot/jquery.flot.min.js'],
	[assetsSrc + 'vendorA/plugins/flot/jquery.flot.time.min.js'],
	[assetsSrc + 'vendorA/plugins/flot/jquery.flot.pie.min.js'],
	[assetsSrc + 'vendorA/plugins/flot/jquery.flot.resize.min.js'],
	[assetsSrc + 'vendorA/plugins/sparkline/jquery.sparkline.js'],
	[assetsSrc + 'vendorA/plugins/jquery-jvectormap/jquery-jvectormap-1.2.2.min.js'],
	[assetsSrc + 'vendorA/plugins/jquery-jvectormap/jquery-jvectormap-world-mill-en.js'],
	[assetsSrc + 'vendorA/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js'],
	[assetsSrc + 'vendorA/plugins/DataTables/js/jquery.dataTables.js'],
	[bowerSrc + 'jquery-datatables-column-filter/jquery.dataTables.columnFilter.js'],
	[bowerSrc + 'bootstrap.dropdown/dropdown.min.js'],
	[assetsSrc + 'vendorA/js/apps.min.js'],
	[assetsSrc + 'vendorB/js/dashboard.js'],
	[assetsSrc + 'vendorB/js/app.js']
];

/**
 * Requires images, fonts, files
 */
var media = [
	[assetsSrc + 'vendorA/plugins/DataTables/img'],
	[assetsSrc + 'vendorA/plugins/font-awesome/fonts'],
	[assetsSrc + 'vendorA/crossbrowserjs']
]

/**
 * Get a GulpTaskHelper instance
 */
var gulpTasks = GulpTaskHelper({
	assetsSrc: assetsSrc,
	bowerScr: bowerSrc,
	cssCopyDest: cssOutput,
	jsCopyDest: jsOutput
});

/**
 * Compile less/sass
 */
gulpTasks.addLessTasks(['acme.less', 'vendor.less']);

/**
 * Copy assets from resource directory to destination
 */
gulpTasks.addCssCopyTask(stylesheets, 'acme.min.css');
gulpTasks.addCssCopyTask(theme, 'acme.green.min.css');
gulpTasks.addJsCopyTask(javascripts, 'acme.min.js');
gulpTasks.addCopyTask(media, 'media');

/**
 * Minify files from a copy task
 */
gulpTasks.minifyCssCopyTask(['acme.min.css', 'acme.green.min.css']);
gulpTasks.minifyJsCopyTasks(['acme.min.js']);

/**
 * Version files
 */
gulpTasks.addVersionTasks(['acme.min.css', 'acme.green.min.css', 'acme.min.js']);

/**
 * Execute all copyTasks
 */
gulpTasks.run();