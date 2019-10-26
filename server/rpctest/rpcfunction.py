# pip install pika

import pika
import json
import numpy as np
import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose
pd.set_option("display.max_row", 500)
pd.set_option("display.max_columns", 500)
userid = "root";
password = "root";

credentials = pika.PlainCredentials(userid,password)

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost',credentials=credentials))

channel = connection.channel()

channel.queue_declare(queue='rpc_queue')

def decomposeFun(n):
    #print(type(n));
    #print(n);
    #jsonString = json.dumps(n);
    #print(type(jsonString));
    #data = json.loads(jsonString);
    #s = data.encode('ascii');     
    #print(str(data));
    #data = data[1:]

    df = pd.read_json(n);

    decomposition = seasonal_decompose(df.value, extrapolate_trend='freq', freq=30);
    #print(decomposition.resid[1]);
    #print(decomposition.trend)
    #print(decomposition.seasonal)

    resid_data = [];
    trend_data = [];
    seasonal_data = [];

    for element in decomposition.resid:
        resid_data.append(element);
    for element in decomposition.trend:
        trend_data.append(element);
    for element in decomposition.seasonal:
        seasonal_data.append(element);
    return str({ 'len' : len(resid_data), 'resid' :resid_data , 'trend' : trend_data , 'seasonal' : seasonal_data });

def on_request(ch, method, props, body):
    n = body.decode('utf-8');
    print("get data from server");
    #print(" [.] fib(%s)" % n)
    response = decomposeFun(n)

    ch.basic_publish(exchange='',
                     routing_key=props.reply_to,
                     properties=pika.BasicProperties(correlation_id = \
                                                         props.correlation_id),
                     body=str(response))
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='rpc_queue', on_message_callback=on_request)

print(" [x] Awaiting RPC requests")
channel.start_consuming()
