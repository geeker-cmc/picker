var gulp=require("gulp"),
	webserver=require("gulp-webserver");	
	gulp.task("watch",function(){
		gulp.watch("./*");
	})
	gulp.task("server",function(){
		gulp.src("./")
		.pipe(webserver({
			livereload:true,
			directoryListing:true,
			open:true
		}))
	});
	gulp.task("default",["watch","server"])