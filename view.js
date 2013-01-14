var onBoardingTool = onBoardingTool || {};

onBoardingTool.DeleteLatestReportIssueOnLiveDialogView = function (model) {
    "use strict";

    if (!(this instanceof onBoardingTool.DeleteLatestReportIssueOnLiveDialogView)) {
        return new onBoardingTool.DeleteLatestReportIssueOnLiveDialogView();
    }

    var self = this;

    this.$el = $("#delete-latest-report-issue-on-live-dialog-wrapper");
    this.$btnContinue = self.$el.find(".continue");
    this.$btnShow = $(".btn-delete-latest-report-issue-on-live");
    this.$btnHide = self.$el.find(".goBack");
    this.$form = self.$el.find("form");
    this.$message = self.$el.find(".success .message");
    this.$spinner = self.$el.find(".spinner");
    this.$title = self.$el.find(".popup-window > h3");
    this.$resources = self.$el.data("resources");
    this.$strings = self.$el.data("strings");
    this.$messages = self.$el.find(".message");

    this.onShow = function (e) {
        self.Model.setTemplateId($(e.target).parents(".productIssue").find(".shortCode").text());
        self.Model.setTemplateName($(e.target).parents(".productIssue").find(".templateName").text());
        self.Model.setTitleDate($(e.target).parents(".productIssue").data("latest-report-issue-title-date"));
        self.Model.setReportIssueId($(e.target).parents(".productIssue").data("latest-report-issue-id"));
        self.Model.updateReportIssueInfoFromLive();
        $(document).keyup(self.onKeyUp);
        self.Model.setVisibility(true);

        return false;
    };

    this.onHide = function () {
        self.Model.setVisibility(false);
        $(document).unbind("keyup");

        return false;
    };

    this.onKeyUp = function (e) {
        if (e.keyCode == 27) {
            self.Model.setVisibility(false);
            $(this).unbind(e);
        }

        return false;
    };

    this.onContinue = function () {
        self.$form.submit();
    };

    this.render = function () {
        self.resetDom();
        self.$el.attr("data-state", self.Model.getState());
        self.$form.attr("action", "/reportissuesonlivelatestavailabletopull/destroy/" + self.Model.getReportIssueId());

        var message = self.$message.html()
        .replace("{0}", self.Model.getTemplateName())
        .replace("{1}", self.Model.getTitleDate());
        self.$message.html(message);

        if (self.Model.getVisibility()) {
            self.$el.addClass("active");
        } else {
            self.$el.removeClass("active");
            self.$el.attr("data-state", "");
        }
    };

    this.resetDom = function () {
        self.$spinner.attr("src", self.$resources["spinner"]);
        self.$spinner.attr("alt", self.$strings["alt-spinner"]);
        self.$title.html(self.$strings["title"]);
        self.$messages.each(function (index) { $(this).html(self.$strings["message-" + $(this).parent("div").attr("class").split(' ')[0]]); });
    };

    function init() {
        self.Model = model;
        self.$btnShow.click(self.onShow);
        self.$btnHide.click(self.onHide);
        self.$btnContinue.click(self.onContinue);
        self.resetDom();

        $.subscribe(self.Model.updateNotificationUri, self.render);

        return self;
    }

    return init();
};
