class Counter {
    url = 'http://counter:3000';

    async getViewCount (bookId) {
        try {
            return await fetch(`${this.url}/counter/${bookId}`);
        } catch(e) {
            console.log(e);
        }
        return 0;
    }

    async setViewCount (bookId) {
        try {
            await fetch(`${this.url}/counter/${bookId}/incr` ,{
                method: 'POST'
            })
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = Counter;