class _userDto {
    constructor(user) {
        this._id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.avatar = user.avatar;
        this.accountType = user.accountType;
    }
}

module.exports = _userDto;