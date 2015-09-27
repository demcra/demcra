import {ProseMirror} from "../src/edit"
import {elt} from "../src/dom"
import "../src/convert/from_markdown"
import "../src/convert/to_markdown"
import "../src/menu/menubar"
import "../src/menu/inlinemenu"

var markdown_editors = document.querySelectorAll('.markdown-editor');

for (var i=0; i < markdown_editors.length; ++i) {

    var $parent_div = $(markdown_editors[i]);
    var editor_textarea = $parent_div.find('.markdown-editor-textarea:first')[0];
    var editor_div = $parent_div.find('.markdown-editor-div:first')[0];

    var editor = new ProseMirror({
        place: editor_div,
        doc: editor_textarea.value,
        docFormat: 'markdown',
        menuBar: {float: true},
        inlineMenu: true
    });

    editor.on('change', function() {
        var $parent_div = $(editor.wrapper).closest('.markdown-editor');
        var editor_textarea = $parent_div.find('.markdown-editor-textarea:first')[0];
        editor_textarea.value = editor.getContent('markdown');
    });

    $parent_div.bind('toggle-editor', function() {
        var $parent_div = $(this);
        var editor_textarea = $parent_div.find('.markdown-editor-textarea:first')[0];
        var editor_div = $parent_div.find('.markdown-editor-div:first')[0];

        if ($(editor_textarea).is(':visible')) {
            $(editor_textarea).hide();
            $parent_div.find('.markdown-help:first').hide();
            $(editor_div).show();
            $parent_div.find('.editor-help:first').show();
            editor.setContent(editor_textarea.value, 'markdown');
        }
        else {
            $(editor_div).hide();
            $parent_div.find('.editor-help:first').hide();
            $(editor_textarea).show();
            $parent_div.find('.markdown-help:first').show();
        }

    });

    $parent_div.trigger('toggle-editor');

}
