all: help

help: ## display this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-40s\033[0m %s\n", $$1, $$2}'

build: install lint ## build the target package
	npm run build

install: ## install node dependencies
	npm ci

fitbit: install ## run Fitbit SDK CLI
	npm run fitbit

lint: install ## lint the code
	npm run lint

.PHONY: build lint fitbit ci all help
