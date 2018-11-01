'use strict';

vishope.factory('dataService', ['$http', function($http) {
    var dataService = {
        'NodeObjList': undefined,
        'highlightNodeDict': {},
        'maxAlter': 1,
        'maxStrength': 1,
        'maxSecondAlter': 0,
        'maxTieStr': 1,
        'maxPublication': 1,
        'scrollPos': 0,
        'startYear': undefined,
        'endYear': undefined,
        'authorPubDict': {}
    };

    var serverURL = '/ImageVis';
    //this.NodeObjList = undefined;
    //this.highlightNodeDict = {};

    // dataService.getDBList = function() {
    //     var getDBListURL = serverURL + '/mydata';
    //     return $http.get(getDBListURL);
    // };

    // const dog = '/dataset-tutorial-for-image-classification-master/ML-class-data/dog1.jpg';
    // async function loadMobilenet() {
    //     const M =  tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    //     // const saveResult = await M.save('localstorage://my-model-1');
    //     return M;
    // }
     var loadImage  = function(src) {

        var DIV = document.getElementById('image-vis');
        DIV.style.background='url('+ src+')';
        console.log(DIV);
        console.log('src',src);
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            console.log('width and height',img.width,img.height);
            img.onload = () => resolve(tf.fromPixels(img));
            img.onerror = (err) => reject(err);
        });
    }
    var cropImage= function(img) {
        var width = img.shape[0];
        var height = img.shape[1];
        if(width%2) width=width-1;
        if(height%2) height=height-1;
        img.shape[0] = width;
        img.shape[1] = height;
        console.log('crop-w-h',width,height);
        // use the shorter side as the size to which we will crop
        const shorterSide = Math.min(img.shape[0], img.shape[1]);

        // calculate beginning and ending crop points
        const startingHeight = (height - shorterSide) / 2;
        const startingWidth = (width - shorterSide) / 2;
        const endingHeight = startingHeight + shorterSide;
        const endingWidth = startingWidth + shorterSide;

        // return image data cropped to those points
        return img.slice([startingWidth, startingHeight, 0], [endingWidth, endingHeight, 3]);
    }
    var  resizeImage = function(image) {
        return tf.image.resizeBilinear(image, [224, 224]);
    }
    var  batchImage = function(image) {
        // Expand our tensor to have an additional dimension, whose size is 1
        const batchedImage = image.expandDims(0);

        // Turn pixel data into a float between -1 and 1.
        return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    }
    var  loadAndProcessImage = function(image) {
        const croppedImage = cropImage(image);
        const resizedImage = resizeImage(croppedImage);
        const batchedImage = batchImage(resizedImage);
        return batchedImage;
    }
    var  loadMobilenet = function() {
        const M =  tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
        // const saveResult = await M.save('localstorage://my-model-1');
        return M;
    }
    // async function saveMymodel(){
    //
    //     await model.save('localstorage://my-model-1');
    // }
    async function loadfileModle(){
        const path = './ml-classifier-blue-red.json';
        const model = await tf.loadModel(path);
        model.summary();
    }


    dataService.updateDataset = function() {

        // loadfileModle();
        // loadMobilenet().then(pretrainedModel => {
        //     console.log('here begin!');
        //
        // });



        // $http.get(serverURL + '/model.json')
        //     .success(function(data) {
        //         console.log('================');
        //         loadMobilenet().then( (pretrainedModel) => {
        //             console.log('next load image');
        //             loadImage('/dataset-tutorial-for-image-classification-master/dog1.jpg').then(img => {
        //                 console.log("################",img);
        //                 const processedImage = loadAndProcessImage(img);
        //                 const prediction = pretrainedModel.predict(processedImage);
        //                 console.log("predicting...");
        //                 // Because of the way Tensorflow.js works, you must call print on a Tensor instead of console.log.
        //                 prediction.print();
        //                 prediction.as1D().argMax().print();
        //
        //                 const labelPrediction = prediction.as1D().argMax().dataSync()[0];
        //                 //               console.log(`
        //                 //   Numeric prediction is ${labelPrediction}
        //                 //   The predicted label is ${labels[labelPrediction]}
        //                 //   The actual label is drum, membranophone, tympan
        //                 // `);
        //             });
        //         });
        //         // var maxTuple = calMax(data);
        //         // _this.maxStrDict = genMaxStrDict(data);
        //         // _this.maxAlter = maxTuple[0];
        //         // _this.maxSecondAlter = maxTuple[1];
        //         // _this.maxTieStr = maxTuple[2];
        //         // _this.selectedDataset = selectedDataset;
        //         _this.NodeObjList = data;
        //         _this.highlightNodeDict = {};
        //     });


        // tf.loadModel('localstorage:/'+serverURL + '/model.json');


        var _this = this;
        // this.NodeObjList = undefined;
        // this.highlightNodeDict = {};
        // this.maxAlter = 1;
        // this.maxStrength = 1;
        // this.maxSecondAlter = 0;
        // this.maxTieStr = 1;
        // this.maxPublication = 1;
        // this.scrollPos = 0;
        // this.startYear = undefined;
        // this.endYear = undefined;
        // this.authorPubDict = {};
        //var updateDatasetURL = serverURL + '/get_dataset';
        // var getNodeObjListURL = serverURL + '/node_obj_list' + '_name=' + selectedDataset;
        var getNodeObjListURL = serverURL + '/IMVIS_data';
        console.log("2",getNodeObjListURL);
        return $http.get(getNodeObjListURL)
            .success(function(data) {

                console.log("data",data);
                // var maxTuple = calMax(data);
                // _this.maxStrDict = genMaxStrDict(data);
                // _this.maxAlter = maxTuple[0];
                // _this.maxSecondAlter = maxTuple[1];
                // _this.maxTieStr = maxTuple[2];
                // _this.selectedDataset = selectedDataset;
                _this.NodeObjList = data;
                _this.highlightNodeDict = {};
            });
        //return $http.get(getAuthorObjURL, {'dataset-id': selectedDataset.id})
            //.success(function(data) {
                //_this.dataset = data;
                //_this.datasetID = selectedDataset.id;
            //});
    };

    // var genMaxStrDict = function(data) {
    //     var res = {};
    //     for (var i = 0; i < data.length; i++) {
    //         var author = data[i];
    //         var curRes = genStrStatDict(author['yearDict']);
    //         var startYear = author['startYear'];
    //         var endYear = author['endYear'];
    //         if (dataService.startYear == undefined || parseInt(startYear) < dataService.startYear) {
    //             dataService.startYear = parseInt(startYear);
    //         }
    //         if (dataService.endYear == undefined || parseInt(endYear) > dataService.endYear) {
    //             dataService.endYear = parseInt(endYear);
    //         }
    //         for (var key in curRes) {
    //             if (curRes.hasOwnProperty(key)) {
    //                 if ((!res.hasOwnProperty(key)) || (res[key] < curRes[key])) {
    //                     res[key] = curRes[key];
    //                 }
    //             }
    //         }
    //     }
    //     return res;
    // };

    var genYearList = function(yearDict) {
        var list = [];
        for (var key in yearDict) {
            if (yearDict.hasOwnProperty(key)) {
                list.push(key);
            }
        }
        return list.sort();
    };


    var genStrStatDict = function(yearDict) {
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

    var calMax = function(data) {
        for (var i = 0; i < data.length; i++) {
            var author = data[i];
            var publicationNum = author['publication'];
            dataService.authorPubDict[author['id']] = {};
            if (publicationNum > dataService.maxPublication) {
                dataService.maxPublication = publicationNum;
            }
            //if (author['yearDict']['2006'] && author['yearDict']['2007'] && author['yearDict']['2008']) {
                //var len1 = author['yearDict']['2006']['neighborList'].length;
                //var len2 = author['yearDict']['2007']['neighborList'].length;
                //var len3 = author['yearDict']['2008']['neighborList'].length;
                //if (len1 < len2 && len2 < len3) {
                    //console.log(author['id'], len1, len2, len3);
                //}
            //}
            for (var year in author['yearDict']) {
                if (author['yearDict'].hasOwnProperty(year)) {
                    var tieStrDict = author['yearDict'][year]['tieStrength'];
                    dataService.authorPubDict[author['id']][year] = author['yearDict'][year]['prePublication'];
                    var alterNum = author['yearDict'][year]['neighborList'].length;
                    var secondAlterNum = author['yearDict'][year]['secondDegreeNeighborList'].length;
                    if (secondAlterNum > dataService.maxSecondAlter) {
                        dataService.maxSecondAlter = secondAlterNum;
                    }
                    if (alterNum > dataService.maxAlter) {
                        dataService.maxAlter = alterNum;
                    }
                    for (var alter in tieStrDict) {
                        if (tieStrDict.hasOwnProperty(alter)) {
                            if (dataService.maxTieStr < tieStrDict[alter]) {
                                dataService.maxTieStr = tieStrDict[alter];
                            }
                        }
                    }
                }
            }
        }
        return [dataService.maxAlter, dataService.maxSecondAlter, dataService.maxTieStr];
    };

    dataService.getMaxAlter = function() {
        return this.maxAlter;
    };

    dataService.getMaxSecondAlter = function() {
        return this.maxSecondAlter;
    };

    dataService.getMaxTieStr = function() {
        return this.maxTieStr;
    };

    dataService.getNodeObjList = function() {
        return this.NodeObjList;
    };

    dataService.getNodeSchema = function() {

        // var getNodeSchemaURL = serverURL + '/node_schema' + '_name=' + this.selectedDataset;
        // console.log("this.selectedDataset:",this.selectedDataset,getNodeSchemaURL);
        // return $http.get(getNodeSchemaURL);
    };

    dataService.getOverviewData = function(dateRange) {
        var getOverviewDataURL = serverURL + '/overview_data';
        return $http.post(getOverviewDataURL, {dataset: dataService.selectedDataset, startDate: dateRange[0], endDate: dateRange[dateRange.length - 1]});
    };

    dataService.recordTask1 = function(res) {
        var recordTask1 = serverURL + '/task1record';
        return $http.post(recordTask1, res);
    };

    dataService.recordTask2 = function(res) {
        var recordTask2 = serverURL + '/task2record';
        return $http.post(recordTask2, res);
    };

    dataService.getOverviewData2 = function(dateRange) {
        var getOverviewDataURL = serverURL + '/overview_data2';
        return $http.post(getOverviewDataURL, {dataset: dataService.selectedDataset, startDate: dateRange[0], endDate: dateRange[dateRange.length - 1]});
    }

    dataService.setHighlightNode = function(node, highlight) {
        var nodeID = node['id'];
        if (highlight) {
            // console.log("this",this);
            // console.log("this.highlightDict",this.highlightNodeDict);
            this.highlightNodeDict[nodeID] = node;
        } else {
            delete this.highlightNodeDict[nodeID];
        }
    };

    dataService.getHighlightNodeDict = function() {
        return this.highlightNodeDict;
    };

    dataService.setScrollPos = function(pos) {
        this.scrollPos = pos;
    };

    dataService.getScrollPos = function() {
        return this.scrollPos;
    };

    dataService.getMaxStrDict = function() {
        return this.maxStrDict;
    };

    dataService.getDateRange = function() {
        return [this.startYear, this.endYear];
    };

    dataService.getMaxPublication = function() {
        return this.maxPublication;
    };

    dataService.getAuthorPubDict = function() {
        return this.authorPubDict;
    };
    dataService.getCompare = function() {
        return this.authorPubDict;
    };
   return dataService;
}]);
