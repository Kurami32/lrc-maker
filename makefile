# needs C:\Program Files\Git\bin in your `PATH`, can also run make from Git Bash ((https://git-scm.com/download/win)
ifeq ($(OS),Windows_NT)
    SHELL := C:/Program Files/Git/bin/bash.exe
    .SHELLFLAGS := -ec
else
    SHELL := /bin/bash
endif

.SILENT:
.PHONY: setup dev build preview lint lint-fix typecheck test test-watch clean

PORT ?= 5173     # default port
HOST ?= 0.0.0.0

setup:
	npm install

dev:
	npm run dev -- --host $(HOST) --port $(PORT)

build:
	npm run build

# To run a prod build
preview:
	npm run preview -- --host $(HOST) --port $(PORT)

lint:
	npm run lint

lint-fix:
	npm run lint:fix

typecheck:
	npm run type-check

test:
	npm run test

clean:
	rm -rf dist node_modules

check-all: lint typecheck test
