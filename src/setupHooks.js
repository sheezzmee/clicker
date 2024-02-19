import { readDataView } from './utils';
import config from './config';

const send = WebSocket.prototype.send;

// максимально поносная реализация дюпателя, но мне нравится
WebSocket.prototype.send = function (data) {
    if (data.byteLength === 19) {
        const hash = readDataView(data);

        if (hash === '4222452873967973' && config.MINE.enabled) {
            for (let i = 0; i < config.MINE.multiplier; i++) {
                send.apply(this, arguments);
            }
        }
    }

    send.apply(this, arguments);
};
