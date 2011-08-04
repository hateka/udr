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
    }
    
    
    
};



$(function(){$('#cont')
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
		e.preventDefault();
		return false;

	});
    });