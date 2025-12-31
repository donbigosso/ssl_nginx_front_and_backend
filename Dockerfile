FROM php:8.3-fpm-alpine

# Install any additional PHP extensions if needed (e.g., for MySQL: pdo_mysql)
RUN docker-php-ext-install pdo pdo_mysql

# Set working directory
WORKDIR /var/www/html

# Copy your app files
COPY app/ /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html
