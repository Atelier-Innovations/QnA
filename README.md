For this project I undertook the responsibility of developing a high-performance API capable of efficiently managing substantial volumes of incoming requests and seamlessly delivering product data for an e-commerce website.

To fulfill this objective, I confronted a considerable data set comprised of millions of lines of CSV files. In order to utilize this data, I orchestrated a data transfer process that entailed extracting information from the CSV files and transferring it into a robustly structured and query-compatible database. This involved the creation and implementation of an Extract, Transform, Load (ETL) pipeline.

To facilitate the reading and streaming of data from the CSV files into the PostgreSQL database tables, I leveraged the PG-Pool Node Package, a powerful tool used for its capabilities in handling data ingestion tasks. This allowed for efficient and streamlined data transfer operations, ensuring data integrity and reliability throughout the process.

Subsequently, I architected an ExpressJS server on the NodeJS backend, establishing well-defined routes to accommodate a wide array of HTTP requests. This setup served as a foundation for the API, empowering it to effectively handle incoming requests, process them swiftly, and deliver the requested product data to the intended recipients.

In order to guarantee optimal performance, I conducted thorough load testing of the server utilizing the artillery framework. This enabled me to simulate various levels of concurrent requests, thereby gauging the server's ability to handle substantial traffic and ensuring its responsiveness and scalability.

Furthermore, I implemented rigorous optimizations within the database querying mechanisms, fine-tuning the performance to minimize latency and enhance the overall efficiency of data retrieval operations. These optimizations were meticulously designed to cater to the specific requirements and intricacies of the product data and the anticipated query patterns.

Through meticulous planning, efficient utilization of tools, and systematic optimization measures, I successfully created an API that effortlessly handled high request volumes and reliably supplied the necessary product data for the e-commerce website, ultimately contributing to a seamless user experience and enhanced performance.
<img width="1440" alt="Screen Shot 2023-05-17 at 2 42 20 PM" src="https://github.com/Atelier-Innovations/QnA/assets/117308724/2b9e0989-25d0-43d1-8481-651556ae695c">
<img width="1440" alt="Screen Shot 2023-05-17 at 2 43 12 PM" src="https://github.com/Atelier-Innovations/QnA/assets/117308724/fd4db9fe-4e93-419b-9c85-4ed0c2bdbd50">
<img width="1437" alt="Screen Shot 2023-05-17 at 2 43 34 PM" src="https://github.com/Atelier-Innovations/QnA/assets/117308724/bef6b8c8-ccce-4c1a-a166-b89b5b84bc90">
<img width="1435" alt="Screen Shot 2023-05-17 at 2 44 00 PM" src="https://github.com/Atelier-Innovations/QnA/assets/117308724/d47563fd-8092-404e-9a7c-7547d8ee7a5f">
<img width="1436" alt="Screen Shot 2023-05-17 at 2 44 21 PM" src="https://github.com/Atelier-Innovations/QnA/assets/117308724/54de75ca-b397-46b6-a19b-4ba9ac00cc4a">

