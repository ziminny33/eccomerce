<?php

namespace App\Utils;

class EnvsModel implements ContractComposer {

    /**
    *  @var $themeColor
    *  Theme main color application
    */
    public string $themeColor;

    /**
    *  @var $isMobile
    *  Check if user browser or (Android iOS)
    */
    public bool $isMobile;

    /**
    *  ... outhers variables 
    */

    /**
    *  @return EnvsModel
    *  Return this class all publics variables fill
    */
    public function run() :EnvsModel {

        $model = ModelExample::methodExampleAllEnvs();
        $this->themeColor = $model['themeColor'];
        $this->isMobile = $model['isMobile'];
        return $this;

    }

}

    class ModelExample {

        static public function methodExampleAllEnvs() {
            return [
                'themeColor' => '#FFAA00',
                'isMobile' => false
            ];
        }

    }