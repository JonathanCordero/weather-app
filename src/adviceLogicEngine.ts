//I have bias on good weather, I'll need to check a general consensus on weather.
export function getWeatherAdvice(code: number | null, tempf: number | null):
string {
    if (code ===  null || tempf === null) {
        return 'Loading advice...';
    }
    //snow
    if (code >= 5000 && code < 6000){
        return "Snow expected! Don't forget to bundle up and look around carefully!";
    }
    if (tempf<40){
        return 'The weather has taken a chilly turn!';
    }
    if(tempf<65){
        return 'Nice cool weather, perfect for a stroll.';
    }
    if (tempf<80){
        return 'warm weather has returned.';
    }
    if (tempf>=81){
        return 'The heat is really picking up.';
    }
    return 'weather looks nomral today';
}