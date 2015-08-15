"use strict";
// <script>


var my_currencies = [
    {
        id: 3,
        code: 'DOGE'
    },
    {
        id: 2,
        code: 'LTC'
    },
    {
        id: 1,
        code: 'BTC'
    },
];



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
        var vote_target_div = $(this).closest('.vote-target');
        return !sendVote(
            $(this).hasClass('on') ? 'unvote' : 'vote',
            vote_target_div.data('table'),
            vote_target_div.data('id'),
            this
        );
    });

    $('.btn-condemn').click(function(){
        if ($(this).siblings('a.btn').hasClass('btn-disabled')) return false;
        $(this).addClass('btn-disabled');
        $(this).siblings('a.btn').addClass('btn-disabled');
        $(this).children('span').removeClass('glyphicon-arrow-down');
        $(this).children('span').addClass('glyphicon-asterisk');
        $(this).children('span').addClass('icon-spin');
        var vote_target_div = $(this).closest('.vote-target');
        if (!$(this).hasClass('on'))
        {
            return !popupCondemnationForm(vote_target_div);
        }
        else
        {
            return !sendVote(
                $(this).hasClass('on') ? 'uncondemn' : 'condemn',
                vote_target_div.data('table'),
                vote_target_div.data('id'),
                this
            );
        }
    });

    $('.btn-note-expand').click(function(){
        var note_div = $(this).closest('.view-note');
        if (note_div.hasClass('note-collapsed'))
        {
            note_div.removeClass('note-collapsed');
        }
        else
        {
            note_div.addClass('note-collapsed');
        }
        console.log(note_div);
    });

}




function sendVote(vote_type, vote_target_type, vote_target_id, link_element) {

    var vote_url = '/'+vote_target_type+'/'+vote_type+'/'+vote_target_id;
    var vote_modifier = 'e'===vote_type.charAt(vote_type.length-1) ? 1 : -1;

    $.getJSON(
        vote_url,
        {
            _csrf: $('meta[name="csrf-token"]').attr('content')
        }
    )
    .done( function( data ) {

        if ('undefined'!==typeof data.success && data.success)
        {
            var alt_link_element = $(link_element).siblings('a.btn').get(0);

            $(link_element).removeClass('btn-disabled');
            $(alt_link_element).removeClass('btn-disabled');
            $(link_element).children('span').addClass('glyphicon-arrow-' + ( 1===vote_modifier ? 'up' : 'down' ) );
            $(link_element).children('span').removeClass('icon-spin');
            $(link_element).children('span').removeClass('glyphicon-asterisk');

            var score_span = $(link_element).siblings('span.media-score').get(0);
            var score = parseInt(score_span.innerHTML, 10);

            if ($(link_element).hasClass('on'))
            {
                $(link_element).removeClass('on');
                score -= vote_modifier;
                if ($(alt_link_element).hasClass('on'))
                {
                    $(alt_link_element).removeClass('on');
                    score -= vote_modifier;
                }
            }
            else
            {
                $(link_element).addClass('on');
                score += vote_modifier;
                if ($(alt_link_element).hasClass('on'))
                {
                    $(alt_link_element).removeClass('on');
                    score += vote_modifier;
                }
            }

            score_span.innerHTML = score;
        }
        else
        {
            // fallback to click on failure
            window.location.href = vote_url;
        }
    })
    .fail( function( jqxhr, textStatus, error ) {
        //var err = textStatus + ", " + error;
        //console.log( "Request Failed: " + err );

        // fallback to click on failure
        window.location.href = vote_url;

        // @todo: not logged in? popup a login box

    });

    return true;
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


    // Body

    var div = document.createElement('div');
    div.className = 'form-group field-note-body required';

    var note = document.createElement('textarea');
    note.name = 'Note[body]';
    note.className = 'form-control';
    note.required = true;
    note.rows = 5;
    div.appendChild(note);

    form.appendChild(div);


    // Tip

    var tip_div = document.createElement('div');
    tip_div.className = 'form-group note-tip clearfix';
    tip_div.style.display = 'none';


    var column = document.createElement('div');
    column.className = 'col-lg-8';

    var tip_amount = document.createElement('input');
    tip_amount.name = 'NoteTip[amount]';
    tip_amount.className = 'form-control';
    tip_amount.type = 'number';
    tip_amount.min = 0;
    tip_amount.step = 0.00000001;
    tip_amount.placeholder = '0.00000000';

    column.appendChild(tip_amount);
    tip_div.appendChild(column);


    var column = document.createElement('div');
    column.className = 'col-lg-4';

    var tip_currency = document.createElement('select');
    tip_currency.name = 'PersonCurrency[currency_id]';
    tip_currency.className = 'form-control';
    for (var i in my_currencies)
    {
        var option = document.createElement('option');
        option.value = my_currencies[i].id;
        option.innerHTML = my_currencies[i].code;
        tip_currency.appendChild(option);
    }

    column.appendChild(tip_currency);
    tip_div.appendChild(column);

    form.appendChild(tip_div);



    // Buttons

    var div = document.createElement('div');
    div.className = 'form-group';

    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Submit';
    submit.className = 'btn btn-primary btn-xs';
    form.appendChild(submit);

    form.appendChild(document.createTextNode(' '));

    var tip_button = document.createElement('a');
    tip_button.className = 'btn btn-success btn-xs';
    tip_button.innerHTML = 'Tip';
    if (my_currencies.length)
    {
        tip_button.addEventListener('click', function(){ $(tip_div).toggle(); });
    }
    else {
        tip_button.href = '/currency';
        tip_button.target = '_blank';
    }
    form.appendChild(tip_button);

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




function popupCondemnationForm(vote_target_div) {


    var div_popup = document.createElement('dive');

    var parent_table = $(vote_target_div).data('table');
    var parent_id = $(vote_target_div).data('id');

    var form = document.createElement('form');
    form.method = 'POST';
    form.action = '/'+parent_table+'/condemn/'+parent_id;
    form.className = 'condemn-form';

    var csrf = document.createElement('input');
    csrf.type = 'hidden';
    csrf.name = '_csrf';
    csrf.value = $('meta[name="csrf-token"]').attr('content');
    form.appendChild(csrf);



    // Reason

    var div = document.createElement('div');
    div.className = 'form-group required';

    var label = document.createElement('label');
    label.innerHTML = 'Reason:';

    var select_reason = document.createElement('select');
    select_reason.name = 'Condemn[reason]';
    select_reason.className = 'form-control';
    select_reason.required = true;
    var select_reasons = ['','spam','plagiarized','malicious','illegal','other'];
    for (var i in select_reasons)
    {
        var option = document.createElement('option');
        option.innerHTML = select_reasons[i];
        select_reason.appendChild(option);
    }

    label.appendChild(select_reason);
    div.appendChild(label);
    form.appendChild(div);


    // Details

    var div = document.createElement('div');
    div.className = 'form-group field-note-body required';

    var label = document.createElement('label');
    label.innerHTML = 'Details:';
    div.appendChild(label);

    var note = document.createElement('textarea');
    note.name = 'Condemn[body]';
    note.className = 'form-control';
    note.style.width = '100%';
    note.required = true;
    note.rows = 5;

    div.appendChild(note);
    form.appendChild(div);


    // Buttons

    var div = document.createElement('div');
    div.className = 'form-group';

    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Submit Report';
    submit.className = 'btn btn-primary btn-xs';
    form.appendChild(submit);

    div_popup.appendChild(form);

    return BootstrapDialog.show({
        title: 'Condemnation Report',
        message: div_popup,
        buttons: [{
            label: 'Cancel',
            action: function(dialogRef){
                dialogRef.close();
            }
        }],
        onhide: function(dialogRef){

            var link_element = $(vote_target_div).children('.vote-buttons').children('a.btn-condemn');
            var alt_link_element = $(vote_target_div).children('.vote-buttons').children('a.btn-vote');

            $(link_element).removeClass('btn-disabled');
            $(alt_link_element).removeClass('btn-disabled');
            $(link_element).children('span').addClass('glyphicon-arrow-down');
            $(link_element).children('span').removeClass('icon-spin');
            $(link_element).children('span').removeClass('glyphicon-asterisk');
        }

    });

};


function showNoteHelp() {
    return !BootstrapDialog.show({
        title: 'Formatting Reference',
        message: $('<div></div>').load('/markdown.html')
    });
}
