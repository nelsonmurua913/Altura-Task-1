const fs = require('fs');
const path = require('path');

class FileBasedCache {
    directory;

    constructor(directory = 'cache') {
        this.directory = directory;
        if (!fs.existsSync(this.directory)) {
            fs.mkdirSync(this.directory);
        }
    }

    set(key, value, ttl) {
        const data = {
            key,
            value,
            ttl,
            createdAt: Date.now(),
        };

        const filePath = path.join(this.directory, `${key}.json`);;
        fs.writeFileSync(filePath, JSON.stringify(data));
    }

    get(key) {
        const filePath = path.join(this.directory, `${key}.json`);;

        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            const expiredAt = data.createdAt + data.ttl * 1000;

            if (Date.now() > expiredAt) {
                this.delete(key);
            } else {
                return data.value;
            }
        }

        return null;
    }

    delete(key) {
        const filePath = path.join(this.directory, `${key}.json`);;
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    clear() {
        fs.readdirSync(this.directory).forEach((file) => {
            const filePath = path.join(this.directory, file);
            fs.unlinkSync(filePath);
        });
    }
}

module.exports = FileBasedCache;