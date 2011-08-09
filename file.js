var image = /image.*/;

var File = function(){};

File.prototype = {
    file_count:function(f){
	if(f.length == 0){
	    return;
        }else{
	    this.check_type(f);
        }
    },
    check_type:function(f){
        var check = false;
        for(var i=0;i<f.length;i++){
	    if(f[i].type.match(image)){
                check = true;
		this.add_file(f[i]);
            }else{
                check = false;
		break;
            }
	}
        if(!check){
	    alert('image only!');
        }
    },
    add_file:function(f){
        var thum = document.createElement('div');
        thum.className = 'image_thum';
        $('#thum').append(thum);
        var img = new Image();
        img.className = f.name;
	img.style.margin = '10px';
	img.style.position = 'absolute';
        thum.appendChild(img);
        var p = new Hand();
        p.event(thum);
	this.file_read(f,function(c){
		img.src = c;
	    });
    },
    file_read:function(f,callback){
        var r = new FileReader();

        r.onload = function(e){
	    if(callback){
		callback(r.result);
            }
	}

        r.onerror = function(){
	    switch(r.error.code){
	     case FileError.NOT_FOUND_ERR:
	       alert('missing file');
	       break;
             case FileError.NOT_READABLE_ERR:
	       alert('can not read');
               break;
            }
	}
        r.readAsDataURL(f);
    }
    
};

var Hand = function(){};
var offsetX = '';
var offsetY = '';
var x = '';
var y = '';
var drag = false;
var elem;

Hand.prototype = {
    event:function(f){
	addE(document,'mousedown',function(e){
		drag = true;
		var rect = f.getBoundingClientRect();
		elem = f;
		x = e.layerX;
		y = e.layerY;
		//alert(x);
		addE(document,'mousemove',move);
        });
	addE(document,'mouseup',function(e){
		if(drag){
		    drag = false;
		    reE(document,'mousemove',move);
		    var rect = f.getBoundingClientRect();
		    
		}
	});
    }
};

var addE = function(node,type,listen){
    node.addEventListener(type,listen,false);
};

var reE = function(node,type,listen){
    node.removeEventListener(type,listen,false);
};

function move(e){
    if(drag){
	e.target.style.left = e.pageX -x  +'px';
	e.target.style.top = e.pageY - y +'px';
    }
    
}

$(function(){$('body')
        .bind("dragover", function(){
            this.className = 'hover';
            return false;
        })
        .bind("dragend", function(){
            this.className = '';
            return false;
        })
        .bind('drop',function(e){
		var f = new File();
		f.file_count(e.originalEvent.dataTransfer.files);
		$('#intro').css('display','none');
		e.preventDefault();
		return false;
	});
    });



