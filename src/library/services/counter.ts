class Counter {
    url = 'http://counter:3000';

    async getViewCount (bookId: string): Promise<Response|0> {
        try {
            return await fetch(`${this.url}/counter/${bookId}`);
        } catch(e) {
            console.log(e);
        }
        return 0;
    }

    async setViewCount (bookId: string): Promise<void> {
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