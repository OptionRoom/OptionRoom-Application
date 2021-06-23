export const getDataRan = () => {

    const getItem = (key) => {
        function randomIntFromInterval(min, max) { // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min)
        }


        const d1 = {
            "address": "0x377E6d09A0E4c325ca697B400d1AE937fFfC22B3",
            "blockHash": "0x71eff01697a100395ce3a42f40a4439b7d41e954782cbae068aebd226eb993a9",
            "blockNumber": 10430052,
            "logIndex": 64,
            "removed": false,
            "transactionHash": "0x936734c78ecf7eed0e3013a8a15ef6cf7185c39817d8c1458232b407a0f97b6f",
            "transactionIndex": 22,
            "id": "log_a15e4784",
            "returnValues": {
                "0": "0xb35bcFaE686FaE5501385Eb8EE27C07eAF7b1E82",
                "1": "0xf7894722173d07382132D9988aB052b20a5fA91D",
                "2": "100000000000000000000",
                "3": "0",
                "4": "183646214884629070372",
                "market": "0xb35bcFaE686FaE5501385Eb8EE27C07eAF7b1E82",
                "buyer": "0xf7894722173d07382132D9988aB052b20a5fA91D",
                "investmentAmount": 100000000000000000000 + randomIntFromInterval(5000000000000000000, 90000000000000000000),
                "outcomeIndex": key%2,
                "outcomeTokensBought": 183646214884629070372 + randomIntFromInterval(1836462148846, 18364621488460000),
                timestamp: new Date().getTime() + (randomIntFromInterval(100, 100000) * key)
            },
            "event": "MCBuy",
            "signature": "0x7a21e3ccc5923ef66d1db23c4eeb055635a6ca9fcd4eb899ec42e664a947b8da",
            "raw": {
                "data": "0x0000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000009f49a6b702f5ec224",
                "topics": [
                    "0x7a21e3ccc5923ef66d1db23c4eeb055635a6ca9fcd4eb899ec42e664a947b8da",
                    "0x000000000000000000000000b35bcfae686fae5501385eb8ee27c07eaf7b1e82",
                    "0x000000000000000000000000f7894722173d07382132d9988ab052b20a5fa91d",
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                ]
            }
        };

        return d1;
    }

    const arr = [];
    for (var i = 0; i < 5000; i++) {
        arr.push(getItem(i));
    }

    return arr;
}
