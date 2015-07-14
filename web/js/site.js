"use strict";
// <script>

window.onload = function() {

    $('.btn-note').click(function(){
        return !toggleNoteForm( $(this).closest('.note-target').get(0) );
    });

    $('.btn-note-edit').click(function(){
        return !toggleEditForm( $(this).closest('.note-target').get(0) );
    });

    $('.btn-note-delete').click(function(){
        return confirm('Are you sure?');
    });

    $('.btn-vote').click(function(){
        if ($(this).siblings('a.btn').hasClass('btn-disabled')) return false;
        $(this).addClass('btn-disabled');
        $(this).siblings('a.btn').addClass('btn-disabled');
        $(this).children('span').removeClass('glyphicon-arrow-up');
        $(this).children('span').addClass('glyphicon-asterisk');
        $(this).children('span').addClass('icon-spin');
        return true;
    });

    $('.btn-condemn').click(function(){
        if ($(this).siblings('a.btn').hasClass('btn-disabled')) return false;
        $(this).addClass('btn-disabled');
        $(this).siblings('a.btn').addClass('btn-disabled');
        $(this).children('span').removeClass('glyphicon-arrow-down');
        $(this).children('span').addClass('glyphicon-asterisk');
        $(this).children('span').addClass('icon-spin');
        return true;
    });

}








function addNoteForm(note_target) {

    var div_note = $('.div-note',note_target).get(0);

    var parent_table = $(note_target).data('table');
    var parent_id = $(note_target).data('id');

    var form = document.createElement('form');
    form.method = 'POST';
    form.action = '/note/create?parent_table='+parent_table+'&parent_id='+parent_id;
    form.className = 'note-form';

    var csrf = document.createElement('input');
    csrf.type = 'hidden';
    csrf.name = '_csrf';
    csrf.value = $('meta[name="csrf-token"]').attr('content');
    form.appendChild(csrf);


    var div = document.createElement('div');
    div.className = 'form-group field-note-body required';

    var note = document.createElement('textarea');
    note.name = 'Note[body]';
    note.className = 'form-control';
    note.required = true;
    note.rows = 5;
    div.appendChild(note);

    form.appendChild(div);


    var div = document.createElement('div');
    div.className = 'form-group';

    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.className = 'btn btn-primary btn-xs';
    form.appendChild(submit);

    form.appendChild(document.createTextNode(' '));

    var cancel = document.createElement('a');
    cancel.className = 'btn btn-danger btn-xs';
    cancel.innerHTML = 'Cancel';
    cancel.addEventListener('click', function(){ $(form).hide(); });
    form.appendChild(cancel);

    form.appendChild(document.createTextNode(' '));

    var help = document.createElement('a');
    help.className = 'btn btn-warning btn-xs';
    help.innerHTML = '?';
    help.addEventListener('click', showNoteHelp);
    form.appendChild(help);



    form.appendChild(div);

    div_note.appendChild(form);

    return true;

};

function getNoteForm(note_target) {
    // @todo something smarter
    return $(note_target).children('.media-body').children('.div-note').children('.note-form');
};

function hasNoteForm(note_target) {
    return !!getNoteForm(note_target).length;
};

function toggleNoteForm(note_target) {
    var note_form = getNoteForm(note_target);
    if (!note_form.length) return addNoteForm(note_target);
    return note_form.toggle();
};












function addEditForm(note_target) {

    var div_note = $('.div-note-edit',note_target).get(0);

    var parent_table = $(note_target).data('table');
    var parent_id = $(note_target).data('id');

    var form = document.createElement('form');
    form.method = 'POST';
    form.action = '/note/update?id='+parent_id;
    form.className = 'edit-form';

    var csrf = document.createElement('input');
    csrf.type = 'hidden';
    csrf.name = '_csrf';
    csrf.value = $('meta[name="csrf-token"]').attr('content');
    form.appendChild(csrf);


    var div = document.createElement('div');
    div.className = 'form-group field-note-body required';

    var note = document.createElement('textarea');
    note.name = 'Note[body]';
    note.className = 'form-control';
    note.required = true;
    note.rows = 5;
    note.innerHTML = div_note.innerHTML;
    div_note.innerHTML = '';
    div.appendChild(note);

    form.appendChild(div);


    var div = document.createElement('div');
    div.className = 'form-group';

    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Save';
    submit.className = 'btn btn-primary btn-xs';
    form.appendChild(submit);

    form.appendChild(document.createTextNode(' '));

    var cancel = document.createElement('a');
    cancel.className = 'btn btn-danger btn-xs';
    cancel.innerHTML = 'Cancel';
    cancel.addEventListener('click', function(){ $(form).hide(); $(note_target).children('.media-body').children('.media-note').show(); });
    form.appendChild(cancel);

    form.appendChild(document.createTextNode(' '));

    var help = document.createElement('a');
    help.className = 'btn btn-warning btn-xs';
    help.innerHTML = '?';
    help.addEventListener('click', showNoteHelp);
    form.appendChild(help);


    form.appendChild(div);

    div_note.appendChild(form);

    $(div_note).show();

    return true;

};

function getEditForm(note_target) {
    // @todo something smarter
    return $(note_target).children('.media-body').children('.div-note-edit').children('.edit-form');
};

function hasEditForm(note_target) {
    return !!getEditForm(note_target).length;
};

function toggleEditForm(note_target) {
    $(note_target).children('.media-body').children('.media-note').hide();
    var note_form = getEditForm(note_target);
    if (!note_form.length) return addEditForm(note_target);
    console.log(note_form.is(':visible'));
    if (note_form.is(':visible')) $(note_target).children('.media-body').children('.media-note').show();
    return note_form.toggle();

};


function showNoteHelp() {
    return !BootstrapDialog.show({
        title: 'Formatting Reference',
        message: $('<div></div>').load('/markdown.html')
    });
}
