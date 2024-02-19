let config = {
    clicker: {
        DOUBLE_ARMOR: {
            enabled: false,
            delay: 300,
            code: 'Digit2',
            color: '#EADC99'
        },
        DOUBLE_DAMAGE: {
            enabled: false,
            delay: 300,
            code: 'Digit3',
            color: '#FF3333'
        },
        FIRST_AID: {
            enabled: false,
            delay: 300,
            code: 'Digit1',
            color: '#BFE500'
        },
        GOLD_BOX: {
            enabled: false,
            delay: 300,
            code: 'Digit6',
            color: '#FFBD00'
        },
        MINE: {
            enabled: false,
            delay: 0,
            multiplier: 10,
            code: 'Digit5',
            color: '#36B24A'
        },
        NITRO: {
            enabled: false,
            delay: 300,
            code: 'Digit4',
            color: '#FFFF00'
        }
    }
};

const flattenObject = (obj, parentKey = '') => {
    let result = {};

    for (const key in obj) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof obj[key] === 'object' && obj[key] !== null) {
            result = { ...result, ...flattenObject(obj[key], newKey) };
        } else {
            result[newKey] = obj[key];
        }
    }

    return result;
};

const unflattenObject = obj => {
    let result = {};

    for (const key in obj) {
        const keys = key.split('.');
        keys.reduce((acc, currentKey, index) => {
            if (!acc[currentKey]) {
                acc[currentKey] = {};
            }
            if (index === keys.length - 1) {
                acc[currentKey] = obj[key];
            }
            return acc[currentKey];
        }, result);
    }

    return result;
};

export const saveConfig = () => {
    const flattenedConfig = flattenObject(config);

    for (const [key, value] of Object.entries(flattenedConfig)) {
        localStorage.setItem(key, value);
    }
};

const loadConfig = () => {
    const flattenedConfig = flattenObject(config);

    for (const key of Object.keys(flattenedConfig)) {
        const storedValue = localStorage.getItem(key);

        if (storedValue !== null) {
            flattenedConfig[key] =
                typeof flattenedConfig[key] === 'boolean'
                    ? storedValue === 'true'
                    : typeof flattenedConfig[key] === 'number'
                    ? parseFloat(storedValue)
                    : storedValue;
        }
    }

    config = unflattenObject(flattenedConfig);
};

loadConfig();

window.clickerConfig = config.clicker;
window.clickerConfig.saveConfig = saveConfig;

export default config.clicker;
