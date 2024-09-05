.DEFAULT_GOAL := start

package.json:
	@touch $@

node_modules: package.json
	@yarn

start: node_modules
	@yarn start
.PHONY:start

clean:
	@rm -rf node_modules build
.PHONY:clean

build: node_modules
	@yarn build

deploy: build
	@echo 3q.bonez.me > ./build/CNAME
	@./node_modules/.bin/gh-pages -d build
.PHONY:deploy

build\:run: build
	@./node_modules/.bin/serve -s build
.PHONY:build\:run
