require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

// let yeomanImage = require('../images/yeoman.png');
// test
let imagesData = require('../data/imagesData.json');
imagesData = (function (imagesDataArr) {
    for (var i = 0; i < imagesDataArr.length; i++) {
        let data = imagesDataArr[i];
        data.url = require('../images/' + data.fileName);
        imagesDataArr[i] = data;
    }
    return imagesDataArr;
})(imagesData);
console.log('data:', imagesData);

function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

var ImgFigure = React.createClass({
    render () {
        var styleObj = {};

        // 如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        // 如果图片的旋转角度有值并且不为0， 添加旋转角度
        if (this.props.arrange.rotate) {
          (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
            styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
          }.bind(this));
        }

        // 如果是居中的图片， z-index设为11
        if (this.props.arrange.isCenter) {
          styleObj.zIndex = 11;
        }

        var imgFigureClassName = 'img-figure';
            imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return (
            <figure className='img-figure' style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.url}
                     alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
});

var AppComponent =  React.createClass({

        Constant: {
            centerPos: {
                left: 0,
                top: 0,
            },
            hPosRange: { // 水平
                y: [0, 0],
                leftSecX: [0, 0],
                rightSecX: [0, 0]
            },
            vPosRange: { // 垂直
                x: [0, 0],
                topY: [0, 0]
            }
        },

        getInitialState() {
            return {
                imgsArrangeArr: [{
                    pos: {
                        left: '0',
                        top: '0'
                    }
                }]
            };
        },

        componentDidMount() {
            var stageDom = ReactDOM.findDOMNode(this.refs.stage),
                stageW = stageDom.scrollWidth,
                stageH = stageDom.scrollHeight,
                halfStageW = Math.ceil(stageW / 2),
                halfStageH = Math.ceil(stageH / 2);

            var imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
                imgW = imgFigureDom.scrollWidth,
                imgH = imgFigureDom.scrollHeight,
                halfImgW = Math.ceil(imgW / 2),
                halfImgH = Math.ceil(imgH / 2);

            this.Constant.centerPos = {
                left: halfStageW - halfImgW,
                top: halfStageH - halfImgH
            };

            // 计算左侧，右侧区域图片排布位置的取值范围
            this.Constant.hPosRange.leftSecX[0] = -halfImgW;
            this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
            this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
            this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
            this.Constant.hPosRange.y[0] = -halfImgH;
            this.Constant.hPosRange.y[1] = stageH - halfImgH;

            // 计算上侧区域图片排布位置的取值范围
            this.Constant.vPosRange.topY[0] = -halfImgH;
            this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
            this.Constant.vPosRange.x[0] = halfStageW - imgW;
            this.Constant.vPosRange.x[1] = halfStageW;

            this.rearrange(0);
        },



        rearrange(centerIndex) {
            var imgsArrangeArr = this.state.imgsArrangeArr,
                Constant = this.Constant,
                centerPos = Constant.centerPos,
                hPosRange = Constant.hPosRange,
                vPosRange = Constant.vPosRange,

                hPosRangeLeftSecX = hPosRange.leftSecX,
                hPosRangeRightSecX = hPosRange.rightSecX,
                hPosRangeY = hPosRange.y,

                vPosRangeTopY = vPosRange.topY,
                vPosRangeX = vPosRange.x,

                imgsArrangeTopArr = [],
                topImgNum = Math.ceil(Math.random() * 2),

                topImgSpliceIndex = 0,
                imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

            console.log(vPosRangeX);

            // center
            imgsArrangeCenterArr[0].pos = centerPos;

            // top
            topImgSpliceIndex = Math.ceil(imgsArrangeArr.length - topImgNum);
            imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

            imgsArrangeTopArr.forEach(function (val, indx) {
                imgsArrangeTopArr[indx].pos = {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                }
            });

            // left right

            for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
                var hPosRangeLORX = null;

                // 前半部分布局左边， 右半部分布局右边
                if (i < k) {
                    hPosRangeLORX = hPosRangeLeftSecX;
                } else {
                    hPosRangeLORX = hPosRangeRightSecX;
                }

                imgsArrangeArr[i] = {
                    pos: {
                        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                    }
                };
            }

            if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
                imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
            }

            imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });

        },


        render() {
            let controllerUnits = [],
                imgFigures = [];

            imagesData.forEach(function (val, indx) {
                    if (!this.state.imgsArrangeArr[indx]) {
                        this.state.imgsArrangeArr[indx] = {
                            pos: {
                                left: 0,
                                top: 0
                            }
                        }
                    }
                    imgFigures.push(<ImgFigure data = {val} ref = {'imgFigure' + indx} arrange={this.state.imgsArrangeArr[indx]}/>)
                    }.bind(this));

            return (
                <section className = "stage" ref = "stage">
                    <section className = "img-sec" >
                        {imgFigures}
                    </section>
                    <nav className = "controller" ></nav>
                </section>
            );

        }
});

// AppComponent.defaultProps = {};

export default AppComponent;
