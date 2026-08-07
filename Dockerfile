FROM php:8.3-fpm-alpine

#Install the image/font libraries needed for GD, build and enable pdo, pdo_mysql, gd (with FreeType, JPEG, WebP support), exif; clean up apt cache
RUN apt-get update && apt-get install -y --no-install-recommends \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libwebp-dev \
        fonts-dejavu-core \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) pdo pdo_mysql gd exif \
    && rm -rf /var/lib/apt/lists/*
# Set working directory
WORKDIR /var/www/html

# Copy your app files
COPY app/ /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Copy PHP upload configuration
COPY php-uploads.ini /usr/local/etc/php/conf.d/uploads.ini
