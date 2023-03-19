const amqp = require("amqplib");

connect();
async function connect() {

    try {
        // https://armadillo.rmq.cloudamqp.com/
        const amqpServer = "amqps://mnvpqqyn:pwQo4dykvf3uKh1JZzkHUdXlwZBlUw7_@armadillo.rmq.cloudamqp.com/mnvpqqyn"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.number}`)
            //"7" == 7 true
            //"7" === 7 false

            if (input.number == 7 )
                channel.ack(message);
        })

        console.log("Waiting for messages...")

    }
    catch (ex){
        console.error(ex)
    }

}