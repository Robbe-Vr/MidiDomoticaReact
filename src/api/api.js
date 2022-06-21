import axios from "axios";

import Control from "../models/Control";
import TimedEvent from "../models/TimedEvent";

const A_TOKEN_LS = "mididomotica_data2";
function getAccessToken() {
    var token = localStorage.getItem(A_TOKEN_LS);

    return token;
};

function getHeaders()
{
    return {
        "MidiDomotica_AccessToken": getAccessToken(),
        "Content-Type": "application/json",
    }
}

function HandlerError(error) {
    if (error.response) {
        if (error.response.data instanceof String || typeof error.response.data == 'string') {
            if (error.response.statusCode == 403 || error.response.data.indexOf('Unknown access_token') > -1) {
                localStorage.setItem("mididomotica_data1", null);
                localStorage.setItem(A_TOKEN_LS, null);
                window.location.href = '/';
                return null;
            } else {
                console.log(`Server responded: ${error.response.data}`, error.response);
            }
        }
        else {
            console.log(`Server responded: ${error.response.status} - ` + error.response.data.message, error.response);
        }
    } else if (error.request) {
        console.log(`Request failed: `, error.request);
    } else {
        console.log(`Axios request execution fail: ${error.message}`, error);
    }

    return error.response?.data ?? "Unknown Error";
};

export default class Api
{
    constructor()
    {
        this.ServerUrl = 'http://192.168.2.101:55555';
        this.ApiUrl = this.ServerUrl + '/api';
        this.RefreshTokenName = "MidiDomotica_RefreshToken";
        this.AccessTokenHeaderName = "MidiDomotica_AccessToken";

        this.ControlsBaseUrl = this.ApiUrl + "/controls/";

        this.AppSecret = process.env.REACT_APP_APP_SECRET;
    }

    //#region Authorization
    async ValidateAccessToken(authToken)
    {
        try
        {
            const data = JSON.stringify(authToken, null, 4);

            var res = await axios.post(this.ApiUrl + '/authorize/validate', data, { headers: getHeaders() });

            return res.data;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async RefreshAccessToken(authToken)
    {
        try
        {
            const data = JSON.stringify(authToken, null, 4);

            var res = await axios.post(this.ApiUrl + '/authorize/refresh', data, { headers: getHeaders() });

            return res.data;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async Login(password)
    {
        try
        {
            const data = JSON.stringify({ AppSecret: this.AppSecret, Password: password }, null, 4);

            var res = await axios.post(this.ApiUrl + '/authorize/login', data, { headers: { "Content-Type": "application/json" } });

            return res;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async Logout()
    {
        try
        {
            const data = JSON.stringify({}, null, 4);

            var res = await axios.post(this.ApiUrl + '/authorize/logout', data, { headers: getHeaders() });

            return res;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }
    //#endregion

    //#region Controls
    async GetControls(page = null, rpp = null)
    {
        try
        {
            var res = await axios.get(this.ControlsBaseUrl + (Number.isInteger(page) ? '?page=' + page + (Number.isInteger(rpp) ? '&rpp=' + rpp : '') : ''), { headers: getHeaders() });

            var controls = res.data && res.data.map && Array.isArray(res.data) ? res.data.map(control =>
                new Control(control.name)
            ) : [];

            return controls;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }
    //#endregion

    async GetSubscriptionsForControl(control, page, rpp)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/controls/subscriptions/' + encodeURIComponent(control.replace('/', '%2f')) + (Number.isInteger(page) ? '?page=' + page + (Number.isInteger(rpp) ? '&rpp=' + rpp : '') : ''), { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async SendInstantExecutionAction(linkData)
    {
        try
        {
            const data = JSON.stringify(linkData, null, 4);

            var res = await axios.post(this.ApiUrl + '/actions/instant', data, { headers: getHeaders() });

            return res;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async GetUpcomingTimedEvents(page = null, rpp = null)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/timedevent/upcoming', { headers: getHeaders() });

            var events = res.data && res.data.map && Array.isArray(res.data) ? res.data.map(event =>
                new TimedEvent(event.name, event.actionGroup, event.methodStr, event.nextFireTimes ? event.nextFireTimes.map(x => new Date(x * 1000)) : [])
            ) : [];

            return events;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async RemoveTimedEvent(group, name)
    {
        try
        {
            const data = JSON.stringify({}, null, 4);

            var res = await axios.post(this.ApiUrl + '/timedevent/remove/' + group + '/' + name, data, { headers: getHeaders() });

            return res;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async CreateTimedEvent(type, linkData)
    {
        try
        {
            let query = `/add/once`;
            switch (type)
            {
                default:
                case 'once':
                    query = '/add/once';
                    break;

                case 'weekschedule':
                    query = '/add/weekschedule';
                    break;

                case 'secondly':
                    query = '/add/secondly';
                    break;

                case 'secondlyAtAmount':
                    query = '/add/secondly/' + linkData.amount;
                    break;

                case 'everyXSeconds':
                    query = '/add/every/' + linkData.X + '/seconds';
                    break;

                case 'everyXSecondsAtAmount':
                    query = '/add/every/' + linkData.X + '/seconds/' + linkData.amount;
                    break;

                case 'minutely':
                    query = '/add/minutely';
                    break;

                case 'minutelyAtAmount':
                    query = '/add/minutely/' + linkData.amount;
                    break;

                case 'everyXMinutes':
                    query = '/add/every/' + linkData.X + '/minutes';
                    break;

                case 'everyXMinutesAtAmount':
                    query = '/add/every/' + linkData.X + '/minutes/' + linkData.amount;
                    break;

                case 'hourly':
                    query = '/add/hourly';
                    break;

                case 'hourlyAtAmount':
                    query = '/add/hourly/' + linkData.amount;
                    break;

                case 'everyXHours':
                    query = '/add/every/' + linkData.X + '/hours';
                    break;

                case 'everyXHoursAtAmount':
                    query = '/add/every/' + linkData.X + '/hours/' + linkData.amount;
                    break;
                    
                case 'daily':
                    query = '/add/daily';
                    break;

                case 'dailyAtAmount':
                    query = '/add/daily/' + linkData.amount;
                    break;

                case 'everyXDays':
                    query = '/add/every/' + linkData.X + '/days';
                    break;

                case 'everyXDaysAtAmount':
                    query = '/add/every/' + linkData.X + '/days/' + linkData.amount;
                    break;

                case 'weekly':
                    query = '/add/weekly';
                    break;

                case 'weeklyAtAmount':
                    query = '/add/weekly/' + linkData.amount;
                    break;

                case 'everyXWeeks':
                    query = '/add/every/' + linkData.X + '/weeks';
                    break;

                case 'everyXWeeksAtAmount':
                    query = '/add/every/' + linkData.X + '/weeks/' + linkData.amount;
                    break;

                case 'monthly':
                    query = '/add/monthly';
                    break;

                case 'monthlyAtAmount':
                    query = '/add/monthly/' + linkData.amount;
                    break;

                case 'everyXMonths':
                    query = '/add/every/' + linkData.X + '/months';
                    break;

                case 'everyXMonthsAtAmount':
                    query = '/add/every/' + linkData.X + '/months/' + linkData.amount;
                    break;

                case 'yearly':
                    query = '/add/yearly';
                    break;

                case 'yearlyAtAmount':
                    query = '/add/yearly/' + linkData.amount;
                    break;

                case 'everyXYears':
                    query = '/add/every/' + linkData.X + '/years';
                    break;

                case 'everyXYearsAtAmount':
                    query = '/add/every/' + linkData.X + '/years/' + linkData.amount;
                    break;
            }

            var res = await axios.post(this.ApiUrl + '/timedevent' + query, linkData, { headers: getHeaders() });

            return res;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async LinkActionToEvent(eventName, linkData)
    {
        try
        {
            const data = JSON.stringify(linkData, null, 4);

            var res = await axios.post(this.ApiUrl + '/actions/link/' + encodeURIComponent(eventName.replace('/', '%2f')), data, { headers: getHeaders() });

            return res;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async UnlinkActionFromEvent(eventName, linkData)
    {
        try
        {
            const data = JSON.stringify(linkData, null, 4);

            var res = await axios.post(this.ApiUrl + '/actions/unlink/' + encodeURIComponent(eventName.replace('/', '%2f')), data, { headers: getHeaders() });

            return res;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    // Hue

    async GetHueTargets(mode)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/hueactions/targets/' + mode, { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async GetHueEntertainmentModes()
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/hueactions/entertainmentmodes', { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async ConnectBridge(bridgeInfo)
    {
        try
        {
            var res = await axios.post(this.ApiUrl + '/hueactions/connect/' + bridgeInfo, {}, { headers: getHeaders() });

            return res;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    // PowerModes

    async GetPowerModes()
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/powermodesactions/modes', { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }
    
    async GetPowerModeName(modeId)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/powermodesactions/name/' + modeId, { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async GetPowerModeId(modeName)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/powermodesactions/id/' + modeName, { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    //Keyboard

    async GetKeyboardKeys()
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/keyboardactions/keys', { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    // Audio

    // Output
    async GetAudioOutputs()
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/audioactions/outputs', { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }
    
    async GetAudioOutputName(deviceId)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/audioactions/output/name/' + deviceId, { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async GetAudioOutputId(deviceName)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/audioactions/output/id/' + deviceName, { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    // Input
    async GetAudioInputs()
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/audioactions/inputs', { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async GetAudioInputName(deviceId)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/audioactions/input/name/' + deviceId, { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async GetAudioInputId(deviceName)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/audioactions/input/id/' + deviceName, { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    // Mixer
    async GetAudioMixers()
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/audioactions/mixers', { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }
    
    async GetAudioMixerName(deviceId)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/audioactions/mixer/name/' + deviceId, { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async GetAudioMixerId(deviceName)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/audioactions/mixer/id/' + deviceName, { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    // Soundboard

    async GetSoundboardSoundEffects()
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/soundboardactions/sounds', { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async GetSoundboardSoundEffectFolders()
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/soundboardactions/soundfolders', { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async GetSoundboardSoundEffectsFromFolder(folder)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/soundboardactions/sounds/' + folder, { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    GetSoundEffectAudioUrl(soundEffect)
    {
        return this.ApiUrl + '/soundboardactions/sound/' + encodeURIComponent(soundEffect.replace('/', '%2f'));
    }

    async GetSoundboardOutputs()
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/soundboardactions/outputs', { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async GetSoundboardInputs()
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/soundboardactions/inputs', { headers: getHeaders() });

            var targets = res.data && res.data.map && Array.isArray(res.data) ? res.data : [];

            return targets;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async SetSoundboardOutput(deviceInfo)
    {
        try
        {
            var res = await axios.get(this.ApiUrl + '/soundboardactions/set/output/' + deviceInfo, {}, { headers: getHeaders() });

            return res;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async SetSoundboardThroughput(deviceInfo)
    {
        try
        {
            var res = await axios.post(this.ApiUrl + '/soundboardactions/set/throughput/' + deviceInfo, {}, { headers: getHeaders() });

            return res;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }

    async SetSoundboardInput(deviceInfo)
    {
        try
        {
            var res = await axios.post(this.ApiUrl + '/soundboardactions/set/input/' + deviceInfo, {}, { headers: getHeaders() });

            return res;
        }
        catch (e)
        {
            return HandlerError(e);
        }
    }
}