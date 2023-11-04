class Counter {
    url = 'http://counter:3000';

    async getViewCount (bookId: string) {
        try {
            return await fetch(`${this.url}/counter/${bookId}`);
        } catch(e) {
            console.log(e);
        }
        return 0;
    }

    async setViewCount (bookId: string) {
        try {
            await fetch(`${this.url}/counter/${bookId}/incr` ,{
                method: 'POST'
            })
        } catch(e) {
            console.log(e);
        }
    }
}

export default Counter;