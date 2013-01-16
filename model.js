var app = app || {};

app.DialogModel = function () {
    "use strict";

    if (!(this instanceof app.DialogModel)) {
        return new app.DialogModel();
    }

    var self = this;

    this.updateNotificationUri = "update://app.DialogModel";

    self.isVisible = false;

    this.getVisibility = function () {
        return self.isVisible;
    };

    this.setVisibility = function (isVisible) {
        self.isVisible = isVisible;
        $.publish(self.updateNotificationUri);
    };
    
    this.getState = function () {
        return self.state;
    };

    this.setState = function (state) {
        self.state = state;
        $.publish(self.updateNotificationUri);
    };
   
    this.exampleCustomLogic = function () {
        self.setState("waiting");
		setTimeout(function(){
			self.setState('success');
		}, 2000);
    };

    function init() {
        return self;
    }

    return init();
};
