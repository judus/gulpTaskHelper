var elixir = require('laravel-elixir');

var GulpTaskHelper = function(I) {

	I = I || {};

	I.assetsSrc = I.assetsSrc || 'resources/assets/';
	I.bowerScr = I.bowerScr || 'bower_components/';
	I.cssOutput = I.cssOutput || 'public/css/';
	I.jsOutput = I.jsOutput || 'public/js/';

	I.tasks = I.tasks || [];
	I.cssMinifyTasks = I.cssMinifyTasks || [];
	I.jsMinifyTasks = I.jsMinifyTasks || [];
	I.versionTasks = I.versionTasks || [];
	I.lessTasks = I.lessTasks || [];
	I.sassTasks = I.sassTasks || [];

	I.addCssCopyTask = function(items, taskName) {
		taskName = taskName || 'stylesheets';
		I.addCopyTask(items, taskName, 'cssCopy');
	}

	I.addJsCopyTask = function(items, taskName) {
		taskName = taskName || 'javascripts';
		I.addCopyTask(items, taskName, 'jsCopy');
	}

	I.addCopyTask = function(items, taskName, taskType) {
		var taskName = taskName || 'stylesheets';
		var taskType = taskType || 'default';
		var items = items || [];
		var existingTask = null;

		I.tasks.forEach(function(task, index) {
			if(task.taskName == taskName) {
				existingTask = index;
			}
		});

		if(existingTask !== null) {
			I.tasks[existingTask].items = items
		} else {
			I.tasks.push({
				taskType: taskType,
				taskName: taskName,
				items: items
			});
		}
	}

	I.addVersionTasks = function(items) {
		var items_ = [];
		if(items.length > 0) {
			items.forEach(function(item) {
				items_.push('assets/' + item.replace(I.assetsSrc, ''));
			});
		}
		I.versionTasks = items_;
	}

	I.addLessTasks = function(items) {
		var items_ = [];
		if(items.length > 0) {
			items.forEach(function(item) {
				items_.push('assets/' + item.replace(I.assetsSrc, ''));
			});
		}
		I.lessTasks = items_;
	}

	I.addSassTasks = function(items) {
		var items_ = [];
		if(items.length > 0) {
			items.forEach(function(item) {
				items_.push('assets/' + item.replace(I.assetsSrc, ''));
			});
		}
		I.sassTasks = items_;
	}

	I.listCopyTasks = function() {
		I.tasks.forEach(function(task, index) {
			console.log('=== ' + task.taskName + ' ===');
			console.log(I.getTaskItemsByTaskName(task.taskName));
			console.log('========================');
		})
	}

	I.listMinifyTasks = function() {
		console.log('=== To minify ===');
		I.cssMinifyTasks.forEach(function(task, index) {
			console.log('=== ' + task);
		})
	}

	I.getTaskItemsByTaskName = function(taskName) {
		var taskName = taskName;
		var copies = [];
		I.tasks.forEach(function(task, index) {
			if(task.taskName == taskName) {

				task.items.forEach(function(item, index) {
					var i = 0;
					if(item.length > 1) i = 1;

					copies.push(item[i]);
				});

			}
		});
		return copies;
	}

	I.getTaskItemsByTaskType = function(taskType) {
		var taskType = taskType;
		var copies = [];
		I.tasks.forEach(function(task, index) {
			if(task.taskType == taskType) {

				task.items.forEach(function(item, index) {
					var i = 0;
					if(item.length > 1) i = 1;

					copies.push(item[i]);
				});

			}
		});
		return copies;
	}

	I.getMinifiedList = function() {
		return I.cssMinifyTasks;
	}

	I.addCssMinifyTasks = function(taskNames) {
		taskNames.forEach(function(taskName) {
			I.cssMinifyTasks.push(taskName);
		});
	}

	I.addJsMinifyTasks = function(taskNames) {
		taskNames.forEach(function(taskName) {
			I.jsMinifyTasks.push(taskName);
		});
	}

	I.elixirLess = function(mix) {
		I.lessTasks.forEach(function(item) {
			mix.less(item);
		});
	}

	I.elixirSass = function(mix) {
		I.lessTasks.forEach(function(item) {
			mix.less(item);
		});
	}

	I.elixirMinify = function(mix) {
		var mix = mix;

		I.cssMinifyTasks.forEach(function(taskName, index) {
			var items = I.getTaskItemsByTaskName(taskName);
			var items_ = [];

			if(items.length > 0) {
				items.forEach(function(item) {
					items_.push('assets/' + item.replace(I.assetsSrc, ''));
				});
				mix.styles(items_, I.cssOutput + taskName, "public");
			}
		});

		I.jsMinifyTasks.forEach(function(taskName, index) {
			var items = I.getTaskItemsByTaskName(taskName);
			var items_ = [];

			if(items.length > 0) {
				items.forEach(function(item) {
					items_.push('assets/' + item.replace(I.assetsSrc, ''));
				});
				mix.scripts(items_, I.jsOutput + taskName, "public");
			}
		});
	}

	I.elixirCopy = function(mix) {
		var tasks = I.tasks;
		var cssOutput = I.cssOutput;
		var jsOutput = I.jsOutput;

		tasks.forEach(function(task) {

			if(task.taskType == 'cssCopy') {
				task.items.forEach(function(item) {
					var i = 0;
					if(item.length > 1) i = 1;
					mix.copy(
						item[0], cssOutput + '/' + item[i].replace(I.assetsSrc, '')
					);
				});
			}

			if(task.taskType == 'jsCopy') {
				task.items.forEach(function(item) {
					var i = 0;
					if(item.length > 1) i = 1;
					mix.copy(
						item[0], jsOutput + '/' + item[i].replace(I.assetsSrc, '')
					);
				});
			}

			if(task.taskType == 'default') {
				task.items.forEach(function(item) {
					var i = 0;
					if(item.length > 1) i = 1;
					mix.copy(
						item[0], jsOutput + '/' + item[i].replace(I.assetsSrc, '')
					);
				});
			}

		});
	}

	I.elixirVersion = function(mix) {
		if (I.versionTasks.length > 0) {
			mix.version(I.versionTasks);
		}
	}

	I.elixirLess = function(mix) {
		if (I.lessTasks.length > 0) {
			mix.less(I.lessTasks);
		}
	}

	I.elixirSass = function(mix) {
		if (I.sassTasks.length > 0) {
			mix.sass(I.sassTasks);
		}
	}

	I.elixirVersion = function(mix) {
		if (I.versionTasks.length > 0) {
			mix.version(I.versionTasks);
		}
	}

	I.execute = function() {
		elixir(function(mix) {
			I.elixirLess(mix);
			I.elixirCopy(mix);
			I.elixirMinify(mix);
			I.elixirVersion(mix);
		});
	}

	return I;
}

module.exports = GulpTaskHelper;
