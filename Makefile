install:
	npm install
test:
	npm test
diff:
	./bin/gendiff.js $(file1) $(file2)
.PHONY: install test diff
