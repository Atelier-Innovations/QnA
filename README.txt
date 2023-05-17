For this project, I was tasked with creating an API that could handle large amounts of requests and supply product data for an e-commerce website. 
The data source I was given was millions of lines of CSV's, and in order to utilize the data I had to transfer it from the CSV files into a database that could be queried. 
In order to do this, I had to create an ETL pipeline. 
I used the PG-Pool Node Package to facilitate the reading and streaming of data from the CSV files into my PostgreSQL database tables. 
Once all of the data was saved and formatted, I set up an ExpressJS server on my NodeJS backend with established routes for HTTP requests. 
After that, I load tested the server using artillery and optimized the querying of the database. 
