/*!
 * ngTagsInput2 v3.1.1
 * http://mbenford.github.io/ngTagsInput2
 *
 * Copyright (c) 2013-2016 Michael Benford
 * License: MIT
 *
 * Generated at 2016-05-27 12:28:31 -0300
 */
(function() {
'use strict';

var KEYS = {
    backspace: 8,
    tab: 9,
    enter: 13,
    escape: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    delete: 46,
    comma: 188
};

var MAX_SAFE_INTEGER = 9007199254740991;
var SUPPORTED_INPUT_TYPES = ['text', 'email', 'url'];

var tagsInput2 = angular.module('ngTagsInput2', []);

/**
 * @ngdoc directive
 * @name tagsInput2
 * @module ngTagsInput2
 *
 * @description
 * Renders an input box with tag editing support.
 *
 * @param {string} ngModel Assignable Angular expression to data-bind to.
 * @param {string=} [template=NA] URL or id of a custom template for rendering each tag.
 * @param {string=} [templateScope=NA] Scope to be passed to custom templates - of both tagsInput2 and
 *    autoComplete2 directives - as $scope.
 * @param {string=} [displayProperty=text] Property to be rendered as the tag label.
 * @param {string=} [keyProperty=text] Property to be used as a unique identifier for the tag.
 * @param {string=} [type=text] Type of the input element. Only 'text', 'email' and 'url' are supported values.
 * @param {string=} [text=NA] Assignable Angular expression for data-binding to the element's text.
 * @param {number=} tabindex Tab order of the control.
 * @param {string=} [placeholder=Add a tag] Placeholder text for the control.
 * @param {number=} [minLength=3] Minimum length for a new tag.
 * @param {number=} [maxLength=MAX_SAFE_INTEGER] Maximum length allowed for a new tag.
 * @param {number=} [minTags=0] Sets minTags validation error key if the number of tags added is less than minTags.
 * @param {number=} [maxTags=MAX_SAFE_INTEGER] Sets maxTags validation error key if the number of tags added is greater
 *    than maxTags.
 * @param {boolean=} [allowLeftoverText=false] Sets leftoverText validation error key if there is any leftover text in
 *    the input element when the directive loses focus.
 * @param {string=} [removeTagSymbol=×] (Obsolete) Symbol character for the remove tag button.
 * @param {boolean=} [addOnEnter=true] Flag indicating that a new tag will be added on pressing the ENTER key.
 * @param {boolean=} [addOnSpace=false] Flag indicating that a new tag will be added on pressing the SPACE key.
 * @param {boolean=} [addOnComma=true] Flag indicating that a new tag will be added on pressing the COMMA key.
 * @param {boolean=} [addOnBlur=true] Flag indicating that a new tag will be added when the input field loses focus.
 * @param {boolean=} [addOnPaste=false] Flag indicating that the text pasted into the input field will be split into tags.
 * @param {string=} [pasteSplitPattern=,] Regular expression used to split the pasted text into tags.
 * @param {boolean=} [replaceSpacesWithDashes=true] Flag indicating that spaces will be replaced with dashes.
 * @param {string=} [allowedTagsPattern=.+] Regular expression that determines whether a new tag is valid.
 * @param {boolean=} [enableEditingLastTag=false] Flag indicating that the last tag will be moved back into the new tag
 *    input box instead of being removed when the backspace key is pressed and the input box is empty.
 * @param {boolean=} [addFromautoComplete2Only=false] Flag indicating that only tags coming from the autoComplete2 list
 *    will be allowed. When this flag is true, addOnEnter, addOnComma, addOnSpace and addOnBlur values are ignored.
 * @param {boolean=} [spellcheck=true] Flag indicating whether the browser's spellcheck is enabled for the input field or not.
 * @param {expression=} [tagClass=NA] Expression to evaluate for each existing tag in order to get the CSS classes to be used.
 *    The expression is provided with the current tag as $tag, its index as $index and its state as $selected. The result
 *    of the evaluation must be one of the values supported by the ngClass directive (either a string, an array or an object).
 *    See https://docs.angularjs.org/api/ng/directive/ngClass for more information.
 * @param {expression=} [onTagAdding=NA] Expression to evaluate that will be invoked before adding a new tag. The new
 *    tag is available as $tag. This method must return either a boolean value or a promise. If either a false value or a rejected
 *    promise is returned, the tag will not be added.
 * @param {expression=} [onTagAdded=NA] Expression to evaluate upon adding a new tag. The new tag is available as $tag.
 * @param {expression=} [onInvalidTag=NA] Expression to evaluate when a tag is invalid. The invalid tag is available as $tag.
 * @param {expression=} [onTagRemoving=NA] Expression to evaluate that will be invoked before removing a tag. The tag
 *    is available as $tag. This method must return either a boolean value or a promise. If either a false value or a rejected
 *    promise is returned, the tag will not be removed.
 * @param {expression=} [onTagRemoved=NA] Expression to evaluate upon removing an existing tag. The removed tag is available as $tag.
 * @param {expression=} [onTagClicked=NA] Expression to evaluate upon clicking an existing tag. The clicked tag is available as $tag.
 */
tagsInput2.directive('tagsInput2', ["$timeout", "$document", "$window", "$q", "tagsInput2Config2", "tiUtil2", function($timeout, $document, $window, $q, tagsInput2Config2, tiUtil2) {
    function TagList(options, events, onTagAdding, onTagRemoving) {
        var self = {}, getTagText, setTagText, canAddTag, canRemoveTag;

        getTagText = function(tag) {
            return tiUtil2.safeToString(tag[options.displayProperty]);
        };

        setTagText = function(tag, text) {
            tag[options.displayProperty] = text;
        };

        canAddTag = function(tag) {
            var tagText = getTagText(tag);
            var valid = tagText &&
                        tagText.length >= options.minLength &&
                        tagText.length <= options.maxLength &&
                        options.allowedTagsPattern.test(tagText) &&
                        !tiUtil2.findInObjectArray(self.items, tag, options.keyProperty || options.displayProperty);

            return $q.when(valid && onTagAdding({ $tag: tag })).then(tiUtil2.promisifyValue);
        };

        canRemoveTag = function(tag) {
            return $q.when(onTagRemoving({ $tag: tag })).then(tiUtil2.promisifyValue);
        };

        self.items = [];

        self.addText = function(text) {
            var tag = {};
            setTagText(tag, text);
            return self.add(tag);
        };

        self.add = function(tag) {
            var tagText = getTagText(tag);

            if (options.replaceSpacesWithDashes) {
                tagText = tiUtil2.replaceSpacesWithDashes(tagText);
            }

            setTagText(tag, tagText);

            return canAddTag(tag)
                .then(function() {
                    self.items.push(tag);
                    events.trigger('tag-added', { $tag: tag });
                })
                .catch(function() {
                    if (tagText) {
                      events.trigger('invalid-tag', { $tag: tag });
                    }
                });
        };

        self.remove = function(index) {
            var tag = self.items[index];

            return canRemoveTag(tag).then(function() {
                self.items.splice(index, 1);
                self.clearSelection();
                events.trigger('tag-removed', { $tag: tag });
                return tag;
            });
        };

        self.select = function(index) {
            if (index < 0) {
                index = self.items.length - 1;
            }
            else if (index >= self.items.length) {
                index = 0;
            }

            self.index = index;
            self.selected = self.items[index];
        };

        self.selectPrior = function() {
            self.select(--self.index);
        };

        self.selectNext = function() {
            self.select(++self.index);
        };

        self.removeSelected = function() {
            return self.remove(self.index);
        };

        self.clearSelection = function() {
            self.selected = null;
            self.index = -1;
        };

        self.clearSelection();

        return self;
    }

    function validateType(type) {
        return SUPPORTED_INPUT_TYPES.indexOf(type) !== -1;
    }

    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            tags: '=ngModel',
            text: '=?',
            templateScope: '=?',
            tagClass: '&',
            onTagAdding: '&',
            onTagAdded: '&',
            onInvalidTag: '&',
            onTagRemoving: '&',
            onTagRemoved: '&',
            onTagClicked: '&',
        },
        replace: false,
        transclude: true,
        templateUrl: 'ngTagsInput2/tags-input2.html',
        controller: ["$scope", "$attrs", "$element", function($scope, $attrs, $element) {
            $scope.events = tiUtil2.simplePubSub();

            tagsInput2Config2.load('tagsInput2', $scope, $attrs, {
                template: [String, 'ngTagsInput2/tag-item.html'],
                type: [String, 'text', validateType],
                placeholder: [String, 'Add a tag'],
                tabindex: [Number, null],
                removeTagSymbol: [String, String.fromCharCode(215)],
                replaceSpacesWithDashes: [Boolean, true],
                minLength: [Number, 3],
                maxLength: [Number, MAX_SAFE_INTEGER],
                addOnEnter: [Boolean, true],
                addOnSpace: [Boolean, false],
                addOnComma: [Boolean, true],
                addOnBlur: [Boolean, true],
                addOnPaste: [Boolean, false],
                pasteSplitPattern: [RegExp, /,/],
                allowedTagsPattern: [RegExp, /.+/],
                enableEditingLastTag: [Boolean, false],
                minTags: [Number, 0],
                maxTags: [Number, MAX_SAFE_INTEGER],
                displayProperty: [String, 'text'],
                keyProperty: [String, ''],
                allowLeftoverText: [Boolean, false],
                addFromautoComplete2Only: [Boolean, false],
                spellcheck: [Boolean, true]
            });

            $scope.tagList = new TagList($scope.options, $scope.events,
                tiUtil2.handleUndefinedResult($scope.onTagAdding, true),
                tiUtil2.handleUndefinedResult($scope.onTagRemoving, true));

            this.registerautoComplete2 = function() {
                var input = $element.find('input');

                return {
                    addTag: function(tag) {
                        return $scope.tagList.add(tag);
                    },
                    getTags: function() {
                        return $scope.tagList.items;
                    },
                    getCurrentTagText: function() {
                        return $scope.newTag.text();
                    },
                    getOptions: function() {
                        return $scope.options;
                    },
                    getTemplateScope: function() {
                        return $scope.templateScope;
                    },
                    on: function(name, handler) {
                        $scope.events.on(name, handler, true);
                        return this;
                    }
                };
            };

            this.registerTagItem = function() {
                return {
                    getOptions: function() {
                        return $scope.options;
                    },
                    removeTag: function(index) {
                        if ($scope.disabled) {
                            return;
                        }
                        $scope.tagList.remove(index);
                    }
                };
            };
        }],
        link: function(scope, element, attrs, ngModelCtrl) {
            var hotkeys = [KEYS.enter, KEYS.comma, KEYS.space, KEYS.backspace, KEYS.delete, KEYS.left, KEYS.right],
                tagList = scope.tagList,
                events = scope.events,
                options = scope.options,
                input = element.find('input'),
                validationOptions = ['minTags', 'maxTags', 'allowLeftoverText'],
                setElementValidity,
                focusInput;

            setElementValidity = function() {
                ngModelCtrl.$setValidity('maxTags', tagList.items.length <= options.maxTags);
                ngModelCtrl.$setValidity('minTags', tagList.items.length >= options.minTags);
                ngModelCtrl.$setValidity('leftoverText', scope.hasFocus || options.allowLeftoverText ? true : !scope.newTag.text());
            };

            focusInput = function() {
                $timeout(function() { input[0].focus(); });
            };

            ngModelCtrl.$isEmpty = function(value) {
                return !value || !value.length;
            };

            scope.newTag = {
                text: function(value) {
                    if (angular.isDefined(value)) {
                        scope.text = value;
                        events.trigger('input-change', value);
                    }
                    else {
                        return scope.text || '';
                    }
                },
                invalid: null
            };

            scope.track = function(tag) {
                return tag[options.keyProperty || options.displayProperty];
            };

            scope.getTagClass = function(tag, index) {
                var selected = tag === tagList.selected;
                return [
                    scope.tagClass({$tag: tag, $index: index, $selected: selected}),
                    { selected: selected }
                ];
            };

            scope.$watch('tags', function(value) {
                if (value) {
                    tagList.items = tiUtil2.makeObjectArray(value, options.displayProperty);
                    scope.tags = tagList.items;
                }
                else {
                    tagList.items = [];
                }
            });

            scope.$watch('tags.length', function() {
                setElementValidity();

                // ngModelController won't trigger validators when the model changes (because it's an array),
                // so we need to do it ourselves. Unfortunately this won't trigger any registered formatter.
                ngModelCtrl.$validate();
            });

            attrs.$observe('disabled', function(value) {
                scope.disabled = value;
            });

            scope.eventHandlers = {
                input: {
                    keydown: function($event) {
                        events.trigger('input-keydown', $event);
                    },
                    focus: function() {
                        if (scope.hasFocus) {
                            return;
                        }

                        scope.hasFocus = true;
                        events.trigger('input-focus');
                    },
                    blur: function() {
                        $timeout(function() {
                            var activeElement = $document.prop('activeElement'),
                                lostFocusToBrowserWindow = activeElement === input[0],
                                lostFocusToChildElement = element[0].contains(activeElement);

                            if (lostFocusToBrowserWindow || !lostFocusToChildElement) {
                                scope.hasFocus = false;
                                events.trigger('input-blur');
                            }
                        });
                    },
                    paste: function($event) {
                        $event.getTextData = function() {
                            var clipboardData = $event.clipboardData || ($event.originalEvent && $event.originalEvent.clipboardData);
                            return clipboardData ? clipboardData.getData('text/plain') : $window.clipboardData.getData('Text');
                        };
                        events.trigger('input-paste', $event);
                    }
                },
                host: {
                    click: function() {
                        if (scope.disabled) {
                            return;
                        }
                        focusInput();
                    }
                },
                tag: {
                    click: function(tag) {
                        events.trigger('tag-clicked', { $tag: tag });
                    }
                }
            };

            events
                .on('tag-added', scope.onTagAdded)
                .on('invalid-tag', scope.onInvalidTag)
                .on('tag-removed', scope.onTagRemoved)
                .on('tag-clicked', scope.onTagClicked)
                .on('tag-added', function() {
                    scope.newTag.text('');
                })
                .on('tag-added tag-removed', function() {
                    scope.tags = tagList.items;
                    // Ideally we should be able call $setViewValue here and let it in turn call $setDirty and $validate
                    // automatically, but since the model is an array, $setViewValue does nothing and it's up to us to do it.
                    // Unfortunately this won't trigger any registered $parser and there's no safe way to do it.
                    ngModelCtrl.$setDirty();
                    focusInput();
                })
                .on('invalid-tag', function() {
                    scope.newTag.invalid = true;
                })
                .on('option-change', function(e) {
                    if (validationOptions.indexOf(e.name) !== -1) {
                        setElementValidity();
                    }
                })
                .on('input-change', function() {
                    tagList.clearSelection();
                    scope.newTag.invalid = null;
                })
                .on('input-focus', function() {
                    element.triggerHandler('focus');
                    ngModelCtrl.$setValidity('leftoverText', true);
                })
                .on('input-blur', function() {
                    if (options.addOnBlur && !options.addFromautoComplete2Only) {
                        tagList.addText(scope.newTag.text());
                    }
                    element.triggerHandler('blur');
                    setElementValidity();
                })
                .on('input-keydown', function(event) {
                    var key = event.keyCode,
                        addKeys = {},
                        shouldAdd, shouldRemove, shouldSelect, shouldEditLastTag;

                    if (tiUtil2.isModifierOn(event) || hotkeys.indexOf(key) === -1) {
                        return;
                    }

                    addKeys[KEYS.enter] = options.addOnEnter;
                    addKeys[KEYS.comma] = options.addOnComma;
                    addKeys[KEYS.space] = options.addOnSpace;

                    shouldAdd = !options.addFromautoComplete2Only && addKeys[key];
                    shouldRemove = (key === KEYS.backspace || key === KEYS.delete) && tagList.selected;
                    shouldEditLastTag = key === KEYS.backspace && scope.newTag.text().length === 0 && options.enableEditingLastTag;
                    shouldSelect = (key === KEYS.backspace || key === KEYS.left || key === KEYS.right) && scope.newTag.text().length === 0 && !options.enableEditingLastTag;

                    if (shouldAdd) {
                        tagList.addText(scope.newTag.text());
                    }
                    else if (shouldEditLastTag) {
                        tagList.selectPrior();
                        tagList.removeSelected().then(function(tag) {
                            if (tag) {
                                scope.newTag.text(tag[options.displayProperty]);
                            }
                        });
                    }
                    else if (shouldRemove) {
                        tagList.removeSelected();
                    }
                    else if (shouldSelect) {
                        if (key === KEYS.left || key === KEYS.backspace) {
                            tagList.selectPrior();
                        }
                        else if (key === KEYS.right) {
                            tagList.selectNext();
                        }
                    }

                    if (shouldAdd || shouldSelect || shouldRemove || shouldEditLastTag) {
                        event.preventDefault();
                    }
                })
                .on('input-paste', function(event) {
                    if (options.addOnPaste) {
                        var data = event.getTextData();
                        var tags = data.split(options.pasteSplitPattern);

                        if (tags.length > 1) {
                            tags.forEach(function(tag) {
                                tagList.addText(tag);
                            });
                            event.preventDefault();
                        }
                    }
                });
        }
    };
}]);


/**
 * @ngdoc directive
 * @name tiTagItem2
 * @module ngTagsInput2
 *
 * @description
 * Represents a tag item. Used internally by the tagsInput2 directive.
 */
tagsInput2.directive('tiTagItem2', ["tiUtil2", function(tiUtil2) {
    return {
        restrict: 'E',
        require: '^tagsInput2',
        template: '<ng-include src="$$template"></ng-include>',
        scope: {
            $scope: '=scope',
            data: '='
        },
        link: function(scope, element, attrs, tagsInput2Ctrl) {
            var tagsInput2 = tagsInput2Ctrl.registerTagItem(),
                options = tagsInput2.getOptions();

            scope.$$template = options.template;
            scope.$$removeTagSymbol = options.removeTagSymbol;

            scope.$getDisplayText = function() {
                return tiUtil2.safeToString(scope.data[options.displayProperty]);
            };
            scope.$removeTag = function() {
                tagsInput2.removeTag(scope.$index);
            };

            scope.$watch('$parent.$index', function(value) {
                scope.$index = value;
            });
        }
    };
}]);


/**
 * @ngdoc directive
 * @name autoComplete2
 * @module ngTagsInput2
 *
 * @description
 * Provides autoComplete2 support for the tagsInput2 directive.
 *
 * @param {expression} source Expression to evaluate upon changing the input content. The input value is available as
 *    $query. The result of the expression must be a promise that eventually resolves to an array of strings.
 * @param {string=} [template=NA] URL or id of a custom template for rendering each element of the autoComplete2 list.
 * @param {string=} [displayProperty=tagsInput2.displayText] Property to be rendered as the autoComplete2 label.
 * @param {number=} [debounceDelay=100] Amount of time, in milliseconds, to wait before evaluating the expression in
 *    the source option after the last keystroke.
 * @param {number=} [minLength=3] Minimum number of characters that must be entered before evaluating the expression
 *    in the source option.
 * @param {boolean=} [highlightMatchedText=true] Flag indicating that the matched text will be highlighted in the
 *    suggestions list.
 * @param {number=} [maxResultsToShow=10] Maximum number of results to be displayed at a time.
 * @param {boolean=} [loadOnDownArrow=false] Flag indicating that the source option will be evaluated when the down arrow
 *    key is pressed and the suggestion list is closed. The current input value is available as $query.
 * @param {boolean=} [loadOnEmpty=false] Flag indicating that the source option will be evaluated when the input content
 *    becomes empty. The $query variable will be passed to the expression as an empty string.
 * @param {boolean=} [loadOnFocus=false] Flag indicating that the source option will be evaluated when the input element
 *    gains focus. The current input value is available as $query.
 * @param {boolean=} [selectFirstMatch=true] Flag indicating that the first match will be automatically selected once
 *    the suggestion list is shown.
 * @param {expression=} [matchClass=NA] Expression to evaluate for each match in order to get the CSS classes to be used.
 *    The expression is provided with the current match as $match, its index as $index and its state as $selected. The result
 *    of the evaluation must be one of the values supported by the ngClass directive (either a string, an array or an object).
 *    See https://docs.angularjs.org/api/ng/directive/ngClass for more information.
 */
tagsInput2.directive('autoComplete2', ["$document", "$timeout", "$sce", "$q", "tagsInput2Config2", "tiUtil2", function($document, $timeout, $sce, $q, tagsInput2Config2, tiUtil2) {
    function SuggestionList(loadFn, options, events) {
        var self = {}, getDifference, lastPromise, getTagId;

        getTagId = function() {
            return options.tagsInput2.keyProperty || options.tagsInput2.displayProperty;
        };

        getDifference = function(array1, array2) {
            return array1.filter(function(item) {
                return !tiUtil2.findInObjectArray(array2, item, getTagId(), function(a, b) {
                    if (options.tagsInput2.replaceSpacesWithDashes) {
                        a = tiUtil2.replaceSpacesWithDashes(a);
                        b = tiUtil2.replaceSpacesWithDashes(b);
                    }
                    return tiUtil2.defaultComparer(a, b);
                });
            });
        };

        self.reset = function() {
            lastPromise = null;

            self.items = [];
            self.visible = false;
            self.index = -1;
            self.selected = null;
            self.query = null;
        };
        self.show = function() {
            if (options.selectFirstMatch) {
                self.select(0);
            }
            else {
                self.selected = null;
            }
            self.visible = true;
        };
        self.load = tiUtil2.debounce(function(query, tags) {
            self.query = query;

            var promise = $q.when(loadFn({ $query: query }));
            lastPromise = promise;

            promise.then(function(items) {
                if (promise !== lastPromise) {
                    return;
                }

                items = tiUtil2.makeObjectArray(items.data || items, getTagId());
                items = getDifference(items, tags);
                self.items = items.slice(0, options.maxResultsToShow);

                if (self.items.length > 0) {
                    self.show();
                }
                else {
                    self.reset();
                }
            });
        }, options.debounceDelay);

        self.selectNext = function() {
            self.select(++self.index);
        };
        self.selectPrior = function() {
            self.select(--self.index);
        };
        self.select = function(index) {
            if (index < 0) {
                index = self.items.length - 1;
            }
            else if (index >= self.items.length) {
                index = 0;
            }
            self.index = index;
            self.selected = self.items[index];
            events.trigger('suggestion-selected', index);
        };

        self.reset();

        return self;
    }

    function scrollToElement(root, index) {
        var element = root.find('li').eq(index),
            parent = element.parent(),
            elementTop = element.prop('offsetTop'),
            elementHeight = element.prop('offsetHeight'),
            parentHeight = parent.prop('clientHeight'),
            parentScrollTop = parent.prop('scrollTop');

        if (elementTop < parentScrollTop) {
            parent.prop('scrollTop', elementTop);
        }
        else if (elementTop + elementHeight > parentHeight + parentScrollTop) {
            parent.prop('scrollTop', elementTop + elementHeight - parentHeight);
        }
    }

    return {
        restrict: 'E',
        require: '^tagsInput2',
        scope: {
            source: '&',
            matchClass: '&'
        },
        templateUrl: 'ngTagsInput2/auto-complete.html',
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
            $scope.events = tiUtil2.simplePubSub();

            tagsInput2Config2.load('autoComplete2', $scope, $attrs, {
                template: [String, 'ngTagsInput2/auto-complete-match.html'],
                debounceDelay: [Number, 100],
                minLength: [Number, 3],
                highlightMatchedText: [Boolean, true],
                maxResultsToShow: [Number, 10],
                loadOnDownArrow: [Boolean, false],
                loadOnEmpty: [Boolean, false],
                loadOnFocus: [Boolean, false],
                selectFirstMatch: [Boolean, true],
                displayProperty: [String, '']
            });

            $scope.suggestionList = new SuggestionList($scope.source, $scope.options, $scope.events);

            this.registerautoComplete2Match = function() {
                return {
                    getOptions: function() {
                        return $scope.options;
                    },
                    getQuery: function() {
                        return $scope.suggestionList.query;
                    }
                };
            };
        }],
        link: function(scope, element, attrs, tagsInput2Ctrl) {
            var hotkeys = [KEYS.enter, KEYS.tab, KEYS.escape, KEYS.up, KEYS.down],
                suggestionList = scope.suggestionList,
                tagsInput2 = tagsInput2Ctrl.registerautoComplete2(),
                options = scope.options,
                events = scope.events,
                shouldLoadSuggestions;

            options.tagsInput2 = tagsInput2.getOptions();

            shouldLoadSuggestions = function(value) {
                return value && value.length >= options.minLength || !value && options.loadOnEmpty;
            };

            scope.templateScope = tagsInput2.getTemplateScope();

            scope.addSuggestionByIndex = function(index) {
                suggestionList.select(index);
                scope.addSuggestion();
            };

            scope.addSuggestion = function() {
                var added = false;

                if (suggestionList.selected) {
                    tagsInput2.addTag(angular.copy(suggestionList.selected));
                    suggestionList.reset();
                    added = true;
                }
                return added;
            };

            scope.track = function(item) {
                return item[options.tagsInput2.keyProperty || options.tagsInput2.displayProperty];
            };

            scope.getSuggestionClass = function(item, index) {
                var selected = item === suggestionList.selected;
                return [
                    scope.matchClass({$match: item, $index: index, $selected: selected}),
                    { selected: selected }
                ];
            };

            tagsInput2
                .on('tag-added tag-removed invalid-tag input-blur', function() {
                    suggestionList.reset();
                })
                .on('input-change', function(value) {
                    if (shouldLoadSuggestions(value)) {
                        suggestionList.load(value, tagsInput2.getTags());
                    }
                    else {
                        suggestionList.reset();
                    }
                })
                .on('input-focus', function() {
                    var value = tagsInput2.getCurrentTagText();
                    if (options.loadOnFocus && shouldLoadSuggestions(value)) {
                        suggestionList.load(value, tagsInput2.getTags());
                    }
                })
                .on('input-keydown', function(event) {
                    var key = event.keyCode,
                        handled = false;

                    if (tiUtil2.isModifierOn(event) || hotkeys.indexOf(key) === -1) {
                        return;
                    }

                    if (suggestionList.visible) {

                        if (key === KEYS.down) {
                            suggestionList.selectNext();
                            handled = true;
                        }
                        else if (key === KEYS.up) {
                            suggestionList.selectPrior();
                            handled = true;
                        }
                        else if (key === KEYS.escape) {
                            suggestionList.reset();
                            handled = true;
                        }
                        else if (key === KEYS.enter || key === KEYS.tab) {
                            handled = scope.addSuggestion();
                        }
                    }
                    else {
                        if (key === KEYS.down && scope.options.loadOnDownArrow) {
                            suggestionList.load(tagsInput2.getCurrentTagText(), tagsInput2.getTags());
                            handled = true;
                        }
                    }

                    if (handled) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        return false;
                    }
                });

            events.on('suggestion-selected', function(index) {
                scrollToElement(element, index);
            });
        }
    };
}]);


/**
 * @ngdoc directive
 * @name tiautoComplete2Match2
 * @module ngTagsInput2
 *
 * @description
 * Represents an autoComplete2 match. Used internally by the autoComplete2 directive.
 */
tagsInput2.directive('tiautoComplete2Match2', ["$sce", "tiUtil2", function($sce, tiUtil2) {
    return {
        restrict: 'E',
        require: '^autoComplete2',
        template: '<ng-include src="$$template"></ng-include>',
        scope: {
            $scope: '=scope',
            data: '='
        },
        link: function(scope, element, attrs, autoComplete2Ctrl) {
            var autoComplete2 = autoComplete2Ctrl.registerautoComplete2Match(),
                options = autoComplete2.getOptions();

            scope.$$template = options.template;
            scope.$index = scope.$parent.$index;

            scope.$highlight = function(text) {
                if (options.highlightMatchedText) {
                    text = tiUtil2.safeHighlight(text, autoComplete2.getQuery());
                }
                return $sce.trustAsHtml(text);
            };
            scope.$getDisplayText =  function() {
                return tiUtil2.safeToString(scope.data[options.displayProperty || options.tagsInput2.displayProperty]);
            };
        }
    };
}]);


/**
 * @ngdoc directive
 * @name tiTranscludeAppend2
 * @module ngTagsInput2
 *
 * @description
 * Re-creates the old behavior of ng-transclude. Used internally by tagsInput2 directive.
 */
tagsInput2.directive('tiTranscludeAppend2', function() {
    return function(scope, element, attrs, ctrl, transcludeFn) {
        transcludeFn(function(clone) {
            element.append(clone);
        });
    };
});

/**
 * @ngdoc directive
 * @name tiAutosize2
 * @module ngTagsInput2
 *
 * @description
 * Automatically sets the input's width so its content is always visible. Used internally by tagsInput2 directive.
 */
tagsInput2.directive('tiAutosize2', ["tagsInput2Config2", function(tagsInput2Config2) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var threshold = tagsInput2Config2.getTextAutosizeThreshold(),
                span, resize;

            span = angular.element('<span class="input"></span>');
            span.css('display', 'none')
                .css('visibility', 'hidden')
                .css('width', 'auto')
                .css('white-space', 'pre');

            element.parent().append(span);

            resize = function(originalValue) {
                var value = originalValue, width;

                if (angular.isString(value) && value.length === 0) {
                    value = attrs.placeholder;
                }

                if (value) {
                    span.text(value);
                    span.css('display', '');
                    width = span.prop('offsetWidth');
                    span.css('display', 'none');
                }

                element.css('width', width ? width + threshold + 'px' : '');

                return originalValue;
            };

            ctrl.$parsers.unshift(resize);
            ctrl.$formatters.unshift(resize);

            attrs.$observe('placeholder', function(value) {
                if (!ctrl.$modelValue) {
                    resize(value);
                }
            });
        }
    };
}]);

/**
 * @ngdoc directive
 * @name tiBindAttrs2
 * @module ngTagsInput2
 *
 * @description
 * Binds attributes to expressions. Used internally by tagsInput2 directive.
 */
tagsInput2.directive('tiBindAttrs2', function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.tiBindAttrs2, function(value) {
            angular.forEach(value, function(value, key) {
                attrs.$set(key, value);
            });
        }, true);
    };
});

/**
 * @ngdoc service
 * @name tagsInput2Config2
 * @module ngTagsInput2
 *
 * @description
 * Sets global configuration settings for both tagsInput2 and autoComplete2 directives. It's also used internally to parse and
 *  initialize options from HTML attributes.
 */
tagsInput2.provider('tagsInput2Config2', function() {
    var globalDefaults = {},
        interpolationStatus = {},
        autosizeThreshold = 3;

    /**
     * @ngdoc method
     * @name tagsInput2Config2#setDefaults
     * @description Sets the default configuration option for a directive.
     *
     * @param {string} directive Name of the directive to be configured. Must be either 'tagsInput2' or 'autoComplete2'.
     * @param {object} defaults Object containing options and their values.
     *
     * @returns {object} The service itself for chaining purposes.
     */
    this.setDefaults = function(directive, defaults) {
        globalDefaults[directive] = defaults;
        return this;
    };

    /**
     * @ngdoc method
     * @name tagsInput2Config2#setActiveInterpolation
     * @description Sets active interpolation for a set of options.
     *
     * @param {string} directive Name of the directive to be configured. Must be either 'tagsInput2' or 'autoComplete2'.
     * @param {object} options Object containing which options should have interpolation turned on at all times.
     *
     * @returns {object} The service itself for chaining purposes.
     */
    this.setActiveInterpolation = function(directive, options) {
        interpolationStatus[directive] = options;
        return this;
    };

    /**
     * @ngdoc method
     * @name tagsInput2Config2#setTextAutosizeThreshold
     * @description Sets the threshold used by the tagsInput2 directive to re-size the inner input field element based on its contents.
     *
     * @param {number} threshold Threshold value, in pixels.
     *
     * @returns {object} The service itself for chaining purposes.
     */
    this.setTextAutosizeThreshold = function(threshold) {
        autosizeThreshold = threshold;
        return this;
    };

    this.$get = ["$interpolate", function($interpolate) {
        var converters = {};
        converters[String] = function(value) { return value; };
        converters[Number] = function(value) { return parseInt(value, 10); };
        converters[Boolean] = function(value) { return value.toLowerCase() === 'true'; };
        converters[RegExp] = function(value) { return new RegExp(value); };

        return {
            load: function(directive, scope, attrs, options) {
                var defaultValidator = function() { return true; };

                scope.options = {};

                angular.forEach(options, function(value, key) {
                    var type, localDefault, validator, converter, getDefault, updateValue;

                    type = value[0];
                    localDefault = value[1];
                    validator = value[2] || defaultValidator;
                    converter = converters[type];

                    getDefault = function() {
                        var globalValue = globalDefaults[directive] && globalDefaults[directive][key];
                        return angular.isDefined(globalValue) ? globalValue : localDefault;
                    };

                    updateValue = function(value) {
                        scope.options[key] = value && validator(value) ? converter(value) : getDefault();
                    };

                    if (interpolationStatus[directive] && interpolationStatus[directive][key]) {
                        attrs.$observe(key, function(value) {
                            updateValue(value);
                            scope.events.trigger('option-change', { name: key, newValue: value });
                        });
                    }
                    else {
                        updateValue(attrs[key] && $interpolate(attrs[key])(scope.$parent));
                    }
                });
            },
            getTextAutosizeThreshold: function() {
                return autosizeThreshold;
            }
        };
    }];
});


/***
 * @ngdoc service
 * @name tiUtil2
 * @module ngTagsInput2
 *
 * @description
 * Helper methods used internally by the directive. Should not be called directly from user code.
 */
tagsInput2.factory('tiUtil2', ["$timeout", "$q", function($timeout, $q) {
    var self = {};

    self.debounce = function(fn, delay) {
        var timeoutId;
        return function() {
            var args = arguments;
            $timeout.cancel(timeoutId);
            timeoutId = $timeout(function() { fn.apply(null, args); }, delay);
        };
    };

    self.makeObjectArray = function(array, key) {
        if (!angular.isArray(array) || array.length === 0 || angular.isObject(array[0])) {
            return array;
        }

        var newArray = [];
        array.forEach(function(item) {
            var obj = {};
            obj[key] = item;
            newArray.push(obj);
        });
        return newArray;
    };

    self.findInObjectArray = function(array, obj, key, comparer) {
        var item = null;
        comparer = comparer || self.defaultComparer;

        array.some(function(element) {
            if (comparer(element[key], obj[key])) {
                item = element;
                return true;
            }
        });

        return item;
    };

    self.defaultComparer = function(a, b) {
        // I'm aware of the internationalization issues regarding toLowerCase()
        // but I couldn't come up with a better solution right now
        return self.safeToString(a).toLowerCase() === self.safeToString(b).toLowerCase();
    };

    self.safeHighlight = function(str, value) {
        if (!value) {
            return str;
        }

        function escapeRegexChars(str) {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        }

        str = self.encodeHTML(str);
        value = self.encodeHTML(value);

        var expression = new RegExp('&[^;]+;|' + escapeRegexChars(value), 'gi');
        return str.replace(expression, function(match) {
            return match.toLowerCase() === value.toLowerCase() ? '<em>' + match + '</em>' : match;
        });
    };

    self.safeToString = function(value) {
        return angular.isUndefined(value) || value == null ? '' : value.toString().trim();
    };

    self.encodeHTML = function(value) {
        return self.safeToString(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    self.handleUndefinedResult = function(fn, valueIfUndefined) {
        return function() {
            var result = fn.apply(null, arguments);
            return angular.isUndefined(result) ? valueIfUndefined : result;
        };
    };

    self.replaceSpacesWithDashes = function(str) {
        return self.safeToString(str).replace(/\s/g, '-');
    };

    self.isModifierOn = function(event) {
        return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
    };

    self.promisifyValue = function(value) {
        value = angular.isUndefined(value) ? true : value;
        return $q[value ? 'when' : 'reject']();
    };

    self.simplePubSub = function() {
        var events = {};
        return {
            on: function(names, handler, first) {
                names.split(' ').forEach(function(name) {
                    if (!events[name]) {
                        events[name] = [];
                    }
                    var method = first ? [].unshift : [].push;
                    method.call(events[name], handler);
                });
                return this;
            },
            trigger: function(name, args) {
                var handlers = events[name] || [];
                handlers.every(function(handler) {
                    return self.handleUndefinedResult(handler, true)(args);
                });
                return this;
            }
        };
    };

    return self;
}]);

/* HTML templates */
tagsInput2.run(["$templateCache", function($templateCache) {
    $templateCache.put('ngTagsInput2/tags-input2.html',
    "<div class=\"host\" tabindex=\"-1\" ng-click=\"eventHandlers.host.click()\" ti-transclude-append2><div class=\"tags\" ng-class=\"{focused: hasFocus}\"><ul class=\"tag-list\"><li class=\"tag-item\" ng-repeat=\"tag in tagList.items track by track(tag)\" ng-class=\"getTagClass(tag, $index)\" ng-click=\"eventHandlers.tag.click(tag)\"><ti-tag-item2 scope=\"templateScope\" data=\"::tag\"></ti-tag-item2></li></ul><input class=\"input\" autoComplete2=\"off\" ng-model=\"newTag.text\" ng-model-options=\"{getterSetter: true}\" ng-keydown=\"eventHandlers.input.keydown($event)\" ng-focus=\"eventHandlers.input.focus($event)\" ng-virtual-keyboard=\"{relative: false, size: 4, sizeAdj: false, customClass: 'totemKeyboard', kt: 'ptBr', i18n: {'00': 'Exibir teclado numérico', '01': 'Exibir teclado virtual', '02': 'Selecionar layout do teclado', '03': 'Teclas mortas', '04': 'Ligado', '05': 'Desligado', '06': 'Fechar teclado', '07': 'Limpar', '08': 'Limpar campo', '09': 'Versão', '10': 'Diminuir tamanho do teclado', '11': 'Aumentar tamanho do teclado'} }\" ng-blur=\"eventHandlers.input.blur($event)\" ng-paste=\"eventHandlers.input.paste($event)\" ng-trim=\"false\" ng-class=\"{'invalid-tag': newTag.invalid}\" ng-disabled=\"disabled\" ti-bind-attrs2=\"{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex, spellcheck: options.spellcheck}\" ti-autosize2></div></div>"
  );

  $templateCache.put('ngTagsInput2/tag-item.html',
    "<span ng-bind=\"$getDisplayText()\"></span> <a class=\"remove-button\" ng-click=\"$removeTag()\" ng-bind=\"::$$removeTagSymbol\"></a>"
  );

  $templateCache.put('ngTagsInput2/auto-complete.html',
    "<div class=\"autoComplete\" ng-if=\"suggestionList.visible\"><ul class=\"suggestion-list\"><li class=\"suggestion-item\" ng-repeat=\"item in suggestionList.items track by track(item)\" ng-class=\"getSuggestionClass(item, $index)\" ng-click=\"addSuggestionByIndex($index)\" ng-mouseenter=\"suggestionList.select($index)\"><ti-autoComplete2-match scope=\"templateScope\" data=\"::item\"></ti-autoComplete2-match></li></ul></div>"
  );

  $templateCache.put('ngTagsInput2/auto-complete-match.html',
    "<span ng-bind-html=\"$highlight($getDisplayText())\"></span>"
  );
}]);

}());