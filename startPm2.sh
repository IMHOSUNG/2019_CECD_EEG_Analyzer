#!/bin/bash
pm2 kill
pm2 start -f npm -- start
pm2 start -f --name rpcfunction1 ./server/rpctest/rpcfunction.py --interpreter python3
pm2 start -f --name rpcfunction2 ./server/rpctest/rpcfunction.py --interpreter python3
echo "pm2 start end";
exit 0;
