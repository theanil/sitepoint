/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    properties: {},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    getBrowserOptions: function() {
        var options = {
            statusbar: {
                color: '#ffffffff'
            },
            toolbar: {
                height: 44,
                color: '#f0f0f0ff'
            },
            title: {
                color: '#003264ff',
                align: "center",
                showPageTitle: true
            }
        }
        options.customButtons = [{
            wwwImage: 'img/btns/sitepoint-logo.png',
            wwwImagePressed: 'img/btns/sitepoint-logo.png',
            wwwImageDensity: 1,
            align: 'left',
            event: 'SitePointSitePressed'
        }]
        options.menu = {
            wwwImage: 'img/btns/menu.png',
            imagePressed: 'img/btns/menu-pressed.png',
            wwwImageDensity: 1,
            title: 'Effects',
            cancel: 'Cancel',
            align: 'right',
            items: [{
                    event: 'speakPostPressed',
                    label: "Speak Post"
                },

                {
                    event: 'speakTitlesPressed',
                    label: "Speak Titles"
                }, {
                    event: 'stopSpeakingPressed',
                    label: "Stop Speaking"
                }, {
                    event: 'viewCodeBlocks',
                    label: 'Toggle Only Code Blocks'
                },

                {
                    event: 'randomArticlePressed',
                    label: 'Open a Random Article on the Page'
                }
            ]
        }
        return options;
    },

        openPage: function(url) {

        var options = app.getBrowserOptions();

        app.properties.ref = cordova.ThemeableBrowser.open(url, '_blank', options);

        app.addEventListeners();


    },

    addEventListeners: function() {
        app.properties.ref.addEventListener('viewCodeBlocks', function(e) {
                SitePointPostOptions.run("viewCodeBlocks");
            }).addEventListener('speakPostPressed', function(e) {
                SitePointPostOptions.run("speakPost");

            }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
                console.error(e.message);
            }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
                console.log(e.message);

            }).addEventListener("stopSpeakingPressed", function(e) {
                SitePointPostOptions.run("stopSpeaking");

            }).addEventListener("speakTitlesPressed", function(e) {
                SitePointPostOptions.run("speakTitles");
            })
            .addEventListener("SitePointSitePressed", function(e) {
                SitePointPostOptions.run("logoClick");
            })
            .addEventListener("randomArticlePressed", function(e) {
                SitePointPostOptions.run("randomArticle");
            }).addEventListener("loadstop", function(evt) {
                if (SitePointPostOptions.properties && SitePointPostOptions.properties.length) {
                    SitePointPostOptions.properties.areCodeBlocksShown = false;
                }

                if (evt.url.indexOf("sitepoint.com") === -1) {
                    return;
                }
                app.properties.ref.executeScript({
                        code: "document.body.innerHTML"
                    },
                    function(values) {
                        alert("The app's menu is now ready for use.");
                        app.properties.pageContents = values;

                    }
                );

            })
    },

    receivedEvent: function(id) {
        // app is ready
        app.openPage("http://www.bluapps.in");


    }
};
