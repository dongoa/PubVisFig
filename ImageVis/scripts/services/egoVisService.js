'use strict';

vishope.factory('egoVisService', ['$http', 'dataService', 'pipService',
    function ($http, dataService, pipService) {

        var egoVisService = {
            selection: [],
            //densityColor: ['#f2f0f7', '#dadaeb', '#bcbddc',
            //'#9e9ac8', '#807dba', '#6a51a3', '#4a1486'],
            densityColor: ['#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
            //densityColorYellow: ['#fee0b6', '#fdb863',
            //'#e08214', '#b35806', '#7f3b08'],
            //densityColorPurple: ['#d8daeb', '#b2abd2',
            //'#8073ac', '#542788', '#2d004b'],
            arcColor: ['#a2ce41', '#80b1d3', '#c9c9ca', '#fb8072'],
            //arcColor: ['#b3de69', '#fb8072', '#80b1d3', '#ffed6f'],
            innerRadius: 6,
            //lineColor: ['#fb8072', '#80b1d3', '#999999']
            lineColor: ['#b2182b', '#d6604d', '#f4a582', '#fddbc7',
                '#dcdcdd', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'],
            flowRadius: 50,
            duration: 800,
            glyphMaxRadius: 25,
            maxCanvasSize: 220,
            expansionAlterWidth: 1.8,
            expansionAlterOffset: 1,
            maxFlowLayer: 8,
            flowColor: '#def0f4',
            backgroundColor: '#ffffff',
            secAlterColor: '#555555',
            removed:[],
        };
        egoVisService.updataDiv = function(){

        }

        egoVisService.updataCompare = function(){


            var svg = d3.select('#compareCanvas');
            svg.selectAll('*').data([]).exit().remove();
            if(egoVisService.selection[1])
            svg.append('text').attr('font-family','Roboto').attr('font-size', '24px').attr('font-weight','600').attr('transform', 'translate(' + 80 + ',40) rotate(0) scale(1)').attr('text-anchor', 'left').attr('alignment-baseline', 'middle').text( egoVisService.selection[1]);
            svg.append('text').attr('font-family','Roboto').attr('font-size', '24px').attr('font-weight','600').attr('transform', 'translate(' + 470 + ',40) rotate(0) scale(1)').attr('text-anchor', 'left').attr('alignment-baseline', 'middle').text( egoVisService.selection[0]);
            svg.append('line').attr('x1',220).attr('y1',85).attr('x2',670).attr('y2',85).attr('stroke','#ccc').attr('stroke-width','2');
            svg.append('text').attr('font-family','Roboto').attr('font-size', '20px').attr('font-weight','600').attr('transform', 'translate(' + 20 + ',90) rotate(0)').text('general infomation');
            svg.append('text').attr('font-family','Roboto').attr('font-size', '18px').attr('font-weight','300').attr('transform', 'translate(' + 290 + ',120) rotate(0)').text('paper count');
            svg.append('text').attr('font-family','Roboto').attr('font-size', '18px').attr('font-weight','300').attr('transform', 'translate(' + 290 + ',150) rotate(0)').text('image count');
            svg.append('text').attr('font-family','Roboto').attr('font-size', '18px').attr('font-weight','300').attr('transform', 'translate(' + 290 + ',180) rotate(0)').text('image size');
            svg.append('text').attr('font-family','Roboto').attr('font-size', '20px').attr('font-weight','600').attr('transform', 'translate(' + 20 + ',210) rotate(0)').text('color');
            svg.append('text').attr('font-family','Roboto').attr('font-size', '18px').attr('font-weight','300').attr('transform', 'translate(' + 330 + ',240) rotate(0)').text('red');
            svg.append('text').attr('font-family','Roboto').attr('font-size', '18px').attr('font-weight','300').attr('transform', 'translate(' + 320 + ',270) rotate(0)').text('green');
            svg.append('text').attr('font-family','Roboto').attr('font-size', '18px').attr('font-weight','300').attr('transform', 'translate(' + 330 + ',300) rotate(0)').text('blue');

            svg.append('text').attr('font-family','Roboto').attr('font-size', '18px').attr('font-weight','300').attr('transform', 'translate(' + 330 + ',330) rotate(0)').text('hue');
            svg.append('text').attr('font-family','Roboto').attr('font-size', '18px').attr('font-weight','300').attr('transform', 'translate(' + 305 + ',360) rotate(0)').text('saturation');
            svg.append('text').attr('font-family','Roboto').attr('font-size', '18px').attr('font-weight','300').attr('transform', 'translate(' + 320 + ',390) rotate(0)').text('value');
            svg.append('text').attr('font-family','Roboto').attr('font-size', '18px').attr('font-weight','300').attr('transform', 'translate(' + 315 + ',420) rotate(0)').text('entropy');

            svg.append('text').attr('font-family','Roboto').attr('font-size', '20px').attr('font-weight','600').attr('transform', 'translate(' + 20 + ',450) rotate(0)').text('saliency model');



            for(var i=1;i<=30;i++){
                if(i==4){
                    svg.append('line').attr('x1',80).attr('y1',85+i*30).attr('x2',670).attr('y2',85+i*30).attr('stroke','#ccc').attr('stroke-width','2');continue;
                }
                if(i==12){
                    svg.append('line').attr('x1',180).attr('y1',85+i*30).attr('x2',670).attr('y2',85+i*30).attr('stroke','#ccc').attr('stroke-width','2');continue;
                }
                svg.append('line').attr('x1',20).attr('y1',85+i*30).attr('x2',270).attr('y2',85+i*30).attr('stroke','#ccc').attr('stroke-width','0.7');
                svg.append('line').attr('x1',420).attr('y1',85+i*30).attr('x2',670).attr('y2',85+i*30).attr('stroke','#ccc').attr('stroke-width','0.7');
            }
            if(egoVisService.selection[1]) {
                var _stringxx = (egoVisService.selection[1]).substring(0, 4) + (egoVisService.selection[1]).substring(5, 8);
                console.log('herre', _stringxx);
                var svg_rect = svg.append("g").attr("transform", "translate(" + 0 + "," + 0 + ")");


                var _src = 'scripts\\services\\data_T_csv\\' + _stringxx + ".csv";
                // console.log("src:",_src);
                d3.csv(_src, function (error, data) {
                    if (data != undefined) {
                        // console.log("data:",data);
                        // drawChart(data, svg,padding,100,110);
                        console.log(data);
                        var root1 = d3.stratify()
                            .id(function (d) {
                                return d.imageID;
                            })
                            .parentId(function (d) {
                                return d.paperID;
                            })
                            (data);
                        var root = d3.hierarchy(root1)
                            .sum(function (d) {
                                return d.data.size;
                            })
                            .sort(function (a, b) {
                                return b.value - a.value;
                            });//.each(function(d){d.value = Math.sqrt(scalearea(d.value));d.uncertainty =1/*d.data.data.uncertainty/1*/; /*console.log(d.data.data.uncertainty);*/});
                        console.log(root, root.children.length);
                        var num_images = 0;
                        for (var i = 0; i < root.children.length; i++) {
                            num_images += root.children[i].children.length;
                        }
                        console.log(num_images);
                        var _xscale = d3.scaleLinear()
                            .range([0, 400]);
                        _xscale.domain([0, 400]);
                        svg_rect.append('rect').attr('width', data[0].uncertainty).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - data[0].uncertainty + 10) + ',105)');
                        svg_rect.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 10) + ',135)');
                        svg_rect.append('rect').attr('width', num_images - 80).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 80 + 10) + ',165)');
                        svg_rect.append('rect').attr('width', num_images - 100).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 100 + 10) + ',225)');

                        svg_rect.append('rect').attr('width', num_images - 100).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 100 + 10) + ',225)');
                        svg_rect.append('rect').attr('width', num_images - 100 - 20).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 100 + 20 + 10) + ',255)');
                        svg_rect.append('rect').attr('width', num_images - 100 + 50).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 100 - 50 + 10) + ',285)');
                        svg_rect.append('rect').attr('width', num_images - 100 - 80).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 100 + 80 + 10) + ',315)');
                        svg_rect.append('rect').attr('width', num_images - 100 - 60).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 100 + 60 + 10) + ',345)');
                        svg_rect.append('rect').attr('width', num_images - 100).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 100 + 10) + ',375)');
                        svg_rect.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 10) + ',135)');
                        svg_rect.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 10) + ',135)');
                        svg_rect.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 10) + ',135)');
                        svg_rect.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (260 - num_images + 10) + ',135)');
                    }

                });

            }
            if(egoVisService.selection[0]) {
                var _stringxx2 = (egoVisService.selection[0]).substring(0, 4) + (egoVisService.selection[0]).substring(5, 8);
                console.log('herre', _stringxx);
                var svg_rect2 = svg.append("g").attr("transform", "translate(" + 0 + "," + 0 + ")");


                var _src2 = 'scripts\\services\\data_T_csv\\' + _stringxx2 + ".csv";
                // console.log("src:",_src);
                d3.csv(_src2, function (error, data) {
                    if (data != undefined) {
                        // console.log("data:",data);
                        // drawChart(data, svg,padding,100,110);
                        console.log(data);
                        var root1 = d3.stratify()
                            .id(function (d) {
                                return d.imageID;
                            })
                            .parentId(function (d) {
                                return d.paperID;
                            })
                            (data);
                        var root = d3.hierarchy(root1)
                            .sum(function (d) {
                                return d.data.size;
                            })
                            .sort(function (a, b) {
                                return b.value - a.value;
                            });//.each(function(d){d.value = Math.sqrt(scalearea(d.value));d.uncertainty =1/*d.data.data.uncertainty/1*/; /*console.log(d.data.data.uncertainty);*/});
                        console.log(root, root.children.length);
                        var num_images = 0;
                        for (var i = 0; i < root.children.length; i++) {
                            num_images += root.children[i].children.length;
                        }
                        console.log(num_images);
                        var _xscale = d3.scaleLinear()
                            .range([0, 400]);
                        _xscale.domain([0, 400]);
                        svg_rect2.append('rect').attr('width', data[0].uncertainty).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',105)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',135)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',165)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',225)');

                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',225)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',255)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',285)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',315)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',345)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',375)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',135)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',135)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',135)');
                        svg_rect2.append('rect').attr('width', num_images).attr('height', 20).style('fill', 'rgb(162, 206, 65)').attr('transform', 'translate(' + (420) + ',135)');
                    }

                });
            }
            return ;

        }
        egoVisService.egoFilterNumber = function (element, egoData, filterNumber) {
            var filterList = [];
            var logList = [];
            for (var key in egoData['allNeighborDict']) {
                if (egoData['allNeighborDict'].hasOwnProperty(key)) {
                    var num = egoData['allNeighborDict'][key];
                    if (num < filterNumber) {
                        filterList.push(key);
                    } else {
                        logList.push(key);
                    }
                }
            }
            var wrapper = d3.select(element).select('.egoExpansionWrapper');
            wrapper.selectAll('*')
                .attr('visibility', 'visible');
            for (var i = 0; i < filterList.length; i++) {
                var nameClass = filterList[i].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                wrapper.selectAll('.alterName' + nameClass)
                    .attr('visibility', 'hidden');
                wrapper.selectAll('.pathAlterName' + nameClass)
                    .attr('visibility', 'hidden');
            }
        };

        var changeEgoExpansionColor = function (element, egoData, performanceFlag) {
            var wrapper = d3.select(element).select('.egoExpansionWrapper');
            if (performanceFlag) {
                var maxPublication = dataService.getMaxPublication() / 7;
                var authorPubDict = dataService.getAuthorPubDict();
                wrapper.selectAll('.expansionAlter')
                    .attr('stroke', function (d) {
                        var key = d['key'];
                        var year = d['year'];
                        var color;
                        if (authorPubDict.hasOwnProperty(key)) {
                            var num = authorPubDict[key][year];
                            num = Math.floor(num * 6 / maxPublication);
                            if (num > 6) {
                                num = 6;
                            }
                            color = egoVisService.densityColor[num];
                        } else {
                            color = egoVisService.densityColor[0];
                        }
                        d.stroke = color;
                        if (d.highlightList) {
                            return 'black';
                        }
                        return color;
                    });
            } else {
                wrapper.selectAll('.expansionAlter')
                    .attr('stroke', function (d) {
                        d.stroke = d.color;
                        if (d.highlightList) {
                            return 'black';
                        }
                        return d.color;
                    });
            }
        };

        var changeEgoGlyphColor = function (element, egoData, performanceFlag) {
            var wrapper = d3.select(element).select('.egoGlyphWrapper');
            if (performanceFlag) {
                var maxPublication = dataService.getMaxPublication() / 7;
                var authorPubDict = dataService.getAuthorPubDict();
                var key = egoData['id'];
                wrapper.selectAll('.denCircle')
                    .style('fill', function (d) {
                        var num = authorPubDict[key][d];
                        num = Math.floor(num * 6 / maxPublication);
                        if (num > 6) {
                            num = 6;
                        }
                        return egoVisService.densityColor[num];
                    });

            } else {
                wrapper.selectAll('.denCircle')
                    .style('fill', function (d) {
                        var edgeNum = egoData['yearDict'][d]['edgeList'].length;
                        var alterNum = egoData['yearDict'][d]['neighborList'].length;
                        var value = undefined;
                        if (alterNum == 1) {
                            value = 6;
                        } else {
                            value = edgeNum * 2 / (alterNum * (alterNum - 1));
                            value = Math.floor(value * 6);
                        }
                        return egoVisService.densityColor[value];
                    });
            }
        };

        egoVisService.changeColor = function (element, egoData, performanceFlag) {
            //changeEgoGlyphColor(element, egoData, performanceFlag);
            changeEgoExpansionColor(element, egoData, performanceFlag);
        };

        egoVisService.drawEgoExpand = function (element, egoData, expFlag) {

            var egoGlyphCanvas = d3.select(element)
                .append('svg')
                .attr('class', 'egoGlyphCanvas')
                .attr('width', 5000)
                .attr('height', 0)
                .style('background', egoVisService.backgroundColor);
            var svg = d3.select(element).select('.egoGlyphCanvas');
            if (expFlag) {
                svg.attr('height', egoVisService.maxCanvasSize);
                var egoTimeline = svg.selectAll('.egoTimeline');
                if (egoTimeline.empty()) {
                    //drawEgoTimeline(svg, egoData);
                }
                // alert(egoData);
                if(egoData.x==undefined) {
                    drawEgoExpansion(svg, egoData);  //egoData.x=1;
                }
                else egoData.x=1;

            } else {
                console.log('egoData.synScroll',egoData.synScroll);
                egoData.synScroll=true;
                if (egoData.synScroll) {
                    svg.attr('height', 10);
                    svg.selectAll('.egoTimeline').data([]).exit().remove();
                } else {
                    svg.attr('height', 10);
                }
                // svg.selectAll('.egoExpansionWrapper').data([]).exit().remove();
            }
        };

        egoVisService.drawSynScroll = function (element, egoData, synFlag) {
            if (egoData.expansion)
                return;
            var svg = d3.select(element).select('.egoGlyphCanvas');
            if (synFlag) {
                svg.attr('height', 50);
                svg.select('.egoTimeline').data([]).exit().remove();
            } else {
                svg.attr('height', 70);
                drawEgoTimeline(svg, egoData);
            }
        };

        var drawEgoExpansion = function (svg, egoData) {

            // console.log("===============================================egoData",egoData);
            // var timelineConfig = egoVisService.timelineConfig ;
            svg.select('.egoExpansionWrapper').remove();
            console.log(typeof svg.select('.egoExpansionWrapper'));
            // svg.append("g").attr("class","egoExpansionWrapper");
            // alert(egoData['id'].length);
            let padding = Number(document.getElementById("paddingSlider").value);
            for(var k=2007;k<=2016;k++){
                var _Tnum="";
                if(egoData['id'].length==3)
                _Tnum=egoData['id'];
                else _Tnum='T0'+egoData['id'][1];
                var _src='scripts\\services\\data_T_csv\\'+k.toString()+_Tnum+".csv";
                // console.log("src:",_src);
                d3.csv(_src, function (error, data) {
                   if(data!=undefined){
                        // console.log("data:",data);
                        drawChart(data, svg,padding,100,110);
                    }

                });
            }


            function drawChart(data, svg,padding,xx,yy) {

                // console.log(colorload_data);
                // console.log(data[0].imageID.substring(0,4)+'/'+data[0].imageID.substring(4,7));
                var p_x = parseInt(data[0].imageID);
                // console.log("year:",p_x);
                //scale

                var svg=svg.append("g").attr("class","egoExpansionWrapper").attr("transform","translate("+(200*(p_x-2006)-100+30)+","+yy+")");
                console.log(svg.select('.egoExpansionWrapper'));
                // console.log("padding",padding);
                var scalearea=d3.scaleLinear().range([0,9]).domain(d3.extent(data, function(d) { return d.size; })).nice();

                // Create hierarchy.
                var root1 = d3.stratify()
                    .id(function(d) { return d.imageID; })
                    .parentId(function(d) { return d.paperID; })
                    (data);
                var root = d3.hierarchy(root1)
                    .sum(function(d) { return d.data.size; })
                    .sort(function(a, b) { return b.value - a.value; }).each(function(d){d.value = Math.sqrt(scalearea(d.value));d.uncertainty =1/*d.data.data.uncertainty/1*/; /*console.log(d.data.data.uncertainty);*/});
                // let root = d3.hierarchy(data)
                //     //.sum(function(d) { return Math.sqrt(d.size) / 10; }) // For flare.
                //     .sum(function(d) { return d.size; })
                //     .sort(function(a, b) { return b.value - a.value; });

                // Create bubbletreemap.
                console.log(root);

                let bubbletreemap = d3.bubbletreemap()
                    .padding(1.8)
                    .curvature(0)
                    .hierarchyRoot(root)
                    .width(svg.attr("width"))
                    .height(svg.attr("height"))
                    .colormap(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]); // Color brewer: 12-class Paired

                // Do layout and coloring.
                let hierarchyRoot = bubbletreemap.doLayout().doColoring().hierarchyRoot();

                let leafNodes = hierarchyRoot.descendants().filter(function (candidate) {
                    return !candidate.children;
                });
                svg.on("click",function(){
                        var select = data[0].imageID.substring(0,4)+','+data[0].imageID.substring(4,7);
                        console.log(egoVisService.selection.length);
                        if(egoVisService.selection.length==2)
                            egoVisService.selection.shift();
                        egoVisService.selection.push(select);
                        egoVisService.updataCompare();
                        var circle_g = circleGroup.selectAll("circle");
                        var circle_length = circle_g._groups[0].length;
                        console.log('length',egoVisService.selection.length);
                        if(egoVisService.selection.length==1) {
                            var div_image = d3.select('#image-container2');
                            div_image.selectAll("*").remove();
                            for (var i = 0; i < leafNodes.length; i++) {
                                var url = './image/' + data[0].imageID.substring(0, 4) + '/' + data[0].imageID.substring(4, 7) + "/" + leafNodes[i].data.data.paperID + "/" + leafNodes[i].data.data.imageID;

                                div_image.append('div').style('width', '155px').style('height', '155px').style('border', '1px solid #C0C0C0').style('background', 'url(' + url + ')')
                                    .style('background-size', '100% 100%').style('float', 'right');
                            }
                            console.log(leafNodes[0].data.data.paperID, leafNodes[0].data.data.imageID);
                        }else {
                            // var div_image_old = d3.select('#image-container2');
                            // div_image_old.selectAll("*").remove();
                            var div_image = d3.select('#image-container1');
                            egoVisService.removed  = div_image.selectAll("*").remove();
                            console.log(egoVisService.removed);
                            if(egoVisService.removed._groups[0].length!=0){
                                var div_image2 = d3.select('#image-container2');
                                div_image2.selectAll("*").remove();
                                div_image2.selectAll('div').data(egoVisService.removed._groups[0]).enter().append('div').style('background',function(d){console.log(d.style,d.style.background);return d.style.background;}).style('width', '155px').style('height', '155px').style('border', '1px solid #C0C0C0')
                                    .style('background-size', '100% 100%').style('float', 'right');
                                console.log();
                            }

                            for (var i = 0; i < leafNodes.length; i++) {
                                var url = './image/' + data[0].imageID.substring(0, 4) + '/' + data[0].imageID.substring(4, 7) + "/" + leafNodes[i].data.data.paperID + "/" + leafNodes[i].data.data.imageID;

                                div_image.append('div').style('width', '155px').style('height', '155px').style('border', '1px solid #C0C0C0').style('background', 'url(' + url + ')')
                                    .style('background-size', '100% 100%').style('float', 'right');
                            }
                            console.log(leafNodes[0].data.data.paperID, leafNodes[0].data.data.imageID);
                        }





                    }
                );
                // Draw contour.
                let contourGroup = svg.append("g")
                    .attr("class", "contour");

                contourGroup.selectAll("path")
                    .data(bubbletreemap.getContour())
                    .enter().append("path")
                    .attr("d", function(arc) { return arc.d; })
                    .style("stroke", "#000000")
                    .style("stroke-width", function(arc) { return 0.2; return arc.strokeWidth; })
                    .attr("transform", function(arc) {return arc.transform;});

                // Draw circles.
                let circleGroup = svg.append("g")
                    .attr("class", "circlesAfterPlanck");

                circleGroup.selectAll("circle")
                    .data(leafNodes)
                    .enter().append("circle")
                    .attr("r", function(d) {
                        // var image = new Image();
                        // svg.append("image").attr("style","display:block;").attr("xlink:href",function(){return 'scripts\\services\\class_data\\'+data[0].imageID.substring(0,4)+'/'+data[0].imageID.substring(4,7)+"/"+d.data.data.paperID+"/"+d.data.id;})
                        //     .attr("height",0).attr("width",0).attr("x",d.x-10).attr("y",d.y-10);
                        return d.r; })
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; })
                    .style("fill", function(d) { //return d.color;
                    //
                    //     var image = new Image();
                    //     image.src='image\\'+data[0].imageID.substring(0,4)+'/'+data[0].imageID.substring(4,7)+"/"+d.data.data.paperID+"/"+d.data.id;
                    //     image.onload=function(){ console.log("加载完成"); }
                    //     //console.log(image.src);
                    //     var colorThief = new ColorThief();
                    //     console.log(image);
                    //     // console.log("egoData",egoData);
                    //     var domaincolor = colorThief.getColor(image);
                    //     console.log(domaincolor);
                    //     console.log("colorload_data",colorload_data[d.data.id]);
                    //     return 'rgb('+domaincolor+')';
                        colorload_data[d.data.id][3]=0.1;
                        return "rgba("+colorload_data[d.data.id]+")";
                        // return "red";
                    })
                    .style("stroke", "#000000")
                    .style("stroke-width", "0.15").on('click',function(d){
                    var div_image = d3.select('#image-container');
                    var url = './image/'+data[0].imageID.substring(0,4)+'/'+data[0].imageID.substring(4,7)+"/"+d.data.data.paperID+"/"+d.data.id;
                    div_image.append('div').style('width','220px').style('height','220px').style('border','1px solid #C0C0C0').style('background','url('+url+')')
                        .style('background-size','100% 100%').style('float','left');
                });

                // Draw labels.
                /*let textGroup = svg.append("g")
                    .attr("class", "text");

                textGroup.selectAll("text")
                    .data(leafNodes)
                    .enter().append("text")
                    .attr("font-size", "20px")
                    .style("fill", "black")
                    .text(function(d) { return d.data.data.paperID; })
                    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });*/
            }
            // var egoExpansionWrapper = svg.selectAll('egoExpansionWrapper')
            //     .data([egoData])
            //     .enter()
            //     .append('g')
            //     .attr('class', 'egoExpansionWrapper')
            //     .attr('transform', function (d) {
            //         return 'translate(' + genYearDistance(timelineConfig.startYear,
            //             d.startYear) * 100 + ', 0)';
            //     });
            //
            // var flowYearPos = drawExpansion2DegreeFlow(egoExpansionWrapper, egoData);
            // var alterYearPos = drawExpansionAlters(egoExpansionWrapper, egoData);
            // drawExpansionLines(egoExpansionWrapper, egoData, flowYearPos, alterYearPos);
            //drawExpansion2DegreeFlowGlyph(egoExpansionWrapper, egoData);
            //drawExpansionCommunity(egoExpansionWrapper, egoData);
        };

        var drawExpansionLines = function (egoExpansionWrapper, egoData, flowYearPos, alterYearPos) {
            var alterYearList = genAlterYearList(egoData['yearDict']);
            var alterYearLines = genAlterYearLines(egoData, alterYearList);
            var timelineConfig = egoVisService.timelineConfig;
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([10, 100])
                .direction('s')
                .html(function (d) {
                    var str = '<div id="myD3Tip"><ul>';
                    var atomStr = '<li>' + d['name'].replace('_', '.').replace('@', '') + '</li>';
                    str += atomStr;
                    str += '</ul></div>';
                    return str;
                });
            egoExpansionWrapper.call(tip);

            for (var i = 0; i < alterYearLines.length; i++) {
                var alter = alterYearLines[i];
                for (var j = 0; j < alter['value'].length; j++) {
                    alter['value'][j]['index'] = i;
                    alter['value'][j]['name'] = alter['key'];
                    alter['value'][j]['id'] = alter['key'];
                }

                var lineFunc = d3.svg.line()
                    .x(function (d) {
                        return d.x;
                    })
                    .y(function (d) {
                        return d.y;
                    })
                    .interpolate('cardinal');

                egoExpansionWrapper.selectAll('.expansionPath' + i)
                    .data(alter['value'])
                    .enter()
                    .append('path')
                    .attr('class', function (d) {
                        d.index = i;
                        var str = 'expansionPath' + i;
                        str += ' expansionPath'
                        var stYear = d['stYear'];
                        var edYear = d['edYear'];
                        var name = d['name'];
                        str += (' pathStYear' + stYear);
                        str += (' pathEdYear' + edYear);
                        str += (' pathAlterName' + name.replace(/\s+/g, '')).replace('@', '').replace('\'', '');
                        return str;
                    })
                    .attr('d', function (d) {
                        var lineData = [];
                        var stYear = d['stYear'];
                        var edYear = d['edYear'];
                        var stStr = d['stStr'];
                        var edStr = d['edStr'];
                        var stPoint = {};
                        var edPoint = {};
                        stPoint.x = genYearDistance(egoData.startYear, stYear) * 100 + timelineConfig.basicWidth / 2;
                        edPoint.x = genYearDistance(egoData.startYear, edYear) * 100 + timelineConfig.basicWidth / 2;
                        if (stStr > 0) {
                            stPoint.x += 5;
                        }
                        if (edStr > 0) {
                            edPoint.x -= 5;
                        }
                        if (stStr > 0) {
                            stPoint.y = alterYearPos[alter['key']][stYear];
                        } else if (stStr == 0) {
                            stPoint.y = flowYearPos[stYear]['upPos'];
                        } else {
                            stStr = -stStr;
                            if (stStr > egoVisService.maxFlowLayer) {
                                stStr = egoVisService.maxFlowLayer;
                            }
                            var upPos = flowYearPos[stYear]['upPos'];
                            var downPos = flowYearPos[stYear]['downPos'];
                            stPoint.y = upPos + (downPos - upPos) * stStr / (egoVisService.maxFlowLayer + 1);

                        }
                        if (edStr > 0) {
                            edPoint.y = alterYearPos[alter['key']][edYear];
                        } else if (edStr == 0) {
                            edPoint.y = flowYearPos[edYear]['upPos'];
                        } else {
                            edStr = -edStr;
                            if (edStr > egoVisService.maxFlowLayer) {
                                edStr = egoVisService.maxFlowLayer;
                            }
                            var upPos = flowYearPos[edYear]['upPos'];
                            var downPos = flowYearPos[edYear]['downPos'];
                            edPoint.y = upPos + (downPos - upPos) * edStr / (egoVisService.maxFlowLayer + 1);
                        }
                        lineData.push(stPoint);
                        lineData.push(edPoint);
                        var path = geom.path.begin().move_to(stPoint.x, stPoint.y);
                        path.h_eased_line_to(edPoint.x, edPoint.y);
                        //return lineFunc(lineData);
                        return path.end();
                    })
                    .attr('fill', 'none')
                    .attr('stroke', function (d) {
                        if (egoData['tieStrAlter'] == d['id']) {
                            return '#08519c';
                        }
                        var stStr = d['stStr'];
                        var edStr = d['edStr'];
                        var stroke;
                        if (stStr < 0 || edStr < 0) {
                            stroke = '#999999';
                        } else {
                            stroke = '#aaaaaa';
                        }
                        d.stroke = stroke;
                        return stroke;
                    })
                    .attr('stroke-opacity', function (d) {
                        var stStr = d['stStr'];
                        var edStr = d['edStr'];
                        if (stStr < 0 || edStr < 0) {
                            return 0.6;
                        } else {
                            return 0.6;
                        }
                    })
                    .attr('stroke-width', function (d) {
                        if (egoData['tieStrAlter'] == d['id']) {
                            return 3;
                        }
                        return 1;
                    })
                    .on('click', function (d) {
                        if (d['click'] == undefined) {
                            d['click'] = false;
                        }
                        if (!d['click']) {
                            egoExpansionWrapper.selectAll('.expansionPath' + d.index)
                                .attr('stroke', function (d) {
                                    if (d.highlight) {
                                        return '#08519c';
                                    }
                                    d.stroke = '#777777';
                                    return '#777777';
                                })
                                .attr('stroke-width', 2)
                                .attr('stroke-opacity', function (d) {
                                    d['click'] = true;
                                    return 1;
                                });
                            tip.hide(d);
                        } else {
                            egoExpansionWrapper.selectAll('.expansionPath' + d.index)
                                .attr('stroke', function (d) {
                                    if (d.highlight) {
                                        return '#08519c';
                                    }
                                    var stStr = d['stStr'];
                                    var edStr = d['edStr'];
                                    if (stStr < 0 || edStr < 0) {
                                        d.stroke = '#999999';
                                        return '#999999';
                                    } else {
                                        d.stroke = '#aaaaaa';
                                        return '#aaaaaa';
                                    }
                                })
                                .attr('stroke-width', 1)
                                .attr('stroke-opacity', function (d) {
                                    d['click'] = false;
                                    var stStr = d['stStr'];
                                    var edStr = d['edStr'];
                                    if (stStr < 0 || edStr < 0) {
                                        return 0.6;
                                    } else {
                                        return 0.6;
                                    }
                                });
                        }
                    })
                    .on('mouseover', function (d) {
                        if (!d['click'] && egoData['tieStrAlter'] != d['id']) {
                            egoExpansionWrapper.selectAll('.expansionPath' + d.index)
                                .attr('stroke', function (d) {
                                    if (d.highlight) {
                                        return '#08519c';
                                    }
                                    d.stroke = '#777777';
                                    return '#777777';
                                })
                                .attr('stroke-width', 2)
                                .attr('stroke-opacity', 1);
                        }
                        tip.show(d);
                    })
                    .on('mouseout', function (d) {
                        if (!d['click'] && egoData['tieStrAlter'] != d['id']) {
                            egoExpansionWrapper.selectAll('.expansionPath' + d.index)
                                .attr('stroke', function (d) {
                                    if (d.highlight) {
                                        return '#08519c';
                                    }
                                    var stStr = d['stStr'];
                                    var edStr = d['edStr'];
                                    if (stStr < 0 || edStr < 0) {
                                        d.stroke = '#999999';
                                        return '#999999';
                                    } else {
                                        d.stroke = '#aaaaaa';
                                        return '#aaaaaa';
                                    }
                                })
                                .attr('stroke-width', 1)
                                .attr('stroke-opacity', function (d) {
                                    if (!d['click']) {
                                        var stStr = d['stStr'];
                                        var edStr = d['edStr'];
                                        if (stStr < 0 || edStr < 0) {
                                            return 0.6;
                                        } else {
                                            return 0.6;
                                        }
                                    }
                                });
                        }
                        tip.hide(d);
                    });
            }
        };

        var genAlterYearLines = function (egoData, alterYearList) {
            var yearList = genYearList(egoData['yearDict']);
            var stYear = yearList[0];
            var edYear = yearList[yearList.length - 1];
            var alterYearLines = [];
            for (var i = 0; i < alterYearList.length; i++) {
                var alter = alterYearList[i];
                var curObj = {};
                curObj['key'] = alter['key'];
                curObj['value'] = [];
                for (var j = 0; j < alterYearList[i]['value'].length; j++) {
                    var year = alterYearList[i]['value'][j];
                    if (j == 0) {
                        if (year != stYear) {
                            var preYear = egoData['yearDict'][decYear(year)];
                            var flag = false;
                            if (preYear != undefined) {
                                for (var k = 0; k < egoData['yearDict'][decYear(year)]['secondDegreeNeighborList'].length; k++) {
                                    if (egoData['yearDict'][decYear(year)]['secondDegreeNeighborList'][k] == alter['key']) {
                                        flag = true;
                                        break;
                                    }
                                }
                            }
                            if (flag) {
                                var yearObj = {};
                                yearObj['stYear'] = decYear(year);
                                yearObj['edYear'] = parseInt(year);
                                yearObj['stStr'] = 0;
                                yearObj['edStr'] = egoData['yearDict'][year]['tieStrength'][alter['key']];
                                curObj['value'].push(yearObj);
                            }
                        }
                    }
                    if (j == alterYearList[i]['value'].length - 1) {
                        if (year != edYear) {
                            var nextYear = egoData['yearDict'][incYear(year)];
                            var flag = false;
                            if (nextYear != undefined) {
                                for (var k = 0; k < egoData['yearDict'][incYear(year)]['secondDegreeNeighborList'].length; k++) {
                                    if (egoData['yearDict'][incYear(year)]['secondDegreeNeighborList'][k] == alter['key']) {
                                        flag = true;
                                        break;
                                    }
                                }
                            }
                            if (flag) {
                                var yearObj = {};
                                yearObj['stYear'] = parseInt(year);
                                yearObj['edYear'] = incYear(parseInt(year));
                                yearObj['stStr'] = egoData['yearDict'][year]['tieStrength'][alter['key']];
                                yearObj['edStr'] = 0;
                                curObj['value'].push(yearObj);
                            }
                        }
                    }
                    if (j > 0) {
                        var preYear = alterYearList[i]['value'][j - 1];
                        if (genYearDistance(preYear, year) == 1) {
                            var yearObj = {};
                            yearObj['stYear'] = parseInt(preYear);
                            yearObj['edYear'] = parseInt(year);
                            yearObj['stStr'] = egoData['yearDict'][preYear]['tieStrength'][alter['key']];
                            yearObj['edStr'] = egoData['yearDict'][year]['tieStrength'][alter['key']];
                            curObj['value'].push(yearObj);
                        } else {
                            var yearObj = {};
                            yearObj['stYear'] = parseInt(preYear);
                            yearObj['edYear'] = incYear(parseInt(preYear));
                            yearObj['stStr'] = egoData['yearDict'][preYear]['tieStrength'][alter['key']];
                            yearObj['edStr'] = -genYearDistance(preYear, year);
                            curObj['value'].push(yearObj);
                            for (var k = incYear(parseInt(preYear)); k < decYear(year); k = incYear(k)) {
                                yearObj = {};
                                yearObj['stYear'] = k;
                                yearObj['edYear'] = incYear(k);
                                yearObj['stStr'] = -genYearDistance(preYear, year);
                                yearObj['edStr'] = -genYearDistance(preYear, year);
                                curObj['value'].push(yearObj);
                            }
                            yearObj = {};
                            yearObj['stYear'] = decYear(year);
                            yearObj['edYear'] = parseInt(year);
                            yearObj['stStr'] = -genYearDistance(preYear, year);
                            yearObj['edStr'] = egoData['yearDict'][year]['tieStrength'][alter['key']];
                            curObj['value'].push(yearObj);
                        }
                    }
                }
                alterYearLines.push(curObj);
            }
            return alterYearLines;
        };

        var genAlterYearList = function (yearDict) {
            var resDict = genAlterYearDict(yearDict);
            var resList = [];
            for (var key in resDict) {
                if (resDict.hasOwnProperty(key)) {
                    resList.push({'key': key, 'value': resDict[key]});
                }
            }
            return resList;
        };

        var genAlterYearDict = function (yearDict) {
            var yearList = genYearList(yearDict);
            var resDict = {};
            var resList = [];
            for (var i = 0; i < yearList.length; i++) {
                var neighborList = yearDict[yearList[i]]['neighborList'];
                for (var j = 0; j < neighborList.length; j++) {
                    var alter = neighborList[j];
                    if (!resDict.hasOwnProperty(alter)) {
                        resDict[alter] = [];
                    }
                    resDict[alter].push(yearList[i]);
                }
            }
            return resDict;
        };

        var posSort = function (curTieStrList, yearDict, alterYearDict, curYear, preTieStrList) {
            //var
            //
            curTieStrList = curTieStrList.sort(function (a, b) {
                if (a['value'] > b['value']) {
                    return 1;
                } else if (a['value'] < b['value']) {
                    return -1;
                } else {
                    var aCurStr = a['value'];
                    var bCurStr = b['value'];
                    var aPreStr = undefined;
                    var bPreStr = undefined;
                    var aIndex = undefined;
                    var bIndex = undefined;
                    var aPreYear = undefined;
                    var bPreYear = undefined;
                    for (var j = 0; j < alterYearDict[a['key']].length; j++) {
                        if (parseInt(curYear) == alterYearDict[a['key']][j]) {
                            aIndex = j;
                            if (j != 0) {
                                aPreStr = yearDict[alterYearDict[a['key']][j - 1]]['tieStrength'][a['key']];
                                aPreYear = alterYearDict[a['key']][j - 1];
                            }
                            break;
                        }
                    }
                    for (var j = 0; j < alterYearDict[b['key']].length; j++) {
                        if (parseInt(curYear) == alterYearDict[b['key']][j]) {
                            bIndex = j;
                            if (j != 0) {
                                bPreStr = yearDict[alterYearDict[b['key']][j - 1]]['tieStrength'][b['key']];
                                bPreYear = alterYearDict[b['key']][j - 1];
                            }
                            break;
                        }
                    }
                    if (aPreStr == undefined && bPreStr == undefined) {
                        var aNextYear = alterYearDict[a['key']][aIndex + 1];
                        var bNextYear = alterYearDict[b['key']][bIndex + 1];
                        if (aNextYear == undefined && bNextYear == undefined) {
                            return 0;
                        } else if (aNextYear == undefined) {
                            var bNextStr = yearDict[bNextYear]['tieStrength'][b['key']];
                            if (bNextStr - bCurStr > 0) {
                                return -1;
                            } else {
                                return 1;
                            }
                        } else if (bNextYear == undefined) {
                            var aNextStr = yearDict[aNextYear]['tieStrength'][a['key']];
                            if (aNextStr - aCurStr > 0) {
                                return 1;
                            } else {
                                return -1;
                            }
                        } else {
                            var aNextStr = yearDict[aNextYear]['tieStrength'][a['key']];
                            var bNextStr = yearDict[bNextYear]['tieStrength'][b['key']];
                            var aDiff = aNextStr - aCurStr;
                            var bDiff = bNextStr - bCurStr;
                            if (aDiff == bDiff) {
                                return yearDiff(bNextYear, aNextYear);
                            } else {
                                if (yearDiff(aNextYear, curYear) > 1 && yearDiff(bNextYear, curYear) > 1) {
                                    return aDiff - bDiff;
                                } else if (genYearDistance(curYear, aNextYear) > 1) {
                                    return -1;
                                } else if (genYearDistance(curYear, bNextYear) > 1) {
                                    return 1;
                                } else {
                                    return aDiff - bDiff;
                                }
                            }
                        }

                    } else if (aPreStr == undefined) {
                        b['diff'] = bPreStr - bCurStr;
                        if (b['diff'] < 0)
                            return 1;
                        else
                            return -1;
                    } else if (bPreStr == undefined) {
                        a['diff'] = aPreStr - aCurStr;
                        if (a['diff'] < 0)
                            return -1;
                        else
                            return 1;
                    } else {
                        var aDiff = aPreStr - aCurStr;
                        var bDiff = bPreStr - bCurStr;
                        a['diff'] = aPreStr - aCurStr;
                        b['diff'] = bPreStr - bCurStr;
                        if (aDiff == bDiff) {
                            if ((aPreYear == bPreYear) && (aPreYear = decYear(curYear))) {
                                var aPreIndex = undefined;
                                var bPreIndex = undefined;
                                for (var k = 0; k < preTieStrList.length; k++) {
                                    if (preTieStrList[k]['key'] == a['key']) {
                                        aPreIndex = k;
                                    }
                                    if (preTieStrList[k]['key'] == b['key']) {
                                        bPreIndex = k;
                                    }
                                }
                                return aPreIndex - bPreIndex;
                            } else {
                                return yearDiff(aPreYear, bPreYear);
                            }
                        } else {
                            return aDiff - bDiff;
                        }
                    }
                }
            });
            var stPos = 0;
            var stValue = curTieStrList[0]['value'];
            if (curTieStrList.length == 1) {
                curTieStrList[0]['pos'] = 1;
            }
            for (var i = 0; i < curTieStrList.length; i++) {
                if (curTieStrList[i]['value'] != stValue || i == curTieStrList.length - 1) {
                    var edPos = i - 1;
                    if (i == curTieStrList.length - 1) {
                        edPos += 1;
                    }
                    var num = edPos - stPos + 1;
                    var mid = undefined;
                    if (num % 2 != 0) {
                        mid = stPos + (edPos - stPos) / 2;
                        var cnt = 1;
                        curTieStrList[mid]['pos'] = cnt;
                        cnt += 1;
                        var iter = (num - 1) / 2;
                        for (var j = 1; j <= iter; j++) {
                            curTieStrList[mid + j]['pos'] = cnt;
                            cnt += 1;
                            curTieStrList[mid - j]['pos'] = cnt;
                            cnt += 1;
                        }
                    } else {
                        mid = stPos + (edPos - stPos + 1) / 2;
                        var iter = num / 2;
                        var cnt = 1;
                        for (var j = 1; j <= iter; j++) {
                            curTieStrList[mid - j]['pos'] = cnt;
                            cnt += 1;
                            curTieStrList[mid + j - 1]['pos'] = cnt;
                            cnt += 1;
                        }
                    }
                    stPos = i;
                    stValue = curTieStrList[i]['value'];
                }
            }
            return curTieStrList;
        };

        var drawExpansionAlters = function (egoExpansionWrapper, egoData) {
            var strStatDict = genStrStatDict(egoData['yearDict']);
            //var strStatDict = dataService.getMaxStrDict();
            var alterYearStrDict = genAlterYearStrDict(egoData['yearDict']);
            var alterYearDict = genAlterYearDict(egoData['yearDict']);
            var strStatPos = genStrStatPos(strStatDict);
            var yearList = genYearList(egoData['yearDict']);
            var timelineConfig = egoVisService.timelineConfig;
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([10, 100])
                .direction('s')
                .html(function (d) {
                    var str = '<div id="myD3Tip"><ul>';
                    var atomStr = '<li>' + d.key.replace('_', '.').replace('@', '') + ': ' + d.value + '</li>';
                    str += atomStr;
                    str += '</ul></div>';
                    return str;
                });
            egoExpansionWrapper.call(tip);
            var alterYearPos = {};

            var preTieStrList = undefined;
            for (var i = 0; i < yearList.length; i++) {
                var curTieStrDict = egoData['yearDict'][yearList[i]]['tieStrength'];
                var prePublication = egoData['yearDict']['prePublication'];
                var curRes = {};
                var curRes2 = {};
                var curYear = yearList[i];
                var curTieStrList = [];
                for (var key in curTieStrDict) {
                    if (curTieStrDict.hasOwnProperty(key)) {
                        curTieStrList.push({'key': key, 'value': curTieStrDict[key]});
                    }
                }
                curTieStrList = posSort(curTieStrList, egoData['yearDict'], alterYearDict, yearList[i], preTieStrList);
                preTieStrList = curTieStrList;
                egoExpansionWrapper.selectAll('.expansionAlter' + curYear)
                    .data(curTieStrList)
                    .enter()
                    .append('line')
                    .attr('class', function (d) {
                        var nameClass = d['key'].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                        return 'expansionAlter' + curYear + ' expansionAlter' + ' alterName' + nameClass;
                    })
                    .attr('x1', function (d) {
                        return genYearDistance(egoData.startYear, curYear) * 100 + timelineConfig.basicWidth / 2 - 5;
                    })
                    .attr('x2', function (d) {
                        return genYearDistance(egoData.startYear, curYear) * 100 + timelineConfig.basicWidth / 2 + 5;
                    })
                    .attr('y1', function (d) {
                        var key = d.key;
                        d.year = curYear;
                        var value = d.value;
                        if (!curRes.hasOwnProperty(value)) {
                            curRes[value] = 0;
                        }
                        curRes[value] += 1;
                        //var curIndex = curRes[value];
                        var curIndex = d.pos;
                        var centerPos = strStatPos[value];
                        var yPos = undefined;
                        if (strStatDict[value] % 2 == 0) {
                            if (curIndex % 2 == 0) {
                                yPos = centerPos - (curIndex - 2) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth)
                                    - egoVisService.expansionAlterOffset / 2 - egoVisService.expansionAlterWidth;
                            } else {
                                yPos = centerPos + (curIndex - 1) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth) + egoVisService.expansionAlterOffset / 2;
                            }
                        } else {
                            if (curIndex % 2 == 0) {
                                yPos = centerPos - curIndex / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth);
                            } else {
                                yPos = centerPos + (curIndex - 1) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth);
                            }
                        }
                        if (alterYearPos[key] == undefined) {
                            alterYearPos[key] = {};
                        }
                        alterYearPos[key][curYear] = yPos;
                        return yPos;
                    })
                    .attr('y2', function (d) {
                        var key = d.key;
                        var value = d.value;
                        if (!curRes2.hasOwnProperty(value)) {
                            curRes2[value] = 0;
                        }
                        curRes2[value] += 1;
                        //var curIndex = curRes2[value];
                        var curIndex = d['pos'];
                        var centerPos = strStatPos[value];
                        var yPos = undefined;
                        if (strStatDict[value] % 2 == 0) {
                            if (curIndex % 2 == 0) {
                                yPos = centerPos - (curIndex - 2) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth)
                                    - egoVisService.expansionAlterOffset / 2 - egoVisService.expansionAlterWidth;
                            } else {
                                yPos = centerPos + (curIndex - 1) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth) + egoVisService.expansionAlterOffset / 2;
                            }
                        } else {
                            if (curIndex % 2 == 0) {
                                yPos = centerPos - curIndex / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth);
                            } else {
                                yPos = centerPos + (curIndex - 1) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth);
                            }
                        }
                        return yPos;
                    })
                    .attr('stroke', function (d) {
                        var key = d.key;
                        //var curDict = egoData['yearDict'][yearList[i]]['tieStrength'];
                        //var preDict = egoData['yearDict'][yearList[i - 1]];
                        //if (preDict == undefined || preDict['tieStrength'][key] == undefined) {
                        //return egoVisService.arcColor[0];
                        //} else {
                        //var curValue = d.value;
                        //var preValue = preDict['tieStrength'][key];
                        //if (preValue < curValue) {
                        //return egoVisService.arcColor[1];
                        //} else if (preValue > curValue) {
                        //return egoVisService.arcColor[2];
                        //} else {
                        //return egoVisService.arcColor[3];
                        //}
                        //}
                        for (var k = 0; k < alterYearStrDict[key].length; k++) {
                            if (parseInt(alterYearStrDict[key][k]['year']) == yearList[i]) {
                                var color = undefined;
                                if (k == 0) {
                                    color = egoVisService.arcColor[0];
                                } else {
                                    var curValue = alterYearStrDict[key][k]['str'];
                                    var preValue = alterYearStrDict[key][k - 1]['str'];
                                    if (preValue < curValue) {
                                        color = egoVisService.arcColor[3];
                                    } else if (preValue > curValue) {
                                        color = egoVisService.arcColor[1];
                                    } else {
                                        color = egoVisService.arcColor[2];
                                    }
                                }
                                d.color = color;
                                d.stroke = color;
                                return color;
                            }
                        }
                    })
                    .attr('stroke-width', egoVisService.expansionAlterWidth)
                    .attr('stroke-width', egoVisService.expansionAlterWidth)
                    .on('mouseover', function (d) {
                        d3.select(this)
                            //.attr('stroke', '#777777')
                            .attr('stroke-width', egoVisService.expansionAlterWidth + 1);
                        egoExpansionWrapper.selectAll('.pathAlterName' + d['key'].replace(/\s+/g, '').replace('@', '').replace('\'', ''))
                            .attr('stroke', function (d) {
                                return '#777777';
                            })
                            .attr('stroke-width', 2)
                            .attr('stroke-opacity', 1);
                        var alterList = egoData['yearDict'][d.year]['neighborList'];
                        var edgeList = egoData['yearDict'][d.year]['edgeList'];
                        var dIndex = undefined;
                        for (var index = 0; index < alterList.length; index++) {
                            if (alterList[index] == d['key']) {
                                dIndex = index;
                                break;
                            }
                        }
                        var highlightList = [];
                        for (var index = 0; index < edgeList.length; index++) {
                            if (edgeList[index]['index1'] == dIndex) {
                                highlightList.push(alterList[edgeList[index]['index2']]);
                            }

                            if (edgeList[index]['index2'] == dIndex) {
                                highlightList.push(alterList[edgeList[index]['index1']]);
                            }
                        }
                        for (var index = 0; index < highlightList.length; index++) {
                            if (egoData['tieStrAlter'] == highlightList[index]) {
                                continue;
                            }
                            var name = highlightList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                            var selector = '.pathStYear' + d.year + '.pathAlterName' + name;
                            selector += ',';
                            selector += ('.pathEdYear' + d.year + '.pathAlterName' + name);
                            egoExpansionWrapper.selectAll(selector)
                                .attr('stroke', function (d) {
                                    return '#08519c';
                                });
                        }
                        tip.show(d);
                    })
                    .on('mouseout', function (d) {
                        d3.select(this)
                            //.attr('stroke', '#aaaaaa')
                            .attr('stroke-width', egoVisService.expansionAlterWidth);
                        egoExpansionWrapper.selectAll('.pathAlterName' + d['key'].replace(/\s+/g, '').replace('@', '').replace('\'', ''))
                            .attr('stroke', function (d) {
                                if (!d.click) {
                                    return '#aaaaaa';
                                }
                                return d3.select(this).attr('stroke');
                            })
                            .attr('stroke-width', function(d) {
                                if (!d.click) {
                                    return 1;
                                }
                                return d3.select(this).attr('stroke-width');
                            })
                            .attr('stroke-opacity', function(d) {
                                if (!d.click) {
                                    return 0.6;
                                }
                                return d3.select(this).attr('opacity');
                            });
                        var alterList = egoData['yearDict'][d.year]['neighborList'];
                        var edgeList = egoData['yearDict'][d.year]['edgeList'];
                        var dIndex = undefined;
                        for (var index = 0; index < alterList.length; index++) {
                            if (alterList[index] == d['key']) {
                                dIndex = index;
                                break;
                            }
                        }
                        var highlightList = [];
                        for (var index = 0; index < edgeList.length; index++) {
                            if (edgeList[index]['index1'] == dIndex) {
                                highlightList.push(alterList[edgeList[index]['index2']]);
                            }

                            if (edgeList[index]['index2'] == dIndex) {
                                highlightList.push(alterList[edgeList[index]['index1']]);
                            }
                        }
                        for (var index = 0; index < highlightList.length; index++) {
                            if (egoData['tieStrAlter'] == highlightList[index]) {
                                continue;
                            }
                            var name = highlightList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                            var selector = '.pathStYear' + d.year + '.pathAlterName' + name;
                            selector += ',';
                            selector += ('.pathEdYear' + d.year + '.pathAlterName' + name);
                            egoExpansionWrapper.selectAll(selector)
                                .attr('stroke', function (d) {
                                    if (!d.highlight) {
                                        return d.stroke;
                                    } else {
                                        return '#08519c';
                                    }
                                });
                        }

                        tip.hide(d);
                    })
                    .on('click', function (d) {
                        var authorName = d.key;
                        if (d.highlightList) {
                            var highlightList = d.highlightList;
                            d3.select(this).attr('stroke', function (d) {
                                return d.stroke;
                            });
                            for (var index = 0; index < highlightList.length; index++) {
                                var name = highlightList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                                var selector = '.pathStYear' + d.year + '.pathAlterName' + name;
                                selector += ',';
                                selector += ('.pathEdYear' + d.year + '.pathAlterName' + name);
                                egoExpansionWrapper.selectAll(selector)
                                    .attr('stroke', function (d) {
                                        var tempIndex = undefined;
                                        for (var index = 0; index < d.highlight.length; index++) {
                                            if (d.highlight[index] == authorName) {
                                                d.highlight.splice(index, 1);
                                                break;
                                            }
                                        }
                                        if (d.highlight.length == 0) {
                                            d.highlight = undefined;
                                            return d.stroke;
                                        } else {
                                            return '#08519c';
                                        }
                                    });
                            }
                            d.highlightList = undefined;
                        } else {
                            var alterList = egoData['yearDict'][d.year]['neighborList'];
                            var edgeList = egoData['yearDict'][d.year]['edgeList'];
                            var dIndex = undefined;
                            d3.select(this).attr('stroke', 'black');
                            for (var index = 0; index < alterList.length; index++) {
                                if (alterList[index] == d['key']) {
                                    dIndex = index;
                                    break;
                                }
                            }
                            var highlightList = [];
                            for (var index = 0; index < edgeList.length; index++) {
                                if (edgeList[index]['index1'] == dIndex) {
                                    highlightList.push(alterList[edgeList[index]['index2']]);
                                }

                                if (edgeList[index]['index2'] == dIndex) {
                                    highlightList.push(alterList[edgeList[index]['index1']]);
                                }
                            }
                            for (var index = 0; index < highlightList.length; index++) {
                                var name = highlightList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                                var selector = '.pathStYear' + d.year + '.pathAlterName' + name;
                                selector += ',';
                                selector += ('.pathEdYear' + d.year + '.pathAlterName' + name);
                                egoExpansionWrapper.selectAll(selector)
                                    .attr('stroke', function (d) {
                                        if (!d.highlight) {
                                            d.highlight = [];
                                        }
                                        d.highlight.push(authorName);
                                        return 'black';
                                    });
                            }
                            d.highlightList = highlightList;
                        }
                    })
                    .on('dblclick',function(d){
                        pipService.emitAlterDoubleClicked(d.key);
                    });
            }
            return alterYearPos;
        };

        var genStrStatPos = function (strStatDict) {
            var ExpansionLen = egoVisService.maxCanvasSize -
                egoVisService.flowRadius * 2 - 70;
            var strList = [];
            for (var key in strStatDict) {
                if (strStatDict.hasOwnProperty(key)) {
                    strList.push(parseInt(key));
                }
            }
            strList.sort(function (a, b) {
                return a - b;
            });
            var alterTotalWidth = 0;
            for (var i = 0; i < strList.length; i++) {
                var value = strStatDict[strList[i]];
                alterTotalWidth += (value - 1) * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth) + egoVisService.expansionAlterWidth;
            }
            var offsetTotalWidth = ExpansionLen - alterTotalWidth;
            var offsetWidth;
            if (strList.length == 0) {
                offsetWidth = 0;
            } else {
                offsetWidth = offsetTotalWidth / (strList.length - 1);
            }
            var res = {};
            var stPos = 70;
            for (var i = strList.length - 1; i >= 0; i--) {
                var str = strList[i];
                var val = strStatDict[str];
                if (val % 2 == 0) {
                    res[str] = stPos + val / 2 * (egoVisService.expansionAlterWidth + egoVisService.expansionAlterOffset) - egoVisService.expansionAlterOffset / 2;
                } else {
                    res[str] = stPos + val / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth);
                }
                stPos += ((val - 1) * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth) + egoVisService.expansionAlterWidth) + offsetWidth;
            }
            return res;
        };

        var genAlterYearStrDict = function (yearDict) {
            var res = {};
            var yearList = genYearList(yearDict);
            for (var i = 0; i < yearList.length; i++) {
                var curDict = yearDict[yearList[i]]['tieStrength'];
                for (var key in curDict) {
                    if (curDict.hasOwnProperty(key)) {
                        if (!res.hasOwnProperty(key)) {
                            res[key] = [];
                        }
                    }
                    res[key].push({'year': yearList[i], 'str': curDict[key]});
                }
            }
            return res;
        };

        var genStrStatDict = function (yearDict) {
            var yearList = genYearList(yearDict);
            var res = {};
            for (var i = 0; i < yearList.length; i++) {
                var curDict = yearDict[yearList[i]]['tieStrength'];
                var curRes = {};
                for (var key in curDict) {
                    if (curDict.hasOwnProperty(key)) {
                        var value = curDict[key];
                        if (!curRes.hasOwnProperty(value)) {
                            curRes[value] = 0;
                        }
                        curRes[value] += 1;
                    }
                }
                for (var key in curRes) {
                    if (curRes.hasOwnProperty(key)) {
                        if ((!res.hasOwnProperty(key)) || (res[key] < curRes[key])) {
                            res[key] = curRes[key];
                        }
                    }
                }
            }
            return res;
        };


        var calFlowRadius = function (num) {
            if (num == 0) {
                return 1;
            } else {
                //return Math.log(num) / Math.log(2) * 4;
                //return Math.sqrt(num) * 3;
                //return Math.sqrt(num) /
                //Math.sqrt(dataService.getMaxSecondAlter()) *
                //egoVisService.flowRadius;
                return calLog(num, 2) / calLog(dataService.getMaxSecondAlter(), 2) *
                    egoVisService.flowRadius;
            }
        };

        var calGlyphRadius = function (num) {
            //if (num == 0) {
            //return 0;
            //} else {
            //return Math.log(num) / Math.log(2) * 3.5;
            //}
            //return Math.sqrt(num) * 1.7 + 8;
            var outlierParameter = 0.75;
            return (Math.sqrt(num) / Math.sqrt(dataService.getMaxSecondAlter() *
                outlierParameter)) * (egoVisService.glyphMaxRadius - 8) + 8;
            //var maxNum = dataService.getMaxSecondAlter();
            //return num / (maxNum * 0.5) * (egoVisService.glyphMaxRadius - 8) + 8;
        };


        var calGlyphLength = function(num) {
            var outlierParameter = 0.75;
            return (Math.sqrt(num) / Math.sqrt(dataService.getMaxSecondAlter() *
                outlierParameter)) * 32;
        }

        var calLog = function (x, y) {
            return Math.log(x) / Math.log(y);
        };

        var drawExpansion2DegreeFlow = function (wrapper, egoData) {
            var yearList = genYearList(egoData['yearDict']);
            yearList = genFullYearList(yearList[0], yearList[yearList.length - 1]);
            var timelineConfig = egoVisService.timelineConfig;
            var flowYearPos = {};
            var g = wrapper.append('g')
                .attr('class', 'SecDegreeFlowWrapper');

            var stackLayout = d3.layout.stack()
                .offset('silhouette')
                .values(function (d) {
                    return d.values;
                })
                .x(function (d) {
                    return genYearDistance(egoData.startYear, d) * 100 + timelineConfig.basicWidth / 2;
                })
                .y(function (d) {
                    return egoVisService.maxCanvasSize - egoVisService.flowRadius;
                });

            var layers = [
                {
                    name: 'secDegreeFlow',
                    values: yearList
                }
            ];

            var area = d3.svg.area()
                .interpolate('cardinal')
                //.interpolate('basis')
                .x(function (d) {
                    return genYearDistance(egoData.startYear, d) * 100 + timelineConfig.basicWidth / 2;
                })
                .y0(function (d) {
                    var secAlterNum = undefined;
                    if (egoData['yearDict'][d] == undefined) {
                        secAlterNum = 0;
                    } else {
                        secAlterNum = egoData['yearDict'][d]['secondDegreeNeighborList'].length;
                    }
                    var radius = calFlowRadius(secAlterNum);
                    var upPos = egoVisService.maxCanvasSize - egoVisService.flowRadius - radius;
                    flowYearPos[d] = {};
                    flowYearPos[d]['upPos'] = upPos;
                    return upPos;
                })
                .y1(function (d) {
                    var secAlterNum = undefined;
                    if (egoData['yearDict'][d] == undefined) {
                        secAlterNum = 0;
                    } else {
                        secAlterNum = egoData['yearDict'][d]['secondDegreeNeighborList'].length;
                    }
                    var radius = calFlowRadius(secAlterNum);
                    var downPos = egoVisService.maxCanvasSize - egoVisService.flowRadius + radius;
                    flowYearPos[d]['downPos'] = downPos;
                    return downPos;
                });

            wrapper.selectAll('.SecDegreeFlow')
                .data(stackLayout(layers))
                .enter().append('path')
                .attr('class', 'SecDegreeFlow')
                .attr('d', function (d) {
                    return area(d.values);
                })
                .style('fill', egoVisService.flowColor);
            return flowYearPos;
        };

        var drawEgoTimeline = function (svg, egoData) {
            var g = svg.append('g')
                .attr('class', 'egoTimeline');
            var timelineConfig = egoVisService.timelineConfig;
            var yearList = genFullYearList(timelineConfig.startYear, timelineConfig.endYear);
            g.selectAll('.egoTimelineLabel')
                .data(yearList)
                .enter()
                .append('text')
                .attr('class', 'egoTimelineLabel')
                .attr('font-size', '12px')
                .attr('x', function (d) {
                    return genYearDistance(timelineConfig.startYear, d) * 100 + timelineConfig.basicWidth / 2;
                })
                .attr('y', 60)
                .attr('dx', function (d) {
                    if (d > 10000) {
                        return -20;
                    } else {
                        return -13;
                    }
                })
                .text(function (d) {
                    if (d > 10000) {
                        d = d / 100;
                        return d3.format('.2f')(d);
                    }
                    return d;
                });
        };

        var updateEgoTimeline = function () {
            var egoTimeline = d3.selectAll('.egoTimeline');
            var timelineConfig = egoVisService.timelineConfig;
            var yearList = genFullYearList(timelineConfig.startYear, timelineConfig.endYear);
            egoTimeline.each(function (d) {
                var g = d3.select(this);
                var egoTimeLabels = g.selectAll('.egoTimelineLabel')
                    .data(yearList, function (d) {
                        return d;
                    });
                egoTimeLabels
                    .transition()
                    .duration(800)
                    .attr('x',function (d) {
                        return genYearDistance(timelineConfig.startYear, d) * 100 +
                            timelineConfig.basicWidth / 2;
                    }).text(function (d) {
                        if (d > 10000) {
                            d = d / 100;
                            return d3.format('.2f')(d);
                        }
                        return d;
                    });

                setTimeout(function () {
                    egoTimeLabels.enter()
                        .append('text')
                        .attr('class', 'egoTimelineLabel')
                        .attr('font-size', '12px')
                        .attr('x', function (d) {
                            return genYearDistance(timelineConfig.startYear, d) * 100 + timelineConfig.basicWidth / 2;
                        })
                        .attr('y', 60)
                        .attr('dx', function (d) {
                            if (d > 10000) {
                                return -13;
                            } else {
                                return -13;
                            }
                        })
                        .text(function (d) {
                            if (d > 10000) {
                                d = d / 100;
                                return d3.format('.2f')(d);
                            }
                            return d;
                        });

                }, 800);
                egoTimeLabels
                    .exit().remove();
            });
        };

        var updateTimelineCanvas = function () {
            //d3.select('#timelineZone').select('svg').data([]).exit().remove();
            var timelineConfig = egoVisService.timelineConfig;
            var yearList = genFullYearList(timelineConfig.startYear, timelineConfig.endYear);
            var timelineCanvas = d3.select('#timelineCanvas');
            timelineCanvas
                .attr('width', timelineConfig.width).attr('height',250);
            var bar =  timelineCanvas.append("g").attr("transform", "translate(" + 20 + "," + 15 + ")");
            var bar2 =  timelineCanvas.append("g").attr("transform", "translate(" + 20 + "," + 15 + ")");
            var _text =timelineCanvas.append("g").attr("transform", "translate(" + 20 + "," + 15 + ")");
            var _text2 =timelineCanvas.append("g").attr("transform", "translate(" + 20 + "," + 15 + ")");
            var x = d3.scaleLinear()
                .range([0, 1750]);

            var y2 = d3.scaleLinear()
                .range([0, 200]);
            var y = d3.scaleLinear()
                .range([0, 200]);
            x.domain([2007,2016]);
            y.domain([1500,0]);
            y2.domain([0,1500]);


            var xAxis = d3.axisBottom(x).tickFormat(d3.format(".0f"));

            var yAxis = d3.axisLeft(y).ticks(10);
            var Xx = bar.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(115," + 200 + ")").style("font-size","17px")
            Xx.append("path").attr("stroke","#000").attr("d","M-95,0V0.5H0.5V0");
                Xx.call(xAxis)
                .append("text").attr("font-size","20px")
                .attr("class", "label")
                .attr("x", 50)
                .attr("y", -6).attr("dy","2em")
                .style("text-anchor", "end")
                .text("Sepal Width (cm)");

            bar.append("g")
                .attr("class", "y axis").attr("transform", "translate(20," + 0 + ")").style("font-size","10px")
                .call(yAxis)
                .append("text")
                .attr("class", "label")
                .attr("transform", "rotate(-90)")
                .attr("y", 60)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Sepal Length (cm)");
            d3.csv("data.csv",function(data) {
                console.log("DATA",data,bar);
                bar2.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return x(d.Year) + 50+7-10;
                    })
                    .attr("y", function (d) {
                        // return 450 - y(d.Sizeear) - 250;
                        return 200-y2(d.Sizeear);
                    })
                    .attr("width", 70)
                    .attr("height", function (d) {
                        console.log(d.Sizeear);
                        return y2(d.Sizeear);

                    }).attr("fill","#428bca");

                bar.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return x(d.Year) + 50+7-10+70;
                    })
                    .attr("y", function (d) {
                        return 200-y2(d.ImageNumbers);
                    })
                    .attr("width", 70)
                    .attr("height", function (d) {
                        return y2(d.ImageNumbers);
                    }).attr("fill","rgb(162, 206, 65)");
                _text.selectAll('text').data(data).enter().append('text').attr('x',function(d){return x(d.Year) + 50+7-10+70+20;})
                    .attr('y',function(d){return 200-y2(d.ImageNumbers);}).text(function(d){return d.ImageNumbers;}).attr('fill','#C0C0C0');
                _text2.selectAll('text').data(data).enter().append('text').attr('x',function(d){return x(d.Year) + 50+7-10+25;})
                    .attr('y',function(d){return 200-y2(d.Sizeear);}).text(function(d){return d.Sizeear;}).attr('fill','#C0C0C0');
//                 var valueline = d3.line()
//                     .x(function(d) { return x(d.Year); })
//                     .y(function(d) { return y(d.Sizeear); });
//                 function make_x_gridlines() {
//                     return d3.axisBottom(x)
//                         .ticks(10)
//                 }
//
// // gridlines in y axis function
//                 function make_y_gridlines() {
//                     return d3.axisLeft(y)
//                         .ticks(10)
//                 }
                Xx.append("g")
                    .attr("class", "grid").append("line").attr("stroke","#C0C0C0").attr("x1","-100")
                    .attr("x2","3000")
                    .attr("y1","-160")
                    .attr("y2","-160");
                Xx.append("g")
                    .attr("class", "grid").append("line").attr("stroke","#C0C0C0").attr("x1","-100")
                    .attr("x2","3000")
                    .attr("y1","-106")
                    .attr("y2","-106");
                Xx.append("g")
                    .attr("class", "grid").append("line").attr("stroke","#C0C0C0").attr("x1","-100")
                    .attr("x2","3000")
                    .attr("y1","-52")
                    .attr("y2","-52");
                //     .attr("transform", "translate(0," + -200 + ")")
                //     .call(make_x_gridlines()
                //         .tickSize(200)
                //         .tickFormat("")
                //     )
                //
                // // add the Y gridlines
                // Xx.append("g")
                //     .attr("class", "grid")
                //     .call(make_y_gridlines()
                //         .tickSize(-1000)
                //         .tickFormat("")
                //     )
                //
                // // add the valueline path.
                // Xx.append("path")
                //     .data([data])
                //     .attr("class", "line")
                //     .attr("d", valueline);

            });

            console.log("updateTimelineCanvas");
            if (timelineCanvas.selectAll('.timelineLabel').empty()) {
                // timelineCanvas.selectAll('.timelineLabel')
                //     .data(yearList)
                //     .enter()
                //     .append('text')
                //     .attr('class', 'timelineLabel')
                //     .attr('x', function (d) {
                //         return genYearDistance(timelineConfig.startYear, d) * 200 + timelineConfig.basicWidth / 2;
                //     })
                //     .attr('y', 30)
                //     .attr('dx', function (d) {
                //         if (d > 10000) {
                //             return -24;
                //         } else {
                //             return -16;
                //         }
                //     })
                //     .text(function (d) {
                //         if (d > 10000) {
                //             d = d / 100;
                //             return d3.format('.2f')(d);
                //         }
                //         return d;
                //     });
                // timelineCanvas.selectAll('.timelineBar')
                //     .data(yearList)
                //     .enter()
                //     .append('line')
                //     .attr('class', 'timelineBar')
                //     .attr('x1', function (d) {
                //         return genYearDistance(timelineConfig.startYear, d) * 200 + timelineConfig.basicWidth / 2;
                //     })
                //     .attr('y1', 35)
                //     .attr('x2', function (d) {
                //         return genYearDistance(timelineConfig.startYear, d) * 200 + timelineConfig.basicWidth / 2;
                //     })
                //     .attr('y2', 40)
                //     .style('stroke', 'black')
                //     .style('stroke-width', 2);
            } else {
                var timelineLabel = timelineCanvas.selectAll('.timelineLabel')
                    .data(yearList, function (d) {
                        return d;
                    });
                timelineLabel.transition()
                    .duration(800)
                    .attr('x', function (d) {
                        return genYearDistance(timelineConfig.startYear, d) * 100 +
                            timelineConfig.basicWidth / 2;
                    })
                    .text(function (d) {
                        if (d > 10000) {
                            d = d / 100;
                            return d3.format('.2f')(d);
                        }
                        return d;
                    });
                setTimeout(function () {
                    timelineLabel.enter()
                        .append('text')
                        .attr('class', 'timelineLabel')
                        .attr('x', function (d) {
                            return genYearDistance(timelineConfig.startYear, d) * 100 +
                                timelineConfig.basicWidth / 2;
                        })
                        .attr('y', 30)
                        .attr('dx', function (d) {
                            if (d > 10000) {
                                return -24;
                            } else {
                                return -16;
                            }
                        })
                        .text(function (d) {
                            if (d > 10000) {
                                d = d / 100;
                                return d3.format('.2f')(d);
                            }
                            return d;
                        });
                }, 800);
                timelineLabel.exit().remove();

                var timelineBar = timelineCanvas.selectAll('.timelineBar')
                    .data(yearList, function (d) {
                        return d;
                    });
                timelineBar.transition()
                    .duration(800)
                    .attr('x1', function (d) {
                        return genYearDistance(timelineConfig.startYear, d) * 100 +
                            timelineConfig.basicWidth / 2;
                    })
                    .attr('x2', function (d) {
                        return genYearDistance(timelineConfig.startYear, d) * 100 +
                            timelineConfig.basicWidth / 2;
                    });
                setTimeout(function () {
                    timelineBar.enter()
                        .append('line')
                        .attr('class', 'timelineBar')
                        .attr('x1', function (d) {
                            return genYearDistance(timelineConfig.startYear, d) * 100 +
                                timelineConfig.basicWidth / 2;
                        })
                        .attr('y1', 35)
                        .attr('x2', function (d) {
                            return genYearDistance(timelineConfig.startYear, d) * 100 +
                                timelineConfig.basicWidth / 2;
                        })
                        .attr('y2', 40)
                        .style('stroke', 'black')
                        .style('stroke-width', 2);
                }, 800);
                timelineBar.exit().remove();
            }
        };

        var updateEgoGlyph = function () {
            var timelineConfig = egoVisService.timelineConfig;
            d3.selectAll('.egoGlyphCanvas')
                .attr('width', timelineConfig.width);
            d3.selectAll('.egoGlyphWrapper')
                .transition()
                .duration(800)
                .attr('transform', function (d) {
                    if (timelineConfig.startYear == undefined) {
                        return 'translate(0, 0)';
                    }
                    return 'translate(' + genYearDistance(timelineConfig.startYear, d.startYear) * 100 + ', 0)';
                });

        };

        var updateEgoExpansion = function () {
            var timelineConfig = egoVisService.timelineConfig;
            d3.selectAll('.egoExpansionWrapper')
                .transition()
                .duration(800)
                .attr('transform', function (d) {
                    if (timelineConfig.startYear == undefined) {
                        return 'translate(0, 0)';
                    }
                    return 'translate(' + genYearDistance(timelineConfig.startYear, d.startYear) * 100 + ', 0)';
                });
        };

        egoVisService.updateTimeline = function (timelineConfig) {
            console.log("updateTimeline1",timelineConfig);
            this.timelineConfig = timelineConfig;
            timelineConfig.startYear=2006;
            updateTimelineCanvas();
            updateEgoTimeline();
            updateEgoGlyph();
            updateEgoExpansion();
        };

        egoVisService.drawEgoGlyph = function (element, egoData) {
            console.log("this is drawEgoGlyph");
            var timelineConfig = egoVisService.timelineConfig;
            var egoGlyphCanvas = d3.select(element)
                .append('svg')
                .attr('class', 'egoGlyphCanvas')
                .attr('width', timelineConfig.width)
                .attr('height', 50)
                .style('background', egoVisService.backgroundColor);

            d3.select(element).select('.egoGlyphCanvas').selectAll('.egoGlyphWrapper').data([]).exit().remove();
            var egoGlyphWrapper = egoGlyphCanvas.selectAll('egoGlyphWrapper')
                .data([egoData])
                .enter()
                .append('g')
                .attr('class', 'egoGlyphWrapper');
                // .attr('transform', function (d) {
                //     return 'translate(' + genYearDistance(timelineConfig.startYear, d.startYear) * 100 + ', 0)';
                // });
           // drawGlyphLine(element, egoGlyphWrapper, egoData);
           //  drawGlyphRectangle(element, egoGlyphWrapper, egoData);
        };

        egoVisService.switchGlyph = function (element, egoData, flag) {
            var timelineConfig = egoVisService.timelineConfig;
            d3.select(element).select('.egoGlyphCanvas').selectAll('.egoGlyphWrapper').data([]).exit().remove();
            var egoGlyphCanvas = d3.select(element).select('.egoGlyphCanvas');
            var egoGlyphWrapper = egoGlyphCanvas.selectAll('egoGlyphWrapper')
                .data([egoData])
                .enter()
                .append('g')
                .attr('class', 'egoGlyphWrapper')
                .attr('transform', function (d) {
                    return 'translate(' + genYearDistance(timelineConfig.startYear, d.startYear) * 100 + ', 0)';
                });
            drawGlyphLine(element, egoGlyphWrapper, egoData);
            if (flag) {
                //drawGlyphRectangle(element, egoGlyphWrapper, egoData);
            } else {
                drawGlyphCircle(element, egoGlyphWrapper, egoData);
            }
        };

        var drawGlyphLine = function (element, egoGlyphWrapper, egoData) {
            var timelineConfig = egoVisService.timelineConfig;
            var yearList = genYearList(egoData['yearDict']);
            var flowList = genFlowList(egoData['yearDict']);
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([10, 140])
                .direction('s')
                .html(function (d) {
                    var value = d.strength / d.cnt;
                    var str = '<div id="myD3Tip">';
                    if(value>0){
                        str+="Increase "+Math.round(value*100)/100;
                    }
                    else if(value<0){
                        str+= "Decrease "+Math.round(value*100)/100;
                    }
                    else{
                        str+= "Unchanged 0.0"
                    }
                    str+='<ul>';
                    for (var i = 0; i < d.nameList.length; i++) {
                        var atomStr = '<li>' + d.nameList[i] + '</li>';
                        str += atomStr;
                    }
                    str += '</ul></div>';
                    return str;
                });
            egoGlyphWrapper.call(tip);
            egoGlyphWrapper.selectAll('.egoGlyphLine')
                .data(flowList)
                .enter()
                .append('line')
                .attr('class', 'egoGlyphLine')
                .attr('x1', function (d) {
                    return genYearDistance(egoData.startYear, d.startYear) * 100 +
                        timelineConfig.basicWidth / 2;
                })
                .attr('y1', timelineConfig.basicWidth / 2)
                .attr('x2', function (d) {
                    return genYearDistance(egoData.startYear, d.endYear) * 100 +
                        timelineConfig.basicWidth / 2;
                })
                .attr('y2', timelineConfig.basicWidth / 2)
                .attr('stroke', function (d) {
                    // var value = d.strength / d.cnt;
                    // value = value;
                    // //value = value / 0.5;
                    // if (value > 0) {
                    //     value = Math.min(value, 3);
                    //     value = Math.floor(value);
                    //     return egoVisService.lineColor[value];
                    // } else if (value < 0) {
                    //     value = -value;
                    //     value = Math.min(value, 3);
                    //     value = Math.floor(value);
                    //     return egoVisService.lineColor[5 + value];
                    // } else {
                    //     return egoVisService.lineColor[4];
                    // }
                    return egoVisService.lineColor[4];
                })
                .attr('stroke-width', function (d) {
                    // if (d.cnt == 0) {
                    //     return 2;
                    // } else {
                    //     return 1 + d.cnt;
                    // }
                    return 2;
                })
                .attr('stroke-dasharray', function (d) {
                    // if (d.cnt == 0) {
                    //     return '5, 5';
                    // } else {
                    //     return 'none';
                    // }
                    return '5, 5';
                })
                .on('mouseover', function (d) {
                    if (d.cnt != 0) {
                        var nameList = d['nameList'];
                        var startYear = d['startYear'];
                        var endYear = d['endYear'];
                        var wrapper = d3.select(element).select('.egoExpansionWrapper');
                        for (var index = 0; index < nameList.length; index++) {
                            var name = nameList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                            //console.log(name)wrapper);
                            //console.log(wrapper);
                            wrapper.selectAll('.pathAlterName' + name + '.pathStYear' + startYear + '.pathEdYear' + endYear)
                                .attr('stroke', function (d) {
                                    if (d.highlight) {
                                        return '#08519c';
                                    }
                                    d.stroke = '#777777';
                                    return '#777777';
                                })
                                .attr('stroke-width', 2)
                                .attr('stroke-opacity', 1);

                        }
                        tip.show(d);
                    }
                })
                .on('mouseout', function (d) {
                    if (d.cnt != 0) {
                        var nameList = d['nameList'];
                        var startYear = d['startYear'];
                        var endYear = d['endYear'];
                        var wrapper = d3.select(element).select('.egoExpansionWrapper');
                        for (var index = 0; index < nameList.length; index++) {
                            var name = nameList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                            wrapper.selectAll('.pathAlterName' + name + '.pathStYear' + startYear + '.pathEdYear' + endYear)
                                .attr('stroke', function (d) {
                                    if (d.highlight) {
                                        return '#08519c';
                                    }
                                    if (d.click) {
                                        return '#777777';
                                    }
                                    var stStr = d['stStr'];
                                    var edStr = d['edStr'];
                                    if (stStr < 0 || edStr < 0) {
                                        d.stroke = '#999999';
                                        return '#999999';
                                    } else {
                                        d.stroke = '#aaaaaa';
                                        return '#aaaaaa';
                                    }
                                })
                                .attr('stroke-width', function(d) {
                                    if (!d['click']) {
                                        return 1;
                                    }
                                    return 2;
                                })
                                .attr('stroke-opacity', function (d) {
                                    if (!d['click']) {
                                        var stStr = d['stStr'];
                                        var edStr = d['edStr'];
                                        if (stStr < 0 || edStr < 0) {
                                            return 0.6;
                                        } else {
                                            return 0.6;
                                        }
                                    }
                                });
                        }
                        tip.hide(d);
                    }
                });
        };

        var genFlowList = function (yearDict) {
            var yearList = genYearList(yearDict);
            var flowList = [];
            for (var i = 0; i < yearList.length - 1; i++) {
                var flowItem = {};
                flowItem.startYear = yearList[i];
                flowItem.endYear = yearList[i + 1];
                flowItem.cnt = 0;
                flowItem.strength = 0;
                flowItem.nameList = [];
                for (var key in yearDict[yearList[i + 1]]['tieStrength']) {
                    if (yearDict[yearList[i + 1]]['tieStrength'].hasOwnProperty(key) &&
                        yearDict[yearList[i]]['tieStrength'].hasOwnProperty(key)) {
                        var curStrength = yearDict[yearList[i + 1]]['tieStrength'][key];
                        var preStrength = yearDict[yearList[i]]['tieStrength'][key];
                        flowItem.cnt += 1;
                        flowItem.strength += (curStrength - preStrength);
                        flowItem.nameList.push(key);
                    }
                }
                flowList.push(flowItem);
            }
            return flowList;
        };

        // var drawGlyphRectangle = function (element, egoGlyphWrapper, egoData) {
        //     console.log("this is drawGlyphRectangle");
        //     var timelineConfig = egoVisService.timelineConfig;
        //     // console.log("egoData['yearDict']",egoData['yearDict']);
        //     var yearList = genYearList(egoData['yearDict']);
        //     var yearList=['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];
        //     egoGlyphWrapper.selectAll('.denCircle')
        //         .data(yearList)
        //         .enter()
        //         .append('circle')
        //         .attr('class', 'denCircle')
        //         .attr('cx', function (d,i) {
        //             return (genYearDistance(egoData.startYear, d) * 100 + 9 + 15)+220+i*326+4+100;
        //         })
        //         .attr('cy', 25).attr("r",20)
        //         // .attr('r', egoVisService.innerRadius)
        //         // .attr('width', 32)
        //         // .attr('height', 32)
        //         .style('fill', function (d) {
        //             // var edgeNum = egoData['yearDict'][d]['edgeList'].length;
        //             // var alterNum = egoData['yearDict'][d]['neighborList'].length;
        //             // var value = undefined;
        //             // if (alterNum == 1) {
        //             //     value = 6;
        //             // } else {
        //             //     value = edgeNum * 2 / (alterNum * (alterNum - 1));
        //             //     var value2 = getConnectedComponents(egoData['yearDict'][d]).length;
        //             //     value = Math.floor(value * 6);
        //             // }
        //             return egoVisService.densityColor[1];
        //         })
        //         .on('mouseover', function (d) {
        //             d3.select(this)
        //                 .attr('stroke', 'white')
        //                 .attr('stroke-width', 1);
        //             coreTip.show(d);
        //         })
        //         .on('mouseout', function (d) {
        //             d3.select(this)
        //                 .attr('stroke', 'none')
        //                 .attr('stroke-width', 0);
        //             coreTip.hide(d);
        //         });
        //
        //
        //     // var alterArcWrapper = egoGlyphWrapper.selectAll('.alterArcWrapper')
        //     //     .data(yearList)
        //     //     .enter()
        //     //     .append('g')
        //     //     .attr('class', 'alterArcWrapper')
        //     //     .attr('transform', function (d) {
        //     //         return 'translate(' + (genYearDistance(egoData.startYear, d) * 100 + timelineConfig.basicWidth / 2) + ',' +
        //     //             (timelineConfig.basicWidth / 2) + ')';
        //     //     });
        //     //
        //     // var pie = d3.layout.pie()
        //     //     .sort(null)
        //     //     .value(function (d) {
        //     //         return d;
        //     //     });
        //     //
        //     // var tip = d3.tip()
        //     //     .attr('class', 'd3-tip')
        //     //     .offset([10, 100])
        //     //     .direction('s')
        //     //     .html(function (d) {
        //     //         var str = '<div id="myD3Tip"><ul>';
        //     //         str += '<li> Type:' + d.title + '</li>';
        //     //         str += '<li> Percent:' + d.cnt + '/' + d.totcnt + '</li>';
        //     //         str += '<li> Alter list: </li>';
        //     //         for (var i = 0; i < d.nameList.length; i++) {
        //     //             var atomStr = '<li>' + d.nameList[i] + '</li>';
        //     //             str += atomStr;
        //     //         }
        //     //         str += '</ul></div>';
        //     //         return str;
        //     //     });
        //     // var coreTip = d3.tip()
        //     //     .attr('class', 'd3-tip')
        //     //     .offset([10, 100])
        //     //     .direction('s')
        //     //     .html(function (d) {
        //     //         var connectedComponentsNum = getConnectedComponents(egoData['yearDict'][d]).length;
        //     //         //+ egoData['yearDict'][d]['titleList'].length + '</h5><ul>';
        //     //         //egoData['yearDict'][d]['titleList'].sort();
        //     //         //for (var i = 0; i < egoData['yearDict'][d]['titleList'].length; i++) {
        //     //         //var atomStr = '<li>' + egoData['yearDict'][d]['titleList'][i] + '</li>';
        //     //         //str += atomStr;
        //     //         //}
        //     //         //str += '</ul></div>';
        //     //         //
        //     //         //var str = '<div id="myD3Tip"><h5>Publication number: '
        //     //         //return '<div id="myD3Tip"><h5>Connected Components Num: ' + connectedComponentsNum + '</h5></div>';
        //     //         var edgeNum = egoData['yearDict'][d]['edgeList'].length;
        //     //         var alterNum = egoData['yearDict'][d]['neighborList'].length;
        //     //         var value = undefined;
        //     //         if (alterNum == 1) {
        //     //             value = 1;
        //     //         } else {
        //     //             value = edgeNum * 2 / (alterNum * (alterNum - 1));
        //     //         }
        //     //         var floatFormat = d3.format('.2f');
        //     //         return '<div id="myD3Tip"><h5>Density: ' + floatFormat(value) + '</h5></div>';
        //     //     });
        //     //
        //     // var fstDegreeTip = d3.tip()
        //     //     .attr('class', 'd3-tip')
        //     //     .offset([10, 100])
        //     //     .direction('s')
        //     //     .html(function (d) {
        //     //         var str = '<div id="myD3Tip"><ul>';
        //     //         var alterNum = egoData['yearDict'][d]['neighborList'].length;
        //     //         str += '<li>1-level alter number: ' + alterNum + '</li>';
        //     //         str += '</ul></div>';
        //     //         return str;
        //     //     });
        //     //
        //     //
        //     // var secDegreeTip = d3.tip()
        //     //     .attr('class', 'd3-tip')
        //     //     .offset([10, 100])
        //     //     .direction('s')
        //     //     .html(function (d) {
        //     //         var str = '<div id="myD3Tip"><ul>';
        //     //         var secAlterNum = egoData['yearDict'][d]['secondDegreeNeighborList'].length;
        //     //         str += '<li>2-level alter number: ' + secAlterNum + '</li>';
        //     //         str += '</ul></div>';
        //     //         return str;
        //     //     });
        //     // egoGlyphWrapper.call(tip);
        //     // egoGlyphWrapper.call(coreTip);
        //     // egoGlyphWrapper.call(fstDegreeTip);
        //     // egoGlyphWrapper.call(secDegreeTip);
        //     // //var distributionDict = genDistributionLastYear(egoData['yearDict']);
        //     // var distributionDict = genDistributionPreviousYear(egoData['yearDict']);
        //     //
        //     // alterArcWrapper.call(tip);
        //     // var alterArc = alterArcWrapper.selectAll('.alterArc')
        //     //     .data(function (d) {
        //     //         var res = [];
        //     //         for (var i = 0; i < distributionDict[d].length; i++) {
        //     //             res.push(distributionDict[d][i]['cnt']);
        //     //         }
        //     //         var res = pie(res);
        //     //         for (var i = 0; i < res.length; i++) {
        //     //             res[i]['outerRadius'] = calGlyphRadius(egoData['yearDict'][d]['neighborList'].length);
        //     //             res[i]['nameList'] = distributionDict[d][i]['nameList'];
        //     //             res[i]['totcnt'] = distributionDict[d][i]['totcnt'];
        //     //             res[i]['cnt'] = distributionDict[d][i]['cnt'];
        //     //             res[i]['title'] = distributionDict[d][i]['title'];
        //     //             res[i]['year'] = d;
        //     //         }
        //     //         return res;
        //     //     })
        //     //     .enter()
        //     //     .append('g')
        //     //     .attr('class', '.alterArc');
        //     //
        //     //
        //     // alterArc.append('rect')
        //     //     .attr('x',function(d, i) {
        //     //         return -16 + 8 * i;
        //     //     })
        //     //     .attr('y', function(d, i) {
        //     //         var cnt = d['cnt'];
        //     //         var height = Math.min(32, 32 * Math.sqrt(cnt) / Math.sqrt(dataService.getMaxAlter()) * 1.5);
        //     //         return 16 - height;
        //     //     })
        //     //     .attr('width', 8)
        //     //     .attr('height', function(d) {
        //     //         var cnt = d['cnt'];
        //     //         return Math.min(32, 32 * Math.sqrt(cnt) / Math.sqrt(dataService.getMaxAlter()) * 1.5);
        //     //     })
        //     //     .style('fill', function (d, i) {
        //     //         return egoVisService.arcColor[i];
        //     //     })
        //     //     .on('mouseover', function (d) {
        //     //         d3.select(this)
        //     //             .attr('stroke', 'white')
        //     //             .attr('stroke-width', 1);
        //     //         var nameList = d['nameList'];
        //     //         var wrapper = d3.select(element).select('.egoExpansionWrapper');
        //     //         for (var index = 0; index < nameList.length; index++) {
        //     //             var name = nameList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
        //     //             wrapper.selectAll('.expansionAlter'+d['year']+'.alterName'+name)
        //     //                 .attr('x1', function(d) {
        //     //                     return parseInt(d3.select(this).attr('x1')) - 5;
        //     //                 })
        //     //                 .attr('x2', function(d) {
        //     //                     return parseInt(d3.select(this).attr('x2')) + 5;
        //     //                 });
        //     //         }
        //     //         tip.show(d);
        //     //     })
        //     //     .on('mouseout', function (d) {
        //     //         d3.select(this)
        //     //             .attr('stroke', 'none')
        //     //             .attr('stroke-width', 0);
        //     //         var nameList = d['nameList'];
        //     //         var wrapper = d3.select(element).select('.egoExpansionWrapper');
        //     //         for (var index = 0; index < nameList.length; index++) {
        //     //             var name = nameList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
        //     //             wrapper.selectAll('.expansionAlter'+d['year']+'.alterName'+name)
        //     //                 .attr('x1', function(d) {
        //     //                     return parseInt(d3.select(this).attr('x1')) + 5;
        //     //                 })
        //     //                 .attr('x2', function(d) {
        //     //                     return parseInt(d3.select(this).attr('x2')) - 5;
        //     //                 });
        //     //         }
        //     //
        //     //         tip.hide(d);
        //     //     });
        //     //
        //     // egoGlyphWrapper.selectAll('.fstAlterCircle')
        //     //     .data(yearList)
        //     //     .enter()
        //     //     .append('line')
        //     //     .attr('class', 'fstAlterCircle')
        //     //     .attr('x1', function (d) {
        //     //         return genYearDistance(egoData.startYear, d) * 100 + 9;
        //     //     })
        //     //     .attr('y1', 5)
        //     //     .attr('x2', function (d) {
        //     //         var alterNum = egoData['yearDict'][d]['neighborList'].length;
        //     //         //return genYearDistance(egoData.startYear, d) * 100 + 9 + alterNum / dataService.getMaxSecondAlter() * 32;
        //     //         return genYearDistance(egoData.startYear, d) * 100 + 9 + calGlyphLength(alterNum);
        //     //     })
        //     //     .attr('y2', 5)
        //     //     .attr('stroke', egoVisService.secAlterColor)
        //     //     .attr('stroke-width', 3)
        //     //     .on('mouseover', function (d) {
        //     //         fstDegreeTip.show(d);
        //     //     })
        //     //     .on('mouseout', function (d) {
        //     //         fstDegreeTip.hide(d);
        //     //     });
        //     //
        //     // egoGlyphWrapper.selectAll('.secAlterCircle')
        //     //     .data(yearList)
        //     //     .enter()
        //     //     .append('line')
        //     //     .attr('class', 'secAlterCircle')
        //     //     .attr('x1', function (d) {
        //     //         return genYearDistance(egoData.startYear, d) * 100 + 9;
        //     //     })
        //     //     .attr('y1', 45)
        //     //     .attr('x2', function (d) {
        //     //         var secAlterNum = egoData['yearDict'][d]['secondDegreeNeighborList'].length;
        //     //         //return genYearDistance(egoData.startYear, d) * 100 + 9 + secAlterNum / dataService.getMaxSecondAlter() * 32;
        //     //         return genYearDistance(egoData.startYear, d) * 100 + 9 + calGlyphLength(secAlterNum);
        //     //     })
        //     //     .attr('y2', 45)
        //     //     .attr('stroke', egoVisService.secAlterColor)
        //     //     .attr('stroke-width', 3)
        //     //     .on('mouseover', function (d) {
        //     //         secDegreeTip.show(d);
        //     //     })
        //     //     .on('mouseout', function (d) {
        //     //         secDegreeTip.hide(d);
        //     //     });
        // };

        var drawGlyphCircle = function (element, egoGlyphWrapper, egoData) {
            var timelineConfig = egoVisService.timelineConfig;
            var yearList = genYearList(egoData['yearDict']);
            var alterArcWrapper = egoGlyphWrapper.selectAll('.alterArcWrapper')
                .data(yearList)
                .enter()
                .append('g')
                .attr('class', 'alterArcWrapper')
                .attr('transform', function (d) {
                    return 'translate(' + (genYearDistance(egoData.startYear, d) * 100 + timelineConfig.basicWidth / 2) + ',' +
                        (timelineConfig.basicWidth / 2) + ')';
                });

            var pie = d3.layout.pie()
                .sort(null)
                .value(function (d) {
                    return d;
                });

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([10, 100])
                .direction('s')
                .html(function (d) {
                    var str = '<div id="myD3Tip"><ul>';
                    str += '<li> Type:' + d.title + '</li>';
                    str += '<li> Percent:' + d.cnt + '/' + d.totcnt + '</li>';
                    str += '<li> Alter list: </li>';
                    for (var i = 0; i < d.nameList.length; i++) {
                        var atomStr = '<li>' + d.nameList[i] + '</li>';
                        str += atomStr;
                    }
                    str += '</ul></div>';
                    return str;
                });
            var coreTip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([10, 100])
                .direction('s')
                .html(function (d) {
                    var connectedComponentsNum = getConnectedComponents(egoData['yearDict'][d]).length;
                    //+ egoData['yearDict'][d]['titleList'].length + '</h5><ul>';
                    //egoData['yearDict'][d]['titleList'].sort();
                    //for (var i = 0; i < egoData['yearDict'][d]['titleList'].length; i++) {
                    //var atomStr = '<li>' + egoData['yearDict'][d]['titleList'][i] + '</li>';
                    //str += atomStr;
                    //}
                    //str += '</ul></div>';
                    //
                    //var str = '<div id="myD3Tip"><h5>Publication number: '
                    //return '<div id="myD3Tip"><h5>Connected Components Num: ' + connectedComponentsNum + '</h5></div>';
                    var edgeNum = egoData['yearDict'][d]['edgeList'].length;
                    var alterNum = egoData['yearDict'][d]['neighborList'].length;
                    var value = undefined;
                    if (alterNum == 1) {
                        value = 1;
                    } else {
                        value = edgeNum * 2 / (alterNum * (alterNum - 1));
                    }
                    var floatFormat = d3.format('.2f');
                    return '<div id="myD3Tip"><h5>Density: ' + floatFormat(value) + '</h5></div>';
                });
            var secDegreeTip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([10, 100])
                .direction('s')
                .html(function (d) {
                    var str = '<div id="myD3Tip"><ul>';
                    var secAlterNum = egoData['yearDict'][d]['secondDegreeNeighborList'].length;
                    str += '<li>2-level alter number: ' + secAlterNum + '</li>';
                    str += '</ul></div>';
                    return str;
                });
            egoGlyphWrapper.call(tip);
            egoGlyphWrapper.call(coreTip);
            egoGlyphWrapper.call(secDegreeTip);
            //var distributionDict = genDistributionLastYear(egoData['yearDict']);
            var distributionDict = genDistributionPreviousYear(egoData['yearDict']);

            alterArcWrapper.call(tip);
            var alterArc = alterArcWrapper.selectAll('.alterArc')
                .data(function (d) {
                    var res = [];
                    for (var i = 0; i < distributionDict[d].length; i++) {
                        res.push(distributionDict[d][i]['cnt']);
                    }
                    var res = pie(res);
                    for (var i = 0; i < res.length; i++) {
                        res[i]['outerRadius'] = calGlyphRadius(egoData['yearDict'][d]['neighborList'].length);
                        res[i]['nameList'] = distributionDict[d][i]['nameList'];
                        res[i]['totcnt'] = distributionDict[d][i]['totcnt'];
                        res[i]['cnt'] = distributionDict[d][i]['cnt'];
                        res[i]['title'] = distributionDict[d][i]['title'];
                        res[i]['year'] = d;
                    }
                    return res;
                })
                .enter()
                .append('g')
                .attr('class', '.alterArc');

            alterArc.append('path')
                .attr('d', function (d) {
                    var arc = d3.svg.arc()
                        .outerRadius(d.outerRadius)
                        .innerRadius(egoVisService.innerRadius);
                    //.innerRadius(egoVisService.innerRadius);
                    return arc(d);
                })
                .style('fill', function (d, i) {
                    return egoVisService.arcColor[i];
                })
                .on('mouseover', function (d) {
                    d3.select(this)
                        .attr('stroke', 'white')
                        .attr('stroke-width', 1);
                    var nameList = d['nameList'];
                    var wrapper = d3.select(element).select('.egoExpansionWrapper');
                    for (var index = 0; index < nameList.length; index++) {
                        var name = nameList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                        wrapper.selectAll('.expansionAlter'+d['year']+'.alterName'+name)
                            .attr('x1', function(d) {
                                return parseInt(d3.select(this).attr('x1')) - 5;
                            })
                            .attr('x2', function(d) {
                                return parseInt(d3.select(this).attr('x2')) + 5;
                            });
                    }
                    tip.show(d);
                })
                .on('mouseout', function (d) {
                    d3.select(this)
                        .attr('stroke', 'none')
                        .attr('stroke-width', 0);
                    var nameList = d['nameList'];
                    var wrapper = d3.select(element).select('.egoExpansionWrapper');
                    for (var index = 0; index < nameList.length; index++) {
                        var name = nameList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                        wrapper.selectAll('.expansionAlter'+d['year']+'.alterName'+name)
                            .attr('x1', function(d) {
                                return parseInt(d3.select(this).attr('x1')) + 5;
                            })
                            .attr('x2', function(d) {
                                return parseInt(d3.select(this).attr('x2')) - 5;
                            });
                    }

                    tip.hide(d);
                });

            egoGlyphWrapper.selectAll('.secAlterCircle')
                .data(yearList)
                .enter()
                .append('circle')
                .attr('class', 'secAlterCircle')
                .attr('cx', function (d) {
                    return genYearDistance(egoData.startYear, d) * 100 +
                        timelineConfig.basicWidth / 2;
                })
                .attr('cy', timelineConfig.basicWidth / 2)
                .attr('r', function (d) {
                    var secAlterNum = egoData['yearDict'][d]['secondDegreeNeighborList'].length;
                    return calGlyphRadius(secAlterNum) - 1;
                })
                .attr('fill', 'none')
                .attr('stroke', egoVisService.secAlterColor)
                .on('mouseover', function (d) {
                    secDegreeTip.show(d);
                })
                .on('mouseout', function (d) {
                    secDegreeTip.hide(d);
                });

            egoGlyphWrapper.selectAll('.denCircle')
                .data(yearList)
                .enter()
                .append('circle')
                .attr('class', 'denCircle')
                .attr('cx', function (d) {
                    return genYearDistance(egoData.startYear, d) * 100 +
                        timelineConfig.basicWidth / 2;
                })
                .attr('cy', timelineConfig.basicWidth / 2)
                .attr('r', egoVisService.innerRadius)
                .style('fill', function (d) {
                    var edgeNum = egoData['yearDict'][d]['edgeList'].length;
                    var alterNum = egoData['yearDict'][d]['neighborList'].length;
                    var value = undefined;
                    if (alterNum == 1) {
                        value = 6;
                    } else {
                        value = edgeNum * 2 / (alterNum * (alterNum - 1));
                        var value2 = getConnectedComponents(egoData['yearDict'][d]).length;
                        value = Math.floor(value * 6);
                    }
                    return egoVisService.densityColor[value];
                })
                .on('mouseover', function (d) {
                    d3.select(this)
                        .attr('stroke', 'white')
                        .attr('stroke-width', 1);
                    coreTip.show(d);
                })
                .on('mouseout', function (d) {
                    d3.select(this)
                        .attr('stroke', 'none')
                        .attr('stroke-width', 0);
                    coreTip.hide(d);
                });
        };

        var getConnectedComponents = function (yearInfo) {
            var numNeighbor = yearInfo['neighborList'].length;
            var edgeList = yearInfo['edgeList'];
            var isVisited = new Array(numNeighbor);
            for (var i = 0; i < numNeighbor; i++) {
                isVisited[i] = false;
            }
            var adjacencyMatrix = getAdjacencyMatrix(edgeList, numNeighbor);
            var queue = [];
            var connectedComponents = [];
            for (var i = 0; i < numNeighbor; i++) {
                if (!isVisited[i]) {
                    queue.push(i);
                    isVisited[i] = true;
                    var component = [];
                    while (queue.length > 0) {
                        var node = queue.shift();
                        component.push(node);
                        var neighbors = getAllNonVisitedNeighborOfNode(node, adjacencyMatrix, isVisited);
                        isVisited = updateIsVisited(neighbors, isVisited);
                        queue = queue.concat(neighbors);
                    }
                    connectedComponents.push(component);
                }
            }
            return connectedComponents
        };

        var updateIsVisited = function (nodeList, isVisited) {
            for (var i = 0; i < nodeList.length; i++) {
                var node = nodeList[i];
                isVisited[node] = true;
            }
            return isVisited;
        };

        var getAdjacencyMatrix = function (edgeList, size) {
            var adjacencyMatrix = new Array(size);
            var zeroArray = new Array(size);
            for (var i = 0; i < size; i++) {
                zeroArray[i] = 0;
            }
            for (var i = 0; i < size; i++) {
                adjacencyMatrix[i] = zeroArray.slice();
            }
            for (var i = 0; i < edgeList.length; i++) {
                var index1 = edgeList[i]['index1'];
                var index2 = edgeList[i]['index2'];
                adjacencyMatrix[index1][index2] = 1;
                adjacencyMatrix[index2][index1] = 1;
            }
            return adjacencyMatrix;
        };

        var getAllNonVisitedNeighborOfNode = function (neighbor, adjacencyMatrix, isVisited) {
            var nonVisitedNeighbor = [];
            for (var j = 0; j < adjacencyMatrix[neighbor].length; j++) {
                if (adjacencyMatrix[neighbor][j] == 1 && !isVisited[j]) {
                    nonVisitedNeighbor.push(j);
                }
            }
            return nonVisitedNeighbor;
        };

        var getLen = function (dict) {
            var cnt = 0;
            for (var key in dict) {
                if (dict.hasOwnProperty(key)) {
                    cnt += 1;
                }
            }
            return cnt;
        };

        var genOuterRadius = function (len) {
            return Math.sqrt(len) * 2 + 8;
        };

        var genDistributionLastYear = function (yearDict) {
            /* 0: new alters
             * 1: stronger strength alters
             * 2: weaker strength alters
             * 3: same strength alters
             **/
            var yearList = genYearList(yearDict);
            var distributionDict = {};
            for (var i = 0; i < yearList.length; i++) {
                if (i == 0) {
                    distributionDict[yearList[i]] = [
                        {
                            cnt: 1,
                            nameList: []
                        },
                        {
                            cnt: 0,
                            nameList: []
                        },
                        {
                            cnt: 0,
                            nameList: []
                        },
                        {
                            cnt: 0,
                            nameList: []
                        }
                    ];
                    for (var key in yearDict[yearList[i]]['tieStrength']) {
                        if (yearDict[yearList[i]]['tieStrength'].hasOwnProperty(key)) {
                            distributionDict[yearList[i]][0].nameList.push(key);
                        }
                    }
                } else {
                    distributionDict[yearList[i]] = [
                        {
                            cnt: 0,
                            nameList: []
                        },
                        {
                            cnt: 0,
                            nameList: []
                        },
                        {
                            cnt: 0,
                            nameList: []
                        },
                        {
                            cnt: 0,
                            nameList: []
                        }
                    ];
                    var preYearDict = yearDict[yearList[i - 1]]['tieStrength'];
                    var curYearDict = yearDict[yearList[i]]['tieStrength'];
                    for (var key in curYearDict) {
                        if (curYearDict.hasOwnProperty(key)) {
                            if (preYearDict.hasOwnProperty(key)) {
                                var preStrength = preYearDict[key];
                                var curStrength = curYearDict[key];
                                if (curStrength > preStrength) {
                                    distributionDict[yearList[i]][3].cnt += 1;
                                    distributionDict[yearList[i]][3].nameList.push(key);
                                } else if (curStrength < preStrength) {
                                    distributionDict[yearList[i]][1].cnt += 1;
                                    distributionDict[yearList[i]][1].nameList.push(key);
                                } else {
                                    distributionDict[yearList[i]][2].cnt += 1;
                                    distributionDict[yearList[i]][2].nameList.push(key);
                                }
                            } else {
                                distributionDict[yearList[i]][0].cnt += 1;
                                distributionDict[yearList[i]][0].nameList.push(key);
                            }
                        }
                    }
                }
            }
            return distributionDict;
        };

        var genDistributionPreviousYear = function (yearDict) {
            /* 0: new alters
             * 1: weaker strength alters
             * 2: same strength alters
             * 3: stronger strength alters
             **/
            var yearList = genYearList(yearDict);
            var distributionDict = {};
            var preDict = {};
            for (var i = 0; i < yearList.length; i++) {
                var curYearDict = yearDict[yearList[i]]['tieStrength'];
                if (i == 0) {
                    distributionDict[yearList[i]] = [
                        {
                            cnt: 0,
                            nameList: [],
                            totcnt: 0,
                            title: 'New alters'
                        },
                        {
                            cnt: 0,
                            nameList: [],
                            totcnt: 0,
                            title: 'Weaker tie alters'
                        },
                        {
                            cnt: 0,
                            nameList: [],
                            totcnt: 0,
                            title: 'Same tie alters'
                        },
                        {
                            cnt: 0,
                            nameList: [],
                            totcnt: 0,
                            title: 'Stronger tie alters'
                        }
                    ];

                    for (var key in curYearDict) {
                        if (curYearDict.hasOwnProperty(key)) {
                            preDict[key] = curYearDict[key];
                            distributionDict[yearList[i]][0].nameList.push(key);
                            distributionDict[yearList[i]][0].cnt += 1;
                        }
                    }
                    for (var j = 0; j < 4; j++) {
                        distributionDict[yearList[i]][j].totcnt = distributionDict[yearList[i]][0].cnt;
                    }
                } else {
                    distributionDict[yearList[i]] = [
                        {
                            cnt: 0,
                            nameList: [],
                            totcnt: 0,
                            title: 'New alters'
                        },
                        {
                            cnt: 0,
                            nameList: [],
                            totcnt: 0,
                            title: 'Weaker tie alters'
                        },
                        {
                            cnt: 0,
                            nameList: [],
                            totcnt: 0,
                            title: 'Same tie alters'
                        },
                        {
                            cnt: 0,
                            nameList: [],
                            totcnt: 0,
                            title: 'Stronger tie alters'
                        }
                    ];
                    for (var key in curYearDict) {
                        if (curYearDict.hasOwnProperty(key)) {
                            if (preDict.hasOwnProperty(key)) {
                                var preStrength = preDict[key];
                                var curStrength = curYearDict[key];
                                if (curStrength > preStrength) {
                                    distributionDict[yearList[i]][3].cnt += 1;
                                    distributionDict[yearList[i]][3].nameList.push(key);
                                } else if (curStrength < preStrength) {
                                    distributionDict[yearList[i]][1].cnt += 1;
                                    distributionDict[yearList[i]][1].nameList.push(key);
                                } else {
                                    distributionDict[yearList[i]][2].cnt += 1;
                                    distributionDict[yearList[i]][2].nameList.push(key);
                                }
                            } else {
                                distributionDict[yearList[i]][0].cnt += 1;
                                distributionDict[yearList[i]][0].nameList.push(key);
                            }
                            preDict[key] = curYearDict[key];
                        }
                    }
                    for (var j = 0; j < 4; j++) {
                        distributionDict[yearList[i]][j].totcnt = distributionDict[yearList[i]][0].cnt + distributionDict[yearList[i]][1].cnt + distributionDict[yearList[i]][2].cnt + distributionDict[yearList[i]][3].cnt;
                    }
                }
            }
            return distributionDict;
        };

        var genYearList = function (yearDict) {
            var list = [];
            for (var key in yearDict) {
                if (yearDict.hasOwnProperty(key)) {
                    list.push(key);
                }
            }
            return list.sort();
        };

        var genYearDistance = function (start, end) {
            if (start < 10000) {
                return end - start;
            } else {
                var stYear = Math.floor(start / 100);
                var edYear = Math.floor(end / 100);
                var stMon = start % 100;
                var edMon = end % 100;
                if (stYear == edYear) {
                    return edMon - stMon;
                } else {
                    return (edYear - stYear - 1) * 12 + 12 - stMon + edMon;
                }
            }
        };

        var genFullYearList = function (start, end) {
            if (start < 10000) {
                return d3.range(start, parseInt(end) + 1);
            } else {
                var res = [];
                var stYear = Math.floor(start / 100);
                var edYear = Math.floor(end / 100);
                var stMon = start % 100;
                var edMon = end % 100;
                if (stYear == edYear) {
                    for (var i = stMon; i <= edMon; i++) {
                        res.push(stYear * 100 + i);
                    }
                } else {
                    for (var i = stMon; i <= 12; i++) {
                        res.push(stYear * 100 + i);
                    }
                    for (var i = stYear + 1; i < edYear; i++) {
                        for (var j = 1; j <= 12; j++) {
                            res.push(i * 100 + j);
                        }
                    }
                    for (var i = 1; i <= edMon; i++) {
                        res.push(edYear * 100 + i);
                    }
                }
                return res;
            }
        };

        var incYear = function (year) {
            if (Math.floor(year / 10000) > 0) {
                var month = year % 100;
                if (month == 12) {
                    return (Math.floor(year / 100) + 1) * 100 + 1;
                } else {
                    return year + 1;
                }
            }
            else
                return year + 1;
        };

        var decYear = function (year) {
            if (Math.floor(year / 10000) > 0) {
                var month = year % 100;
                if (month == 1) {
                    return (Math.floor(year / 100) - 1) * 100 + 12;
                } else {
                    return year - 1;
                }
            }
            else
                return year - 1;
        };

        var yearDiff = function (a, b) {
            if (Math.floor(a / 10000) > 0) {
                var aYear = Math.floor(a / 100);
                var bYear = Math.floor(b / 100);
                var aMon = a % 100;
                var bMon = b % 100;
                if (aYear == bYear) {
                    return aMon - bMon;
                } else if (aYear > bYear) {
                    return (aYear - bYear - 1) * 12 + (12 - aMon) + bMon;
                } else {
                    return -((bYear - aYear - 1) * 12 + (12 - bMon) + aMon);
                }
            } else {
                return a - b;
            }
        };
        var drawEgoExpansionByConnectedComponents = function (svg, egoData) {
            var timelineConfig = egoVisService.timelineConfig;
            svg.select('.egoExpansionWrapper').remove();
            var egoExpansionWrapper = svg.selectAll('.egoExpansionWrapper')
                .data([egoData])
                .enter()
                .append('g')
                .attr('class', 'egoExpansionWrapper')
                .attr('transform', function (d) {
                    return 'translate(' + genYearDistance(timelineConfig.startYear,
                        d.startYear) * 100 + ', 0)';
                });

            var flowYearPos = drawExpansion2DegreeFlow(egoExpansionWrapper, egoData);
            var alterYearPos = drawExpansionAlterByConnectedComponents(egoExpansionWrapper, egoData);
            drawExpansionLines(egoExpansionWrapper, egoData, flowYearPos, alterYearPos);

            //drawExpansion2DegreeFlowGlyph(egoExpansionWrapper, egoData);
            //drawExpansionCommunity(egoExpansionWrapper, egoData);
        };

        egoVisService.reArrangeEgoExpand = function (element, egoData, orderFlag) {
            var svg = d3.select(element).select('.egoGlyphCanvas');
            d3.select(element).selectAll('.expansionPath').remove();
            d3.select(element).selectAll('.expansionAlter').remove();
            if (egoData.expansion) {
                if (!orderFlag) {
                    svg.attr('height', egoVisService.maxCanvasSize);
                    var egoTimeline = svg.selectAll('.egoTimeline');
                    drawEgoExpansion(svg, egoData);
                }
                else {
                    drawEgoExpansionByConnectedComponents(svg, egoData);
                }
            }
        };
        var drawExpansionAlterByConnectedComponents = function (egoExpansionWrapper, egoData) {
            var yearList = genYearList(egoData['yearDict']);
            var connectedComponentsAllYears = getConnectedComponentsAllYears(egoData, yearList);
            var maxElementForEachSection = getMaxElementForEachSection(connectedComponentsAllYears, yearList);
            var strStatDict = maxElementForEachSection;
            var alterYearSizeDict = getAlterYearSizeDict(yearList, connectedComponentsAllYears);
            var alterYearStrDict = genAlterYearStrDict(egoData['yearDict']);
            var alterYearDict = getAlterYearDict(alterYearSizeDict);
            var strStatPos = genStrStatPos(maxElementForEachSection);
            var timelineConfig = egoVisService.timelineConfig;
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([10, 0])
                .direction('s')
                .html(function (d) {
                    var str = '<div id="myD3Tip"><ul>';
                    var atomStr = '<li>' + d.key.replace('_', '.').replace('@', '') + ': ' + d.componentSize + '</li>';
                    str += atomStr;
                    str += '</ul></div>';
                    return str;
                });
            egoExpansionWrapper.call(tip);
            var alterYearPos = {};

            var preTieStrList = undefined;
            for (var i = 0; i < yearList.length; i++) {
                var year = yearList[i];
                var curTieStrDict = getCurTieStrDict(connectedComponentsAllYears[year]);
                //var prePublication = egoData['yearDict']['prePublication'];
                var curRes = {};
                var curRes2 = {};
                var curYear = yearList[i];
                var curTieStrList = [];
                for (var key in curTieStrDict) {
                    if (curTieStrDict.hasOwnProperty(key)) {
                        curTieStrList.push({'key': key, 'value': curTieStrDict[key]['sectionID'], 'componentSize': curTieStrDict[key]['componentSize']});
                    }
                }
                curTieStrList = posSort(curTieStrList, egoData['yearDict'], alterYearDict, yearList[i], preTieStrList);
                preTieStrList = curTieStrList;
                for (var j = 0; j < curTieStrList; j++) {

                }
                egoExpansionWrapper.selectAll('.expansionAlter' + curYear)
                    .data(curTieStrList)
                    .enter()
                    .append('line')
                    .attr('class', function (d) {
                        var nameClass = d['key'].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                        return 'expansionAlter' + curYear + ' expansionAlter' + ' alterName' + nameClass;
                    })
                    .attr('x1', function (d) {
                        return genYearDistance(egoData.startYear, curYear) * 100 + timelineConfig.basicWidth / 2 - 5;
                    })
                    .attr('x2', function (d) {
                        return genYearDistance(egoData.startYear, curYear) * 100 + timelineConfig.basicWidth / 2 + 5;
                    })
                    .attr('y1', function (d) {
                        var key = d.key;
                        d.year = curYear;
                        var value = d.value;
                        if (!curRes.hasOwnProperty(value)) {
                            curRes[value] = 0;
                        }
                        curRes[value] += 1;
                        //var curIndex = curRes[value];
                        var curIndex = d.pos;
                        var centerPos = strStatPos[value];
                        var yPos = undefined;
                        if (strStatDict[value] % 2 == 0) {
                            if (curIndex % 2 == 0) {
                                yPos = centerPos - (curIndex - 2) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth)
                                    - egoVisService.expansionAlterOffset / 2 - egoVisService.expansionAlterWidth;
                            } else {
                                yPos = centerPos + (curIndex - 1) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth) + egoVisService.expansionAlterOffset / 2;
                            }
                        } else {
                            if (curIndex % 2 == 0) {
                                yPos = centerPos - curIndex / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth);
                            } else {
                                yPos = centerPos + (curIndex - 1) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth);
                            }
                        }
                        if (alterYearPos[key] == undefined) {
                            alterYearPos[key] = {};
                        }
                        alterYearPos[key][curYear] = yPos;
                        return yPos;
                    })
                    .attr('y2', function (d) {
                        var key = d.key;
                        var value = d.value;
                        if (!curRes2.hasOwnProperty(value)) {
                            curRes2[value] = 0;
                        }
                        curRes2[value] += 1;
                        //var curIndex = curRes2[value];
                        var curIndex = d['pos'];
                        var centerPos = strStatPos[value];
                        var yPos = undefined;
                        if (strStatDict[value] % 2 == 0) {
                            if (curIndex % 2 == 0) {
                                yPos = centerPos - (curIndex - 2) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth)
                                    - egoVisService.expansionAlterOffset / 2 - egoVisService.expansionAlterWidth;
                            } else {
                                yPos = centerPos + (curIndex - 1) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth) + egoVisService.expansionAlterOffset / 2;
                            }
                        } else {
                            if (curIndex % 2 == 0) {
                                yPos = centerPos - curIndex / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth);
                            } else {
                                yPos = centerPos + (curIndex - 1) / 2 * (egoVisService.expansionAlterOffset + egoVisService.expansionAlterWidth);
                            }
                        }
                        return yPos;
                    })
                    .attr('stroke', function (d) {
                        var key = d['key'];
                        for (var k = 0; k < alterYearStrDict[key].length; k++) {
                            if (parseInt(alterYearStrDict[key][k]['year']) == yearList[i]) {
                                var color = undefined;
                                if (k == 0) {
                                    color = egoVisService.arcColor[0];
                                } else {
                                    var curValue = alterYearStrDict[key][k]['str'];
                                    var preValue = alterYearStrDict[key][k - 1]['str'];
                                    if (preValue < curValue) {
                                        color = egoVisService.arcColor[3];
                                    } else if (preValue > curValue) {
                                        color = egoVisService.arcColor[1];
                                    } else {
                                        color = egoVisService.arcColor[2];
                                    }
                                }
                                d.color = color;
                                d.stroke = color;
                                return color;
                            }
                        }
                    })
                    .attr('stroke-width', egoVisService.expansionAlterWidth)
                    .on('mouseover', function (d) {
                        d3.select(this)
                            //.attr('stroke', '#777777')
                            .attr('stroke-width', egoVisService.expansionAlterWidth + 1);
                        var alterList = egoData['yearDict'][d.year]['neighborList'];
                        var edgeList = egoData['yearDict'][d.year]['edgeList'];
                        var dIndex = undefined;
                        for (var index = 0; index < alterList.length; index++) {
                            if (alterList[index] == d['key']) {
                                dIndex = index;
                                break;
                            }
                        }
                        var highlightList = [];
                        for (var index = 0; index < edgeList.length; index++) {
                            if (edgeList[index]['index1'] == dIndex) {
                                highlightList.push(alterList[edgeList[index]['index2']]);
                            }

                            if (edgeList[index]['index2'] == dIndex) {
                                highlightList.push(alterList[edgeList[index]['index1']]);
                            }
                        }
                        for (var index = 0; index < highlightList.length; index++) {
                            var name = highlightList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                            var selector = '.pathStYear' + d.year + '.pathAlterName' + name;
                            selector += ',';
                            selector += ('.pathEdYear' + d.year + '.pathAlterName' + name);
                            egoExpansionWrapper.selectAll(selector)
                                .attr('stroke', function (d) {
                                    return '#08519c';
                                });
                        }
                        tip.show(d);
                    })
                    .on('mouseout', function (d) {
                        d3.select(this)
                            //.attr('stroke', '#aaaaaa')
                            .attr('stroke-width', egoVisService.expansionAlterWidth);
                        var alterList = egoData['yearDict'][d.year]['neighborList'];
                        var edgeList = egoData['yearDict'][d.year]['edgeList'];
                        var dIndex = undefined;
                        for (var index = 0; index < alterList.length; index++) {
                            if (alterList[index] == d['key']) {
                                dIndex = index;
                                break;
                            }
                        }
                        var highlightList = [];
                        for (var index = 0; index < edgeList.length; index++) {
                            if (edgeList[index]['index1'] == dIndex) {
                                highlightList.push(alterList[edgeList[index]['index2']]);
                            }

                            if (edgeList[index]['index2'] == dIndex) {
                                highlightList.push(alterList[edgeList[index]['index1']]);
                            }
                        }
                        for (var index = 0; index < highlightList.length; index++) {
                            var name = highlightList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                            var selector = '.pathStYear' + d.year + '.pathAlterName' + name;
                            selector += ',';
                            selector += ('.pathEdYear' + d.year + '.pathAlterName' + name);
                            egoExpansionWrapper.selectAll(selector)
                                .attr('stroke', function (d) {
                                    if (!d.highlight) {
                                        return d.stroke;
                                    } else {
                                        return '#08519c';
                                    }
                                });
                        }

                        tip.hide(d);
                    })
                    .on('click', function (d) {
                        var authorName = d.key;
                        if (d.highlightList) {
                            var highlightList = d.highlightList;
                            d3.select(this).attr('stroke', function (d) {
                                return d.stroke;
                            });
                            for (var index = 0; index < highlightList.length; index++) {
                                var name = highlightList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                                var selector = '.pathStYear' + d.year + '.pathAlterName' + name;
                                selector += ',';
                                selector += ('.pathEdYear' + d.year + '.pathAlterName' + name);
                                egoExpansionWrapper.selectAll(selector)
                                    .attr('stroke', function (d) {
                                        var tempIndex = undefined;
                                        for (var index = 0; index < d.highlight.length; index++) {
                                            if (d.highlight[index] == authorName) {
                                                d.highlight.splice(index, 1);
                                                break;
                                            }
                                        }
                                        if (d.highlight.length == 0) {
                                            d.highlight = undefined;
                                            return d.stroke;
                                        } else {
                                            return '#08519c';
                                        }
                                    });
                            }
                            d.highlightList = undefined;
                        } else {
                            var alterList = egoData['yearDict'][d.year]['neighborList'];
                            var edgeList = egoData['yearDict'][d.year]['edgeList'];
                            var dIndex = undefined;
                            d3.select(this).attr('stroke', 'black');
                            for (var index = 0; index < alterList.length; index++) {
                                if (alterList[index] == d['key']) {
                                    dIndex = index;
                                    break;
                                }
                            }
                            var highlightList = [];
                            for (var index = 0; index < edgeList.length; index++) {
                                if (edgeList[index]['index1'] == dIndex) {
                                    highlightList.push(alterList[edgeList[index]['index2']]);
                                }

                                if (edgeList[index]['index2'] == dIndex) {
                                    highlightList.push(alterList[edgeList[index]['index1']]);
                                }
                            }
                            for (var index = 0; index < highlightList.length; index++) {
                                var name = highlightList[index].replace(/\s+/g, '').replace('@', '').replace('\'', '');
                                var selector = '.pathStYear' + d.year + '.pathAlterName' + name;
                                selector += ',';
                                selector += ('.pathEdYear' + d.year + '.pathAlterName' + name);
                                egoExpansionWrapper.selectAll(selector)
                                    .attr('stroke', function (d) {
                                        if (!d.highlight) {
                                            d.highlight = [];
                                        }
                                        d.highlight.push(authorName);
                                        return '#08519c';
                                    });
                            }
                            d.highlightList = highlightList;
                        }
                    });
            }
            return alterYearPos;
        };

        var getConnectedComponentsAllYears = function (egoData, yearList) {
            var connectedComponentsAllYears = {};
            for (var i = 0; i < yearList.length; i++) {
                var year = yearList[i];
                connectedComponentsAllYears[year] = {};
                var componentList = getConnectedComponents(egoData['yearDict'][year]);
                componentList = componentList.sort(function (a, b) {
                    return b.length - a.length;
                });
                connectedComponentsAllYears[year]["componentList"] = componentList
                connectedComponentsAllYears[year]["neighborList"] = egoData['yearDict'][year]['neighborList'];
                var componentStat = {};
                for (var sectionID = 0; sectionID < componentList.length; sectionID++) {
                    componentStat[sectionID] = componentList[sectionID].length;
                }
                connectedComponentsAllYears[yearList[i]]["componentStat"] = componentStat;
            }
            return connectedComponentsAllYears;
        };
        var getMaxElementForEachSection = function (connectedComponentsAllYears, yearList) {
            var maxElementForEachSection = {};
            for (var i = 0; i < yearList.length; i++) {
                var year = yearList[i];
                var componentStat = connectedComponentsAllYears[year]["componentStat"];
                for (var sectionID in componentStat) {
                    if (componentStat.hasOwnProperty(sectionID)) {
                        var numComponents = componentStat[sectionID];
                        if (maxElementForEachSection.hasOwnProperty(sectionID)) {
                            if (numComponents > maxElementForEachSection[sectionID]) {
                                maxElementForEachSection[sectionID] = numComponents;
                            }
                        }
                        else {
                            maxElementForEachSection[sectionID] = numComponents;
                        }
                    }
                }

            }

            return maxElementForEachSection;
        };
        var getAlterYearSizeDict = function (yearList, connectedComponentsAllYears) {
            var alterYearSizeDict = {};
            for (var i = 0; i < yearList.length; i++) {
                var year = yearList[i];
                var componentList = connectedComponentsAllYears[year]["componentList"];
                for (var sectionID = 0; sectionID < componentList.length; sectionID++) {
                    var component = componentList[sectionID];
                    for (var j = 0; j < component.length; j++) {
                        var neighborIndex = component[j];
                        var neighborID = connectedComponentsAllYears[year]["neighborList"][neighborIndex];
                        var yearSizeObj = {"str": sectionID, "year": year};
                        if (!alterYearSizeDict.hasOwnProperty(neighborID)) {
                            alterYearSizeDict[neighborID] = [];
                        }
                        alterYearSizeDict[neighborID].push(yearSizeObj);
                    }
                }
            }
            return alterYearSizeDict;
        };
        var getAlterYearDict = function (alterYearSizeDict) {
            var alterYearDict = {};
            for (var user in alterYearSizeDict) {
                if (alterYearSizeDict.hasOwnProperty(user)) {
                    alterYearDict[user] = [];
                    var yearSizeList = alterYearSizeDict[user];
                    for (var i = 0; i < yearSizeList.length; i++) {
                        var yearSizeObj = yearSizeList[i];
                        alterYearDict[user].push(yearSizeObj.year);
                    }
                }
            }
            return alterYearDict;

        };
        var getCurTieStrDict = function (componentInfo) {
            var curTieStrDict = {};
            var componentList = componentInfo["componentList"];
            var neighborList = componentInfo["neighborList"];
            for (var sectionID = 0; sectionID < componentList.length; sectionID++) {
                var component = componentList[sectionID];
                var componentSize = component.length;
                for (var i = 0; i < componentSize; i++) {
                    var neighborIndex = component[i];
                    var neighborID = neighborList[neighborIndex];
                    curTieStrDict[neighborID] = {};
                    curTieStrDict[neighborID]["sectionID"] = sectionID;
                    curTieStrDict[neighborID]["componentSize"] = componentSize;
                }
            }
            return curTieStrDict;
        };
        return egoVisService;
    }]);
