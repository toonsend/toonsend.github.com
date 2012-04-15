$(document).ready(function() {
	var GaTracking = GaTracking || {};

	GaTracking.track = function(element) {
		element = jQuery(element);

		if(element.attr('data-track-me') == 'false') {
			return;
		}

		element.click(function(evt) {
			//find the closest element with data-category set and use that value, starting with the current element
			var category = element.closest('[data-category]').attr('data-category');
			var action = element.closest('[data-action]').attr('data-action');

			var label = element.attr('data-label');
			if(!label) {//if the label is not set, use the element's href attribute
				label = element.attr('href');
			} else if(label == 'window.location') {//if the label is set to 'window.location' use the current url
				label = window.location;
			}

			if(category && action) {//Google only requires category and action
				_gaq.push(['_trackEvent', category, action, label]);
				//alert('trackEvent\n\nCategory: ' + category + '\n\nAction: ' + action + '\n\nLabel: ' + label);
			}
		});
	}
	//track any element that has the attribute data-track-me="true"
	jQuery('[data-track-me="true"]').each(function(index, element) {
		GaTracking.track(element);
	});
	//track any tags that are children of a container that has a list of tags to track in data-track-tags="[list of tags]"
	jQuery('[data-track-tags]').each(function(index, container) {
		container = jQuery(container);

		//for each of the tags in the data-track-tags attribute, find elements in the container and track them
		jQuery.each(container.attr('data-track-tags').split(' '), function(index, tag) {
			container.find(tag).each(function(index, element) {
				GaTracking.track(element);
			});
		});
	});
	
	//track social events
	_ga.trackSocial();
});