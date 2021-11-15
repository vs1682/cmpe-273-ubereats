import RPC from "./kafkarpc.js";

var rpc = new RPC();

//make request to kafka
function make_request(queue_name, msg_payload, callback) {
  console.log("IN MAKE REQUEST");
  console.log(msg_payload);
  rpc.makeRequest(queue_name, msg_payload, function (error, response) {
    if (error) {
      callback(error, null);
    } else {
      console.log("MAKE REQUEST CALLBACK RESPONSE: ", response);
      callback(null, response);
    }
  });
}

export default {
  make_request
};
