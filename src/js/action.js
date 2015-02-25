/**
 * @fileoverview
 * @author FE개발팀 김성호 sungho-kim@nhnent.com
 */

'use strict';

/**
 * Action
 * @exports Action
 * @extends {}
 * @constructor
 * @class
 */
function Action(options) {
    this.editor = options.editor;

    this._mo = null;
    this.isOberserveContent = false;

    this._bindKeyEvent();
    this.observeContent();
}


Action.prototype._bindKeyEvent = function() {
    var self = this;

    this.editor.$editorEl.on('keydown', function(ev) {
        if (ev.which === 13) {
            self.editor.newLine();
        }
    });
};

Action.prototype._contentChanged = function(recorded) {
    if (this.isOberserveContent) {
        this.editor.contentChanged();
    }
};

Action.prototype.stopObserveContent = function() {
    this.isOberserveContent = false;
    this._mo.disconnect();
};

Action.prototype.observeContent = function() {
    var editorEl = this.editor.$editorEl[0];

    this._mo = this._mo || new MutationObserver(this._contentChanged.bind(this));
    this._mo.observe(editorEl, {
        childList: true,
        //attributes: true,
        characterData: true,
        subtree: true
    });

    this.isOberserveContent = true;
};

Action.prototype.destroy = function() {
    this.stopObserveContent();
};

module.exports = Action;