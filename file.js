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
		//alert('ok');
            }else{
                check = false;
		//alert('no');
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

Hand.prototype = {
    event:function(f){
	//alert(f.style.top);
	f.addEventListener('mousedown',this.drag,false);
    },
    drag:function(e){
	alert(e.target.className);
    }

};


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



