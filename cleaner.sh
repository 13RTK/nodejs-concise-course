# Find out all the node_modules and delete them
find . -name node_modules -exec rm -rf {} \;

# Find out all the pnpm-lock.yaml and delete them
find . -name pnpm-lock.yaml -exec rm -rf {} \;
