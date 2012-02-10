/*
 * jQuery File Upload jQuery UI Plugin 1.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true */
/*global define, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery', './jquery.fileupload-ui.js'], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';
    $.widget('blueimpJUI.fileupload', $.blueimpUI.fileupload, {
        options: {
            sent: function (e, data) {
                if (data.context && data.dataType &&
                        data.dataType.substr(0, 6) === 'iframe') {
                    // Iframe Transport does not support progress events.
                    // In lack of an indeterminate progress bar, we set
                    // the progress to 100%, showing the full animated bar:
                    data.context
                        .find('.progress').progressbar(
                            'option',
                            'value',
                            100
                        );
                }
            },
            progress: function (e, data) {
                if (data.context) {
                    data.context.find('.progress').progressbar(
                        'option',
                        'value',
                        parseInt(data.loaded / data.total * 100, 10)
                    );
                }
            },
            progressall: function (e, data) {
                $(this).find('.fileupload-buttonbar .progress').progressbar(
                    'option',
                    'value',
                    parseInt(data.loaded / data.total * 100, 10)
                );
            }
        },
        _renderTemplate: function (func, files) {
            var node = $.blueimpUI.fileupload.prototype
                ._renderTemplate.call(this, func, files);
            node.find('.progress').empty().progressbar();
            node.find('.start button').button({
                icons: {primary: 'ui-icon-circle-arrow-e'}
            });
            node.find('.cancel button').button({
                icons: {primary: 'ui-icon-cancel'}
            });
            node.find('.delete button').button({
                icons: {primary: 'ui-icon-trash'}
            });
            if (node.hasClass('fade')) {
                node.hide();
            }
            return node;
        },
        _transitionCallback: function (node, callback) {
            var that = this;
            if (node.hasClass('fade')) {
                if (node.hasClass('in')) {
                    node.fadeIn(function () {
                        callback.call(that, node);
                    });
                } else {
                    node.fadeOut(function () {
                        callback.call(that, node);
                    });
                }
            } else {
                callback.call(this, node);
            }
        },
        _create: function () {
            $.blueimpUI.fileupload.prototype._create.call(this);
            this.element
                .find('.fileupload-buttonbar')
                .find('.fileinput-button').each(function () {
                    var input = $(this).find('input:file').detach();
                    $(this)
                        .button({icons: {primary: 'ui-icon-plusthick'}})
                        .append(input);
                })
                .end().find('.start')
                .button({icons: {primary: 'ui-icon-circle-arrow-e'}})
                .end().find('.cancel')
                .button({icons: {primary: 'ui-icon-cancel'}})
                .end().find('.delete')
                .button({icons: {primary: 'ui-icon-trash'}})
                .end().find('.progress').empty().progressbar()
                .each(function () {
                    if ($(this).hasClass('fade')) {
                        $(this).hide();
                    }
                });
        }
    });
}));
