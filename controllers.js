import fetch from 'node-fetch';
import HttpsProxyAgent from 'https-proxy-agent';
import util from './utils';
import data from './data';
import fs from 'fs';

//get something from resource
const getLargeFile = (req, res) => {
    const { id } = req.params;

    util.streamFile(fs.createReadStream(data.fileList[id]))
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json(err));
};

//get with proxy
const getWithProxy = (req, res) => {
    const proxyAgent = new HttpsProxyAgent('http://196.19.183.210:3128');
    return fetch('https://rickandmortyapi.com/api', { agent: proxyAgent })
        .then((resp) => resp.json())
        .then((response) => {
            res.json(response);
        })
        .catch((err) => res.status(500).json(err));
};

//get something from resource
const get = (req, res) => {
    const { id } = req.params;
    util.readData(id)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json(err));
};

//add something new to resource (in this case overwrite the file)
const post = (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    util.writeData(`id: data`)
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json(err));
};

//update something on resource (in this case append the file)
const put = (req, res) => {
    const { data } = req.body;
    util.updateData(data)
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json(err));
};

//delete something on resource (in this case overwrite with blank string)
const del = (req, res) => {
    util.writeData(``)
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
    get,
    getLargeFile,
    post,
    put,
    del,
    getWithProxy,
};
