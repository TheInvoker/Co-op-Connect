var RESOURCE_MODULE = new function() {
    
    var page = 0,
        context = "#resource-page";

    $(context).on('click', "#resource-showmore-button", function() {
        
        runAJAXSerial('', {
            page : 'resource/getresources',
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
        
        runAJAXSerial('', {
            page : 'resource/getresources',
            pageindex : 0
        }, function(response) {
			
			// update global vars
            page = 1;
            
            changePage(context, function(){});
            
            // clear
            emptyScreen();
            
            // add resource items
            displayResource(response);
            
			// update numbers on menu
			MENU_MODULE.runGetCount();
			
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
            myListContent += formatResource(obj);
        }
        
        list.append(myListContent);
    };

    var formatResource = function(obj) {
        var str = '<table class="multiline' + checkNew(obj) + '">';
		str += '<tr>';
        str += '<td title="Description" valign="top"><img src="images/site/svg/note.svg" class="resource-small-icon myicon" /></td><td>' + Autolinker.link(obj['text']) + '</td>';
        str += '</tr><tr>';
		str += '<td title="Last Updated" valign="top"><img src="images/site/svg/date.svg" class="resource-small-icon myicon" /></td><td>' + obj['date_modified'] + '</td>';
        str += '</tr>';
		str += '</table>';
        return str;
    };
	
    var checkNew = function(obj) {
        if (obj['new']=='1') {
            return ' new_item'; 
        }
        return '';
    };
};