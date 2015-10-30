
/*
 *
 * Version:1.0.1
 * Owner: Chanakya Chatterjee (chatterjee.chanakya@gmail.com)
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files , to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute,  and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * This commented section shall be included in
 * all copies of this file.
 *
 * This library is provided with no warrant and the owner will not be 
 * responsible for any issue caused by this library
 */

//Object.prototype.JSLightGrid=function(options) {
JSLightGrid = function JSLightGrid(options) {
    if (typeof options != 'undefined' && typeof options.colDesc != 'undefined' && options.colDesc != null && options.colDesc.length != 0) {
        var elem = options.ElementID ? document.getElementById(options.ElementID) : this;
        elem.style.display = "block";

        var tempData = [];
        var dv, dirtyColWidth = "2%";
        var propName, idx, colString = "", totalWidth = 0;
        var html = '';
        var footerWidth = "";

        //setting the default values

        var defaults = {
            data: [],
            colDesc: [],
            OddCSS: 'oddRow',
            EvenCSS: 'evenRow',
            HeaderCSS: 'headerRow',
            FooterCSS: 'footer',
            ShowFooter: true,
            Editable: false,
            pageSize: null,
            template: 1,
            IsInitial: true,
            currentPage: 0,
            IsSortable: true,
            SortBy: null,
            SortReverse: null,
            MoreButtonText: "More",
            TotalItemText: "Total Items",
            FooterWidth: null,
            ShowDirtyFlag: false,
            NextButtonText: "Next",
            PrevButtonText: "Prev",
            CurrentPageText: "Current Page"
        }
        this.Initialize = function (elem, gridOption) {
            if (typeof options.ElementID != 'undefined' && options.ElementID != null) {
                JSLightGrid({
                    ElementID: gridOption.ElementID,
                    data: gridOption.data,
                    colDesc: gridOption.colDesc,
                    OddCSS: gridOption.OddCSS,
                    EvenCSS: gridOption.EvenCSS,
                    HeaderCSS: gridOption.HeaderCSS,
                    FooterCSS: gridOption.FooterCSS,
                    ShowFooter: gridOption.ShowFooter,
                    Editable: gridOption.Editable,
                    pageSize: gridOption.pageSize,
                    template: gridOption.template,
                    IsInitial: gridOption.IsInitial,
                    currentPage: gridOption.currentPage,
                    IsSortable: gridOption.IsSortable,
                    SortBy: gridOption.SortBy,
                    SortReverse: gridOption.SortReverse,
                    MoreButtonText: gridOption.MoreButtonText,
                    TotalItemText: gridOption.TotalItemText,
                    FooterWidth: gridOption.FooterWidth,
                    ShowDirtyFlag: gridOption.ShowDirtyFlag,
                    NextButtonText: gridOption.NextButtonText,
                    PrevButtonText: gridOption.PrevButtonText,
                    CurrentPageText: opt.CurrentPageText
                });
            }
            else {
                elem.JSLightGrid({
                    data: gridOption.data,
                    colDesc: gridOption.colDesc,
                    OddCSS: gridOption.OddCSS,
                    EvenCSS: gridOption.EvenCSS,
                    HeaderCSS: gridOption.HeaderCSS,
                    FooterCSS: gridOption.FooterCSS,
                    ShowFooter: gridOption.ShowFooter,
                    Editable: gridOption.Editable,
                    pageSize: gridOption.pageSize,
                    template: gridOption.template,
                    IsInitial: gridOption.IsInitial,
                    currentPage: gridOption.currentPage,
                    IsSortable: gridOption.IsSortable,
                    SortBy: gridOption.SortBy,
                    SortReverse: gridOption.SortReverse,
                    MoreButtonText: gridOption.MoreButtonText,
                    TotalItemText: gridOption.TotalItemText,
                    FooterWidth: gridOption.FooterWidth,
                    ShowDirtyFlag: gridOption.ShowDirtyFlag,
                    NextButtonText: gridOption.NextButtonText,
                    PrevButtonText: gridOption.PrevButtonText,
                    CurrentPageText: opt.CurrentPageText
                });
            }
        }
        this.getData = function (elementId) {
            domElem = document.getElementById(elementId);
            var rows = domElem.getElementsByClassName("rowJSLightGrid");
            var cols;
            var data = [], object = {}, value;
            for (var i = 0; i < rows.length; i++) {
                cols = rows[i].getElementsByClassName("colJSLightGrid");
                object = {};
                for (var j = 0; j < cols.length; j++) {
                    value = cols[j].getAttribute("data-value");
                    // if (object[datacols[j].getAttribute("data-name")] != 'none')
                    object[cols[j].getAttribute("data-name")] = (typeof value != 'undefined' && value != null ? value : '');
                }
                data[i].push(object);
            }
            return data;

        }


        //get only the visible col's data
        this.getDataWIP = function (elementId) {
            domElem = document.getElementById(elementId);
            var rows = domElem.getElementsByClassName("rowJSLightGrid");
            var cols;
            var data = [], object = {}, value;
            for (var i = 0; i < rows.length; i++) {
                cols = rows[i].getElementsByClassName("colJSLightGrid");
                object = {};
                for (var j = 0; j < cols.length; j++) {
                    value = cols[j].getAttribute("data-value");
                    // if (object[datacols[j].getAttribute("data-name")] != 'none')
                    object[cols[j].getAttribute("data-name")] = (typeof value != 'undefined' && value != null ? value : '');
                }
                data[i].push(object);
            }
            return data;

        }

        //to get only the visible col's dirty data
        this.getDirtyColData = function (elementId) {
            domElem = document.getElementById(elementId);
            var rows = domElem.getElementsByClassName("rowJSLightGrid");
            var cols;
            var data = [], object = {}, value;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].getAttribute("data-isDirty") == "1") {
                    cols = rows[i].getElementsByClassName("colJSLightGrid");
                    object = {};
                    for (var j = 0; j < cols.length; j++) {
                        value = cols[j].getAttribute("data-value");
                        // if (object[datacols[j].getAttribute("data-name")] != 'none')
                        object[cols[j].getAttribute("data-name")] = (typeof value != 'undefined' && value != null ? value : '');
                    }
                    data[i].push(object);
                }
            }
            return data;

        }



        this.sort_by = function (field, reverse, primer) {
            if (typeof field != 'undefined') {
                reverse = !reverse;
                var key = function (x) { return primer ? primer(x[field]) : x[field] };

                return function (a, b) {
                    var A = key(a), B = key(b);
                    return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse];
                }
            }
        }

        this.extend = function (objDef, obj) {
            if (typeof objDef != 'undefined') {
                for (var key in obj)
                    if (obj.hasOwnProperty(key))
                        objDef[key] = obj[key];
                return objDef;
            }
        }

        this.removeSortArrow = function (element) {
            if (element.getElementsByClassName("uparrow").length > 0)
                element.removeChild(element.getElementsByClassName("uparrow")[0]);
            if (element.getElementsByClassName("downarrow").length > 0)
                element.removeChild(element.getElementsByClassName("downarrow")[0]);
        }

        this.opt = this.extend(defaults, options);

        //for dirty flag
        if (this.opt.ShowDirtyFlag) {
            this.JSLightGrid_updateDirty = function (rowId, parentId, obj) {
                document.getElementById(rowId).getElementsByClassName("dirty")[0].style.display = "block";
                document.getElementById(rowId).getElementsByClassName("dirty")[0].style.visibility = "visible";
                document.getElementById(rowId).setAttribute("data-isDirty", "1");
                document.getElementById(parentId).setAttribute("data-value", obj.value);
            }
        }
        //setting variables(will be removed later)
        var data = opt.data, colDesc = opt.colDesc, OddCSS = opt.OddCSS, EvenCSS = opt.EvenCSS, HeaderCSS = opt.HeaderCSS,
            FooterCSS = opt.FooterCSS, ShowFooter = opt.ShowFooter, Editable = opt.Editable, pageSize = opt.pageSize,
            template = opt.template, IsInitial = opt.IsInitial, currentPage = opt.currentPage, IsSortable = opt.IsSortable,
            SortBy = opt.SortBy, SortReverse = opt.SortReverse;

        if (typeof pageSize == 'undefined' || pageSize == null || pageSize == '') {
            pageSize = data.length;
        }

        var self = this;

        self.getDirtyData = function (elementId) {
            domElem = document.getElementById(elementId);
            var rows = domElem.getElementsByClassName("rowJSLightGrid");
            var cols;
            var data = [], value;
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].getAttribute("data-isDirty") == "1") {
                    cols = rows[i].getElementsByClassName("colJSLightGrid");
                    for (var j = 0; j < cols.length; j++) {
                        value = cols[j].getAttribute("data-value");
                        // if (object[datacols[j].getAttribute("data-name")] != 'none')
                        self.opt.data[i][cols[j].getAttribute("data-name")] = (typeof value != 'undefined' && value != null ? value : '');
                    }
                    data.push(self.opt.data[i]);
                }
            }
            return data;

        }


        //for reinitialize
        if (IsInitial) {
            while (elem.firstChild) {
                elem.removeChild(elem.firstChild);
            }
            //   elem.innerHTML = "";
        }
        if (!IsInitial) {
            var footer = elem.getElementsByClassName(FooterCSS)[0];
            if (typeof footer != 'undefined' && footer != null && elem.getElementsByClassName(FooterCSS).length != 0) {
                footerWidth = footer.style.width;
                footer.parentNode.removeChild(footer);
            }
            var grid = elem.getElementsByClassName("gridClass")[0];
            if (template == 2) {
                html = grid.innerHTML;
            }
            grid.parentNode.removeChild(grid);
        }
        dv = document.createElement("div");
        dv.className = "gridClass";
        tempData = data.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize);
        //if (template == 1) {
        //    tempData = data.slice(currentPage * pageSize, (currentPage * pageSize) + pageSize);
        //}
        //else if (template == 2) {
        //    tempData = data.slice(0, (currentPage * pageSize) + pageSize);
        //}
        if (opt.ShowDirtyFlag) {
            if (elem.style.width != "" && elem.style.width != 0 && elem.style.width.indexOf("px") > 0)
                dirtyColWidth = (20 * 100 / Number(elem.style.width.replace("px", "")));
            else
                dirtyColWidth = elem.offsetWidth != 0 ? (20 * 100 / elem.offsetWidth) : 2;
            totalWidth += dirtyColWidth;
            dirtyColWidth = (dirtyColWidth < 2 ? '2%' : dirtyColWidth.toString() + '%');
        }
        if (IsInitial || template != 2) {
            html = '<div class="' + HeaderCSS + '">';
            var i, j;
            // appending column headers
            if (opt.ShowDirtyFlag) {
                html += '<div id="dirty' + Math.random() + '" style="width:' + dirtyColWidth + ';" data-name="dirty"  class="colDiv"><div class="dirty"></div></div>';
            }
            for (i = 0; i < colDesc.length - 1; i++) {

                html += '<div style="width:' + colDesc[i].Width + '%;" data-name="' + colDesc[i].Name + '" id="' + colDesc[i].Name + Math.random() + '" class="colDiv"><span >' + (typeof colDesc[i].DisplayName == 'undefined' || colDesc[i].DisplayName == null ? colDesc[i].Name : colDesc[i].DisplayName) + '</span></div>';
                totalWidth += colDesc[i].Width;
            }
            html += '<div style="width:' + colDesc[i].Width + '%; " data-name="' + colDesc[i].Name + '" id="' + colDesc[i].Name + Math.random() + '" class="lastCol"><span >' + (typeof colDesc[i].DisplayName == 'undefined' || colDesc[i].DisplayName == null ? colDesc[i].Name : colDesc[i].DisplayName) + '</span></div>';
            html += '</div>';
            totalWidth += colDesc[i].Width;
        }

        //appending data 
        var rowID, colId;
        for (i = 0; i < tempData.length; i++) {

            rowID = 'dvRow' + Math.random().toString();
            html += '<div data-isDirty="0" id="' + rowID + '" class="rowJSLightGrid ' + (i % 2 == 0 ? EvenCSS : OddCSS) + '">';
            if (opt.ShowDirtyFlag) {
                html += '<div style="width:' + dirtyColWidth + ';" class="colDiv" data-value="0" data-name="dirty"><div style="display:none;" class="dirty"></div></div>';
            }
            for (j = 0; j < colDesc.length; j++) {
                colId = 'dvCol' + Math.random();
                if (j == colDesc.length - 1) {
                    html += '<div id="' + colId + '" data-name="' + colDesc[j].Name + '" data-value="' + (typeof tempData[i][colDesc[j].Name] == 'undefined' || tempData[i][colDesc[j].Name] == null ? '' : tempData[i][colDesc[j].Name]) + '" style="' + (colDesc[j].Width ? 'width:' + colDesc[j].Width + '%;' : '') + 'float:left;" class="colJSLightGrid lastCol' + (typeof colDesc[j].CSSClass == "undefined" ? '' : ' ' + colDesc[j].CSSClass) + '"  >';
                }
                else {
                    html += '<div id="' + colId + '" data-name="' + colDesc[j].Name + '" data-value="' + (typeof tempData[i][colDesc[j].Name] == 'undefined' || tempData[i][colDesc[j].Name] == null ? '' : tempData[i][colDesc[j].Name]) + '" style="' + (colDesc[j].Width ? 'width:' + colDesc[j].Width + '%;' : '') + '" class="colJSLightGrid colDiv' + (typeof colDesc[j].CSSClass == "undefined" ? '' : ' ' + colDesc[j].CSSClass) + '"  >';
                }
                if (typeof colDesc[j].Html != 'undefined' && colDesc[j].Html != null && colDesc[j].Html != '') {
                    colString = colDesc[j].Html;
                    while (colString.indexOf("{{") != -1) {
                        propName = colString;
                        idx = propName.indexOf('{{');
                        // propName= propName.replace('{{', '');
                        propName = propName.substring(idx + 2, propName.indexOf('}}'));
                        colString = colString.replace("{{" + propName + "}}", (typeof tempData[i][propName] == 'undefined' || tempData[i][propName] == null ? '' : tempData[i][propName]));
                        //colString = colString.replace('{{' + propName.toString() + '}}', '');
                    }
                    html += colString;
                }

                else if (typeof colDesc[j].type == 'undefined' || colDesc[j].type == null || colDesc[j].type == '') {
                    if (Editable)
                        html += '<input class="inputField field" type="text"  value="' + (typeof tempData[i][colDesc[j].Name] == 'undefined' || tempData[i][colDesc[j].Name] == null ? '' : tempData[i][colDesc[j].Name]) + '"/>';
                    else
                        html += '<span class="inputField">' + (typeof tempData[i][colDesc[j].Name] == 'undefined' || tempData[i][colDesc[j].Name] == null ? '' : tempData[i][colDesc[j].Name]) + '<span/>';
                }
                else if (colDesc[j].type == 'select') {
                    html += '<select class="field"' + (Editable ? ' ' : ' disabled ') + '>';
                    for (var k = 0; k < colDesc[j].data.length; k++) {
                        if (tempData[i][colDesc[j].Name] != null && colDesc[j].data[k].key.toString().toUpperCase() == tempData[i][colDesc[j].Name].toString().toUpperCase())
                            html += '<option selected value="' + colDesc[j].data[k].key + '">' + colDesc[j].data[k].value + '</option>';

                        else
                            html += '<option value="' + colDesc[j].data[k].key + '">' + colDesc[j].data[k].value + '</option>';
                    }
                    html += '</select>';
                    //html += '<select data-bind="options: ' + colDesc[j].data + ' optionsText: \'Value\', optionsValue: \'Key\', value:' + tempData[i][colDesc[j].Name] + '"></select>';
                }
                html += '</div>';
            }

            html += '</div>';
        }
        if (ShowFooter && template == 1) {
            if ((currentPage * pageSize) + pageSize >= data.length && this.opt.currentPage != 0) {
                html += '<div class="' + FooterCSS + '" ><span style="float:left">' + opt.TotalItemText + ':' + opt.data.length + '(' + opt.CurrentPageText + ':' + (opt.currentPage + 1) + ')</span>' +
                  '<div style="float:right;border:none;"><a  class="prevButton" href="#">' + opt.PrevButtonText + '</a></div></div>';
            }
            else if ((currentPage * pageSize) + pageSize < data.length && this.opt.currentPage == 0) {
                html += '<div class="' + FooterCSS + '" ><span style="float:left">' + opt.TotalItemText + ':' + opt.data.length + '(' + opt.CurrentPageText + ':' + (opt.currentPage + 1) + ')</span>' +
               '<div style="float:right;border:none;"><a  class="morebutton" href="#">' + opt.NextButtonText + '</a></div></div>';
            }
            else if ((currentPage * pageSize) + pageSize < data.length && this.opt.currentPage != 0) {
                html += '<div class="' + FooterCSS + '" ><span style="float:left">' + opt.TotalItemText + ':' + opt.data.length + '(' + opt.CurrentPageText + ':' + (opt.currentPage + 1) + ')</span>' +
               '<div style="float:right;display:inline;border:none;"><a  class="prevButton" href="#">' + opt.PrevButtonText + '</a>&nbsp;<a  class="morebutton" href="#">' + opt.NextButtonText + '</a></div></div>';
            }
            else {
                html += '<div class="' + FooterCSS + '" ><span style="float:left">' + opt.TotalItemText + ':' + opt.data.length + '</span></div>';
            }
        }
        else if (ShowFooter && template == 2) {
            //var more = elem.getElementsByClassName("morebutton")[0];
            //if (typeof more != 'undefined' && more != null && elem.getElementsByClassName("morebutton").length!=0)
            //    more.parentNode.removeChild(more);MoreButtonText:"More",

            if ((currentPage * pageSize) + pageSize >= data.length) {
                //html += '<div class="' + FooterCSS + '" ><span style="float:left">' + opt.TotalItemText + ':' + opt.data.length + '</span><a  class="morebutton" href="#" class="not-active">' + opt.MoreButtonText + '</a></div>';
                html += '<div class="' + FooterCSS + '" ><span style="float:left">' + opt.TotalItemText + ':' + opt.data.length + '(' + opt.CurrentPageText + ':' + ((opt.currentPage * opt.pageSize) + tempData.length) + ')</span></div>';
            }
            else {
                html += '<div class="' + FooterCSS + '" ><span style="float:left">' + opt.TotalItemText + ':' + opt.data.length + '(' + opt.CurrentPageText + ':' + ((opt.currentPage * opt.pageSize) + tempData.length) + ')</span><a  class="morebutton" href="#">' + opt.MoreButtonText + '</a></div>';
            }
        }
        // dv.style.width = (totalWidth + ((1 * (colDesc.length + 2) + (colDesc.length + 1) * 10) * 100) / elem.offsetWidth).toString() + "%";
        dv.style.width = "100%";
        dv.innerHTML += html;
        //if (!IsInitial) {
        //    var grid = elem.getElementsByClassName("gridClass")[0];
        //    grid.parentNode.removeChild(grid);
        //}

        elem.appendChild(dv);

        if (opt.ShowDirtyFlag) {
            var fields = elem.getElementsByClassName("field");
            for (var i = 0; i < fields.length; i++) {
                fields[i].onchange = function () { self.JSLightGrid_updateDirty(this.parentNode.parentNode.id, this.parentNode.id, this) };
            }

        }
        //sorting
        if (IsSortable) {
            var coldivs = [];
            coldivs = elem.getElementsByClassName(HeaderCSS)[0].getElementsByClassName("colDiv");
            // coldivs.push(elem.getElementsByClassName(HeaderCSS)[0].getElementsByClassName("lastCol")[0]);
            var reverse = false, dvSorted;
            for (var x = 0; x < coldivs.length; x++) {
                coldivs[x].style.cursor = "pointer";
                self.removeSortArrow(coldivs[x]);
                if (coldivs[x].getAttribute("data-name") == SortBy && SortReverse == true) {
                    // coldivs[x].removeChild(coldivs[x].getElementsByClassName("uparrow")[0]);
                    dvSorted = document.createElement("div");
                    dvSorted.className = "downarrow";
                    coldivs[x].appendChild(dvSorted);
                }
                else if (coldivs[x].getAttribute("data-name") == SortBy && SortReverse == false) {
                    // coldivs[x].removeChild(coldivs[x].getElementsByClassName("downarrow")[0]);
                    dvSorted = document.createElement("div");
                    dvSorted.className = "uparrow";
                    coldivs[x].appendChild(dvSorted);
                }

                coldivs[x].onclick = function () {
                    var node = document.getElementById(this.id), dvSort;
                    if (node.getElementsByClassName("uparrow").length == 0 && node.getElementsByClassName("uparrow").length == 0) {
                        reverse = false;
                        dvSort = document.createElement("div");
                        dvSort.className = "uparrow";
                        //  dvSort.innerHTML = '<div class="uparrow"></div>';
                        node.appendChild(dvSort);
                        //node.innerHTML = '<div class="uparrow"></div>';
                    }
                    else if (node.getElementsByClassName("uparrow").length > 0) {
                        reverse = true;
                        self.removeSortArrow(node);
                        dvSort = document.createElement("div");
                        dvSort.className = "downarrow";
                        node.appendChild(dvSort);
                    }
                    else if (node.getElementsByClassName("downarrow").length > 0) {
                        reverse = false
                        self.removeSortArrow(node);
                        dvSort = document.createElement("div");
                        dvSort.className = "uparrow";
                        node.appendChild(dvSort);
                    }
                    //reinitialize
                    opt.data = opt.data.sort(self.sort_by(this.getAttribute("data-name"), reverse, function (a) { return (typeof a == 'undefined' || a == null ? '' : a.toUpperCase()) }, reverse));
                    opt.SortBy = this.getAttribute("data-name");
                    opt.IsInitial = true;
                    opt.SortReverse = reverse;
                    opt.currentPage = 0;
                    self.Initialize(null, opt);

                }
            }
            var lastCol = elem.getElementsByClassName(HeaderCSS)[0].getElementsByClassName("lastCol")[0];
            lastCol.style.cursor = "pointer";
            self.removeSortArrow(lastCol);
            if (lastCol.getAttribute("data-name") == SortBy && SortReverse) {
                //lastCol.removeChild(lastCol.getElementsByClassName("uparrow")[0]);
                dvSorted = document.createElement("div");
                dvSorted.className = "downarrow";
                lastCol.appendChild(dvSorted);
            }
            else if (lastCol.getAttribute("data-name") == SortBy && !SortReverse) {
                //  lastCol.removeChild(lastCol.getElementsByClassName("downarrow")[0]);
                dvSorted = document.createElement("div");
                dvSorted.className = "uparrow";
                lastCol.appendChild(dvSorted);
            }

            lastCol.onclick = function () {
                if (lastCol.getElementsByClassName("uparrow").length == 0 && lastCol.getElementsByClassName("uparrow").length == "downarrow") {
                    reverse = false;
                    dvSort = document.createElement("div");
                    dvSort.className = "uparrow";
                    lastCol.appendChild(dvSort);
                }
                else if (lastCol.getElementsByClassName("uparrow").length > 0) {
                    reverse = true;
                    self.removeSortArrow(lastCol);
                    dvSort = document.createElement("div");
                    dvSort.className = "downarrow";
                    lastCol.appendChild(dvSort);
                }
                else if (lastCol.getElementsByClassName("downarrow").length > 0) {
                    reverse = false
                    self.removeSortArrow(lastCol);
                    dvSort = document.createElement("div");
                    dvSort.className = "uparrow";
                    lastCol.appendChild(dvSort);
                }
                //reinitialize
                opt.data = opt.data.sort(self.sort_by(this.getAttribute("data-name"), reverse, function (a) { return (typeof a == 'undefined' || a == null ? '' : a.toUpperCase()) }, reverse));
                opt.SortBy = this.getAttribute("data-name");
                opt.IsInitial = true;
                opt.SortReverse = reverse;
                opt.currentPage = 0;
                self.Initialize(null, opt);

            }
        }

        //set footer width
        if (ShowFooter) {

            var borderWidth = getComputedStyle(elem.getElementsByClassName("lastCol")[0]).getPropertyValue('border-right-width').replace("px", "");
            if (opt.FooterWidth == null) {
                if (opt.ShowDirtyFlag)
                    footerWidth = (footerWidth == '' ? (totalWidth + ((borderWidth * (colDesc.length + 2) + (colDesc.length + 1) * 10) * 100) / elem.offsetWidth).toString() + "%" : footerWidth);
                else
                    footerWidth = (footerWidth == '' ? (totalWidth + ((borderWidth * (colDesc.length + 1) + colDesc.length * 10) * 100) / elem.offsetWidth).toString() + "%" : footerWidth);
                elem.getElementsByClassName(FooterCSS)[0].style.width = footerWidth;// elem.getElementsByClassName(HeaderCSS)[0].offsetWidth+'px';
            }
            else {
                elem.getElementsByClassName(FooterCSS)[0].style.width = opt.FooterWidth.toString() + "%";// elem.getElementsByClassName(HeaderCSS)[0].offsetWidth+'px';
            }

            if (opt.currentPage != 0 && opt.template != 2)
                elem.getElementsByClassName("prevButton")[0].onclick = function () {

                    opt.IsInitial = false;
                    opt.currentPage = (opt.currentPage - 1);
                    self.Initialize(null, opt);

                };

            if ((currentPage * pageSize) + pageSize < data.length)
                elem.getElementsByClassName("morebutton")[0].onclick = function () {

                    opt.IsInitial = false;
                    opt.currentPage = (opt.currentPage + 1);
                    self.Initialize(null, opt);

                };
        }
    }

    return self;
}


