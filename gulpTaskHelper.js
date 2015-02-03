/**
 * Gulp and Elixir helper
 * @author Julien Duseyau
 * @version 0.1.1
 */

/**
 * Require Laravel's Elixir
 */
var elixir = require('laravel-elixir');

/**
 * GulpTaskHelper
 *
 * @param I
 * @returns {*|{}}
 * @constructor
 */
var GulpTaskHelper = function(I) {

	I = I || {};

	/**
	 * Resource directory
	 *
	 * @type {string|*}
	 */
	I.assetsSrc = I.assetsSrc || 'resources/assets/';

	/**
	 * Bower directory
	 *
	 * @type {string|*}
	 */
	I.bowerScr = I.bowerScr || 'bower_components/';

	/**
	 * Default copy destination directory
	 *
	 * @type {string|*}
	 */
	I.defaultCopyDest = I.defaultCopyDest || 'public/assets/';

	/**
	 * CSS copy destination directory
	 *
	 * @type {string|*|string|*}
	 */
	I.cssCopyDest = I.cssCopyDest || I.defaultCopyDest;

	/**
	 * JS copy destination directory
	 *
	 * @type {string|*|string|*}
	 */
	I.jsCopyDest = I.jsCopyDest || I.defaultCopyDest;

	/**
	 * Less compile destination directory
	 *
	 * @type {string|*|string|*}
	 */
	I.lessDest = I.lessDest || I.defaultCopyDest;

	/**
	 * Sass compile destination directory
	 *
	 * @type {string|*|string|*}
	 */
	I.sassDest = I.sassDest || I.defaultCopyDest;

	/**
	 * Minify destination directory
	 *
	 * @type {string|*|string|*}
	 */
	I.minDest = I.minDest || I.defaultCopyDest;

	/**
	 * Version compile destination directory
	 *
	 * @type {string|*|string|*}
	 */
	I.versionDest = I.versionDest || I.defaultCopyDest;

	/**
	 * Add a trailing slash
	 *
	 * @param str
	 * @returns {string}
	 */
	var trailSlash = function(str) {
		return (str + '/').replace('//', '/');
	}

	/**
	 * Slash trail paths
	 */
	I.assetsSrc = trailSlash(I.assetsSrc);
	I.bowerScr = trailSlash(I.bowerScr);
	I.defaultCopyDest = trailSlash(I.defaultCopyDest);
	I.cssCopyDest = trailSlash(I.cssCopyDest);
	I.jsCopyDest = trailSlash(I.jsCopyDest);
	I.minDest = trailSlash(I.minDest);

	/**
	 * Array of task objects
	 *
	 * @type {Array|*}
	 */
	I.copyTasks = I.copyTasks || [];

	/**
	 * Array of css task names
	 *
	 * @type {Array|*}
	 */
	I.minifyCssTasks = I.minifyCssTasks || [];

	/**
	 * Array of js task names
	 *
	 * @type {Array|*}
	 */
	I.minifyJsTasks = I.minifyJsTasks || [];

	/**
	 * Array of files names to minify
	 *
	 * @type {Array|*}
	 */
	I.versionTasks = I.versionTasks || [];

	/**
	 * Array of files names to less compile
	 *
	 * @type {Array|*}
	 */
	I.lessTasks = I.lessTasks || [];

	/**
	 * Array of files names to sass compile
	 *
	 * @type {Array|*}
	 */
	I.sassTasks = I.sassTasks || [];

	/**
	 * Push an array of files in the copy tasksArray array
	 *
	 * @param items
	 * @param tasksArray
	 * @param path
	 * @returns {*}
	 */
	I.pushTasksToTasksArray = function(items, tasksArray, path) {
		var pushItems = [];
		if(typeof items == 'object' && items.length > 0) {
			items.forEach(function(item) {
				pushItems.push(path + item.replace(I.assetsSrc, ''));
			});
			tasksArray = pushItems;
		}
		return tasksArray;
	}

	/**
	 * Add an array of file to the less compile tasks
	 *
	 * @param items
	 */
	I.addLessTasks = function(items) {
		I.lessTasks = I.pushTasksToTasksArray(items, I.lessTasks, I.lessDest);
	}

	/**
	 * Add an array of file to the sass compile tasks
	 *
	 * @param items
	 */
	I.addSassTasks = function(items) {
		I.sassTasks = I.pushTasksToTasksArray(items, I.sassTasks, I.sassDest);
	}

	/**
	 * Pushes a task object to the copyTasks array with a name and a type
	 *
	 * @param items
	 * @param taskName
	 * @param [taskType]
	 */
	I.addCopyTask = function(items, taskName, taskType) {
		var taskName = taskName || 'stylesheets';
		var taskType = taskType || 'default';
		var items = items || [];
		var existingTask = null;

		I.copyTasks.forEach(function(task, index) {
			if(task.taskName == taskName) {
				existingTask = index;
			}
		});

		if(existingTask !== null) {
			I.copyTasks[existingTask].items = items
		} else {
			I.copyTasks.push({
				taskType: taskType,
				taskName: taskName,
				items: items
			});
		}
	}

	/**
	 * Add an array of files to a named copy task of type 'cssCopy'
	 *
	 * @param items
	 * @param taskName
	 */
	I.addCssCopyTask = function(items, taskName) {
		taskName = taskName || 'stylesheets';
		I.addCopyTask(items, taskName, 'cssCopy');
	}

	/**
	 * Add an array of files to a named copy task of type 'jsCopy'
	 *
	 * @param items
	 * @param taskName
	 */
	I.addJsCopyTask = function(items, taskName) {
		taskName = taskName || 'javascripts';
		I.addCopyTask(items, taskName, 'jsCopy');
	}

	/**
	 * Add a copy task name to the css minify tasks
	 *
	 * @param taskNames
	 */
	I.minifyCssCopyTask = function(taskName) {
		I.minifyCssTasks.push(taskName);
	}

	/**
	 * Add an array of copy task name to the css minify tasks
	 *
	 * @param taskNames
	 */
	I.minifyCssCopyTasks = function(taskNames) {
		taskNames.forEach(function(taskName) {
			I.minifyCssCopyTask(taskName);
		});
	}

	/**
	 * Add a copy task name to the js minify tasks
	 *
	 * @param taskNames
	 */
	I.minifyJsCopyTask = function(taskName) {
		I.minifyJsTasks.push(taskName);
	}

	/**
	 * Add an array of copy task name to the js minify tasks
	 *
	 * @param taskNames
	 */
	I.minifyJsCopyTasks = function(taskNames) {
		taskNames.forEach(function(taskName) {
			I.minifyJsCopyTask(taskName);
		});
	}

	/**
	 * Get all destination path of a copy task by name
	 *
	 * @param taskName
	 * @returns {Array}
	 */
	I.getCopyTaskItemsByTaskName = function(taskName) {
		var taskName = taskName;
		var destinationPaths = [];
		I.copyTasks.forEach(function(task, index) {
			if(task.taskName == taskName) {

				task.items.forEach(function(item, index) {
					var i = 0;
					if(item.length > 1) i = 1;

					destinationPaths.push(item[i]);
				});

			}
		});
		return destinationPaths;
	}

	/**
	 * Get all destination path of a copy task by type
	 *
	 * @param taskName
	 * @returns {Array}
	 */
	I.getCopyTaskItemsByTaskType = function(taskType) {
		var taskType = taskType;
		var destinationPaths = [];
		I.copyTasks.forEach(function(task, index) {
			if(task.taskType == taskType) {

				task.items.forEach(function(item, index) {
					var i = 0;
					if(item.length > 1) i = 1;

					destinationPaths.push(item[i]);
				});

			}
		});
		return destinationPaths;
	}

	/**
	 * List all copy tasks
	 */
	I.listCopyTasks = function() {
		I.copyTasks.forEach(function(task, index) {
			console.log('=== ' + task.taskName + '<' + task.taskType + '> ===');
			console.log(I.getCopyTaskItemsByTaskName(task.taskName));
			console.log('========================');
		})
	}

	/**
	 * List all css minify tasks
	 */
	I.listMinifyCssTasks = function() {
		console.log('=== CSS To minify ===');
		I.minifyCssTasks.forEach(function(task, index) {
			console.log('> ' + task);
		})
	}

	/**
	 * List all js minify tasks
	 */
	I.listMinifyCssTasks = function() {
		console.log('=== JS To minify ===');
		I.minifyJsTasks.forEach(function(task, index) {
			console.log('> ' + task);
		})
	}

	/**
	 * Add an array of file for elixir version
	 *
	 * @param items
	 */
	I.addVersionTasks = function(items) {
		I.versionTasks = I.pushTasksToTasksArray(items, I.versionTasks, I.versionDest);
	}



	/**
	 * Perform minify tasks
	 *
	 * @param mix
	 */
	I.elixirMinify = function(mix) {
		var mix = mix;

		// Minify CSS
		I.minifyCssTasks.forEach(function(taskName, index) {
			var items = I.getCopyTaskItemsByTaskName(taskName);
			var items_ = [];

			if(items.length > 0) {
				items.forEach(function(item) {
					items_.push(I.minDest + item.replace(I.assetsSrc, ''));
				});
				mix.styles(items_, I.minDest + taskName, "./");
			}
		});

		// Minify JS
		I.minifyJsTasks.forEach(function(taskName, index) {
			var items = I.getCopyTaskItemsByTaskName(taskName);
			var items_ = [];

			if(items.length > 0) {
				items.forEach(function(item) {
					items_.push(I.minDest + item.replace(I.assetsSrc, ''));
				});
				mix.scripts(items_,  I.minDest + taskName, "./");
			}
		});
	}

	/**
	 * Perform a elixir copy for a task
	 *
	 * @param task
	 * @param copyDest
	 * @param mix
	 */
	I.elixirCopyTask = function(task, copyDest, mix) {
		task.items.forEach(function(item) {
			var i = 0;
			if(item.length > 1) i = 1;
			mix.copy(
				item[0],
				copyDest + '/' + item[i].replace(I.assetsSrc, '')
			);
		});
	}

	/**
	 * Perform a elixir copy for all tasks
	 *
	 * @param task
	 * @param copyDest
	 * @param mix
	 */
	I.elixirCopy = function(mix) {
		var tasks = I.copyTasks;
		var mix = mix;

		tasks.forEach(function(task) {
			var copyDest = I.defaultCopyDest;

			if(task.taskType == 'cssCopy') {
				copyDest = I.cssCopyDest;
			}

			if(task.taskType == 'jsCopy') {
				copyDest = I.jsCopyDest;
			}

			I.elixirCopyTask(task, copyDest, mix);
		});
	}

	/**
	 * Perform elixir less for all less tasks
	 *
	 * @param mix
	 */
	I.elixirLess = function(mix) {
		I.lessTasks.forEach(function(task) {
			mix.less([task.replace(I.defaultCopyDest, '')]);
		});
	}

	/**
	 * Perform elixir sass for all sass tasks
	 *
	 * @param mix
	 */
	I.elixirSass = function(mix) {
		if (I.sassTasks.length > 0) {
			mix.sass(I.sassTasks);
		}
	}

	/**
	 * Perform elixir version for all version tasks
	 *
	 * @param mix
	 */
	I.elixirVersion = function(mix) {
		if(I.versionTasks.length > 0) {
			mix.version(I.versionTasks);
		}
	}

	/**
	 * Run tasks
	 */
	I.run = function() {
		elixir(function(mix) {
			I.elixirLess(mix);
			I.elixirSass(mix);
			I.elixirCopy(mix);
			I.elixirMinify(mix);
			I.elixirVersion(mix);
		});
	}

	return I;
}

module.exports = GulpTaskHelper;
