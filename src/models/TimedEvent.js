export default class TimedEvent
{
    constructor(name, actionGroup, methodStr, fireTimes)
    {
        this.Name = name;
        this.ActionGroup = actionGroup;
        this.MethodStr = methodStr;
        this.FireTimes = fireTimes ?? [];
    }
}