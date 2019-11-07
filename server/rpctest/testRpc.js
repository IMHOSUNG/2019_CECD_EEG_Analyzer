var amqp = require('amqplib/callback_api');

amqp.connect('amqp://root:root@localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'rpc_queue';

    channel.assertQueue(queue, {
      durable: false
    });
    channel.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    //JSON 형태로 옴
    channel.consume(queue, function reply(msg) {
      var n = msg.content.toString();

      console.log(" [.] fib(%d)", n);

      var r = fibonacci(n);

      channel.sendToQueue(msg.properties.replyTo,
        Buffer.from(r), {
          correlationId: msg.properties.correlationId
        });

      channel.ack(msg);
    });
  });
});

function fibonacci(n) {
    console.log(n);
    return n;
}