import React from "react"
import ReactDom from "react-dom"
import Game from './components/game';

Array.prototype.shuffle = function (b) {
    var i = this.length, j, t;
    while (i) {
        j = Math.floor(( i-- ) * Math.random());
        t = b && typeof this[i].shuffle !== 'undefined' ? this[i].shuffle() : this[i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
};

ReactDom.render(
    <div className="siteContainer">
        <Game />
    </div>,
    document.getElementById('root')
);