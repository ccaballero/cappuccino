const path=require('path')

module.exports=(grunt)=>{
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        shell:{
            latex:{
                command:(doc)=>{
                    return [
                        'cd '+doc
                      , 'latex -interaction=nonstopmode '+doc+'.tex'
                      , 'dvipdf '+doc+'.dvi'
                    ].join('&&');
                }
            }
        }
      , watch:{
            tex:{
                files:['*/*.tex']
              , tasks:['shell:latex']
            }
        }
    });

    grunt.event.on('watch',(action,filepath,target)=>{
        var c=path.parse(filepath);
        grunt.config('watch.tex.tasks','shell:latex:'+c.dir);
    });

    grunt.registerTask('serve',[
        'watch'
    ]);
};

