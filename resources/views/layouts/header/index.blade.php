 @if ($envs->isMobile)
    @include('layouts.header.mobile') 
 @else
    @include('layouts.header.web')
 @endif   
 