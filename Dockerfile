# Use official Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy rest of the application
COPY . .

# Expose port
EXPOSE 5000

# Environment variables (can be overridden)
ENV FLASK_ENV=production
ENV FLASK_APP=app.py

# Run the app
CMD ["python", "app.py"]
