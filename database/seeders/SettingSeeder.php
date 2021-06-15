<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'corousel' => [],
            'ads' => []
        ];
        Setting::query()->create([
            'setting' => json_encode($data),
        ]);
    }
}
