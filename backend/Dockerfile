# Using the official Python base image
FROM python:3.10.13

# Set the working directory in the container
WORKDIR /app

# Copy the necessary files into the working directory
COPY . .

# Install Python libraries
RUN pip install -r requirements.txt

# Generate the database dependency
RUN prisma generate

# Command to run the application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "3001"]
