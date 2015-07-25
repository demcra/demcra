<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $name string */
/* @var $message string */
/* @var $exception Exception */

$this->title = $name;
?>
<div class="site-error">


<?php
switch ($exception->statusCode)
{

    case 404:
?>
    <style>body{background-color:#000;}</style>
    <div style="text-align:center;margin:0 auto 20px;">
        <img src="/img/404.jpg" alt="Where are you?" style="max-width:100%;">
    </div>
<?php
        break;

    case 451:
?>
    <style>body{background-color:#f14831;}</style>
    <div style="text-align:center;margin:0 auto 20px;">
        <img src="/img/451.png" alt="This material has never existed" style="max-width:100%;">
    </div>
<?php
        break;

    default:
?>
    <h1><?=Html::encode($this->title)?></h1>
    <div style="text-align:center;margin:20px auto;">
        <img src="/img/500.png" alt="">
    </div>
<?php
        break;

}

?>


    <div class="alert alert-danger">
        <?= nl2br(Html::encode($message)) ?>
    </div>

</div>
