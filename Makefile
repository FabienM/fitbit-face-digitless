build: install lint
	npm run build

install:
	npm ci

fitbit: install
	npm run fitbit

lint: install
	npm run lint

.PHONY: build lint fitbit ci
