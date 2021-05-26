export let getCorrectTime = (date: Date) => {
    let x = new Date();
    let timeZone = x.getTimezoneOffset() / 60;
    let temp = (new Date(date)).getTime() - timeZone * 3.6e+6
    return new Date(temp).toString().slice(0, 21)
}
