# JSLightGrid
JSLightGrid- javascript grid plugin

 	Name: JSLightGrid
 	Version: 1.0.1
 	Owner: Chanakya Chatterjee (chatterjee.chanakya@gmail.com)
 	Files:  JSLightGrid-1.0.1.js  (28kb), JSLightGrid-1.0.1.css (8kb)
 	Description: It’s a javascript grid plugin. Its pure javascript, does not require any other library (like jquery).  It’s a fluidic design, supported in standard desktop, laptop, ipad and mobile resolutions. The grid can be used with KnockoutJS, AngularJS as well. The developer may write a custom binding for that or can just use straight away.
 	Supported browser: IE (tested in IE9,10,11), Chrome (tested in version 46.0.2490.80), Safari, Firefox
 	Performance: Performance is tested against datasets of 200, 2000 and 4000 records in Core I5 1.6GHz, 4GB RAM machine. 
Result in IE (2000records): 
	Bind: 98 milliseconds  
	Client side sort: 52 milliseconds
	Pagination for template1 (please see below for templates): 93 milliseconds 
	Pagination for template1: 166 milliseconds
 	Options:
Following are the properties of the grid which can be set-
Grid Options	Option	Description	Default
	Data	Data set	[]
	colDesc	Column description. Please see below for details	[]
	OddCSS	CSS class for odd rows	oddRow
	EvenCSS	CSS class for even rows	evenRow
	HeaderCSS	CSS class for header row	headerRow
	FooterCSS	CSS class for footer	footer
	ShowFooter	to display footer section	TRUE
	Editable	to make grid cells editable	FALSE
	pageSize	no of records per page	Null
	Template	see details below	1
	IsSortable	makes headers clickable to sort	TRUE
	MoreButtonText	required for template 2	More
	TotalItemText	Shown at the footer section	Total Items
	FooterWidth	if not set then it will calculate as per the grid width	Null
	ShowDirtyFlag	to identify dirty rows	FALSE
	NextButtonText	Shown at the footer section for template 1	Next
	PrevButtonText	Shown at the footer section for template 1	Prev
	CurrentPageText	Shown at the footer section for template 1	Current Page
ColDesc	Name	Dataset field name	
	DisplayName	Col header display name	
	Width	Col width in %	
	Type	set to "select" if a dropdown is required in the grid cell, for any other control no need to set anything	
	Data	Only required if a dropdown is required in the cell. It is the data source of the dropdown. It expects key, vale. See example below	
	Html	Set html template for column. Specify field data using "{{}}". See example below	
Template	1	Show next and prev button in footer. Loads the next or previous set of data on click of next and prev buttons accordingly 	
	2	Shows more button in grid footer. On click of more button the next result set is appended to the previous set	
Grid Functions	getDirtyData(divID)	Returns only modified records(applicable for editable grid)	
	getData(divID)	Returns current page data	










 	Example:
HTML:

<script type="text/javascript" src="../JSLightGrid-1.0.1.js"></script>
<link rel="stylesheet" type="text/css" href="../JSLightGrid-1.0.1.css" />

<div id="dvGrid">
</div>

Javascript:

//col description 
var cols = [
            { Name: 'name',DisplayName:'User Name', Width: 28, type: '', Html: '<span onclick="alert(\'{{description}}\')">{{name}}</span>' },
            { Name: 'description', Width: 28, type: '' },
            { Name: 'age', Width: 28, type: 'select', data: [{ key: 1, value: "one" }, { key: 2, value: "two" }, { key: 108, value: "hundred eight" }, { key: 15, value: "fifteen" }] }
        ];
//initialize grid
var grid= JSLightGrid({
            ElementID: "dvGrid",
            data: getData(),
            colDesc: cols,
            Editable: true,
            pageSize: 20,
           ShowDirtyFlag: true,
           ShowFooter:true,
            template: 2,
           CurrentPageText:"Showing"
       });
//get dirty data
var dirtyRecords=this.grid.getDirtyData("dvGrid");
 	Known Bug: Footer width is not being calculated accurately if not supplied
Please use the grid and let me if you find any issue or do any fix so that I can update accordingly.
Thanks and regards,
Chanakya
(chatterjee.chanakya@gmail.com)
