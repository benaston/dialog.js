var onBoardingTool = onBoardingTool || {};

onBoardingTool.DeleteLatestReportIssueOnLiveDialogModel = function () {
    "use strict";

    if (!(this instanceof onBoardingTool.DeleteLatestReportIssueOnLiveDialogModel)) {
        return new onBoardingTool.DeleteLatestReportIssueOnLiveDialogModel();
    }

    var self = this;

    this.updateNotificationUri = "update://onBoardingTool.DeleteLatestReportIssueOnLiveDialogModel";

    self.isVisible = false;

    this.getVisibility = function () {
        return self.isVisible;
    };

    this.setVisibility = function (isVisible) {
        self.isVisible = isVisible;
        $.publish(self.updateNotificationUri);
    };

    this.getTemplateId = function () {
        return self.templateId;
    };

    this.setTemplateId = function (id) {
        self.templateId = id;
        $.publish(self.updateNotificationUri);
    };

    this.getReportIssueId = function () {
        return self.reportIssueId;
    };

    this.setReportIssueId = function (id) {
        self.reportIssueId = id;
        $.publish(self.updateNotificationUri);
    };

    this.getTemplateName = function () {
        return self.templateName;
    };

    this.setTemplateName = function (name) {
        self.templateName = name;
        $.publish(self.updateNotificationUri);
    };

    this.getTitleDate = function () {
        return self.titleDate;
    };
    
    this.setTitleDate = function (titleDate) {
        self.titleDate = titleDate;
        $.publish(self.updateNotificationUri);
    };

    this.getState = function () {
        return self.state;
    };

    this.setState = function (state) {
        self.state = state;
        $.publish(self.updateNotificationUri);
    };
    
    this.updateReportIssueInfoFromLive = function () {
        self.setState("waiting");
        $.ajax("/reportissuesonlivelatestavailabletopull/show/" + self.templateId, {
            type: "GET",
            cache: false,
            success: function (data) {
                self.titleDate = data.Value1;
                self.reportIssueId = data.Value2;

                if(self.reportIssueId === "") {
                    self.setState("missing-issue");
                } else {
                    self.setState("success");
                }
            },
            error: function (xhr, textStatus, error) {
                self.setState("error");
            }
        });
    };

    function init() {
        return self;
    }

    return init();
};
