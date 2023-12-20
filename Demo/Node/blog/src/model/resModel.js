/*
 * @Date: 2023-12-20 17:56:46
 * @Description: description
 */
class BaseModel {
    constructor(data, message) {
        this.message = data;
        data = null;
        message = null;
    }
    if (data) {
        this.data = data;
    }
    if (message) {
        this.message = message;
    }

    // getData() {
    //     return this.data;
    // }

    // setData(data) {
    //     this.data = data;
    // }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel,
}