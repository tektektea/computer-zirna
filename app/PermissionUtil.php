<?php
namespace App;
 class PermissionUtil{
     public static function userPerms(): array
     {
         return [
             'buy:course',
         ];
     }
     public static function adminPerms(): array
     {
         return [
             'view:course',
             'delete:course',
             'create:course',
             'update:course',

             'view:video',
             'delete:video',
             'create:video',
             'update:video',

             'view:user',
             'delete:user',
             'create:user',
             'update:user',
         ];
     }
 }
