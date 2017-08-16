var React = require('react');
var AppRegistry = require('react-native').AppRegistry;
var nx = require('next-js-core2');
var createStore = require('redux').createStore;
var bindActionCreators = require('redux').bindActionCreators;

var States = require('../redux-base/states');
var Actions = require('../redux-base/actions');
var Reducers = require('../redux-base/reducers');
var COMMAND = require('./const').COMMAND;

import {View, Text, Button, Alert} from 'react-native';

var ReduxBoot = nx.declare({
    statics: {
        run: function (inApp, inName, inContainer) {
            return new ReduxBoot(inApp, inName, inContainer);
        }
    },
    properties: {
        root: {
            set: function (inValue) {
                this._$actions.root(inValue);
            },
            get: function () {
                return States.getRoot(this._store);
            }
        },
        error: {
            set: function (inValue) {
                this._$actions.error(inValue);
            },
            get: function () {
                return States.getError(this._store);
            }
        },
        memory: {
            set: function (inValue) {
                this._$actions.memory(inValue);
            },
            get: function () {
                return States.getMemory(this._store);
            }
        },
        request: {
            set: function (inValue) {
                this._$actions.request(inValue);
            },
            get: function () {
                return States.getRequest(this._store);
            }
        }
    },
    methods: {
        init: function (inApp, inName) {
            this._app = inApp;
            this._name = inName;
            this._store = createStore(
                this.reducers.bind(this)
            );
            this._$actions = bindActionCreators(Actions, this._store.dispatch);
            this.subscribe();
            this.renderTo();
        },
        reducers: function (inState, inAction) {
            var initialState = this._app.initialState();
            return Reducers(inState || initialState, inAction);
        },
        subscribe: function () {
            this._store.subscribe(this.renderTo.bind(this));
        },
        command: function (inName, inData, inContext) {
            inContext.fire(COMMAND, {
                name: inName,
                data: inData
            }, inContext);
        },
        onCommand: function (inName, inHandler, inContext) {
            inContext.on(COMMAND, function (inSender, inArgs) {
                if (inArgs.name === inName) {
                    inHandler.call(inContext, inSender, inArgs);
                }
            }, inContext);
        },
        renderTo: function () {
            const appKeys = AppRegistry.getAppKeys();
            const initialProps = {
                store: this._store,
                update: States.getUpdate.bind(this, this._store),
                command: this.command.bind(this),
                onCommand: this.onCommand.bind(this),
                $: this
            };

            if (!appKeys.length > 0) {
                AppRegistry.registerComponent(
                    this._name,
                    () => {
                        return () => React.createElement(this._app, initialProps);
                    }
                );
            } else {
                AppRegistry.runApplication(this._name, {
                    initialProps,
                    rootTag: 1
                });
            }
        }
    }
});

module.exports = ReduxBoot;
