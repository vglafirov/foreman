/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
define("ace/mode/diff", ["require", "exports", "module", "pilot/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/diff_highlight_rules", "ace/range"],function(require, exports, module) {
"use strict";

var oop = require("pilot/oop");
var TextMode = require("ace/mode/text").Mode;
var Tokenizer = require("ace/tokenizer").Tokenizer;
var HighlightRules = require("ace/mode/diff_highlight_rules").DiffHighlightRules;

var Mode = function() {
    this.$tokenizer = new Tokenizer(new HighlightRules().getRules(), "i");
};
oop.inherits(Mode, TextMode);

(function() {

}).call(Mode.prototype), exports.Mode = Mode

}), define("ace/mode/diff_highlight_rules", ["require", "exports", "module", "pilot/oop", "ace/mode/text_highlight_rules"],function(require, exports, module) {
"use strict";

var oop = require("pilot/oop");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var DiffHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [{
                "regex": "^(?:\\*{15}|={67}|-{3}|\\+{3})$",
                "token": "punctuation.definition.separator.diff",
                "name": "keyword"
            }, { //diff.range.unified
                "regex": "^(@@)(\\s*.+?\\s*)(@@)(.*)$",
                "token": [
                    "constant",
                    "constant.numeric",
                    "constant",
                    "comment.doc.tag"
                ]
            }, { //diff.range.normal
                "regex": "^(\\d+)([,\\d]+)(a|d|c)(\\d+)([,\\d]+)(.*)$",
                "token": [
                    "constant.numeric",
                    "punctuation.definition.range.diff",
                    "constant.function",
                    "constant.numeric",
                    "punctuation.definition.range.diff",
                    "invalid"
                ],
                "name": "meta."
            }, {
                "regex": "^(?:(\\-{3}|\\+{3}|\\*{3})( .+))$",
                "token": [
                    "constant.numeric",
                    "meta.tag"
                ]
            }, { // added
                "regex": "^([!+>])(.*?)(\\s*)$",
                "token": [
                    "constant.numeric",
                    "constant.numeric",
                    "invalid"
                ]
            }, { // removed
                "regex": "^([<\\-])(.*?)(\\s*)$",
                "token": [
                    "support.function",
                    "support.function",
                    "invalid"
                ]
            }, {
                "regex": "^(diff)(\\s+--\\w+)?(.+?)( .+)?$",
                "token": ["variable", "variable", "keyword", "variable"]
            }, {
                "regex": "^Index.+$",
                "token": "variable"
            }, {
                "regex": "^(.*?)(\\s*)$",
                "token": ["invisible", "invalid"]
            }
        ]
    };
};

oop.inherits(DiffHighlightRules, TextHighlightRules);

exports.DiffHighlightRules = DiffHighlightRules;
});
