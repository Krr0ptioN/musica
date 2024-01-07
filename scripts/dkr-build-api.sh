#!/bin/sh

# API Docker image build
# The image is built with specific version,
# where it's the latest commit.

name=musica-api
version=$(git rev-parse --short HEAD)

docker build -f apps/api/Dockerfile . -t "$name:$version"
