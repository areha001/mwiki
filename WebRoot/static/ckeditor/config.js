/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		'/',
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	
	
};
CKEDITOR.myExtend={};
CKEDITOR.myExtend.callbacks={};

CKEDITOR.myExtend.addFunction = function(add_pos, name, title, clickCallback){

	CKEDITOR.myExtend.callbacks[name] = clickCallback;
	
	var str = 	'<span class="cke_toolbar" role="toolbar" aria-labelledby="cke_31_label">'
		+'<span class="cke_toolbar_start"></span>'
		+'<span class="cke_toolgroup" role="presentation">'
		+'<a class="cke_button cke_button__source cke_button_off" onclick="CKEDITOR.myExtend.callbacks[\'' + name + '\']()" aria-haspopup="false" aria-labelledby="cke_32_label" role="button" hidefocus="true" tabindex="-1" title="' + title + '">'
		+'<span class="cke_button_icon cke_button__source_icon"> </span>'
		+'<span class="cke_button_label cke_button__source_label" aria-hidden="false">' + name + '</span>'
		+'</a>'
		+'</span>'
		+'<span class="cke_toolbar_end"></span>'
		+'</span>';
	$(add_pos).append(str);
}
CKEDITOR.on("instanceLoaded", function(){
	CKEDITOR.myExtend.addFunction("#cke_33", "添加词汇内链", "添加词汇内链", function(){
		$.facebox({div:"#add_word_link",closeDiv:true,opacity:0.7});
	});
})


