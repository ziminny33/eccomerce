export class BaseClass  {

    /**
     * @param selector 
     * @param scope 
     * @returns 
     */
    protected $ = <T>(selector, scope = document): T =>
    scope.querySelector(selector);

    constructor() {}
}