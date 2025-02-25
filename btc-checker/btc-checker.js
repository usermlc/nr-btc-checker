"use strict";

const axios = require("axios");

/**
 * @param {import("node-red").NodeRedApp} RED
 */
module.exports = function (RED) {
  function nrBtcChecker(config) {
    const node = this;
    RED.nodes.createNode(this, config);

    this.topic = config.topic;
    this.inputKey = config.input_key || "payload";
    this.outputKey = config.output_key || "payload";
    this.apiUrl = "https://mempool.space/api/address/";

    node.on("input", function (msg, send, done) {
      const btcAddress = msg[node.inputKey] || node.topic;
      
      if (!btcAddress || typeof btcAddress !== "string") {
        node.warn("Invalid BTC address provided");
        done();
        return;
      }

      axios.get(`${node.apiUrl}${btcAddress}`)
        .then(response => {
          const fundedAmount = response.data.chain_stats.funded_txo_sum / 100000000;
          const result = {
            address: btcAddress,
            funded: fundedAmount,
            status: "success"
          };

          msg[node.outputKey] = result;
          send(msg);
          done();
        })
        .catch(error => {
          const errorMsg = error.response ? error.response.data : error.message;
          node.error(`Error fetching BTC address data: ${errorMsg}`);
          msg[node.outputKey] = { status: "error", message: errorMsg };
          send(msg);
          done();
        });
    });
  }

  RED.nodes.registerType("nr-btc-checker", nrBtcChecker);
};
