const path = require("path");
const fs = require("fs").promises;
const config = require(path.resolve("utilities", "configuration.js"));
//const uuid = require("uuid");

/**
 * @param {object} data   takes in an object of boolean and number values
 * @param {boolean} data.previewInConsole  whether to preview the data/size in the console, default is true
 * @param {number} data.bytes  the actual size of the data/file in byte, default is 50000000
 * @returns  {number}  The size of the data/file
 **/
 exports.getFileSize = function(data = {}) {
    data.previewInConsole = data.previewInConsole ? data.previewInConsole : false;
    data.bytes = data.bytes != (undefined || null || "") ? data.bytes : 50000000; // 50mb
    data.bytes = Number(data.bytes);
    const k = 1000;
    const format = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(data.bytes) / Math.log(k));
    const size = parseFloat(data.bytes / Math.pow(k, i)).toFixed(2);

    if (data.previewInConsole == true)
        console.log(data.bytes, " = ", size + format[i]);
    return size;
};

/**
 * @description deletes a file
 * @param {string} filePath - the path of the file to be deleted
 * @param {function} cb - the callback function
 */
exports.deleteFileFrom = (filePath, cb) => {
    fs.unlink(path.resolve(filePath))
        .then(cb)
        .catch((err) => {
            console.log(err);
        });
};

/**
 * @description moves a file from one location to another
 * @param {string} from - the path of the file to be moved
 * @param {string} to - the path of the file to be moved to
 * @param {function} cb - the callback function
 */
 exports.moveFile = (from, to, cb) => {
    fs.rename(path.resolve(from), path.resolve(to))
        .then(cb)
        .catch((err) => {
            throw err;
        });
};