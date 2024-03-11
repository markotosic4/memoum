export class Player {
    constructor(userName, time,level){
        this.userName = userName;
        this.time = time;
        this.level = level;
    }

    set userName(userName){
        this._userName = userName;
    }

    set time(time){
        this._time = time;
    }

    set level(level){
        this._level = level;
    }

    get userName(){
        return this._userName;
    }

    get time(){
        return this._time;
    }

    get level(){
        return this._level;
    }
}

