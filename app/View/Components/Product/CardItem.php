<?php

namespace App\View\Components\Product;

use Illuminate\View\Component;

class CardItem extends Component
{

    public string $image; 
    public string $name;
    public string $descriptionSmall;
    public string $descriptionFull;
    public string $price;
    public string $themeColor;
    public string $delivered;
 
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(
        string $image,
        string $name,
        string $descriptionSmall,
        string $descriptionFull,
        string $price,
        string $themeColor,
        string $delivered,
    )
    {
        $this->image = $image; 
        $this->name = $name;
        $this->descriptionSmall = $descriptionSmall;
        $this->descriptionFull = $descriptionFull;
        $this->price = $price;
        $this->themeColor = $themeColor;
        $this->delivered = $delivered;
    }

    

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.product.card-item');
    }
}
