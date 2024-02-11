![banner](https://raw.githubusercontent.com/shreyasssk/image-reference/master/orcs.gif)

# ORCS - Open Resource Control And Surveillance Toolkit

A multi-threaded, fault-tolerant, scalable and cross-platform dashboard to view real-time CPU and Memory usage of multiple systems and their processes. Its main focus is to control and monitor resource utilization through Identity Access Management (IAM).

## Features

- A Dashboard to get information about:
  - System Information
  - CPU and Memory consumption
  - Network Interfaces
  - System Processes
- Process Dashboard to check all the processes running in the system
- CPU and Memory usage visualization of each process
- Policies based Identity Access Management feature for restricted access to resources
- Stateless Application (non-persistent storage)
- Every connected system is registed to the Database
- Multi-threading using Node.js Cluster Module, so every thread in CPU is serving requests
- Uses Redis caching for Master to know which worker is assigned to which system.
- Support for Cross-Platform

## Technologies used

- Node.js (Express)
- Socket.io
- MongoDB
- Redis
- Electron / React
- ApexCharts
- Shards UI
