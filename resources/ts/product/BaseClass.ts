export class BaseClass  {

    protected $ = <T>(selector, scope = document): T =>
    scope.querySelector(selector);

    constructor() {
      
    }
}