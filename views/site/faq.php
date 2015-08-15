<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
$this->title = _('Frequently Asked Questions');
$this->params['breadcrumbs'][] = $this->title;

?>
<div class="site-about">
<h1><abbr title="<?=_('Frequently Asked Questions')?>"><?=_('FAQ')?></abbr></h1>

<h2 id="faq-demcra"><?=_('What is Demcra?')?></h2>
<p><?='<em>Demcra</em> is a non-profit website for link sharing and discussions.'?></p>

<h2 id="faq-join"><?=_('How do I create an account?')?></h2>
<p><?php
printf(
    _('Choose a unique username and enter it on the %s, along with a strong password to protect your account.'),
    '<a href="/site/join">'._('join form').'</a>'
);
?></p>

<h2 id="faq-submit"><?=_('How do I post to demcra?')?></h2>
<p><?php
printf(
    _('Once you have %s and are logged in, %s where your post fits and click "%s".'),
    '<a href="#faq-join">'._('joined').'</a>',
    '<a href="/realm">'._('find a realm').'</a>',
    '<a href="/topic/submit?realm_id=100011">'._('Submit Topic').'</a>'
);
?></p>

<h2 id="faq-realm"><?=_('What is a realm?')?></h2>
<p><?php
printf(
    _('Realms are the communities of Demcra, each with it\'s own topics, moderators, styles, etc. For example, %s is a realm where jokes are shared.'),
    '<a href="/r/jokes">/r/jokes</a>'
);
?></p>

<h2 id="faq-realm-create"><?=_('How do I create a realm?')?></h2>
<p><?=_('Open the address of the realm as if it did exist, for example: http://demcra.com/r/<strong>MyNewRealm</strong>. If you are logged in, and the realm does not already exist, you can create it by clicking "Create Realm".')?></p>

</div>
