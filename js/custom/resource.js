var RESOURCE_MODULE_OBJ = function() {
    
    var page = 0,
        context = "#resource-page";

    $(context).on('click', "#more-resource-button", function() {
        
        var user = GLOBAL_DATA.user;
        
        runAJAXSerial('', {
            page : 'resource/getresources',
            id : user['id'],
            pageindex : page
        }, function(response) {
            page += 1;

            if (response.length > 0) {
                // add resource items
                displayResource(response);
            } else {
                alert("No more resources.");
            }
        }, function(data,status,xhr) {
            
        });
		
    });

    this.setResource = function() {
        
        var user = GLOBAL_DATA.user;

        runAJAXSerial('', {
            page : 'resource/getresources',
            id : user['id'],
            pageindex : 0
        }, function(response) {
			
			// update global vars
            page = 1;
            
            $.mobile.changePage(context, { 
                transition: "slide"
            });
            
            // clear
            emptyScreen();
            
            // add resource items
            displayResource(response);
            
        }, function(data,status,xhr) {
            
        });
    };

    var emptyScreen = function() {
        var list = $(context).find("#resource-list");
        list.empty();
    };
    
    var displayResource = function(response) {
        var list = $(context).find("#resource-list"), myListContent = "", i=0, l=response.length;
        
        for(i=0; i<l; i+=1) {
            var obj = response[i];
            myListContent += '<li' + checkNew(obj) + '>' + formatResource(obj) + '</li>';
        }
        
        list.append(myListContent).listview().trigger('create');
        list.listview('refresh');
    };
    
    var checkNew = function(obj) {
        if (obj['new']=='1') {
            return ' class="new_item"'; 
        }
        return '';
    };
    
    var formatResource = function(obj) {
        var str = '<table>';
        str += '<tr title="Description"><td valign="top"><span class="ui-icon-alert ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + Autolinker.link(obj['text']) + '</td></tr>';
        str += '<tr title="Last Updated"><td valign="top"><span class="ui-icon-calendar ui-btn-icon-left myicon"/></td><td valign="top" class="mywrap">' + obj['date_modified'] + '</td></tr>';
        str += '</table>';
        return str;
    };
};

var RESOURCE_MODULE = new RESOURCE_MODULE_OBJ();