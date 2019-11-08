# 2019_CECD_EEG_Analyzer
## 1. 목표
OpenBCI, 뇌파 측정 기기를 사용하여 사용자의 뇌파를 측정하고
측정 된 로그 파일을 시계열 분석을 하여 나이대, 성별에 따라
데이터를 정제해서 보여준다.

## 2. 구동 상태 
### 2-1. 프로그램 및 사용 Port
- React port : 5000
- Main server port : 3000
- Mysql adminer port : 8000
- Rabbitmq manager port: 15672
- Mysql (5.7 Version) port : 3306
- Rabbitmq port : 5672

## 3 설치 및 사용 방법
설치 및 사용 전 기본 환경
1. docker, docker-compose 설치
2. npm , node.js 설치 
3. pm2 설치
위 두 환경이 구성 되 어 있다고 가정
 
### 3.1 설치 (Yarn 사용)
```
docker-compose up -d
yarn 
```
### 3.2 구동 방법
#### 명령어
```
// 메인 서버 실행 
yarn start
// rpc 실행
yarn rpc
```
#### pm2 사용
```
// 파일의 루트에서 실행
pm2 start server -- start
pm2 start ./server/rpctest/rpcfunction.py --interpreter python3
```

## 4. 주의 사항

    
