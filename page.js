jQuery(document).ready(function () {
    new app.DialogView(new app.DialogModel());
	
	//used to unify font line height appearance Mac/PC
	if (navigator.userAgent.indexOf('Mac') > 0) {
		$("body").addClass("mac");
	}
}); 
