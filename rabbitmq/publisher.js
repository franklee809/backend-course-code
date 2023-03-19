/* RabbitMQ */
const amqp = require("amqplib");

const msg = {number: process.argv[2]}
connect();
async function connect() {

    try {
        // https://armadillo.rmq.cloudamqp.com/

        const amqpServer = "amqps://mnvpqqyn:pwQo4dykvf3uKh1JZzkHUdXlwZBlUw7_@armadillo.rmq.cloudamqp.com/mnvpqqyn"
        // const amqpServer = "amqp://localhost:5672"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))
        console.log(`Job sent successfully ${msg.number}`);
        await channel.close();
        await connection.close();
    }
    catch (ex){
        console.error(ex)
    }

}