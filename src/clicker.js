import config from './config';
import { pressKey } from './utils';

const nextTime = {};

const activateSupply = key => {
    if (config[key].enabled) {
        if (config[key].delay !== 0) {
            if (nextTime[key] && nextTime[key] > Date.now()) {
                return;
            }
            nextTime[key] = Date.now() + config[key].delay;
        }
        pressKey(config[key].code);
    }
};

export default () => {
    activateSupply('DOUBLE_ARMOR');
    activateSupply('DOUBLE_DAMAGE');
    activateSupply('FIRST_AID');
    activateSupply('GOLD_BOX');
    activateSupply('MINE');
    activateSupply('NITRO');
};
