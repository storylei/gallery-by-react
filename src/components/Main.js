require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

let imagesData = require('../data/imagesData.json');

imagesData = (function (imagesDataArr) {
    for (var i = 0; i < imagesDataArr.length; i++) {
        let data = imagesDataArr[i];
        data.url = require('../images/' + data.fileName);
        imagesDataArr[i] = data;
    }
    return imagesDataArr;
})(imagesData);

console.log(imagesData);

class AppComponent extends React.Component {
    render() {
        return (
            <section className="stage">
                <section className="img-sec"></section>
                <nav className="controller"></nav>
            </section>
        )
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
