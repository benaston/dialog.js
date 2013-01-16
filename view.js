var app = app || {};

app.DialogView = function (model) {
    "use strict";

    if (!(this instanceof app.DialogView)) {
        return new app.DialogView();
    }

    var self = this;

    this.$el = $("#example");
    this.$btnSuccess = self.$el.find(".btn-success");
    this.$btnShow = $(".btn-show-dialog");
    this.$btnHide = self.$el.find(".btn-cancel");
    this.$form = self.$el.find("form");    
    this.$spinner = self.$el.find(".spinner");
    this.$title = self.$el.find(".dialog h3");
    this.$resources = self.$el.data("resources");
    this.$strings = self.$el.data("strings");
    this.$messages = self.$el.find(".message");

    this.onShow = function (e) {               		
        self.Model.exampleCustomLogic();
        $(document).keyup(self.onKeyUp);
        self.Model.setVisibility(true);
    };

    this.onHide = function () {
        self.Model.setVisibility(false);
        $(document).unbind("keyup");
    };

    this.onKeyUp = function (e) {
        if (e.keyCode == 27) {
            self.Model.setVisibility(false);
            $(this).unbind(e);
        }
    };

    this.onSuccess = function () {
        self.$form.submit();
    };

    this.render = function () {        
        self.$el.attr("data-state", self.Model.getState());        

        if (self.Model.getVisibility()) {
            self.$el.addClass("active");
        } else {
            self.$el.removeClass("active");            
        }
    };

    this.initResources = function () {
		self.$spinner.attr("src", self.$resources["spinner"]);
	}	
	
    this.initStrings = function () {        
        self.$spinner.attr("alt", self.$strings["alt-spinner"]);
        self.$title.html(self.$strings["title"]);
        self.$messages.each(function (index) { $(this).html(self.$strings["message-" + $(this).parent("div").attr("class").split(' ')[0]]); });
    };

    function init() {
        self.Model = model;
        self.$btnShow.click(self.onShow);
        self.$btnHide.click(self.onHide);
        self.$btnSuccess.click(self.onSuccess);
        self.initResources();
		self.initStrings();

        $.subscribe(self.Model.updateNotificationUri, self.render);

        return self;
    }

    return init();
};
