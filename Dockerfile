FROM php:8.3-fpm-alpine

# Install the image/font libraries needed for GD, build and enable
# pdo, pdo_mysql, gd (with FreeType, JPEG, WebP support), exif
RUN apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        freetype-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        libwebp-dev \
    && apk add --no-cache \
        freetype \
        libjpeg-turbo \
        libpng \
        libwebp \
        ttf-dejavu \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_mysql \
        gd \
        exif \
    && apk del .build-deps \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /var/www/html

# Copy your app files
COPY app/ /var/www/html/
COPY php-uploads.ini /usr/local/etc/php/conf.d/uploads.ini

# Set permissions
RUN chown -R www-data:www-data /var/www/html
