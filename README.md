[![Build Status](https://travis-ci.org/MicahBala/biz_app.svg?branch=master)](https://travis-ci.org/MicahBala/biz_app) [![Coverage Status](https://coveralls.io/repos/github/MicahBala/biz_app/badge.svg?branch=master)](https://coveralls.io/github/MicahBala/biz_app?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/326acbfe8aab722d5a5e/maintainability)](https://codeclimate.com/github/MicahBala/biz_app/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/326acbfe8aab722d5a5e/test_coverage)](https://codeclimate.com/github/MicahBala/biz_app/test_coverage)

# BizAPP

## Introduction

An application (Backend) to showcase businesses around Kafanchan for free. The app will allow users to post reviews and ratings for each business, so that people can easily find the services of their choice from the avialable business.

## Features

Users can do the following:

- Add a new business to the existing business
- Post an honest review on a business
- Post a rating for any business
- Only admin can delete a business

## Test the App

Open postman and send request to the following endpoints on this link https://bizapp2020.herokuapp.com

- GET /api/v1/biz/ (To get all businesses from the database)
- GET /api/v1/biz/:id (To get a single business)
- POST /api/v1/biz/ (To post a new business with the fields name, address and phone, either as json of x-www-urlencoded)
- PUT /api/v1/biz/:id (To edit an existing business)
- DELETE /api/v1/biz/:id (To delete an existing business)

## Dependencies

- Node.js
- Express
- Mongoose

## Author

Micah Y. Bala
