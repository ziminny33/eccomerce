<?php

namespace App\Utils;

interface ContractComposer {
    /**
     *  @return ContractComposer
     *  Return this class fill variables
     */
    function run() :ContractComposer;
}