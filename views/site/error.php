<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $name string */
/* @var $message string */
/* @var $exception Exception */

$this->title = $name;
?>
<div class="site-error">

    <h1><?=Html::encode($this->title)?></h1>

    <div style="text-align:center;margin:20px auto;">
        <img src="/img/404.png" alt="">
    </div>

    <div class="alert alert-danger">
        <?= nl2br(Html::encode($message)) ?>
    </div>

</div>
