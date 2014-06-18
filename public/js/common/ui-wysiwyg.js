jQuery(function($) {

	if (!window.tinymce)
		return;

	var plugins = [ 'code', 'link' ],
		toolbar = 'bold italic | alignleft aligncenter alignright | bullist numlist | outdent indent | link';

	if (Keystone.wysiwyg.options.enableImages) {
		plugins.push('image');
		toolbar += ' | image';
	}

	if (Keystone.wysiwyg.options.enableCloudinaryUploads) {
		plugins.push('uploadimage');
		toolbar += (Keystone.wysiwyg.options.enableImages) ? ' uploadimage' : ' | uploadimage';
	}

	if (Keystone.wysiwyg.options.additionalButtons) {
	    var additionalButtons = Keystone.wysiwyg.options.additionalButtons.split(',');
	    for (var i=0; i<additionalButtons.length; i++) {
	        toolbar += (' | ' + additionalButtons[i]);
	    }
	}

	toolbar += ' | code';

	var imagelist = [],
			imagelength = $('.image-preview a').length;
	$('.image-preview a').each(function(i) {
		var filehref = $(this).attr('href');
				// if (imagelist.length != 0) {
		imagelist.push({
			title: filehref.split('/')[3],
			value: filehref
		});
				// }
				
		if (i+1 === imagelength) {
			initit();
		}
	});
	imagelist = JSON.stringify(imagelist);

	// init editable wysiwygs
	tinymce.init({
		selector: 'textarea.wysiwyg',
		menubar: false,
		plugins: plugins,
		toolbar: toolbar,
		skin: 'keystone'
	});

	//init non-editable wysiwygs
	tinymce.init({
		selector: 'textarea.wysiwyg-noedit',
		mode: 'textareas',
		readonly: true,
		menubar: false,
		plugins: plugins,
		toolbar: 'code',
		statusbar: false,
		skin: 'keystone'
	});

	function initit(){
		tinymce.init({
			selector: 'textarea.wysiwyg',
			menubar: false,
			plugins: [ 'code', 'link', 'images' ],
			toolbar: 'bold italic | alignleft aligncenter alignright | bullist numlist | outdent indent | link images | code',
			skin: 'keystone',
			image_list: imagelist
		});
	} 


});