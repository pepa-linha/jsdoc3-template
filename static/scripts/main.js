/*global document */
(function() {
	var temp = location.href.split("/"),
		currentPage = temp[temp.length - 1];

	var currentLink = document.body.querySelector("#nav a[href='" + currentPage + "']");
	if(currentLink) {
		currentLink.className += "current";
	}

	$("table").on("click", "tr", function(event) {
		var tr = $(this);
		if($(event.target).closest(".more").length) {
			event.preventDefault();
		} else {
			tr.find(".more").slideToggle();
		}
	});

	if(window.localStorage) {
		$("#nav").scroll(function(event) {
			window.localStorage.setItem("navScrollTop", $("#nav").prop("scrollTop"));
		});

		$("#nav").prop("scrollTop", window.localStorage.getItem("navScrollTop"));
	}

	var methods = $(".methods");
	var filterInputs = methods.find(".filter input");

	// find counts and disable filter option if 0
	filterInputs.filter("[data-attribute][data-value]").each(function() {
		var input = $(this),
			attribute = input.data("attribute"),
			value = input.data("value"),
			count = methods.find(".method[data-" + attribute + "=" + value + "]").length,
			label = input.closest("label");

		label.append(" <small>(" + count + ")</small>");

		if(count === 0) {
			input.prop("disabled", true);
			input.prop("checked", false);
			label.addClass("disabled");
		}

	});

	filterInputs.change(function() {

		var filter = {};

		methods.find(".filter input[data-attribute]").each(function() {
			var input = $(this);
			var item = filter[input.data("attribute")];
			if(!item) {
				item = filter[input.data("attribute")] = [];
			}
			if(input.prop("checked")) {
			   item.push(input.data("value"));
		   }
		});

		methods.find(".method").each(function() {
			var method = $(this);
			$.each(method.data(), function(name, value) {
				if((filter[name] && $.inArray(value, filter[name]) !== -1) || (filter[name] && !value)) {
					method.show();
				} else {
					method.hide();
				}
			});
		});
	});

})();
