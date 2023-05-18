For this project I undertook the responsibility of developing a high-performance API capable of efficiently managing substantial volumes of incoming requests and seamlessly delivering product data for an e-commerce website.

To fulfill this objective, I confronted a considerable data set comprised of millions of lines of CSV files. In order to utilize this data, I orchestrated a data transfer process that entailed extracting information from the CSV files and transferring it into a robustly structured and query-compatible database. This involved the creation and implementation of an Extract, Transform, Load (ETL) pipeline.

To facilitate the reading and streaming of data from the CSV files into the PostgreSQL database tables, I leveraged the PG-Pool Node Package, a powerful tool used for its capabilities in handling data ingestion tasks. This allowed for efficient and streamlined data transfer operations, ensuring data integrity and reliability throughout the process.

Subsequently, I architected an ExpressJS server on the NodeJS backend, establishing well-defined routes to accommodate a wide array of HTTP requests. This setup served as a foundation for the API, empowering it to effectively handle incoming requests, process them swiftly, and deliver the requested product data to the intended recipients.

In order to guarantee optimal performance, I conducted thorough load testing of the server utilizing the artillery framework. This enabled me to simulate various levels of concurrent requests, thereby gauging the server's ability to handle substantial traffic and ensuring its responsiveness and scalability.

Furthermore, I implemented rigorous optimizations within the database querying mechanisms, fine-tuning the performance to minimize latency and enhance the overall efficiency of data retrieval operations. These optimizations were meticulously designed to cater to the specific requirements and intricacies of the product data and the anticipated query patterns.

Through meticulous planning, efficient utilization of tools, and systematic optimization measures, I successfully created an API that effortlessly handled high request volumes and reliably supplied the necessary product data for the e-commerce website, ultimately contributing to a seamless user experience and enhanced performance.

