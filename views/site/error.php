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

<?php
switch ($exception->statusCode)
{

    case 404:
?>
    <div style="text-align:center;margin:20px auto;">
        <img src="/img/404.png" alt="" style="width:100%;">
    </div>
<?php
        break;

    case 451:
?>
    <div style="text-align:center;margin:20px auto;">
        <img src="/img/451.png" alt="" style="width:100%;">
    </div>
<?php
        break;

    default:
?>
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
