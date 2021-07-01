<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('father_name')->nullable();
            $table->text('address')->nullable();
            $table->string('order_id');
            $table->string('receipt');
            $table->dateTime('purchase_at')->nullable();
            $table->string('status')->default('draft');//draft subscribed expired

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('course_id');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subscriptions');
    }
}
