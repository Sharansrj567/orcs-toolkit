![banner](https://raw.githubusercontent.com/shreyasssk/image-reference/master/orcs.gif)
# ORCS - Open Resource Control And Surveillance Toolkit
A Realtime Dashboard to view metrics of multiple systems CPU, Memory and it's running processes.

## Features
- A Dashboard to get information like 
    - System Information
    - CPU and Memory consumption
    - Network Interfaces
    - System Processes
- Process Dashboard to check all the processes running in the system
- CPU and Memory usage visualization of each process
- Stateless Application (non-persistent storage)
- Every connected system is registed to the Database
- Uses Node.js Cluster Module, so every thread in CPU is serving requests.
- Uses Redis caching for Master to know which worker is assigned to which system.
- Support for Cross-Platform

## Built using
- Node.js (Express)
- Socket.io
- MongoDB
- Redis
- Electron / React
- ApexCharts
- Shards UI