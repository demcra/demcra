<?php
use yii\helpers\Html;

$this->title = _('Donate');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">

<h1><?=$this->title?></h1>
<p><?=_('Thank you for supporting our cause!')?>
<h2><?=_('Donate by Cryptocurrency')?></h2>
<p><?=_('demcra accepts donations at these addresses')._(':')?>

<?php
foreach (array(
    'bitcoin' => '1Jbn3srZhjuA7tP6odncgqAUNc3b2BbZjb',
    'litecoin' => 'LM3xGMXeTVc3XdWpNDHsrvaYwkfxgET8N9',
    'dogecoin' => 'D8sVK1dQtAjUpq2WD5o35HDaLkzX6Swghk',
) as $scheme => $address)
{
    echo '<h3>'.ucwords($scheme).'</h3>';
    echo '<div class="row">';

    echo '<div class="col-lg-2">';
    echo '<img src="/qr/'.$address.'.PNG" alt="" style="margin:0 0 10px;">';
    echo '</div>';

    echo '<div class="col-lg-1">';
    echo '<a href="'.$scheme.':'.$address.'" style="margin:10px 0;">'.$address.'</a>';
    echo '</div>';

    echo '</div>'; // end row
}
?>

<h2><?=_('Become a Member')?></h2>
<p><?=_('Become a paying member so you can participate in our board of directors election and more.')?>
<p><?=_('Details coming soon!')?>

</div>
