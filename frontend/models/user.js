import Statistics from './statistics';

export default class User {
    constructor() {
        this.userName = 'Test user';
        this.statistics = new Statistics();
    }

    changeUsername(username) {
        if (username) {
            this.userName = username;
        } else {
            this.userName = 'Test user';
        }
    }
}