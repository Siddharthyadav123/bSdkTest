window.importTemplate = function(templateId) {
    var template = "";
    var templateFileTag = document.querySelector("#" + templateId);
    var templateFileUrl = templateFileTag.getAttribute("href")

    $.ajax({
        url: templateFileUrl,
        success: function(html) {
            template = html;
        },
        error: function(err) {
            console.error("importing template failed : " + templateId);
        },
        async: false
    });

    return template;
}


window.loadTemplate = function(templateId, container) {

    var template = importTemplate(templateId);
    var compiledTemplate = Handlebars.compile(template);

    $("#" + container).html(compiledTemplate({}));
}



window.insertTemplateReferences = function(templateId, container) {
    var templatesToLoad = loadTemplates();
    var template = importTemplate(templateId);
    var compiledTemplate = Handlebars.compile(template);

    if (templatesToLoad.length > 0) {
        $("#" + container).append(compiledTemplate(templatesToLoad));
    }
}

window.registerTemplates = function(templateName, templateId) {
    Handlebars.registerPartial(templateName, importTemplate(templateId));
}


function loadTemplates() {

    var vendorName = "hdfc";
    var templatesToLoad = [];

    for (var templateId in window.chatboxTemplates) {

        loadDynamicTemplates(vendorName, templateId, function(err, filename, filepath, templateId) {
            if (err) {
                loadDynamicTemplates("default", templateId, function(err, filename, filepath, templateId) {
                    if (!err) {
                        templatesToLoad.push({ "tmplFilePath": filepath, "tmplId": templateId });
                    } else {

                        console.log("template file not available : " + filename);
                    }
                });
            } else {
                templatesToLoad.push({ "tmplFilePath": filepath, "tmplId": templateId });
            }
        });
    }

    return templatesToLoad;

}

function loadDynamicTemplates(vendorName, templateId, cb) {
    var filename = window.chatboxTemplates[templateId];
    var filepath = window.options.baseSdkPath + "templates/" + vendorName + "/" + filename;

    var status = "";

    $.ajax({
        url: filepath,
        type: 'HEAD',
        success: function() {
            cb(null, filename, filepath, templateId);
        },
        error: function(err) {

            cb(err, filename, null, templateId);
        },
        async: false
    })
}



var helpers = {

    contains: function(str, pattern, options) {
        if (str.indexOf(pattern) !== -1) {
            return options.fn(this);
        }
        return options.inverse(this);
    },

    if: function(conditional, options) {

        if (conditional) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },

    is: function(value, test, options) {
        if (value == test) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    },

    substr: function(str, start, end) {
        if (str) {
            return str.substr(start, end);
        } else {
            return "";
        }
    },

    lastindex: function(str, pattern) {
        if (str) {
            return str.lastIndexOf(pattern);
        } else {
            return -1;
        }
    },

    stringify: function(obj) {
        if (obj) {
            return JSON.stringify(obj);
        }
        return "";
    },

    now: function() {
        var d = new Date();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },

    chatText: function(text) {
        // var keys = Object.keys($.emojiarea.icons);
        // var values = [];

        // for (var i = 0; i < keys.length; i++) {
        //     var emojiName = keys[i];
        //     var src = $.emojiarea.icons[emojiName]
        //     values.push('<img src="' + $.emojiarea.path + '/' + src + '">');
        // }

        // for (var i = 0; i < keys.length; i++) {
        //     var regExp = new RegExp(keys[i], "g");
        //     text = text.replace(regExp, values[i]);
        // }

        return new Handlebars.SafeString(text);
    },

    micSupported: function(options) {

        var support = window.hasOwnProperty('webkitSpeechRecognition');

        if (support) {
            return options.fn(this);
        }

        return options.inverse(this);
    },

    isInSession: function(options) {

        if (!window["from"]) {
            return options.fn(this);
        }

        return options.inverse(this);

    },

    isMobile: function(options) {

        if (window.isMobile()) {
            return options.fn(this);
        }
        return options.inverse(this);
    },


    isDesktop: function(options) {
        if (!window.isMobile()) {
            return options.fn(this);
        }
        return options.inverse(this);

    }



}

for (var helper in helpers) {
    if (helpers.hasOwnProperty(helper)) {
        Handlebars.registerHelper(helper, helpers[helper]);
    }
}
